import logging
from typing import Generator
from urllib.parse import urlparse, urljoin
from datetime import datetime, UTC

import requests
from pydantic import BaseModel
from bs4 import BeautifulSoup
from playwright.sync_api import sync_playwright
from markdownify import MarkdownConverter

from app.models import Document
from .base import BaseDataSource
from .consts import IGNORE_TAGS, IGNORE_CLASSES

logger = logging.getLogger(__name__)


class WebSitemapConfig(BaseModel):
    url: str


def _ensure_absolute_url(source_url: str, maybe_relative_url: str) -> str:
    if not urlparse(maybe_relative_url).netloc:
        return urljoin(source_url, maybe_relative_url)
    return maybe_relative_url


def extract_urls_from_sitemap(sitemap_url: str) -> list[str]:
    response = requests.get(sitemap_url)
    response.raise_for_status()

    soup = BeautifulSoup(response.content, "html.parser")
    result = [
        _ensure_absolute_url(sitemap_url, loc_tag.text)
        for loc_tag in soup.find_all("loc")
    ]
    if not result:
        raise ValueError(
            f"No URLs found in sitemap {sitemap_url}. Try using the 'single' or 'recursive' scraping options instead."
        )
    return result


class WebSitemapDataSource(BaseDataSource):
    def validate_config(self):
        WebSitemapConfig.model_validate(self.config)

    def load_documents(self) -> Generator[Document, None, None]:
        sitemap_url = self.config.url
        urls = extract_urls_from_sitemap(sitemap_url)

        with sync_playwright() as p:
            browser = p.chromium.launch(headless=True)
            for url in urls:
                page = browser.new_page()
                response = page.goto(url)
                if response.status() >= 400:
                    logger.error(
                        f"Failed to load page: {url}, response status: {response.status()}, skipping"
                    )
                    continue
                soup = BeautifulSoup(page.content(), "html.parser")
                for t in IGNORE_TAGS:
                    for tag in soup.find_all(t):
                        tag.extract()
                for c in IGNORE_CLASSES:
                    for tag in soup.find_all(class_=c):
                        tag.extract()
                content = MarkdownConverter().convert_soup(soup)
                title = page.title()
                document = Document(
                    name=title,
                    hash=hash(content),
                    content=content,
                    mime_type="text/plain",
                    data_source_id=self.data_source_id,
                    user_id=self.user_id,
                    source_uri=page.url,
                    last_modified_at=datetime.now(UTC),
                )
                yield document
            browser.close()

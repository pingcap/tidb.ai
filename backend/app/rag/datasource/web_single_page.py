import logging
from pydantic import BaseModel
from typing import Generator
from playwright.sync_api import sync_playwright
from bs4 import BeautifulSoup
from markdownify import MarkdownConverter
from datetime import datetime, UTC

from app.models import Document
from .base import BaseDataSource
from .consts import IGNORE_TAGS, IGNORE_CLASSES

logger = logging.getLogger(__name__)


class WebSinglePageConfig(BaseModel):
    url: str


class WebSinglePageDataSource(BaseDataSource):
    def validate_config(self):
        WebSinglePageConfig.model_validate(self.config)

    def load_documents(self) -> Generator[Document, None, None]:
        url = self.config.url
        with sync_playwright() as p:
            browser = p.chromium.launch(headless=True)
            page = browser.new_page()
            response = page.goto(url)
            if response.status() >= 400:
                logger.error(f"Failed to load page: {url}")
                return
            soup = BeautifulSoup(page.content(), "html.parser")
            for t in IGNORE_TAGS:
                for tag in soup.find_all(t):
                    tag.extract()
            for c in IGNORE_CLASSES:
                for tag in soup.find_all(class_=c):
                    tag.extract()
            content = MarkdownConverter().convert_soup(soup)
            title = page.title()
            browser.close()
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

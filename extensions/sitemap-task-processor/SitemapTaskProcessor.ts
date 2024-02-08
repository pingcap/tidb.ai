import { rag } from '@/core/interface';
import { handleErrors } from '@/lib/fetch';
import { XMLParser } from 'fast-xml-parser';
import sitemapTaskProcessorMeta from './meta';

interface Entry {
  loc: string;
}

interface UrlEntry extends Entry {
}

interface SitemapIndex {
  sitemapindex: { sitemap: Entry[] };
}

interface UrlSet {
  urlset: {
    url: UrlEntry[]
  };
}

type Sitemap = SitemapIndex | UrlSet

export default class SitemapTaskProcessor extends rag.ImportSourceTaskProcessor<{}> {

  private readonly parser = new XMLParser({
    isArray: tagName => ['sitemap', 'url'].includes(tagName),
  });

  support (taskType: string): boolean {
    return taskType === 'sitemap';
  }

  async process (task: { url: string }): Promise<rag.ImportSourceTaskResult> {
    const urls = await this.fetchSitemap(task.url);

    return {
      enqueue: urls.map(url => ({
        type: 'html',
        url,
      })),
    };
  }

  private async fetchSitemap (url: string): Promise<string[]> {
    const response = await fetch(url).then(handleErrors);

    const sitemap: Sitemap = this.parser.parse(Buffer.from(await response.arrayBuffer()));

    if ('sitemapindex' in sitemap) {
      return Promise.all(sitemap.sitemapindex.sitemap.map(sitemap => this.fetchSitemap(sitemap.loc))).then(urls => urls.flatMap(url => url));
    } else {
      return sitemap.urlset.url?.map(url => url.loc) ?? [];
    }
  }
}

Object.assign(SitemapTaskProcessor, sitemapTaskProcessorMeta);

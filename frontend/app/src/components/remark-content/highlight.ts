import go from 'highlight.js/lib/languages/go';
import java from 'highlight.js/lib/languages/java';
import javascript from 'highlight.js/lib/languages/javascript';
import markdown from 'highlight.js/lib/languages/markdown';
import python from 'highlight.js/lib/languages/python';
import ruby from 'highlight.js/lib/languages/ruby';
import sql from 'highlight.js/lib/languages/sql';
import typescript from 'highlight.js/lib/languages/typescript';
import php from 'highlight.js/lib/languages/php';

import { type Options } from 'rehype-highlight';

export const rehypeHighlightOptions: Options = {
  languages: { sql, python, javascript, typescript, markdown, go, java, ruby, php },
  aliases: {
    sql: ['mysql', 'tidb'],
    python: ['py'],
    javascript: ['js'],
    typescript: ['ts'],
    markdown: ['md'],
    go: ['golang'],
    ruby: ['rb'],
  },
};

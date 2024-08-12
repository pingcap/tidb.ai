import * as URL from 'node:url'
import * as path from "node:path";
import * as fs from 'node:fs';

const dir = path.dirname(URL.fileURLToPath(import.meta.url));
const apiDir = path.resolve(dir, '../../../app/src/api');

const sourceFiles = fs.readdirSync(apiDir).filter(name => name.endsWith('.ts'));

const exports = sourceFiles.map(file => `export * from "@/api/${file.replace(/(\.d)?\.ts$/, '')}";`).join('\n');

fs.writeFileSync(path.join(dir, '../src/api.ts'), `/*
 * This file is generated.
 */
${exports}
`);

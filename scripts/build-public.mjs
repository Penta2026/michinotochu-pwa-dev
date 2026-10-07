import { cp, mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import { join, relative } from 'node:path';
import { minify } from 'terser';

const ROOT = process.cwd();
const DIST = join(ROOT, 'dist');

const EXCLUDES = new Set([
  '.git',
  '.github',
  'docs',
  'scripts',
  'node_modules',
  'dist',
  'package.json',
  'package-lock.json',
  'DEVELOPMENT_HANDOFF.md'
]);

async function filter(src) {
  const rel = relative(ROOT, src).replaceAll('\\', '/');
  if (!rel) return true;
  const top = rel.split('/')[0];
  return !EXCLUDES.has(top) && !EXCLUDES.has(rel);
}

await rm(DIST, { recursive: true, force: true });
await mkdir(DIST, { recursive: true });

const { readdir } = await import('node:fs/promises');
for (const name of await readdir(ROOT)) {
  if (EXCLUDES.has(name)) continue;
  await cp(join(ROOT, name), join(DIST, name), {
    recursive: true,
    filter
  });
}

// Public delivery should contain executable output, not readable development source.
// This is deterrence/size reduction only; browser-delivered JS can never be made secret.
for (const rel of ['app.js', 'pwa.js', 'service-worker.js']) {
  const file = join(DIST, rel);
  const source = await readFile(file, 'utf8');
  const out = await minify(source, {
    compress: {
      passes: 2,
      drop_console: true
    },
    mangle: true,
    format: {
      comments: false
    }
  });
  if (!out.code) throw new Error(`Failed to minify ${rel}`);
  await writeFile(file, out.code, 'utf8');
}

// Marker useful for checking that production came from the build pipeline.
await writeFile(
  join(DIST, 'BUILD_INFO.txt'),
  [
    '道の途中。 public build',
    `Built: ${new Date().toISOString()}`,
    'Source repository: private (target architecture)',
    'Important private DBs must be served through API, not bundled here.',
    ''
  ].join('\n'),
  'utf8'
);

console.log('Public build created in dist/');

const esbuild = require('esbuild');
const get = require('lodash/get');
const pkg = require('./package.json');

(async function build() {
  const ctx = await esbuild.context({
    loader: {
      '.js': 'jsx'
    },
    entryPoints: [{ in: 'src/index.js', out: 'index.browser' }],
    bundle: true,
    minify: true,
    sourcemap: true,
    treeShaking: true,
    packages: 'external',
    format: 'esm',
    platform: 'browser',
    target: ['esnext'],
    outdir: './dist',
  });

  await ctx.watch();
}());

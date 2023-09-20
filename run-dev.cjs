const esbuild = require('esbuild');
const get = require('lodash/get');
const pkg = require('./package.json');

(async function build() {
  const ctx = await esbuild.context({
    loader: {
      '.js': 'jsx'
    },
    format: 'esm',
    entryPoints: ['src/index.js'],
    bundle: true,
    sourcemap: true,
    treeShaking: true,
    outfile: './dist/bundle.esm.js',
    external: [
      ...Object.keys(get(pkg, 'dependencies', {})),
      ...Object.keys(get(pkg, 'peerDependencies', {})),
      ...Object.keys(get(pkg, 'devDependencies', {})),
    ],
  });

  await ctx.watch();
}());

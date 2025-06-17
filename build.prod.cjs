const esbuild = require('esbuild');

const config = {
  loader: {
    '.js': 'jsx'
  },
  entryPoints: ['src/index.js'],
  bundle: true,
  minify: true,
  sourcemap: true,
  treeShaking: true,
  packages: 'external'
};

// Build browser module
esbuild.build({
  ...config,
  format: 'esm',
  platform: 'browser',
  outfile: './dist/bundle.esm.js',
  target: ['esnext']
});

// Build common js
esbuild.build({
  ...config,
  format: 'cjs',
  platform: 'node',
  outfile: './dist/bundle.cjs.js',
  target: ['node12'],
});

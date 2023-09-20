const esbuild = require('esbuild');
const get = require('lodash/get');

const pkg = require('./package.json');

const config = {
  loader: {
    '.js': 'jsx'
  },
  entryPoints: ['src/index.js'],
  bundle: true,
  minify: true,
  sourcemap: true,
  treeShaking: true,
  // We do not want to bundle any dependency into the build. They get installed via yarn and the main project must decide what to include...
  external: [
    ...Object.keys(get(pkg, 'dependencies', {})),
    ...Object.keys(get(pkg, 'peerDependencies', {})),
    ...Object.keys(get(pkg, 'devDependencies', {})),
  ],
  target: ['esnext', 'node12.22.0']
};

// Build browser module
esbuild.build({
  ...config,
  format: 'esm',
  outfile: './dist/bundle.esm.js'
});

// Build common js
esbuild.build({
  ...config,
  format: 'cjs',
  outfile: './dist/bundle.cjs.js'
});


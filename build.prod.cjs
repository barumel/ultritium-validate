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

(async function build() {
  // Build browser esm
  try {
    await esbuild.build({
      ...config,
      format: 'esm',
      outExtension: { '.js': '.mjs' },
      entryPoints: [{ in: 'src/index.js', out: 'index.browser' }],
      platform: 'browser',
      target: ['esnext'],
      outdir: './dist',
    });
  } catch (error) {
    console.error('Unable to build browser esm!');

    throw error;
  }

  // Build node esm
  try {
    await esbuild.build({
      ...config,
      format: 'esm',
      outExtension: { '.js': '.mjs' },
      entryPoints: [{ in: 'src/index.js', out: 'index.node' }],
      platform: 'node',
      target: ['node12'],
      outdir: './dist',
    });
  } catch (error) {
    console.error('Unable to build node esm!');

    throw error;
  }

  // Build node cjs
  try {
    await esbuild.build({
      ...config,
      format: 'cjs',
      outExtension: { '.js': '.cjs' },
      entryPoints: [{ in: 'src/index.js', out: 'index.node' }],
      platform: 'node',
      target: ['node12'],
      outdir: './dist',
    });
  } catch (error) {
    console.error('Unable to build node cjs');

    throw error;
  }
}());

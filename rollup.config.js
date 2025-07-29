import resolve from '@rollup/plugin-node-resolve';
import babel from '@rollup/plugin-babel';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import { terser } from '@rollup/plugin-terser';

// Main config for JS/JSX
const commonConfig = {
  input: 'src/components/PeoplePicker.jsx', // Your component's entry point
  output: [
    {
      file: 'dist/index.js',
      format: 'cjs', // CommonJS for Node.js environments
      sourcemap: true,
      plugins: [terser()], // Minify CJS output
    },
    {
      file: 'dist/index.esm.js',
      format: 'esm', // ES Modules for modern bundlers (webpack, rollup)
      sourcemap: true,
      plugins: [terser()], // Minify ESM output
    },
  ],
  plugins: [
    peerDepsExternal(), // Automatically externalize peer dependencies
    resolve(), // Resolve Node.js modules
    babel({
      babelHelpers: 'bundled', // Or 'runtime' if you configure @babel/plugin-transform-runtime
      exclude: 'node_modules/**',
      presets: ['@babel/preset-env', '@babel/preset-react'],
    }),
  ],
  external: ['react', 'react-dom', /^@mui\/.*/], // Explicitly externalize MUI if not handled by peerDepsExternal
};


export default commonConfig;
import { babel } from '@rollup/plugin-babel'
import commonjs from '@rollup/plugin-commonjs'
import { nodeResolve } from '@rollup/plugin-node-resolve'

const input = 'src/fipe.js'
const defaultPlugins = [
  babel({
    babelrc: false,
    babelHelpers: 'bundled',
    presets: [['@babel/env', { modules: false }]]
  })
]

export default [
  {
    input,
    plugins: [].concat(defaultPlugins, [
      commonjs()
    ]),
    output: {
      file: 'dist/fipe-promise.js',
      format: 'umd',
      name: 'fipe'
    }
  },
  {
    input,
    plugins: [].concat(defaultPlugins, [
      nodeResolve({
        browser: true
      }),
      commonjs()
    ]),
    context: 'window',
    output: {
      file: 'dist/fipe-promise-browser.js',
      format: 'umd',
      name: 'fipe'
    }
  }
]

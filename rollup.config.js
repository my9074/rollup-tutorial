import resolve from 'rollup-plugin-node-resolve'
import babel from 'rollup-plugin-babel'
import commonjs from 'rollup-plugin-commonjs'
import replace from 'rollup-plugin-replace'
import { uglify } from 'rollup-plugin-uglify'
import { eslint } from 'rollup-plugin-eslint'

export default {
  input: 'src/main.js',
  output: {
    file: 'dist/monitor-action.js',
    name: 'monitorAc',
    format: 'iife'
  },
  plugins: [
    eslint({
      include: ['src/**']
    }),
    replace({
      'process.env.NODE_ENV': '"production"'
    }),
    resolve({
      jsnext: true,
      main: true,
      browser: true
    }),
    commonjs(),
    babel({
      exclude: 'node_modules/**',
      runtimeHelpers: true
    }),
    uglify()
  ]
}

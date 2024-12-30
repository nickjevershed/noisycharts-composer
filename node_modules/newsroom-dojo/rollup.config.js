import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import { babel } from '@rollup/plugin-babel';
import { terser } from 'rollup-plugin-terser';
import json from '@rollup/plugin-json';

export default [
    {
    input: 'src/index.js',
    output: [
      {
        file: 'dist/index.js',
        format: 'es',
        name: 'dojo'
      }
    ],
    plugins: [
      resolve(),
      commonjs(),
      babel({ babelHelpers: 'bundled' }),
      terser(),
      json()
    ]
  },
  {
    input: 'src/arrays/index.js',
    output: [
      {
        file: 'dist/arrays/index.js',
        format: 'es',
        name: 'arrays'
      }
    ],
    plugins: [
      resolve(),
      commonjs(),
      babel({ babelHelpers: 'bundled' }),
      terser(),
      json()
    ]
  },
  {
    input: 'src/schema/index.js',
    output: [
      {
        file: 'dist/schema/index.js',
        format: 'es',
        name: 'schema'
      }
    ],
    plugins: [
      resolve(),
      commonjs(),
      babel({ babelHelpers: 'bundled' }),
      terser(),
      json()
    ]
  },  
  {
    input: 'src/maths/index.js',
    output: [
      {
        file: 'dist/maths/index.js',
        format: 'es',
        name: 'maths'
      }
    ],
    plugins: [
      resolve(),
      commonjs(),
      babel({ babelHelpers: 'bundled' }),
      terser(),
      json()
    ]
  },
  {
    input: 'src/toolbelt/index.js',
    output: [
      {
        file: 'dist/toolbelt/index.js',
        format: 'es',
        name: 'toolbelt'
      }
    ],
    plugins: [
      resolve(),
      commonjs(),
      babel({ babelHelpers: 'bundled' }),
      terser(),
      json()
    ]
  },
  {
    input: 'src/objects/index.js',
    output: [
      {
        file: 'dist/objects/index.js',
        format: 'es',
        name: 'objects'
      }
    ],
    plugins: [
      resolve(),
      commonjs(),
      babel({ babelHelpers: 'bundled' }),
      terser(),
      json()
    ]
  },
  {
    input: 'src/gis/index.js',
    output: [
      {
        file: 'dist/gis/index.js',
        format: 'es',
        name: 'gis'
      }
    ],
    plugins: [
      resolve(),
      commonjs(),
      babel({ babelHelpers: 'bundled' }),
      terser(),
      json()
    ]
  },
  {
    input: 'src/guardian/index.js',
    output: [
      {
        file: 'dist/guardian/index.js',
        format: 'es',
        name: 'guardian'
      }
    ],
    plugins: [
      resolve(),
      commonjs(),
      babel({ babelHelpers: 'bundled' }),
      terser(),
      json()
    ]
  }
];

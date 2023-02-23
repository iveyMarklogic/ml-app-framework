import babel from '@rollup/plugin-babel';
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import dts from "rollup-plugin-dts";
import postcss from "rollup-plugin-postcss";
import terser from "@rollup/plugin-terser";
import peerDepsExternal from 'rollup-plugin-peer-deps-external';

import packageJson from "./package.json" assert { type: "json" };

export default [
    {
        input: "src/index.ts",
        output: [
            {
                file: packageJson.main,
                format: "cjs",
                sourcemap: true,
            },
            {
                file: packageJson.module,
                format: "esm",
                sourcemap: true,
            },
        ],
        plugins: [
            babel({
                exclude: 'node_modules/**',
                babelHelpers: 'bundled',
            }),
            peerDepsExternal(),
            resolve(),
            commonjs(),
            typescript({
                tsconfig: './tsconfig.json',
                sourceMap: true,
                declaration: true,
            }),
            postcss(),
            terser(),
        ],
        external: ['react', 'react-dom'], // add react-bootstrap to external
    },
    {
        input: "dist/esm/types/index.d.ts",
        output: [{ file: "dist/index.d.ts", format: "esm" }],
        plugins: [dts()],
    },
];
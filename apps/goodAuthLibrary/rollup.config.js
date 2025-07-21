import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import commonjs from '@rollup/plugin-commonjs';
import babel from '@rollup/plugin-babel';
import json from '@rollup/plugin-json';

const extensions = ['.js', '.jsx', '.ts', '.tsx'];

const createConfig = (input, file, format) => ({
    input,
    output: {
        file,
        format,
        sourcemap: true,
    },
    plugins: [
        peerDepsExternal(), json(),
        resolve({ extensions }),
        commonjs({
            include: /node_modules/,
            requireReturnsDefault: 'auto',
        }),
        typescript({
            tsconfig: './tsconfig.json',
            declaration: true,
            declarationDir: './dist',
        }),
        babel({
            extensions,
            babelHelpers: 'bundled',
            exclude: 'node_modules/**',
            presets: ['@babel/preset-react'],
        }),
    ],
    external: ['react', 'react-dom', 'next'],
});

export default [
    createConfig('src/client.ts', 'dist/client.js', 'cjs'),
    createConfig('src/client.ts', 'dist/client.esm.js', 'esm'),
];



import css from 'rollup-plugin-import-css';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import watch from "rollup-plugin-watch";

export default {
    input: "src/app.js",
    output: {
        dir: "dist",
        format: "iife",
        assetFileNames: '[name][extname]'
    },
    plugins: [
        css(),
        nodeResolve(),
    ],
    watch: {
        include: 'src/**',  // Watch files in the 'src' directory
        clearScreen: false   // Keep the terminal output clean
    }
};


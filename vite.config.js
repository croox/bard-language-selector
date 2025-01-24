import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
    build: {
        manifest: true,
        outDir: path.resolve(__dirname, '../../public/vendor/language-selector'),
        rollupOptions: {
            input: 'resources/js/language-selector.js',
            output: {
                entryFileNames: `js/[name].js`,
                chunkFileNames: `js/[name].js`,
                assetFileNames: `[ext]/[name].[ext]`
            }
        }
    }
});

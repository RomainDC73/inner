import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';
import fs from 'fs';

export default defineConfig({
    plugins: [
        laravel({
            input: 'resources/js/app.jsx',
            refresh: true,
        }),
        react(),
    ],
    server: {
        https: {
            key: fs.readFileSync('/Users/fantaz/.config/valet/Certificates/inner.test.key'),
            cert: fs.readFileSync('/Users/fantaz/.config/valet/Certificates/inner.test.crt'),
        },
        host: 'localhost',
        port: 5173,
        cors: true,
        watch: {
            usePolling: true,
            interval: 100,
        },
    },
});

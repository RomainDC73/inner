import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';
import fs from 'fs';

export default defineConfig(({ mode }) => {
    const isLocal = mode === 'development';

    return {
        plugins: [
            laravel({
                input: 'resources/js/app.jsx',
                refresh: true,
            }),
            react(),
        ],
        server: {
            https: isLocal
                ? {
                      key: fs.readFileSync('/Users/fantaz/.config/valet/Certificates/inner.test.key'),
                      cert: fs.readFileSync('/Users/fantaz/.config/valet/Certificates/inner.test.crt'),
                  }
                : undefined,

            host: 'localhost',
            port: 5173,
            cors: true,
            watch: {
                usePolling: true,
                interval: 100,
            },
        },
    };
});

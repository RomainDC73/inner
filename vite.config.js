import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [
        laravel({
            input: 'resources/js/app.jsx',
            refresh: true,
        }),
        react(),
    ],
    server: {
        host: 'O.O.O.O',
        port: 5173,
        cors: true,
        watch: {
            usePolling: true,
            interval: 100,
        },
    },
});

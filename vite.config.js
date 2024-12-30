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
            key: fs.readFileSync('./localhost-key.pem'),
            cert: fs.readFileSync('./localhost.pem'),
        },
        host: 'localhost',
        cors: {
            origin: 'https://inner.test', // Remplacez par votre domaine si nécessaire
            methods: ['GET', 'POST', 'PUT', 'DELETE'],
            allowedHeaders: ['Content-Type', 'Authorization'],
    },
        watch: {
            usePolling: true,
            interval: 100,
        },
    },
    build: {
        outDir: 'public/build',
        manifest: true,
    },
});

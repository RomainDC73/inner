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
        host: '0.0.0.0',
        cors: {
            origin: 'https://inner-app.eu',
            methods: ['GET', 'POST', 'PUT', 'DELETE'],
            allowedHeaders: ['Content-Type', 'Authorization'],
        },
    },
    build: {
        outDir: 'public/build',
        manifest: true,
        chunkSizeWarningLimit: 1600,
    },
    esbuild: {
    logOverride: { 'this-is-undefined-in-esm': 'silent' }
  },
});

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
            // Si en développement, utilise les certificats locaux
            https: isLocal
                ? {
                      key: fs.readFileSync('/Users/fantaz/.config/valet/Certificates/inner.test.key'),
                      cert: fs.readFileSync('/Users/fantaz/.config/valet/Certificates/inner.test.crt'),
                  }
                : undefined, // En production, ignore les certificats locaux

            host: 'localhost', // L'adresse d'écoute en local (localhost)
            port: 5173, // Le port d'écoute
            cors: true, // Active CORS si nécessaire
            watch: {
                usePolling: true,
                interval: 100,
            },
        },
    };
});

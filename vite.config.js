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
        cors: true,
        watch: {
            usePolling: true,
            interval: 100,
        },
    },
    build: {
        // Assurez-vous que Vite compile les fichiers statiques pour la production
        outDir: 'public/build', // Dossier de sortie pour les fichiers compilés
        manifest: true, // Génère le fichier manifest.json
    },
});

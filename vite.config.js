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
        // Ne pas démarrer le serveur en mode production
        hmr: false, // Désactive le hot module replacement (HMR) en production
    },
    build: {
        // Assurez-vous que Vite compile les fichiers statiques pour la production
        outDir: 'public/build', // Dossier de sortie pour les fichiers compilés
        manifest: true, // Génère le fichier manifest.json
    },
});

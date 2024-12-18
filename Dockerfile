# Étape 1 : Construire les assets avec Node.js et Vite
FROM node:18 as node_build
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install
COPY . .
RUN yarn build

# Étape 2 : Serveur PHP/Laravel
FROM php:8.2-fpm
WORKDIR /var/www/html

# Installez les dépendances système
RUN apt-get update && apt-get install -y \
    libzip-dev zip unzip git curl \
    && docker-php-ext-install pdo_mysql zip

# Installe Composer
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

# Copiez les fichiers de Laravel
COPY . .
RUN composer install --optimize-autoloader --no-dev

# Copiez le fichier corrigé ServeCommand.php
COPY /docker/ServeCommand.php /var/www/html/vendor/laravel/framework/src/Illuminate/Foundation/Console/ServeCommand.php

# Copiez les assets front-end générés par Vite
COPY --from=node_build /app/public ./public

# Définissez les permissions
RUN chown -R www-data:www-data /var/www/html \
    && chmod -R 755 /var/www/html/storage

# Exposez le port 8000 pour PHP-FPM
EXPOSE 8000

# Démarrage du serveur Laravel
CMD ["php", "artisan", "serve", "--host=0.0.0.0", "--port=${PORT}"]

# Inner

Inner est une application web conçue pour permettre aux utilisateurs de capturer leurs humeurs et leurs sentiments tout au long de la journée. Avec une interface simple et intuitive, Inner vous aide à suivre vos émotions en rendant ce processus facile et engageant.

## Lien vers le site

Accédez à l'application en ligne : [https://inner-app.eu](https://inner-app.eu)

## Fonctionnalités principales

### Gestion des comptes utilisateurs
- **Inscription et connexion** : Créez un compte ou connectez-vous pour accéder à vos données personnelles.
- **Sécurité** : Inner utilise des méthodes modernes pour garantir la protection des informations utilisateur.

### Enregistrement des humeurs
- **Sélection du mood** : Choisissez parmi trois options : Bon, Bof, ou Mauvais.
- **Ajout de détails** :
  - Écrivez une description pour donner plus de contexte à votre humeur.
  - Enregistrez un message vocal.
  - Importez ou prenez une photo.
- **Historique filtrable** : Retrouver facilement vos humeurs enregistrées en appliquant des filtres par mood.

## Technologies utilisées

### Back-end
- **[Laravel](https://laravel.com/)** :
  - Framework PHP pour le développement web.
  - Gestion des routes, des modèles de données, et de l'authentification.
  - Stockage des fichiers multimédias via le système de fichiers (local).

### Front-end
- **[React](https://reactjs.org/)** :
  - Composants dynamiques pour une interface utilisateur réactive.
  - Intégration avec [Inertia.js](https://inertiajs.com/) pour relier les pages Laravel aux composants React.
  - Gestion des états avec des hooks comme `useState` et `useForm`.

### Base de données
- **MySQL** : Utilisé pour stocker les utilisateurs, les humeurs, et leurs fichiers associés.

### Hébergement
- L'application est déployée sur [Hostinger](https://www.hostinger.fr/) avec une configuration personnalisée pour le support de Laravel.

## Prérequis pour le développement local

1. **Environnement requis** :
   - PHP 8.1 ou supérieur
   - Composer
   - Node.js 16+ avec npm
   - MySQL

2. **Installation des dépendances** :
   - Installer les dépendances Laravel :
     ```bash
     composer install
     ```
   - Installer les dépendances front-end :
     ```bash
     npm install
     ```

3. **Configuration de l'environnement** :
   - Copier le fichier `.env.example` en `.env` :
     ```bash
     cp .env.example .env
     ```
   - Modifier les paramètres de connexion à la base de données dans le fichier `.env`.
   - Générer une clé d'application Laravel :
     ```bash
     php artisan key:generate
     ```

4. **Migrations et stockage** :
   - Exécuter les migrations pour créer les tables :
     ```bash
     php artisan migrate
     ```
   - Lier le répertoire de stockage :
     ```bash
     php artisan storage:link
     ```

5. **Démarrage de l'application** :
   - Lancer le serveur Laravel :
     ```bash
     php artisan serve
     ```
   - Compiler les actifs front-end :
     ```bash
     npm run dev
     ```

## Fonctionnement technique

### Gestion des fichiers
- Les images, audios et autres fichiers multimédias sont stockés dans `storage/app/public` et exposés via un lien symbolique dans `public/storage`.

### Authentification
- Implémentée avec le système d'authentification natif de Laravel, comprenant l'inscription, la connexion, et la réinitialisation de mot de passe.

### API interne
- Les interactions entre le front-end et le back-end se font via [Inertia.js](https://inertiajs.com/), qui agit comme une API simplifiée pour transmettre les données de Laravel aux composants React.

### Filtrage des humeurs
- Les humeurs sont filtrées par `mood_id` via des requêtes à la base de données.

## Limitations actuelles
- L'application est actuellement disponible uniquement en français.
- Pas encore optimisée pour un déploiement multi-langues.

## Contribution
Les contributions sont les bienvenues !

1. Forkez le projet.
2. Créez une nouvelle branche pour votre fonctionnalité :
   ```bash
   git checkout -b feature/nom-de-la-fonctionnalite
   ```
3. Faites vos modifications et ajoutez des commits.
4. Poussez vos modifications :
   ```bash
   git push origin feature/nom-de-la-fonctionnalite
   ```
5. Créez une pull request vers la branche principale.

## Auteurs
- **Votre Nom / Équipe** : Créateur et développeur principal de l'application.

## Licence
Ce projet est sous licence [MIT](https://opensource.org/licenses/MIT).


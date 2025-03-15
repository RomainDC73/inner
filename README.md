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

## Auteurs
- **Romain DI CANDIDO** : Créateur et développeur principal de l'application.

## Licence
Ce projet est sous licence [MIT](https://opensource.org/licenses/MIT).

# Awesome OSINT - Site Web

Ce site web est généré avec Jekyll et GitHub Pages pour présenter la liste Awesome OSINT de manière interactive et moderne.

## Structure du Projet

```
awesome-osint/
├── _config.yml          # Configuration Jekyll
├── _layouts/            # Layouts Jekyll
│   └── default.html     # Layout principal
├── _includes/           # Partials réutilisables
│   ├── header.html      # En-tête du site
│   └── footer.html      # Pied de page
├── assets/              # Ressources statiques
│   ├── css/
│   │   └── main.css     # Styles principaux
│   └── js/
│       ├── main.js      # Scripts principaux
│       ├── search.js    # Fonctionnalité de recherche
│       └── readme-loader.js  # Chargement du README
├── index.html           # Page d'accueil
├── CONTRIBUTING.html    # Page de contribution
├── README.md            # Liste principale (source)
└── .gitignore           # Fichiers ignorés par Git
```

## Fonctionnalités

- ✅ Design moderne et responsive
- ✅ Recherche en temps réel dans les outils et ressources
- ✅ Table des matières automatique avec navigation
- ✅ Mise en surbrillance des sections actives
- ✅ Chargement dynamique du contenu README.md
- ✅ Compatible GitHub Pages
- ✅ Accessible et optimisé pour le SEO

## Développement Local

### Prérequis

- Ruby (version 2.7 ou supérieure)
- Bundler

### Installation

```bash
# Installer les dépendances dans vendor/bundle (recommandé)
bundle install --path vendor/bundle

# OU installer globalement (nécessite sudo sur macOS)
bundle install

# Lancer le serveur local
bundle exec jekyll serve

# Le site sera accessible sur http://localhost:4000
```

**Note:** Si vous rencontrez des erreurs avec Jekyll 4.x sur macOS, le Gemfile utilise Jekyll 3.9 qui est plus stable et compatible avec GitHub Pages.

## Déploiement sur GitHub Pages

Le site est automatiquement déployé sur GitHub Pages lorsque vous poussez vers la branche `master` ou `gh-pages`.

### Configuration GitHub Pages

1. Allez dans les paramètres du repository
2. Activez GitHub Pages
3. Sélectionnez la branche source (master ou gh-pages)
4. Le site sera disponible sur `https://jivoi.github.io/awesome-osint`

## Personnalisation

### Modifier les couleurs

Éditez les variables CSS dans `assets/css/main.css` :

```css
:root {
    --primary-color: #2563eb;
    --secondary-color: #10b981;
    /* ... */
}
```

### Modifier la configuration

Éditez `_config.yml` pour changer le titre, la description, etc.

## Contribution

Voir [CONTRIBUTING.md](./CONTRIBUTING.md) pour les guidelines de contribution.

## Licence

Ce projet est sous licence [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/).


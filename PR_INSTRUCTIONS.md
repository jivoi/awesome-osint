# Instructions pour créer la Pull Request

## Résumé des changements

Cette PR ajoute une structure Jekyll complète pour transformer le repository en site web GitHub Pages avec un design moderne et des fonctionnalités interactives.

## Commits organisés (Conventional Commits)

1. `chore: add .gitignore for Jekyll project`
2. `build: add Gemfile with Jekyll 3.10 dependencies`
3. `feat: enhance Jekyll configuration for GitHub Pages`
4. `feat: add Jekyll layouts and includes with modern responsive design`
5. `feat: add responsive CSS with modern design system`
6. `feat: add JavaScript for search, TOC generation, and README loading`
7. `feat: create homepage with dynamic README content loading`
8. `feat: add contributing page and custom 404 error page`
9. `docs: add documentation for Jekyll site setup and deployment`

## Étapes pour créer la PR

### Option 1 : Forker le repository (recommandé)

1. Forker le repository `jivoi/awesome-osint` sur GitHub
2. Ajouter votre fork comme remote :
   ```bash
   git remote add fork https://github.com/VOTRE_USERNAME/awesome-osint.git
   ```
3. Pousser la branche :
   ```bash
   git push -u fork feat/jekyll-github-pages-setup
   ```
4. Créer la PR depuis votre fork vers le repository original

### Option 2 : Créer la PR manuellement

1. Aller sur https://github.com/jivoi/awesome-osint
2. Cliquer sur "Pull requests"
3. Cliquer sur "New pull request"
4. Sélectionner `feat/jekyll-github-pages-setup` comme branche source
5. Remplir le formulaire avec le titre et la description ci-dessous

## Titre de la PR

```
feat: Add Jekyll GitHub Pages setup with modern responsive design
```

## Description de la PR

```markdown
## 🎯 Objectif

Cette PR ajoute une structure Jekyll complète pour transformer le repository en site web GitHub Pages avec un design moderne et des fonctionnalités interactives.

## ✨ Fonctionnalités ajoutées

- ✅ Structure Jekyll complète avec layouts et includes personnalisés
- ✅ Design responsive et moderne avec système de design cohérent
- ✅ Recherche en temps réel dans les outils et ressources OSINT
- ✅ Table des matières automatique avec navigation fluide
- ✅ Chargement dynamique du README.md avec conversion Markdown
- ✅ Page de contribution dédiée
- ✅ Page 404 personnalisée
- ✅ Compatible GitHub Pages (Jekyll 3.10)
- ✅ Documentation complète pour le setup et le déploiement

## 📁 Fichiers ajoutés

- `_config.yml` - Configuration Jekyll améliorée
- `_layouts/default.html` - Layout principal
- `_includes/header.html` - En-tête avec recherche
- `_includes/footer.html` - Pied de page
- `assets/css/main.css` - Styles responsive (710 lignes)
- `assets/js/main.js` - Génération TOC et navigation
- `assets/js/search.js` - Fonctionnalité de recherche
- `assets/js/readme-loader.js` - Chargement du README
- `index.html` - Page d'accueil
- `CONTRIBUTING.html` - Page de contribution
- `404.html` - Page d'erreur personnalisée
- `Gemfile` - Dépendances Jekyll
- `.gitignore` - Fichiers à ignorer
- `README-SITE.md` - Documentation du site

## 🎨 Design

- Design moderne avec variables CSS pour personnalisation facile
- Responsive design (mobile, tablette, desktop)
- Navigation sticky avec table des matières
- Recherche avec mise en surbrillance des résultats
- Animations et transitions fluides

## 🚀 Déploiement

Le site sera automatiquement déployé sur GitHub Pages après merge. Il suffit d'activer GitHub Pages dans les paramètres du repository.

## 🧪 Testé localement

- ✅ Build Jekyll réussi
- ✅ Serveur local fonctionnel
- ✅ Toutes les fonctionnalités testées

## 📝 Notes

- Le `baseurl` est configuré pour être vide en local et `/awesome-osint` pour GitHub Pages
- Le README.md est chargé dynamiquement via JavaScript pour éviter les problèmes de build
- Compatible avec Jekyll 3.10 (version supportée par GitHub Pages)

## 🔗 Preview

Pour tester localement :
```bash
bundle install --path vendor/bundle
bundle exec jekyll serve
```

Le site sera accessible sur `http://localhost:4000/`
```

## Commandes Git utiles

```bash
# Voir les commits
git log --oneline -10

# Voir les différences avec master
git diff master..feat/jekyll-github-pages-setup --stat

# Créer un patch (alternative)
git format-patch master..feat/jekyll-github-pages-setup
```


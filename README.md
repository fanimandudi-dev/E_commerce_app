# Food Campus 🍽️

[![React](https://img.shields.io/badge/React-18.2.0-61DAFB?logo=react)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.2.2-3178C6?logo=typescript)](https://www.typescriptlang.org)
[![Vite](https://img.shields.io/badge/Vite-5.0.0-646CFF?logo=vite)](https://vitejs.dev)
[![Zustand](https://img.shields.io/badge/Zustand-4.4.7-333?logo=zustand)](https://github.com/pmndrs/zustand)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

**Plateforme marketplace pour étudiants - Commandez, payez en espèces, récupérez sur campus**

---

## 📖 **À propos du projet**

Food Campus est une application **mobile-first** et **PWA-ready** qui permet aux étudiants de :

- 🔍 **Découvrir** des boutiques et produits sur le campus
- 🛒 **Commander** auprès de vendeurs locaux
- 💰 **Payer en espèces** à la remise
- 📱 **Suivre** leurs commandes en temps réel
- 🎯 **Utiliser des QR codes** pour la confirmation de réception

---

## 🚀 **Démarrage rapide**

### Prérequis

- Node.js 18+ 
- npm 9+

### Installation

```bash
# Cloner le dépôt
git clone https://github.com/fanimandudi-dev/food-campus.git
cd food-campus

# Installer les dépendances
npm install

# Démarrer le serveur de développement
npm run dev
```

L'application sera disponible sur `http://localhost:5173`

### Identifiants de démonstration

```text
Téléphone : +243 970 000 007
Mot de passe : campus2026
```

---

## 📁 **Structure du projet**

```
food-campus/
├── public/                    # Assets statiques
│   ├── icon.svg              # Icône PWA
│   ├── manifest.webmanifest  # Manifest PWA
│   └── products/             # Images des produits
├── src/
│   ├── app/                  # Configuration principale
│   │   ├── App.tsx           # Composant racine
│   │   └── dependencies.ts   # Injection de dépendances
│   ├── components/           # Composants UI réutilisables
│   │   ├── layout/           # Layouts (AppShell, AuthLayout)
│   │   └── ui/               # Composants UI (Brand, EmptyState, etc.)
│   ├── domain/               # Modèles de domaine
│   │   └── models.ts         # Types TypeScript
│   ├── features/             # Fonctionnalités (par domaine)
│   │   ├── auth/             # Authentification
│   │   ├── cart/             # Panier
│   │   ├── orders/           # Commandes
│   │   ├── products/         # Produits
│   │   ├── settings/         # Paramètres
│   │   ├── splash/           # Écran de splash
│   │   └── vendors/          # Vendeurs/Boutiques
│   ├── mocks/                # Données mock
│   │   └── data.ts           # Données de démonstration
│   ├── pages/                # Pages de l'application
│   ├── services/             # Services et repositories
│   │   ├── repositories/     # Repositories (Mock et API)
│   │   └── *.ts              # Services
│   ├── styles/               # Styles globaux
│   └── utils/                # Utilitaires
├── docs/                    # Documentation
│   ├── ARCHITECTURE.md       # Architecture technique
│   ├── BACKEND_PLAN.md       # Plan du backend FastAPI
│   ├── CAHIER_CHARGE_FONCTIONNELLE.md  # Spécifications fonctionnelles
│   ├── CAHIER_CHARGE_FONCTIONNELLE.svg  # Diagrammes
│   ├── CAHIER_TECHNIQUE.md   # Spécifications techniques
│   ├── IMPLEMENTATION_NOTES.md  # Notes d'implémentation
│   ├── PROJECT_SUMMARY.md    # Résumé du projet
│   └── ui-assets.md          # Assets UI
└── vercel.json              # Configuration Vercel
```

---

## 🛠️ **Scripts disponibles**

| Script | Description |
|--------|-------------|
| `npm run dev` | Démarre le serveur Vite en mode développement |
| `npm run typecheck` | Vérifie les types TypeScript |
| `npm run build` | Crée un build de production |
| `npm run preview` | Prévisionne le build de production |
| `npm run lint` | Exécute ESLint |

---

## ✨ **Fonctionnalités implémentées**

### 📱 **Frontend (React + TypeScript)**

- ✅ **Splash Screen** responsive avec redirection automatique (15s) ou manuelle
- ✅ **Authentification** simulée avec session persistante
- ✅ **Accueil** orienté marketplace avec recommandations
- ✅ **Explorer** : découverte par boutiques ou produits
- ✅ **Pages boutiques** avec catalogues de produits
- ✅ **Recherche et filtres** par catégorie
- ✅ **Panier** persistant limité à une seule boutique
- ✅ **Gestion des conflits** de boutique avec dialogue de confirmation
- ✅ **Checkout** avec sélection de point de remise officiel
- ✅ **Paiement en espèces** uniquement (pas de wallet/mobile money)
- ✅ **QR codes** pour confirmation de réception
- ✅ **Statuts séparés** : commande vs paiement
- ✅ **Historique et suivi** des commandes
- ✅ **Notifications** en temps réel
- ✅ **Profil utilisateur** avec préférences
- ✅ **Mode sombre** et accessibilité
- ✅ **PWA** avec manifeste et service worker

### 🗄️ **Architecture**

- ✅ **Feature-based structure** (par domaine métier)
- ✅ **TypeScript** avec types stricts
- ✅ **Zustand** pour la gestion d'état
- ✅ **Injection de dépendances** pour swap mock/API
- ✅ **Repositories pattern** (Mock et API)
- ✅ **Services layer** pour la logique métier
- ✅ **Hooks personnalisés** pour l'accès aux données

---

## 📊 **Backend (Planifié)**

Un backend **FastAPI + PostgreSQL** est planifié avec les fonctionnalités suivantes :

### 🗺️ **Cartographie et Livraison**
- Suivi GPS des livreurs en temps réel
- Calcul des distances et ETA
- Historique des positions
- Recherche des livraisons à proximité

### 🤖 **Recommandation IA**
- Filtrage basé sur le contenu (Content-Based)
- Filtrage collaboratif (Collaborative Filtering)
- Approche hybride
- Recommandations personnalisées

### 🏗️ **Architecture Backend**
- **Framework** : FastAPI (ASGI)
- **Base de données** : PostgreSQL avec asyncpg (pas d'ORM)
- **Authentification** : JWT
- **Structure** : Clean Architecture (Routes → Services → Repositories)

**Voir [BACKEND_PLAN.md](docs/BACKEND_PLAN.md) pour le plan détaillé**

---

## 🎯 **Parcours utilisateur**

```
Étudiant s'authentifie
    ↓
Découvre boutiques/produits (Explorer)
    ↓
Consulte une boutique
    ↓
Ajoute un produit → panier lié à cette boutique
    ↓
Confirme commande avec point de remise
    ↓
Reçoit un QR code unique
    ↓
Suivi de préparation/livraison
    ↓
Paie en espèces à la remise
    ↓
Vendeur scanne QR et confirme réception
    ↓
Statut : PAIEMENT REÇU + COMMANDE TERMINÉE
```

---

## 📱 **Navigation principale**

| Route | Page | Description |
|-------|------|-------------|
| `/` | Splash | Écran de bienvenue |
| `/login` | Connexion | Authentification |
| `/home` | Accueil | Tableau de bord |
| `/explore` | Explorer | Découverte |
| `/vendors/:id` | Boutique | Catalogue d'une boutique |
| `/products` | Produits | Liste de tous les produits |
| `/products/:id` | Détail produit | Informations produit |
| `/cart` | Panier | Articles sélectionnés |
| `/checkout` | Paiement | Confirmation commande |
| `/orders` | Commandes | Historique |
| `/orders/:id` | Détail commande | Suivi |
| `/profile` | Profil | Paramètres utilisateur |
| `/settings` | Paramètres | Préférences |

---

## 🎨 **Design System**

### Couleurs principales
- **Vert Food Campus** : `#4CAF50`
- **Blanc** : `#FFFFFF`
- **Gris clair** : `#F5F5F5`
- **Gris foncé** : `#333333`

### Typographie
- **Police principale** : Inter, sans-serif
- **Taille base** : 16px

### Composants clés
- Cartes de produits/boutiques
- Boutons avec icônes
- Badges de statut
- Dialogues de confirmation
- Barre de navigation

---

## 🔒 **Hors périmètre (MVP)**

Les fonctionnalités suivantes ne sont **pas** incluses dans le MVP :

- ❌ Commission sur les ventes
- ❌ Paiements électroniques (M-Pesa, Airtel Money, Orange Money, Afrimoney)
- ❌ Wallet virtuel
- ❌ Panier multi-boutiques
- ❌ Rôle de livreur séparé (vendeur = livreur)
- ❌ Messagerie entre utilisateurs
- ❌ Système de commission
- ❌ Gestion des stocks avancée

---

## 📦 **Technologies utilisées**

| Catégorie | Technologie | Version |
|-----------|-------------|---------|
| **Frontend** | React | 18.2.0 |
| **Langage** | TypeScript | 5.2.2 |
| **Bundler** | Vite | 5.0.0 |
| **State Management** | Zustand | 4.4.7 |
| **Routing** | React Router | 6.21.0 |
| **UI** | Custom Components | - |
| **Icons** | SVG Custom | - |
| **PWA** | Vite PWA Plugin | - |

---

## 🤝 **Contribution**

Les contributions sont les bienvenues ! 

1. **Fork** le projet
2. Crée une **branche** pour votre fonctionnalité (`git checkout -b feature/nouvelle-fonctionnalite`)
3. **Commit** vos changements (`git commit -m 'feat: ajoute nouvelle fonctionnalite'`)
4. **Push** vers la branche (`git push origin feature/nouvelle-fonctionnalite`)
5. Ouvrez une **Pull Request**

---

## 📄 **Licence**

Ce projet est sous licence **MIT** - voir le fichier [LICENSE](LICENSE) pour plus de détails.

---

## 📞 **Contact**

Pour toute question ou suggestion, n'hésitez pas à ouvrir une **Issue** ou à me contacter.

---

**Made with ❤️ for students by Food Campus Team**

*Last updated: 2026-10-20*

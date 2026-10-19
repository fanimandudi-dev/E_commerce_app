# Food Campus

MVP React mobile-first et responsive d’une marketplace de commande sur campus.

## Démarrer

```bash
npm install
npm run dev
```

Le serveur Vite écoute sur `0.0.0.0`. La route `/` affiche le Splash Screen puis conduit à `/login`. Les écrans applicatifs sont protégés par une session authentifiée simulée.

Identifiants de démonstration préremplis :

```text
Téléphone : +243 970 000 007
Mot de passe : campus2026
```

## Scripts

```bash
npm run dev        # développement
npm run typecheck  # vérification TypeScript
npm run build      # build de production
npm run preview    # prévisualisation du build
```

## Parcours client disponible

- Splash Screen responsive avec passage manuel ou automatique après 15 secondes ;
- connexion obligatoire simulée ;
- accueil orienté marketplace ;
- exploration par boutiques ou produits ;
- page dédiée à chaque boutique ;
- recherche et filtres par catégorie ;
- produits affichant toujours leur boutique ;
- panier persistant limité à une seule boutique ;
- confirmation explicite avant de vider un panier pour changer de boutique ;
- sélection d’un point officiel de remise sur le campus ;
- paiement en espèces à la remise, sans portefeuille mobile ;
- création de commande simulée et QR personnel ;
- statuts de commande et de paiement séparés ;
- historique, détail et suivi de commande ;
- notifications, profil, préférences et mode sombre ;
- manifeste PWA et service worker de base.

La messagerie, les commissions, le wallet, les paiements électroniques, les paniers multi-boutiques et le rôle de livreur séparé sont hors MVP.

## Règle du panier

```text
Panier vide
→ le premier produit fixe la boutique
→ seuls les produits de cette boutique peuvent être ajoutés
→ changer de boutique exige de vider explicitement le panier
→ retirer le dernier produit libère la boutique du panier
```

## Mode données

Par défaut, l’application utilise les repositories mock. Les produits et boutiques possèdent chacun un contrat mock/API :

```text
UI → hooks → services → repositories → mock ou API
```

Pour activer la source HTTP :

```bash
cp .env.example .env
# VITE_DATA_SOURCE=api
# VITE_API_URL=/api
```

## Persistance locale

Les clés suivantes sont enregistrées dans `localStorage` :

- `food-campus-cart`
- `food-campus-auth`
- `food-campus-orders`
- `food-campus-settings`

Les stores métier sont versionnés pour écarter les anciennes données incompatibles avec le panier mono-boutique et le paiement en espèces.

## Routes principales

```text
/
/login
/home
/explore
/vendors/:id
/products
/products/:id
/cart
/checkout
/order-success/:id
/orders
/orders/:id
/notifications
/profile
/settings
```

Les anciennes URLs `/app/*` restent redirigées vers les routes canoniques.

## Déploiement Vercel

`vercel.json` contient le fallback SPA vers `/index.html`. Les ouvertures directes et rafraîchissements des routes React sont donc servis correctement.

## Documentation

- [Architecture](docs/ARCHITECTURE.md)
- [Cahier technique](docs/CAHIER_TECHNIQUE.md)

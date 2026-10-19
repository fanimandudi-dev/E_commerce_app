# Architecture de Food Campus

## 1. Principe principal

> Un composant React ne connaît pas la source réelle des données.

Les lectures suivent le flux :

```text
Page / composant
      ↓
hook de feature
      ↓
service métier
      ↓
contrat repository
      ↓
repository mock OU API
```

`src/app/dependencies.ts` choisit les implémentations selon `VITE_DATA_SOURCE`.

## 2. Organisation

```text
src/
├── app/
│   ├── App.tsx
│   └── dependencies.ts
├── components/
│   ├── layout/
│   └── ui/
├── domain/
│   └── models.ts
├── features/
│   ├── auth/
│   ├── cart/
│   ├── orders/
│   ├── products/
│   ├── vendors/
│   ├── settings/
│   └── splash/
├── mocks/
│   └── data.ts
├── pages/
├── services/
│   ├── repositories/
│   ├── ProductService.ts
│   └── VendorService.ts
├── styles/
└── utils/
```

## 3. Responsabilités

### Domaine

`src/domain/models.ts` contient les types sans dépendance React :

- `Vendor` et `VendorSummary` ;
- `Product` ;
- `CampusLocation` ;
- `CartItem` ;
- `Order`, `OrderStatus`, `PaymentStatus` ;
- `Notification` et `User`.

### Repositories et services

Les produits et boutiques disposent de contrats et de deux adaptateurs :

```text
ProductRepository
├── MockProductRepository
└── ApiProductRepository

VendorRepository
├── MockVendorRepository
└── ApiVendorRepository
```

Les services exposent les cas d’usage consommés par `useProducts`, `useVendorProducts`, `useVendors` et `useVendor`.

### Features

- `auth` : session locale et protection des écrans ;
- `cart` : panier mono-boutique et persistance ;
- `orders` : création locale et historique ;
- `products` : hooks et cartes ;
- `vendors` : hooks et cartes boutiques ;
- `settings` : préférences persistantes ;
- `splash` : écran d’entrée autonome.

### Pages

Les pages composent les features. Elles ne font pas de `fetch` direct.

## 4. Invariant du panier

Le panier conserve `items` et `vendor`.

```text
cart.vendor = null si le panier est vide
cart.vendor = product.vendor au premier ajout
```

`addItem` retourne :

```text
added
vendor-conflict
unavailable
```

En cas de conflit, l’UI affiche `VendorSwitchDialog`. Le panier n’est remplacé que lorsque l’étudiant confirme explicitement « Vider et ajouter ».

Le retrait ou le décrément du dernier article réinitialise aussi `vendor`.

Cette vérification locale sert l’expérience utilisateur. Le futur backend devra répéter la validation de manière autoritaire et transactionnelle.

## 5. Commandes et paiement

Les états sont séparés.

### Commande

```text
pending
preparing
ready
out_for_delivery
completed
cancelled
```

### Paiement

```text
pending
received
cancelled
```

Le seul moyen de paiement du MVP est :

```text
cash
```

La création locale vérifie que toutes les lignes appartiennent à la boutique du panier. Elle crée une commande `pending`, un paiement `pending`, une destination officielle et un code QR.

Dans la future architecture partagée, le backend devra recalculer les prix, contrôler les stocks, conserver les snapshots et créer commande/paiement/token dans une transaction.

## 6. Authentification

Les routes métier sont imbriquées sous `RequireAuth`. Un utilisateur non connecté est redirigé vers `/login`.

L’authentification reste simulée dans le frontend. Une production réelle devra utiliser un backend, un access token court et un refresh token protégé.

## 7. Routing

```text
/                   # Splash
/splash
/login
/home
/explore            # onglets Boutiques / Produits
/vendors/:id        # boutique
/products           # recherche globale par produit
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

`/messages` redirige vers le profil, car la messagerie est hors MVP. Les anciennes routes `/app/*` restent compatibles.

## 8. Navigation responsive

La navigation principale contient :

```text
Accueil
Explorer
Commandes
Profil
```

Le panier reste une action contextuelle dans la barre supérieure et le panneau desktop. La fiche produit masque la navigation basse sur mobile pour réserver l’espace à l’action principale.

## 9. Persistance

| Store | Contenu | Version |
|---|---|---:|
| `authStore` | session simulée | 2 |
| `cartStore` | boutique et lignes | 2 |
| `orderStore` | commandes locales | 2 |
| `settingsStore` | thème et notifications | existante |

Les migrations des stores métier réinitialisent les anciennes données qui ne contenaient ni boutique ni paiement en espèces.

## 10. Préparation à l’API

```env
VITE_DATA_SOURCE=api
VITE_API_URL=/api
```

Les endpoints attendus par les adaptateurs actuels sont :

```text
GET /api/products
GET /api/products/:id
GET /api/products?category=:category
GET /api/products?vendorId=:vendorId
GET /api/vendors
GET /api/vendors/:id
```

Les commandes restent locales tant que le contrat partagé et les règles serveur ne sont pas implémentés.

## 11. Principes d’évolution

1. Aucune page ne fait de `fetch` direct.
2. Les montants sont des entiers exprimés en francs congolais (`FC`/`CDF`).
3. Une commande appartient à exactement une boutique.
4. Les lignes d’une commande appartiennent toutes à cette boutique.
5. Le statut de commande ne remplace jamais le statut de paiement.
6. Le scan du QR ne suffit pas à confirmer les espèces : une confirmation explicite du vendeur reste nécessaire.
7. Le frontend n’est jamais la source de vérité du total, du stock ou du QR.
8. Les données serveur futures devront être validées avant d’entrer dans le domaine.
9. Le MCD, le MLD et le schéma PostgreSQL restent à formaliser séparément avant le backend.

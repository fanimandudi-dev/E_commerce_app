# Cahier technique — Food Campus

**Version :** 1.1  
**Date :** 11 août 2026  
**Statut :** MVP frontend marketplace avec données locales

## 1. Objet

Food Campus est une marketplace de commande destinée aux étudiants d’un campus. Plusieurs boutiques proposent leurs produits, mais chaque panier et chaque commande appartiennent à une seule boutique.

Le parcours du MVP est :

```text
Étudiant authentifié
→ choisit une boutique et ses produits
→ confirme un panier mono-boutique
→ choisit un point officiel de remise
→ reçoit un QR personnel
→ remet les espèces au vendeur
→ le vendeur scanne le QR
→ le vendeur confirme explicitement les espèces
→ paiement received et commande completed
```

Le frontend actuel utilise des données locales tout en préparant un branchement API sans réécriture majeure des écrans.

## 2. Contraintes

- mobile-first et responsive tablette/desktop ;
- interface en français ;
- montants entiers en francs congolais (`FC`/`CDF`) ;
- utilisateurs authentifiés obligatoires ;
- un campus au lancement, modèle prêt pour plusieurs campus ;
- lieux de remise officiels ;
- paiement en espèces uniquement ;
- PWA-ready ;
- accessibilité clavier et zones tactiles adaptées ;
- aucun CDN obligatoire pour les assets de l’application.

## 3. Acteurs du MVP

- `STUDENT` : explore, commande, présente son QR et paie en espèces ;
- `SELLER` : prépare, remet/livre, reçoit les espèces, scanne et confirme ;
- `ADMIN` : administration essentielle et supervision future.

Le vendeur affiché au client est une organisation/boutique. Un utilisateur vendeur en est membre. Un rôle de livraison séparé est hors MVP.

## 4. Périmètre frontend livré

### Authentification

- connexion simulée ;
- routes client protégées ;
- session persistante et déconnexion ;
- aucun contournement « mode découverte ».

### Marketplace

- accueil orienté boutiques ;
- exploration par boutiques et produits ;
- pages boutiques ;
- catégories et recherche ;
- cartes et fiches produit avec identité de boutique ;
- états chargement, erreur, vide et indisponible.

### Panier

- premier produit fixant la boutique ;
- ajout et fusion d’une ligne identique ;
- quantités, suppression et total ;
- remise à `null` de la boutique lorsque le panier devient vide ;
- blocage d’un ajout provenant d’une autre boutique ;
- dialogue explicite « Garder mon panier » / « Vider et ajouter » ;
- persistance locale versionnée.

### Commande

- rappel immuable de la boutique ;
- point officiel de remise ;
- instructions facultatives ;
- paiement cash informatif, sans saisie téléphonique ;
- création simulée d’une commande `pending` ;
- QR de remise ;
- historique et suivi ;
- statut commande et statut paiement séparés.

### Relation client

- notifications ;
- profil et réglages ;
- thème sombre ;
- messagerie retirée du MVP.

## 5. Hors périmètre

- backend et PostgreSQL ;
- inscription et récupération réelles ;
- commission ;
- wallet et monnaie électronique ;
- M-Pesa, Airtel Money, Orange Money et Afrimoney ;
- panier et commande multi-boutiques ;
- livreur séparé ;
- messagerie temps réel ;
- géolocalisation live ;
- véritable stock partagé ;
- validation serveur du QR ;
- administration complète ;
- promotions dynamiques et remboursements.

## 6. Stack

| Couche | Technologie |
|---|---|
| UI | React + TypeScript |
| Build | Vite |
| Navigation | React Router |
| État local | Zustand + persist |
| Icônes | Lucide React |
| QR | qrcode.react |
| Styles | CSS responsive avec tokens |
| PWA | manifeste + service worker minimal |
| Données | fixtures TypeScript + repositories |

## 7. Modèle frontend

### Vendor

```text
id
campusId
name
initials
description
specialty
image
accentColor
active
```

### Product

```text
id
name
shortName
description
price
image
category
preparationMinutes
popular?
available
vendor: VendorSummary
```

### Cart

```text
items: CartItem[]
vendor: VendorSummary | null
```

### Order

```text
id
items
vendor
total
status
paymentMethod: cash
paymentStatus
deliveryLocation
deliveryInstructions?
createdAt
code
```

### Statuts

```text
OrderStatus:
pending | preparing | ready | out_for_delivery | completed | cancelled

PaymentStatus:
pending | received | cancelled
```

## 8. Règles métier frontend

1. Un panier vide n’a aucune boutique.
2. Le premier produit fixe la boutique du panier.
3. Tous les autres produits doivent appartenir à cette boutique.
4. Un changement de boutique exige une confirmation explicite.
5. Retirer le dernier article libère la boutique.
6. Une commande reçoit la boutique du panier et ne peut plus en changer.
7. Le checkout ne propose aucun paiement électronique.
8. La création d’une commande ne signifie pas que le paiement est reçu.
9. Le QR reste disponible pendant la commande active.
10. Les règles locales devront être répétées par le backend avant tout test réel multi-appareil.

## 9. Architecture des données

```text
UI
→ hooks de feature
→ services
→ interfaces repository
→ implémentations mock ou HTTP
```

Contrats disponibles :

- `ProductRepository` ;
- `VendorRepository`.

Les commandes et la session restent simulées dans Zustand. Leur migration vers une API partagée est nécessaire avant les tests terrain.

## 10. Routes

```text
/
/splash
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

La navigation client est : `Accueil`, `Explorer`, `Commandes`, `Profil`.

## 11. API minimale future

Sans imposer encore un schéma SQL, le frontend aura besoin de ressources serveur pour :

```text
authentification
campus et lieux officiels
boutiques et membres
catégories et produits
commandes et lignes snapshotées
historique de statuts
paiement cash
QR à usage unique
notifications
```

La création d’une commande devra être transactionnelle : validation mono-boutique, prix et stock serveur, snapshots, paiement `pending`, token QR et historique.

## 12. Sécurité QR future

Le code affiché par le frontend actuel est une simulation. En production :

- valeur aléatoire opaque ;
- stockage serveur sous forme de hash ;
- expiration ;
- révocation ;
- usage unique ;
- au plus un token actif par commande ;
- validation serveur ;
- scan distinct de la confirmation des espèces.

## 13. Tests attendus

### Unitaires

- ajout dans un panier vide ;
- ajout de la même boutique ;
- détection d’un conflit de boutique ;
- remplacement explicite du panier ;
- libération de la boutique au dernier retrait ;
- calcul du total ;
- création d’une commande cash cohérente.

### Composants

- cartes boutiques et produits ;
- recherche Explorer ;
- dialogue de changement ;
- panier vide/rempli ;
- checkout cash ;
- ticket QR ;
- statuts commande/paiement.

### E2E

1. se connecter ;
2. ouvrir une boutique ;
3. ajouter deux produits de cette boutique ;
4. tenter un produit d’une autre boutique ;
5. conserver puis remplacer le panier ;
6. choisir un point de remise ;
7. confirmer sans paiement en ligne ;
8. vérifier QR, commande et paiement `pending`.

## 14. Critères d’acceptation actuels

- TypeScript et build Vite sans erreur ;
- routes principales servies par la SPA ;
- application utilisable sans API ;
- panier mono-boutique persistant ;
- changement de boutique jamais silencieux ;
- aucune option de paiement mobile ;
- boutique visible sur produit, panier et commande ;
- QR affiché sans prétendre que le paiement est déjà reçu ;
- navigation responsive mobile/tablette/desktop ;
- repositories produits et boutiques remplaçables par HTTP.

## 15. Étapes suivantes

1. valider les règles d’annulation et de stock ;
2. finaliser le MCD entité par entité ;
3. produire le MLD PostgreSQL ;
4. introduire le backend partagé minimal ;
5. connecter les repositories commande/auth/notification ;
6. implémenter la validation QR et la confirmation cash côté serveur.

# Food Campus - Assets UI et Ressources Visuelles

> **Version 2.0** - 19 Octobre 2026  
> **Collection complète des SVG, icônes et éléments visuels**

---

## 📁 Table des Matières

1. [Logo et Identité](#1-logo-et-identité)
2. [Icônes de Navigation](#2-icônes-de-navigation)
3. [Icônes de Fonctionnalités](#3-icônes-de-fonctionnalités)
4. [Éléments UI Réutilisables](#4-éléments-ui-réutilisables)
5. [Maquettes Complètes](#5-maquettes-complètes)
6. [Diagrammes Techniques](#6-diagrammes-techniques)

---

## 1. Logo et Identité

### Logo Principal (Version Complète)

```svg
<!-- Logo Food Campus - Version complète avec texte -->
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 100" width="300" height="100">
  <defs>
    <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#22c55e;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#16a34a;stop-opacity:1" />
    </linearGradient>
    <filter id="logoShadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="4" stdDeviation="8" flood-color="#22c55e" flood-opacity="0.3"/>
    </filter>
  </defs>
  
  <!-- Cercle extérieur avec gradient -->
  <circle cx="60" cy="50" r="45" fill="url(#logoGradient)" stroke="#16a34a" stroke-width="3" filter="url(#logoShadow)"/>
  
  <!-- Cercle intérieur blanc -->
  <circle cx="60" cy="50" r="35" fill="white"/>
  
  <!-- Lettre F -->
  <path d="M40 35 L40 65 L55 65 L55 55 L50 55 L50 45 L55 45 L55 35 Z" fill="#22c55e"/>
  
  <!-- Lettre C -->
  <path d="M70 35 L85 35 L85 65 L70 65 L70 55 L80 55 L80 45 L70 45 L70 35 Z" fill="#22c55e"/>
  
  <!-- Texte Food Campus -->
  <text x="110" y="45" fill="#111827" font-family="Inter, Arial, sans-serif" font-size="24" font-weight="700">Food Campus</text>
  
  <!-- Tagline -->
  <text x="110" y="65" fill="#6b7280" font-family="Inter, Arial, sans-serif" font-size="14" font-weight="400">Commandez. Récupérez. Dégustez.</text>
</svg>
```

### Logo Simplifié (pour favicon et petits espaces)

```svg
<!-- Logo Food Campus - Version simplifiée -->
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">
  <defs>
    <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#22c55e;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#16a34a;stop-opacity:1" />
    </linearGradient>
  </defs>
  
  <circle cx="50" cy="50" r="45" fill="url(#logoGradient)" stroke="#16a34a" stroke-width="2"/>
  <circle cx="50" cy="50" r="35" fill="white"/>
  <text x="50" y="55" fill="#22c55e" font-family="Inter, Arial, sans-serif" font-size="20" text-anchor="middle" font-weight="700">FC</text>
</svg>
```

### Logo Monochrome (pour fond coloré)

```svg
<!-- Logo Food Campus - Version monochrome blanche -->
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">
  <circle cx="50" cy="50" r="45" fill="white" stroke="white" stroke-width="2" opacity="0.8"/>
  <circle cx="50" cy="50" r="35" fill="transparent"/>
  <text x="50" y="55" fill="white" font-family="Inter, Arial, sans-serif" font-size="20" text-anchor="middle" font-weight="700">FC</text>
</svg>
```

---

## 2. Icônes de Navigation

### Icône Accueil

```svg
<!-- Icône Accueil -->
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
  <polyline points="9,22 9,12 15,12 15,22"/>
</svg>
```

### Icône Explorer

```svg
<!-- Icône Explorer/Loupe -->
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <circle cx="11" cy="11" r="8"/>
  <line x1="21" y1="21" x2="16.65" y2="16.65"/>
  <line x1="11" y1="8" x2="11" y2="14"/>
  <line x1="8" y1="11" x2="14" y2="11"/>
</svg>
```

### Icône Commandes

```svg
<!-- Icône Commandes/Historique -->
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
</svg>
```

### Icône Profil

```svg
<!-- Icône Profil/Utilisateur -->
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
  <circle cx="12" cy="7" r="4"/>
</svg>
```

### Icône Panier

```svg
<!-- Icône Panier -->
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
  <line x1="3" y1="6" x2="21" y2="6"/>
  <path d="M16 10a4 4 0 0 1-8 0"/>
</svg>
```

### Icône Notifications

```svg
<!-- Icône Notifications/Cloche -->
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
  <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
</svg>
```

---

## 3. Icônes de Fonctionnalités

### Icône Boutique

```svg
<!-- Icône Boutique/Magasin -->
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
  <circle cx="12" cy="10" r="3"/>
</svg>
```

### Icône Produit

```svg
<!-- Icône Produit/Boîte -->
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <path d="M21 8V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v3"/>
  <path d="M20 12l-2 10-10-10 2-10 10 2z"/>
  <path d="M12 22V12"/>
</svg>
```

### Icône QR Code

```svg
<!-- Icône QR Code -->
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <rect x="3" y="3" width="7" height="7"/>
  <rect x="14" y="3" width="7" height="7"/>
  <rect x="14" y="14" width="7" height="7"/>
  <rect x="3" y="14" width="7" height="7"/>
</svg>
```

### Icône Paiement

```svg
<!-- Icône Paiement/Argent -->
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <rect x="1" y="4" width="22" height="16" rx="2" ry="2"/>
  <line x1="1" y1="10" x2="23" y2="10"/>
</svg>
```

### Icône Scan

```svg
<!-- Icône Scan/Caméra -->
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/>
  <circle cx="12" cy="13" r="4"/>
</svg>
```

### Icône Suivi

```svg
<!-- Icône Suivi/Livraison -->
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
  <path d="M12 19V7"/>
  <path d="M15 12H9"/>
</svg>
```

### Icône Favoris

```svg
<!-- Icône Favoris/Cœur -->
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
</svg>
```

### Icône Paramètres

```svg
<!-- Icône Paramètres/Engrenage -->
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <circle cx="12" cy="12" r="3"/>
  <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V7a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/>
</svg>
```

### Icône Déconnexion

```svg
<!-- Icône Déconnexion -->
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
  <polyline points="16,17 21,12 16,7"/>
  <line x1="21" y1="12" x2="9" y2="12"/>
</svg>
```

---

## 4. Éléments UI Réutilisables

### Boutons

#### Bouton Primaire

```svg
<!-- Bouton Primaire - État normal -->
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 60" width="200" height="60">
  <rect x="0" y="0" width="200" height="60" rx="12" fill="#22c55e"/>
  <text x="100" y="38" fill="white" font-family="Inter, Arial" font-size="16" text-anchor="middle" font-weight="600">Commander</text>
</svg>

<!-- Bouton Primaire - État hover -->
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 60" width="200" height="60">
  <rect x="0" y="0" width="200" height="60" rx="12" fill="#16a34a"/>
  <text x="100" y="38" fill="white" font-family="Inter, Arial" font-size="16" text-anchor="middle" font-weight="600">Commander</text>
</svg>
```

#### Bouton Secondaire

```svg
<!-- Bouton Secondaire -->
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 60" width="200" height="60">
  <rect x="0" y="0" width="200" height="60" rx="12" fill="transparent" stroke="#22c55e" stroke-width="2"/>
  <text x="100" y="38" fill="#22c55e" font-family="Inter, Arial" font-size="16" text-anchor="middle" font-weight="600">Annuler</text>
</svg>
```

#### Bouton avec Icône

```svg
<!-- Bouton avec Icône -->
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 250 60" width="250" height="60">
  <rect x="0" y="0" width="250" height="60" rx="12" fill="#22c55e"/>
  <circle cx="40" cy="30" r="12" fill="white" fill-opacity="0.3"/>
  <path d="M35 25 L35 35 L45 35" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  <text x="125" y="38" fill="white" font-family="Inter, Arial" font-size="16" text-anchor="middle" font-weight="600">Ajouter au panier</text>
</svg>
```

---

### Cartes

#### Carte Boutique

```svg
<!-- Carte Boutique -->
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 200" width="300" height="200">
  <!-- Fond -->
  <rect x="0" y="0" width="300" height="200" rx="16" fill="white" stroke="#e5e7eb" stroke-width="1"/>
  
  <!-- Image -->
  <rect x="10" y="10" width="80" height="80" rx="8" fill="#f3f4f6"/>
  
  <!-- Contenu -->
  <text x="100" y="30" fill="#111827" font-family="Inter, Arial" font-size="16" font-weight="700">Fresh Corner</text>
  <text x="100" y="50" fill="#6b7280" font-family="Inter, Arial" font-size="12">★ 4.5 • 12 produits</text>
  <text x="100" y="70" fill="#374151" font-family="Inter, Arial" font-size="12">Bibliothèque centrale</text>
  
  <!-- Badge -->
  <rect x="100" y="85" width="60" height="20" rx="10" fill="#dcfce7"/>
  <text x="130" y="95" fill="#16a34a" font-family="Inter, Arial" font-size="10" text-anchor="middle" font-weight="600">Ouvert</text>
  
  <!-- Bouton -->
  <rect x="200" y="150" width="90" height="35" rx="8" fill="#22c55e"/>
  <text x="245" y="170" fill="white" font-family="Inter, Arial" font-size="12" text-anchor="middle" font-weight="600">Voir</text>
</svg>
```

#### Carte Produit

```svg
<!-- Carte Produit -->
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 250" width="300" height="250">
  <!-- Fond -->
  <rect x="0" y="0" width="300" height="250" rx="16" fill="white" stroke="#e5e7eb" stroke-width="1"/>
  
  <!-- Image -->
  <rect x="10" y="10" width="280" height="150" rx="8" fill="#f3f4f6"/>
  
  <!-- Contenu -->
  <text x="15" y="175" fill="#111827" font-family="Inter, Arial" font-size="16" font-weight="700">Burger Complet</text>
  <text x="15" y="195" fill="#6b7280" font-family="Inter, Arial" font-size="12">Pain, steak, fromage, salade...</text>
  
  <!-- Prix et Stock -->
  <text x="15" y="215" fill="#22c55e" font-family="Inter, Arial" font-size="14" font-weight="700">1200 FC</text>
  <text x="250" y="215" fill="#22c55e" font-family="Inter, Arial" font-size="12" font-weight="600">✓ En stock</text>
  
  <!-- Bouton -->
  <rect x="15" y="225" width="270" height="40" rx="8" fill="#22c55e"/>
  <text x="150" y="245" fill="white" font-family="Inter, Arial" font-size="14" text-anchor="middle" font-weight="600">+ Ajouter au panier</text>
</svg>
```

#### Carte Commande

```svg
<!-- Carte Commande -->
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 350 120" width="350" height="120">
  <!-- Fond -->
  <rect x="0" y="0" width="350" height="120" rx="12" fill="white" stroke="#e5e7eb" stroke-width="1"/>
  
  <!-- Icône et Numéro -->
  <rect x="15" y="15" width="40" height="40" rx="10" fill="#dcfce7"/>
  <path d="M25 25 L25 35 L35 35" stroke="#16a34a" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  <text x="70" y="35" fill="#111827" font-family="Inter, Arial" font-size="14" font-weight="700">FC-20261019-001</text>
  
  <!-- Boutique et Date -->
  <text x="70" y="55" fill="#6b7280" font-family="Inter, Arial" font-size="12">Fresh Corner • 19 Oct 2026, 10:30</text>
  
  <!-- Produits -->
  <text x="15" y="75" fill="#6b7280" font-family="Inter, Arial" font-size="11">Burger Complet x1, Frites x1</text>
  
  <!-- Prix et Statut -->
  <text x="15" y="95" fill="#111827" font-family="Inter, Arial" font-size="14" font-weight="700">1700 FC</text>
  <rect x="250" y="90" width="80" height="25" rx="6" fill="#dcfce7"/>
  <text x="290" y="105" fill="#16a34a" font-family="Inter, Arial" font-size="11" text-anchor="middle" font-weight="600">Complétée</text>
  
  <!-- Bouton -->
  <rect x="15" y="100" width="120" height="30" rx="6" fill="#f3f4f6"/>
  <text x="75" y="115" fill="#374151" font-family="Inter, Arial" font-size="11" text-anchor="middle" font-weight="600">Voir détails</text>
</svg>
```

---

### Badges de Statut

#### Badge "Ouvert"

```svg
<!-- Badge Ouvert -->
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 30" width="80" height="30">
  <rect x="0" y="0" width="80" height="30" rx="15" fill="#dcfce7"/>
  <circle cx="15" cy="15" r="6" fill="#22c55e"/>
  <text x="40" y="20" fill="#16a34a" font-family="Inter, Arial" font-size="12" text-anchor="middle" font-weight="600">Ouvert</text>
</svg>
```

#### Badge "Fermé"

```svg
<!-- Badge Fermé -->
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 30" width="80" height="30">
  <rect x="0" y="0" width="80" height="30" rx="15" fill="#fee2e2"/>
  <circle cx="15" cy="15" r="6" fill="#ef4444"/>
  <text x="40" y="20" fill="#dc2626" font-family="Inter, Arial" font-size="12" text-anchor="middle" font-weight="600">Fermé</text>
</svg>
```

#### Badge "En Stock"

```svg
<!-- Badge En Stock -->
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 30" width="80" height="30">
  <rect x="0" y="0" width="80" height="30" rx="15" fill="#dcfce7"/>
  <path d="M10 15 L14 19 L22 11" stroke="#16a34a" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  <text x="40" y="20" fill="#16a34a" font-family="Inter, Arial" font-size="12" text-anchor="middle" font-weight="600">En stock</text>
</svg>
```

#### Badge "Rupture de Stock"

```svg
<!-- Badge Rupture de Stock -->
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 30" width="100" height="30">
  <rect x="0" y="0" width="100" height="30" rx="15" fill="#fee2e2"/>
  <circle cx="15" cy="15" r="6" fill="#ef4444"/>
  <text x="50" y="20" fill="#dc2626" font-family="Inter, Arial" font-size="12" text-anchor="middle" font-weight="600">Rupture</text>
</svg>
```

---

## 5. Maquettes Complètes

### Maquette : Écran de Splash

```svg
<!-- Écran de Splash Food Campus -->
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 800" width="400" height="800">
  <defs>
    <linearGradient id="splashGradient" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" style="stop-color:#22c55e;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#16a34a;stop-opacity:1" />
    </linearGradient>
    <filter id="splashGlow" x="-50%" y="-50%" width="200%" height="200%">
      <feGaussianBlur stdDeviation="20" result="blur"/>
      <feComposite in="SourceGraphic" in2="blur" operator="over"/>
    </filter>
  </defs>
  
  <!-- Fond gradient -->
  <rect x="0" y="0" width="400" height="800" fill="url(#splashGradient)"/>
  
  <!-- Logo -->
  <g transform="translate(150, 200)" filter="url(#splashGlow)">
    <circle cx="50" cy="50" r="45" fill="white" fill-opacity="0.2"/>
    <circle cx="50" cy="50" r="35" fill="white"/>
    <text x="50" y="55" fill="#22c55e" font-family="Inter, Arial" font-size="20" text-anchor="middle" font-weight="700">FC</text>
  </g>
  
  <!-- Texte -->
  <text x="200" y="350" fill="white" font-family="Inter, Arial" font-size="28" text-anchor="middle" font-weight="700">Food Campus</text>
  <text x="200" y="390" fill="white" fill-opacity="0.9" font-family="Inter, Arial" font-size="14" text-anchor="middle">Commandez. Récupérez. Dégustez.</text>
  
  <!-- Indicateur de chargement -->
  <g transform="translate(180, 450)">
    <circle cx="20" cy="20" r="15" fill="none" stroke="white" stroke-width="3" stroke-dasharray="75" stroke-dashoffset="0">
      <animateTransform attributeName="transform" type="rotate" from="0 20 20" to="360 20 20" dur="2s" repeatCount="indefinite"/>
    </circle>
  </g>
  
  <!-- Barre de progression -->
  <rect x="100" y="700" width="200" height="4" rx="2" fill="white" fill-opacity="0.3"/>
  <rect x="100" y="700" width="100" height="4" rx="2" fill="white">
    <animate attributeName="width" values="0;200" dur="5s" repeatCount="indefinite"/>
  </rect>
</svg>
```

---

### Maquette : Page de Connexion

```svg
<!-- Page de Connexion -->
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 800" width="400" height="800">
  <!-- Header -->
  <rect x="0" y="0" width="400" height="60" fill="#22c55e"/>
  <text x="200" y="38" fill="white" font-family="Inter, Arial" font-size="18" text-anchor="middle" font-weight="700">Food Campus</text>
  
  <!-- Contenu -->
  <rect x="20" y="80" width="360" height="600" rx="16" fill="white"/>
  
  <!-- Logo -->
  <circle cx="200" cy="150" r="40" fill="#22c55e" fill-opacity="0.2"/>
  <circle cx="200" cy="150" r="30" fill="white"/>
  <text x="200" y="155" fill="#22c55e" font-family="Inter, Arial" font-size="16" text-anchor="middle" font-weight="700">FC</text>
  
  <!-- Titre -->
  <text x="200" y="200" fill="#111827" font-family="Inter, Arial" font-size="24" text-anchor="middle" font-weight="700">Bienvenue !</text>
  <text x="200" y="230" fill="#6b7280" font-family="Inter, Arial" font-size="14" text-anchor="middle">Connectez-vous à votre compte</text>
  
  <!-- Formulaire -->
  <g transform="translate(40, 260)">
    <!-- Email -->
    <text x="0" y="20" fill="#111827" font-family="Inter, Arial" font-size="12" font-weight="600">Email</text>
    <rect x="0" y="30" width="320" height="45" rx="8" fill="#f9fafb" stroke="#e5e7eb" stroke-width="1"/>
    <text x="10" y="58" fill="#9ca3af" font-family="Inter, Arial" font-size="12">jean.dupont@unikin.ac.cd</text>
    
    <!-- Mot de passe -->
    <text x="0" y="90" fill="#111827" font-family="Inter, Arial" font-size="12" font-weight="600">Mot de passe</text>
    <rect x="0" y="100" width="320" height="45" rx="8" fill="#f9fafb" stroke="#e5e7eb" stroke-width="1"/>
    <text x="10" y="128" fill="#9ca3af" font-family="Inter, Arial" font-size="12">••••••••</text>
    
    <!-- Bouton Se connecter -->
    <rect x="0" y="160" width="320" height="45" rx="10" fill="#22c55e"/>
    <text x="160" y="183" fill="white" font-family="Inter, Arial" font-size="14" text-anchor="middle" font-weight="600">Se connecter</text>
    
    <!-- Lien S'inscrire -->
    <text x="160" y="220" fill="#6b7280" font-family="Inter, Arial" font-size="12" text-anchor="middle">Pas de compte ? </text>
    <text x="230" y="220" fill="#22c55e" font-family="Inter, Arial" font-size="12" font-weight="600">S'inscrire</text>
  </g>
</svg>
```

---

### Maquette : Page Explorer (Grille de Boutiques)

```svg
<!-- Page Explorer -->
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 800" width="400" height="800">
  <!-- Header -->
  <rect x="0" y="0" width="400" height="60" fill="white" stroke="#e5e7eb" stroke-width="1"/>
  <text x="20" y="38" fill="#111827" font-family="Inter, Arial" font-size="18" font-weight="700">🔍 Explorer</text>
  
  <!-- Barre de recherche -->
  <rect x="20" y="70" width="360" height="45" rx="10" fill="#f9fafb" stroke="#e5e7eb" stroke-width="1"/>
  <text x="40" y="93" fill="#9ca3af" font-family="Inter, Arial" font-size="14">Rechercher des boutiques...</text>
  
  <!-- Filtres -->
  <g transform="translate(20, 125)">
    <rect x="0" y="0" width="80" height="30" rx="6" fill="#22c55e"/>
    <text x="40" y="20" fill="white" font-family="Inter, Arial" font-size="12" text-anchor="middle" font-weight="600">Tous</text>
    
    <rect x="90" y="0" width="80" height="30" rx="6" fill="#f3f4f6"/>
    <text x="130" y="20" fill="#374151" font-family="Inter, Arial" font-size="12" text-anchor="middle">🍔 Nourriture</text>
    
    <rect x="180" y="0" width="80" height="30" rx="6" fill="#f3f4f6"/>
    <text x="220" y="20" fill="#374151" font-family="Inter, Arial" font-size="12" text-anchor="middle">☕ Boissons</text>
    
    <rect x="270" y="0" width="80" height="30" rx="6" fill="#f3f4f6"/>
    <text x="310" y="20" fill="#374151" font-family="Inter, Arial" font-size="12" text-anchor="middle">🍪 Snacks</text>
  </g>
  
  <!-- Grille de boutiques -->
  <g transform="translate(20, 170)">
    <!-- Boutique 1 -->
    <rect x="0" y="0" width="180" height="200" rx="12" fill="white" stroke="#e5e7eb" stroke-width="1"/>
    <rect x="10" y="10" width="160" height="100" rx="8" fill="#f3f4f6"/>
    <text x="90" y="125" fill="#111827" font-family="Inter, Arial" font-size="14" font-weight="700">Fresh Corner</text>
    <text x="90" y="140" fill="#6b7280" font-family="Inter, Arial" font-size="11">★ 4.5 • 12 produits</text>
    <rect x="90" y="155" width="60" height="20" rx="10" fill="#dcfce7"/>
    <text x="120" y="165" fill="#16a34a" font-family="Inter, Arial" font-size="10" text-anchor="middle" font-weight="600">Ouvert</text>
    
    <!-- Boutique 2 -->
    <rect x="190" y="0" width="180" height="200" rx="12" fill="white" stroke="#e5e7eb" stroke-width="1"/>
    <rect x="200" y="10" width="160" height="100" rx="8" fill="#f3f4f6"/>
    <text x="280" y="125" fill="#111827" font-family="Inter, Arial" font-size="14" font-weight="700">Campus Kitchen</text>
    <text x="280" y="140" fill="#6b7280" font-family="Inter, Arial" font-size="11">★ 4.7 • 8 produits</text>
    <rect x="280" y="155" width="60" height="20" rx="10" fill="#dcfce7"/>
    <text x="310" y="165" fill="#16a34a" font-family="Inter, Arial" font-size="10" text-anchor="middle" font-weight="600">Ouvert</text>
    
    <!-- Boutique 3 -->
    <rect x="0" y="210" width="180" height="200" rx="12" fill="white" stroke="#e5e7eb" stroke-width="1"/>
    <rect x="10" y="220" width="160" height="100" rx="8" fill="#f3f4f6"/>
    <text x="90" y="335" fill="#111827" font-family="Inter, Arial" font-size="14" font-weight="700">Douceur Campus</text>
    <text x="90" y="350" fill="#6b7280" font-family="Inter, Arial" font-size="11">★ 4.3 • 15 produits</text>
    <rect x="90" y="365" width="60" height="20" rx="10" fill="#dcfce7"/>
    <text x="120" y="375" fill="#16a34a" font-family="Inter, Arial" font-size="10" text-anchor="middle" font-weight="600">Ouvert</text>
    
    <!-- Boutique 4 -->
    <rect x="190" y="210" width="180" height="200" rx="12" fill="white" stroke="#e5e7eb" stroke-width="1"/>
    <rect x="200" y="220" width="160" height="100" rx="8" fill="#f3f4f6"/>
    <text x="280" y="335" fill="#111827" font-family="Inter, Arial" font-size="14" font-weight="700">Café Central</text>
    <text x="280" y="350" fill="#6b7280" font-family="Inter, Arial" font-size="11">★ 4.6 • 20 produits</text>
    <rect x="280" y="365" width="60" height="20" rx="10" fill="#dcfce7"/>
    <text x="310" y="375" fill="#16a34a" font-family="Inter, Arial" font-size="10" text-anchor="middle" font-weight="600">Ouvert</text>
  </g>
  
  <!-- Navigation Bottom -->
  <rect x="0" y="750" width="400" height="50" fill="white" stroke="#e5e7eb" stroke-width="1"/>
  <g transform="translate(20, 755)">
    <rect x="0" y="0" width="80" height="40" rx="8" fill="#22c55e"/>
    <text x="40" y="25" fill="white" font-family="Inter, Arial" font-size="10" text-anchor="middle" font-weight="600">🏠 Accueil</text>
    
    <rect x="90" y="0" width="80" height="40" rx="8" fill="#f3f4f6"/>
    <text x="130" y="25" fill="#6b7280" font-family="Inter, Arial" font-size="10" text-anchor="middle">🔍 Explorer</text>
    
    <rect x="180" y="0" width="80" height="40" rx="8" fill="#f3f4f6"/>
    <text x="220" y="25" fill="#6b7280" font-family="Inter, Arial" font-size="10" text-anchor="middle">📋 Commandes</text>
    
    <rect x="270" y="0" width="80" height="40" rx="8" fill="#f3f4f6"/>
    <text x="310" y="25" fill="#6b7280" font-family="Inter, Arial" font-size="10" text-anchor="middle">👤 Profil</text>
  </g>
</svg>
```

---

### Maquette : Fiche Boutique

```svg
<!-- Fiche Boutique -->
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 800" width="400" height="800">
  <!-- Header -->
  <rect x="0" y="0" width="400" height="60" fill="white" stroke="#e5e7eb" stroke-width="1"/>
  <text x="20" y="38" fill="#111827" font-family="Inter, Arial" font-size="18" font-weight="700">← Fresh Corner</text>
  
  <!-- Bannière -->
  <rect x="0" y="60" width="400" height="150" fill="#f3f4f6"/>
  <text x="200" y="140" fill="white" font-family="Inter, Arial" font-size="24" text-anchor="middle" font-weight="700">Fresh Corner</text>
  
  <!-- Informations -->
  <rect x="20" y="220" width="360" height="100" rx="12" fill="white" stroke="#e5e7eb" stroke-width="1"/>
  <g transform="translate(40, 240)">
    <text x="0" y="20" fill="#111827" font-family="Inter, Arial" font-size="16" font-weight="700">Fresh Corner</text>
    <text x="0" y="40" fill="#6b7280" font-family="Inter, Arial" font-size="12">★ 4.5 • 12 produits</text>
    <text x="0" y="60" fill="#374151" font-family="Inter, Arial" font-size="12">📍 Bibliothèque centrale, Campus UNIKIN</text>
    <text x="0" y="80" fill="#374151" font-family="Inter, Arial" font-size="12">⏰ 8h00 - 18h00, Lundi à Samedi</text>
  </g>
  
  <!-- Description -->
  <rect x="20" y="330" width="360" height="60" rx="8" fill="#f9fafb"/>
  <text x="40" y="360" fill="#374151" font-family="Inter, Arial" font-size="12">Des plats frais et savoureux pour les étudiants. Spécialités : burgers, sandwiches, salades.</text>
  
  <!-- Filtres de produits -->
  <g transform="translate(20, 400)">
    <text x="0" y="20" fill="#111827" font-family="Inter, Arial" font-size="12" font-weight="600">📌 Catégories :</text>
    <rect x="0" y="35" width="80" height="30" rx="6" fill="#22c55e"/>
    <text x="40" y="50" fill="white" font-family="Inter, Arial" font-size="11" text-anchor="middle" font-weight="600">Tous</text>
    
    <rect x="90" y="35" width="80" height="30" rx="6" fill="#f3f4f6"/>
    <text x="130" y="50" fill="#374151" font-family="Inter, Arial" font-size="11" text-anchor="middle">🍔 Burgers</text>
    
    <rect x="180" y="35" width="80" height="30" rx="6" fill="#f3f4f6"/>
    <text x="220" y="50" fill="#374151" font-family="Inter, Arial" font-size="11" text-anchor="middle">🥪 Sandwiches</text>
    
    <rect x="270" y="35" width="80" height="30" rx="6" fill="#f3f4f6"/>
    <text x="310" y="50" fill="#374151" font-family="Inter, Arial" font-size="11" text-anchor="middle">🥗 Salades</text>
  </g>
  
  <!-- Grille de produits -->
  <g transform="translate(20, 445)">
    <!-- Produit 1 -->
    <rect x="0" y="0" width="180" height="200" rx="12" fill="white" stroke="#e5e7eb" stroke-width="1"/>
    <rect x="10" y="10" width="160" height="100" rx="8" fill="#f3f4f6"/>
    <text x="90" y="125" fill="#111827" font-family="Inter, Arial" font-size="14" font-weight="700">Burger Complet</text>
    <text x="90" y="140" fill="#6b7280" font-family="Inter, Arial" font-size="11">Pain, steak, fromage...</text>
    <text x="90" y="160" fill="#22c55e" font-family="Inter, Arial" font-size="14" font-weight="700">1200 FC</text>
    <rect x="10" y="170" width="160" height="35" rx="6" fill="#22c55e"/>
    <text x="90" y="188" fill="white" font-family="Inter, Arial" font-size="12" text-anchor="middle" font-weight="600">+ Ajouter</text>
    
    <!-- Produit 2 -->
    <rect x="190" y="0" width="180" height="200" rx="12" fill="white" stroke="#e5e7eb" stroke-width="1"/>
    <rect x="200" y="10" width="160" height="100" rx="8" fill="#f3f4f6"/>
    <text x="280" y="125" fill="#111827" font-family="Inter, Arial" font-size="14" font-weight="700">Frites</text>
    <text x="280" y="140" fill="#6b7280" font-family="Inter, Arial" font-size="11">Portion de frites...</text>
    <text x="280" y="160" fill="#22c55e" font-family="Inter, Arial" font-size="14" font-weight="700">500 FC</text>
    <rect x="200" y="170" width="160" height="35" rx="6" fill="#22c55e"/>
    <text x="280" y="188" fill="white" font-family="Inter, Arial" font-size="12" text-anchor="middle" font-weight="600">+ Ajouter</text>
    
    <!-- Produit 3 -->
    <rect x="0" y="210" width="180" height="200" rx="12" fill="white" stroke="#e5e7eb" stroke-width="1"/>
    <rect x="10" y="220" width="160" height="100" rx="8" fill="#f3f4f6"/>
    <text x="90" y="335" fill="#111827" font-family="Inter, Arial" font-size="14" font-weight="700">Sandwich Poulet</text>
    <text x="90" y="350" fill="#6b7280" font-family="Inter, Arial" font-size="11">Pain, poulet, salade...</text>
    <text x="90" y="370" fill="#22c55e" font-family="Inter, Arial" font-size="14" font-weight="700">800 FC</text>
    <rect x="10" y="380" width="160" height="35" rx="6" fill="#22c55e"/>
    <text x="90" y="398" fill="white" font-family="Inter, Arial" font-size="12" text-anchor="middle" font-weight="600">+ Ajouter</text>
  </g>
  
  <!-- Navigation Bottom -->
  <rect x="0" y="750" width="400" height="50" fill="white" stroke="#e5e7eb" stroke-width="1"/>
  <g transform="translate(20, 755)">
    <rect x="0" y="0" width="80" height="40" rx="8" fill="#f3f4f6"/>
    <text x="40" y="25" fill="#6b7280" font-family="Inter, Arial" font-size="10" text-anchor="middle">🏠 Accueil</text>
    
    <rect x="90" y="0" width="80" height="40" rx="8" fill="#22c55e"/>
    <text x="130" y="25" fill="white" font-family="Inter, Arial" font-size="10" text-anchor="middle" font-weight="600">🔍 Explorer</text>
    
    <rect x="180" y="0" width="80" height="40" rx="8" fill="#f3f4f6"/>
    <text x="220" y="25" fill="#6b7280" font-family="Inter, Arial" font-size="10" text-anchor="middle">📋 Commandes</text>
    
    <rect x="270" y="0" width="80" height="40" rx="8" fill="#f3f4f6"/>
    <text x="310" y="25" fill="#6b7280" font-family="Inter, Arial" font-size="10" text-anchor="middle">👤 Profil</text>
  </g>
</svg>
```

---

### Maquette : Page de Succès avec QR Code

```svg
<!-- Page de Succès avec QR Code -->
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 800" width="400" height="800">
  <!-- Header -->
  <rect x="0" y="0" width="400" height="60" fill="#22c55e"/>
  <text x="200" y="38" fill="white" font-family="Inter, Arial" font-size="18" text-anchor="middle" font-weight="700">Food Campus</text>
  
  <!-- Contenu -->
  <rect x="20" y="80" width="360" height="600" rx="16" fill="white"/>
  
  <!-- Icône de succès -->
  <circle cx="200" cy="150" r="40" fill="#dcfce7"/>
  <path d="M180 130 L185 145 L215 115" stroke="#22c55e" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
  
  <!-- Titre -->
  <text x="200" y="200" fill="#111827" font-family="Inter, Arial" font-size="24" text-anchor="middle" font-weight="700">Commande Confirmée !</text>
  <text x="200" y="230" fill="#6b7280" font-family="Inter, Arial" font-size="14" text-anchor="middle">Votre commande a été enregistrée avec succès.</text>
  
  <!-- Informations -->
  <g transform="translate(40, 260)">
    <rect x="0" y="0" width="320" height="80" rx="12" fill="#f9fafb"/>
    <g transform="translate(20, 15)">
      <text x="0" y="20" fill="#6b7280" font-family="Inter, Arial" font-size="12">Numéro de commande</text>
      <text x="0" y="40" fill="#111827" font-family="Inter, Arial" font-size="14" font-weight="600">FC-20261019-001</text>
    </g>
    <g transform="translate(20, 50)">
      <text x="0" y="20" fill="#6b7280" font-family="Inter, Arial" font-size="12">Montant total</text>
      <text x="0" y="40" fill="#111827" font-family="Inter, Arial" font-size="14" font-weight="600">1700 FC</text>
    </g>
  </g>
  
  <!-- QR Code -->
  <rect x="140" y="360" width="120" height="120" fill="white" stroke="#e5e7eb" stroke-width="2"/>
  <text x="200" y="430" fill="#111827" font-family="Inter, Arial" font-size="10" text-anchor="middle">QR CODE</text>
  <text x="200" y="445" fill="#6b7280" font-family="Inter, Arial" font-size="8" text-anchor="middle">FC-20261019-001</text>
  
  <!-- Instructions -->
  <g transform="translate(40, 500)">
    <text x="0" y="20" fill="#111827" font-family="Inter, Arial" font-size="14" font-weight="700">Présentez ce code au vendeur</text>
    <text x="0" y="40" fill="#374151" font-family="Inter, Arial" font-size="12">pour récupérer votre commande et payer en espèces.</text>
    
    <rect x="0" y="60" width="320" height="60" rx="8" fill="#f9fafb"/>
    <g transform="translate(20, 75)">
      <text x="0" y="20" fill="#6b7280" font-family="Inter, Arial" font-size="12">📍 Point de remise</text>
      <text x="0" y="40" fill="#111827" font-family="Inter, Arial" font-size="12">Résidence universitaire</text>
    </g>
  </g>
  
  <!-- Boutons -->
  <g transform="translate(40, 580)">
    <rect x="0" y="0" width="140" height="45" rx="10" fill="#22c55e"/>
    <text x="70" y="28" fill="white" font-family="Inter, Arial" font-size="12" text-anchor="middle" font-weight="600">Télécharger</text>
    
    <rect x="160" y="0" width="140" height="45" rx="10" fill="#f3f4f6"/>
    <text x="230" y="28" fill="#374151" font-family="Inter, Arial" font-size="12" text-anchor="middle" font-weight="600">Retour</text>
  </g>
  
  <!-- Navigation Bottom -->
  <rect x="0" y="750" width="400" height="50" fill="white" stroke="#e5e7eb" stroke-width="1"/>
  <g transform="translate(20, 755)">
    <rect x="0" y="0" width="80" height="40" rx="8" fill="#f3f4f6"/>
    <text x="40" y="25" fill="#6b7280" font-family="Inter, Arial" font-size="10" text-anchor="middle">🏠 Accueil</text>
    
    <rect x="90" y="0" width="80" height="40" rx="8" fill="#f3f4f6"/>
    <text x="130" y="25" fill="#6b7280" font-family="Inter, Arial" font-size="10" text-anchor="middle">🔍 Explorer</text>
    
    <rect x="180" y="0" width="80" height="40" rx="8" fill="#22c55e"/>
    <text x="220" y="25" fill="white" font-family="Inter, Arial" font-size="10" text-anchor="middle" font-weight="600">📋 Commandes</text>
    
    <rect x="270" y="0" width="80" height="40" rx="8" fill="#f3f4f6"/>
    <text x="310" y="25" fill="#6b7280" font-family="Inter, Arial" font-size="10" text-anchor="middle">👤 Profil</text>
  </g>
</svg>
```

---

## 6. Diagrammes Techniques

### Diagramme des Statuts de Commande

```svg
<!-- Diagramme des Statuts de Commande -->
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 400" width="600" height="400">
  <defs>
    <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
      <polygon points="0 0, 10 3.5, 0 7" fill="#22c55e"/>
    </marker>
  </defs>
  
  <!-- Titre -->
  <text x="300" y="30" fill="#111827" font-family="Inter, Arial" font-size="20" text-anchor="middle" font-weight="700">Transitions des Statuts de Commande</text>
  
  <!-- Légende -->
  <g transform="translate(400, 50)">
    <rect x="0" y="0" width="20" height="20" rx="5" fill="#dcfce7"/>
    <text x="25" y="15" fill="#111827" font-family="Inter, Arial" font-size="12">En attente</text>
    
    <rect x="0" y="30" width="20" height="20" rx="5" fill="#bbf7d0"/>
    <text x="25" y="45" fill="#111827" font-family="Inter, Arial" font-size="12">En préparation</text>
    
    <rect x="0" y="60" width="20" height="20" rx="5" fill="#86efac"/>
    <text x="25" y="75" fill="#111827" font-family="Inter, Arial" font-size="12">Prête</text>
    
    <rect x="0" y="90" width="20" height="20" rx="5" fill="#4ade80"/>
    <text x="25" y="105" fill="#111827" font-family="Inter, Arial" font-size="12">Récupérée</text>
    
    <rect x="0" y="120" width="20" height="20" rx="5" fill="#22c55e"/>
    <text x="25" y="135" fill="#111827" font-family="Inter, Arial" font-size="12">Complétée</text>
    
    <rect x="0" y="150" width="20" height="20" rx="5" fill="#fef3c7"/>
    <text x="25" y="165" fill="#111827" font-family="Inter, Arial" font-size="12">Paiement en attente</text>
    
    <rect x="0" y="180" width="20" height="20" rx="5" fill="#dcfce7"/>
    <text x="25" y="195" fill="#111827" font-family="Inter, Arial" font-size="12">Paiement reçu</text>
  </g>
  
  <!-- Diagramme -->
  <g transform="translate(50, 100)">
    <!-- En attente -->
    <rect x="0" y="0" width="120" height="50" rx="10" fill="#dcfce7" stroke="#86efac" stroke-width="2"/>
    <text x="60" y="30" fill="#16a34a" font-family="Inter, Arial" font-size="12" text-anchor="middle" font-weight="600">En attente</text>
    
    <!-- En préparation -->
    <rect x="200" y="0" width="120" height="50" rx="10" fill="#bbf7d0" stroke="#4ade80" stroke-width="2"/>
    <text x="260" y="30" fill="#16a34a" font-family="Inter, Arial" font-size="12" text-anchor="middle" font-weight="600">En préparation</text>
    
    <!-- Prête -->
    <rect x="400" y="0" width="120" height="50" rx="10" fill="#86efac" stroke="#22c55e" stroke-width="2"/>
    <text x="460" y="30" fill="#16a34a" font-family="Inter, Arial" font-size="12" text-anchor="middle" font-weight="600">Prête</text>
    
    <!-- Récupérée -->
    <rect x="200" y="100" width="120" height="50" rx="10" fill="#4ade80" stroke="#16a34a" stroke-width="2"/>
    <text x="260" y="130" fill="#16a34a" font-family="Inter, Arial" font-size="12" text-anchor="middle" font-weight="600">Récupérée</text>
    
    <!-- Complétée -->
    <rect x="400" y="100" width="120" height="50" rx="10" fill="#22c55e" stroke="#16a34a" stroke-width="2"/>
    <text x="460" y="130" fill="white" font-family="Inter, Arial" font-size="12" text-anchor="middle" font-weight="600">Complétée</text>
    
    <!-- Annulée -->
    <rect x="0" y="200" width="120" height="50" rx="10" fill="#fee2e2" stroke="#fecaca" stroke-width="2"/>
    <text x="60" y="230" fill="#dc2626" font-family="Inter, Arial" font-size="12" text-anchor="middle" font-weight="600">Annulée</text>
    
    <!-- Flèches -->
    <path d="M120 25 L200 25" fill="none" stroke="#22c55e" stroke-width="2" marker-end="url(#arrowhead)"/>
    <text x="160" y="15" fill="#22c55e" font-family="Inter, Arial" font-size="10" text-anchor="middle">Vendeur commence</text>
    
    <path d="M260 25 L340 25" fill="none" stroke="#22c55e" stroke-width="2" marker-end="url(#arrowhead)"/>
    <text x="300" y="15" fill="#22c55e" font-family="Inter, Arial" font-size="10" text-anchor="middle">Préparation terminée</text>
    
    <path d="M460 25 L520 65 L520 100 L460 100" fill="none" stroke="#22c55e" stroke-width="2" marker-end="url(#arrowhead)"/>
    <text x="500" y="75" fill="#22c55e" font-family="Inter, Arial" font-size="10" text-anchor="middle">Scan QR</text>
    
    <path d="M260 125 L340 125" fill="none" stroke="#22c55e" stroke-width="2" marker-end="url(#arrowhead)"/>
    <text x="300" y="115" fill="#22c55e" font-family="Inter, Arial" font-size="10" text-anchor="middle">Paiement confirmé</text>
    
    <path d="M120 25 L120 180 L60 200" fill="none" stroke="#ef4444" stroke-width="2" marker-end="url(#arrowhead)"/>
    <text x="80" y="125" fill="#ef4444" font-family="Inter, Arial" font-size="10" text-anchor="middle">Annulation</text>
    
    <path d="M260 25 L260 125 L200 130" fill="none" stroke="#ef4444" stroke-width="2" marker-end="url(#arrowhead)"/>
    <text x="220" y="80" fill="#ef4444" font-family="Inter, Arial" font-size="10" text-anchor="middle">Annulation</text>
  </g>
</svg>
```

---

### Diagramme de Flux Utilisateur

```svg
<!-- Diagramme de Flux Utilisateur -->
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="800" height="600">
  <defs>
    <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
      <polygon points="0 0, 10 3.5, 0 7" fill="#22c55e"/>
    </marker>
  </defs>
  
  <!-- Titre -->
  <text x="400" y="30" fill="#111827" font-family="Inter, Arial" font-size="20" text-anchor="middle" font-weight="700">Parcours Utilisateur Principal</text>
  
  <!-- Étapes -->
  <g transform="translate(50, 80)">
    <!-- Étape 1 -->
    <rect x="0" y="0" width="100" height="60" rx="10" fill="#22c55e" fill-opacity="0.2" stroke="#22c55e" stroke-width="2"/>
    <text x="50" y="35" fill="#111827" font-family="Inter, Arial" font-size="12" text-anchor="middle" font-weight="600">1. Connexion</text>
    
    <!-- Étape 2 -->
    <rect x="200" y="0" width="100" height="60" rx="10" fill="#22c55e" fill-opacity="0.2" stroke="#22c55e" stroke-width="2"/>
    <text x="250" y="35" fill="#111827" font-family="Inter, Arial" font-size="12" text-anchor="middle" font-weight="600">2. Découverte</text>
    
    <!-- Étape 3 -->
    <rect x="400" y="0" width="100" height="60" rx="10" fill="#22c55e" fill-opacity="0.2" stroke="#22c55e" stroke-width="2"/>
    <text x="450" y="35" fill="#111827" font-family="Inter, Arial" font-size="12" text-anchor="middle" font-weight="600">3. Sélection</text>
    
    <!-- Étape 4 -->
    <rect x="600" y="0" width="100" height="60" rx="10" fill="#22c55e" fill-opacity="0.2" stroke="#22c55e" stroke-width="2"/>
    <text x="650" y="35" fill="#111827" font-family="Inter, Arial" font-size="12" text-anchor="middle" font-weight="600">4. Panier</text>
    
    <!-- Étape 5 -->
    <rect x="200" y="150" width="100" height="60" rx="10" fill="#10b981" fill-opacity="0.2" stroke="#10b981" stroke-width="2"/>
    <text x="250" y="185" fill="#111827" font-family="Inter, Arial" font-size="12" text-anchor="middle" font-weight="600">5. Checkout</text>
    
    <!-- Étape 6 -->
    <rect x="400" y="150" width="100" height="60" rx="10" fill="#10b981" fill-opacity="0.2" stroke="#10b981" stroke-width="2"/>
    <text x="450" y="185" fill="#111827" font-family="Inter, Arial" font-size="12" text-anchor="middle" font-weight="600">6. Confirmation</text>
    
    <!-- Étape 7 -->
    <rect x="600" y="150" width="100" height="60" rx="10" fill="#10b981" fill-opacity="0.2" stroke="#10b981" stroke-width="2"/>
    <text x="650" y="185" fill="#111827" font-family="Inter, Arial" font-size="12" text-anchor="middle" font-weight="600">7. QR Code</text>
    
    <!-- Étape 8 -->
    <rect x="400" y="300" width="100" height="60" rx="10" fill="#16a34a" fill-opacity="0.2" stroke="#16a34a" stroke-width="2"/>
    <text x="450" y="335" fill="#111827" font-family="Inter, Arial" font-size="12" text-anchor="middle" font-weight="600">8. Suivi</text>
    
    <!-- Étape 9 -->
    <rect x="200" y="300" width="100" height="60" rx="10" fill="#16a34a" fill-opacity="0.2" stroke="#16a34a" stroke-width="2"/>
    <text x="250" y="335" fill="#111827" font-family="Inter, Arial" font-size="12" text-anchor="middle" font-weight="600">9. Paiement</text>
    
    <!-- Flèches -->
    <path d="M100 30 L200 30" fill="none" stroke="#22c55e" stroke-width="2" marker-end="url(#arrowhead)"/>
    <path d="M300 30 L400 30" fill="none" stroke="#22c55e" stroke-width="2" marker-end="url(#arrowhead)"/>
    <path d="M500 30 L600 30" fill="none" stroke="#22c55e" stroke-width="2" marker-end="url(#arrowhead)"/>
    <path d="M600 60 L600 150 L600 180" fill="none" stroke="#10b981" stroke-width="2" marker-end="url(#arrowhead)"/>
    <path d="M600 180 L400 180" fill="none" stroke="#10b981" stroke-width="2" marker-end="url(#arrowhead)"/>
    <path d="M400 180 L200 180" fill="none" stroke="#10b981" stroke-width="2" marker-end="url(#arrowhead)"/>
    <path d="M200 210 L200 300" fill="none" stroke="#16a34a" stroke-width="2" marker-end="url(#arrowhead)"/>
    <path d="M200 300 L400 300" fill="none" stroke="#16a34a" stroke-width="2" marker-end="url(#arrowhead)"/>
  </g>
</svg>
```

---

### Diagramme d'Architecture

```svg
<!-- Diagramme d'Architecture -->
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500" width="800" height="500">
  <!-- Titre -->
  <text x="400" y="30" fill="#111827" font-family="Inter, Arial" font-size="20" text-anchor="middle" font-weight="700">Architecture Technique</text>
  
  <!-- Couches -->
  <g transform="translate(50, 80)">
    <!-- Client -->
    <rect x="0" y="0" width="200" height="100" rx="10" fill="#f0fdf4" stroke="#86efac" stroke-width="2"/>
    <text x="100" y="25" fill="#16a34a" font-family="Inter, Arial" font-size="14" text-anchor="middle" font-weight="700">Client</text>
    <text x="100" y="45" fill="#111827" font-family="Inter, Arial" font-size="12" text-anchor="middle">React + TypeScript</text>
    <text x="100" y="65" fill="#111827" font-family="Inter, Arial" font-size="12" text-anchor="middle">Vite + Tailwind</text>
    <text x="100" y="85" fill="#111827" font-family="Inter, Arial" font-size="12" text-anchor="middle">Zustand</text>
    
    <!-- Backend -->
    <rect x="300" y="0" width="200" height="100" rx="10" fill="#dbeafe" stroke="#3b82f6" stroke-width="2"/>
    <text x="400" y="25" fill="#1e40af" font-family="Inter, Arial" font-size="14" text-anchor="middle" font-weight="700">Backend</text>
    <text x="400" y="45" fill="#111827" font-family="Inter, Arial" font-size="12" text-anchor="middle">Node.js + Express</text>
    <text x="400" y="65" fill="#111827" font-family="Inter, Arial" font-size="12" text-anchor="middle">Prisma ORM</text>
    <text x="400" y="85" fill="#111827" font-family="Inter, Arial" font-size="12" text-anchor="middle">REST API</text>
    
    <!-- Base de données -->
    <rect x="600" y="0" width="200" height="100" rx="10" fill="#fef3c7" stroke="#f59e0b" stroke-width="2"/>
    <text x="700" y="25" fill="#d97706" font-family="Inter, Arial" font-size="14" text-anchor="middle" font-weight="700">Base de données</text>
    <text x="700" y="45" fill="#111827" font-family="Inter, Arial" font-size="12" text-anchor="middle">PostgreSQL</text>
    <text x="700" y="65" fill="#111827" font-family="Inter, Arial" font-size="12" text-anchor="middle">Neon / Supabase</text>
    
    <!-- Flèches -->
    <path d="M200 50 L300 50" fill="none" stroke="#6b7280" stroke-width="2" marker-end="url(#arrowhead)"/>
    <text x="250" y="35" fill="#6b7280" font-family="Inter, Arial" font-size="10" text-anchor="middle">HTTP/HTTPS</text>
    
    <path d="M500 50 L600 50" fill="none" stroke="#6b7280" stroke-width="2" marker-end="url(#arrowhead)"/>
    <text x="550" y="35" fill="#6b7280" font-family="Inter, Arial" font-size="10" text-anchor="middle">Prisma Client</text>
    
    <!-- Composants Client -->
    <g transform="translate(10, 150)">
      <rect x="0" y="0" width="180" height="40" rx="5" fill="white" stroke="#e5e7eb" stroke-width="1"/>
      <text x="90" y="25" fill="#111827" font-family="Inter, Arial" font-size="11" text-anchor="middle">Components</text>
      
      <rect x="0" y="50" width="180" height="40" rx="5" fill="white" stroke="#e5e7eb" stroke-width="1"/>
      <text x="90" y="75" fill="#111827" font-family="Inter, Arial" font-size="11" text-anchor="middle">Hooks</text>
      
      <rect x="0" y="100" width="180" height="40" rx="5" fill="white" stroke="#e5e7eb" stroke-width="1"/>
      <text x="90" y="125" fill="#111827" font-family="Inter, Arial" font-size="11" text-anchor="middle">Services</text>
      
      <rect x="0" y="150" width="180" height="40" rx="5" fill="white" stroke="#e5e7eb" stroke-width="1"/>
      <text x="90" y="175" fill="#111827" font-family="Inter, Arial" font-size="11" text-anchor="middle">Stores (Zustand)</text>
    </g>
    
    <!-- Composants Backend -->
    <g transform="translate(310, 150)">
      <rect x="0" y="0" width="180" height="40" rx="5" fill="white" stroke="#e5e7eb" stroke-width="1"/>
      <text x="90" y="25" fill="#111827" font-family="Inter, Arial" font-size="11" text-anchor="middle">Controllers</text>
      
      <rect x="0" y="50" width="180" height="40" rx="5" fill="white" stroke="#e5e7eb" stroke-width="1"/>
      <text x="90" y="75" fill="#111827" font-family="Inter, Arial" font-size="11" text-anchor="middle">Services</text>
      
      <rect x="0" y="100" width="180" height="40" rx="5" fill="white" stroke="#e5e7eb" stroke-width="1"/>
      <text x="90" y="125" fill="#111827" font-family="Inter, Arial" font-size="11" text-anchor="middle">Repositories</text>
      
      <rect x="0" y="150" width="180" height="40" rx="5" fill="white" stroke="#e5e7eb" stroke-width="1"/>
      <text x="90" y="175" fill="#111827" font-family="Inter, Arial" font-size="11" text-anchor="middle">Routes</text>
    </g>
    
    <!-- Tables Base de données -->
    <g transform="translate(610, 150)">
      <rect x="0" y="0" width="180" height="40" rx="5" fill="white" stroke="#fde68a" stroke-width="1"/>
      <text x="90" y="25" fill="#d97706" font-family="Inter, Arial" font-size="11" text-anchor="middle">Users</text>
      
      <rect x="0" y="50" width="180" height="40" rx="5" fill="white" stroke="#fde68a" stroke-width="1"/>
      <text x="90" y="75" fill="#d97706" font-family="Inter, Arial" font-size="11" text-anchor="middle">Vendors</text>
      
      <rect x="0" y="100" width="180" height="40" rx="5" fill="white" stroke="#fde68a" stroke-width="1"/>
      <text x="90" y="125" fill="#d97706" font-family="Inter, Arial" font-size="11" text-anchor="middle">Products</text>
      
      <rect x="0" y="150" width="180" height="40" rx="5" fill="white" stroke="#fde68a" stroke-width="1"/>
      <text x="90" y="175" fill="#d97706" font-family="Inter, Arial" font-size="11" text-anchor="middle">Orders</text>
      
      <rect x="0" y="200" width="180" height="40" rx="5" fill="white" stroke="#fde68a" stroke-width="1"/>
      <text x="90" y="225" fill="#d97706" font-family="Inter, Arial" font-size="11" text-anchor="middle">Payments</text>
    </g>
  </g>
</svg>
```

---

## 📝 Utilisation des Assets

### Comment utiliser ces SVG ?

1. **Dans le code React/TypeScript** :
```tsx
// Utilisation directe dans un composant
const Logo = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">
    <circle cx="50" cy="50" r="45" fill="#22c55e"/>
    <circle cx="50" cy="50" r="35" fill="white"/>
    <text x="50" y="55" fill="#22c55e" font-family="Inter, Arial" font-size="20" text-anchor="middle" font-weight="700">FC</text>
  </svg>
);
```

2. **Depuis un fichier externe** :
```tsx
// Import depuis un fichier SVG
import { ReactComponent as Logo } from './assets/logo.svg';

// Utilisation
<Logo width="100" height="100" />
```

3. **Dans les fichiers Markdown** :
```markdown
<!-- Utilisation directe dans le markdown -->
![Logo Food Campus](./docs/logo.svg)
```

### Bonnes Pratiques

- ✅ **Taille** : Toujours spécifier `viewBox`, `width` et `height`
- ✅ **Accessibilité** : Ajouter `aria-label` ou `aria-hidden` selon le contexte
- ✅ **Performance** : Préférer les SVG inline pour les petits éléments
- ✅ **Couleurs** : Utiliser `currentColor` pour les icônes afin de permettre le changement de couleur
- ❌ **Éviter** : Les SVG trop complexes (impact sur les performances)

---

## 🎨 Ressources Externes

- [Feather Icons](https://feathericons.com/) - Jeu d'icônes utilisé comme base
- [Heroicons](https://heroicons.com/) - Alternative pour les icônes
- [Tabler Icons](https://tabler-icons.io/) - Autre alternative
- [SVGOMG](https://jakearchibald.github.io/svgomg/) - Optimiseur de SVG
- [Figma](https://www.figma.com/) - Outil de design pour créer des maquettes

---

> **Food Campus** - Collection complète d'assets UI et visuels
> *Généré par Arena.ai Agent Mode - 19 Octobre 2026*

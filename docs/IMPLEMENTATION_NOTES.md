# Food Campus - Notes d'Implémentation

> **Version 2.0** - 19 Octobre 2026  
> **Document technique détaillant l'implémentation du marché étudiant**

---

## 📋 Table des Matières

1. [Résumé de l'Implémentation](#1-résumé-de-limplémentation)
2. [Architecture du Projet](#2-architecture-du-projet)
3. [Structure des Fichiers](#3-structure-des-fichiers)
4. [Décisions Techniques Clés](#4-décisions-techniques-clés)
5. [Gestion d'État avec Zustand](#5-gestion-détat-avec-zustand)
6. [Flux de Données](#6-flux-de-données)
7. [Gestion des Erreurs](#7-gestion-des-erreurs)
8. [Accessibilité](#8-accessibilité)
9. [Performance](#9-performance)
10. [Sécurité](#10-sécurité)
11. [Internationalisation (i18n)](#11-internationalisation-i18n)
12. [Thèmes et Personnalisation](#12-thèmes-et-personnalisation)
13. [Tests](#13-tests)
14. [Déploiement](#14-déploiement)
15. [Améliorations Futures](#15-améliorations-futures)

---

## 1. Résumé de l'Implémentation

### Ce qui a été réalisé

✅ **Application React complète** avec TypeScript  
✅ **Design System** cohérent avec Tailwind CSS  
✅ **Gestion d'état** avec Zustand et persistance locale  
✅ **Architecture modulaire** par fonctionnalités  
✅ **Navigation** avec React Router v6  
✅ **Formulaires** avec validation et gestion d'erreurs  
✅ **Responsive Design** pour mobile, tablette et desktop  
✅ **PWA** (Progressive Web App) ready  
✅ **Mock Data** pour le développement sans backend  
✅ **Documentation** complète (Ce document + Cahier des Charges Fonctionnel)

### Fonctionnalités Implémentées

| Fonctionnalité | Statut | Page/Composant |
|--------------|--------|----------------|
| Splash Screen | ✅ | `/splash` |
| Connexion | ✅ | `/login` |
| Inscription | ✅ | `/register` |
| Accueil | ✅ | `/` |
| Explorer | ✅ | `/explore` |
| Fiche Boutique | ✅ | `/vendors/:id` |
| Détails Produit | ✅ | `/products/:id` |
| Panier | ✅ | `/cart` |
| Checkout | ✅ | `/checkout` |
| Confirmation Commande | ✅ | `/orders/success` |
| Liste Commandes | ✅ | `/orders` |
| Détails Commande | ✅ | `/orders/:id` |
| Profil | ✅ | `/profile` |
| Paramètres | ✅ | `/settings` |

---

## 2. Architecture du Projet

### Pattern d'Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        PRESENTATION                            │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────┐   │
│  │   Pages     │  │ Components  │  │   Hooks              │   │
│  │             │  │             │  │                      │   │
│  └─────────────┘  └─────────────┘  └─────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                         DOMAINE                                │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────┐   │
│  │   Stores    │  │   Services   │  │   Repositories        │   │
│  │  (Zustand)  │  │             │  │   (Mock/API)           │   │
│  └─────────────┘  └─────────────┘  └─────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                      INFRASTRUCTURE                            │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────┐   │
│  │   Types     │  │   Utils      │  │   Config             │   │
│  │             │  │             │  │                      │   │
│  └─────────────┘  └─────────────┘  └─────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

### Séparation des Préoccupations

1. **UI Layer** : Pages, Components, Hooks
   - Contient uniquement la logique de présentation
   - Pas de logique métier directe
   - Appelle les Services via les Hooks

2. **Domain Layer** : Stores, Services, Repositories
   - Contient la logique métier
   - Gère l'état global
   - Coordonne les appels aux Repositories

3. **Infrastructure Layer** : Types, Utils, Config
   - Types partagés
   - Fonctions utilitaires
   - Configuration de l'application

---

## 3. Structure des Fichiers

```
food-campus/
├── public/
│   ├── assets/
│   │   ├── images/
│   │   │   ├── food-1.jpg
│   │   │   ├── food-2.jpg
│   │   │   └── logo.svg
│   │   └── fonts/
│   │       └── Inter/
│   ├── favicon.ico
│   └── manifest.json
│
├── src/
│   ├── app/
│   │   ├── App.tsx                    # Composant racine
│   │   ├── main.tsx                   # Point d'entrée
│   │   ├── router.tsx                 # Configuration du routeur
│   │   └── constants.ts               # Constantes globales
│   │
│   ├── features/                      # Fonctionnalités (Feature-based)
│   │   ├── auth/                     # Authentification
│   │   │   ├── components/
│   │   │   │   ├── LoginForm.tsx
│   │   │   │   ├── RegisterForm.tsx
│   │   │   │   └── AuthLayout.tsx
│   │   │   ├── hooks/
│   │   │   │   ├── useLogin.ts
│   │   │   │   └── useRegister.ts
│   │   │   ├── services/
│   │   │   │   └── authService.ts
│   │   │   ├── types/
│   │   │   │   └── authTypes.ts
│   │   │   └── index.ts
│   │   │
│   │   ├── vendors/                   # Boutiques
│   │   │   ├── components/
│   │   │   │   ├── VendorCard.tsx
│   │   │   │   ├── VendorDetail.tsx
│   │   │   │   └── VendorList.tsx
│   │   │   ├── hooks/
│   │   │   │   ├── useVendors.ts
│   │   │   │   └── useVendor.ts
│   │   │   ├── services/
│   │   │   │   └── vendorService.ts
│   │   │   ├── types/
│   │   │   │   └── vendorTypes.ts
│   │   │   └── index.ts
│   │   │
│   │   ├── products/                  # Produits
│   │   │   ├── components/
│   │   │   │   ├── ProductCard.tsx
│   │   │   │   ├── ProductDetail.tsx
│   │   │   │   └── ProductGrid.tsx
│   │   │   ├── hooks/
│   │   │   │   ├── useProducts.ts
│   │   │   │   └── useProduct.ts
│   │   │   ├── services/
│   │   │   │   └── productService.ts
│   │   │   ├── types/
│   │   │   │   └── productTypes.ts
│   │   │   └── index.ts
│   │   │
│   │   ├── cart/                      # Panier
│   │   │   ├── components/
│   │   │   │   ├── CartItem.tsx
│   │   │   │   ├── CartSummary.tsx
│   │   │   │   └── CartEmpty.tsx
│   │   │   ├── hooks/
│   │   │   │   ├── useCart.ts
│   │   │   │   └── useCartActions.ts
│   │   │   ├── services/
│   │   │   │   └── cartService.ts
│   │   │   ├── types/
│   │   │   │   └── cartTypes.ts
│   │   │   └── index.ts
│   │   │
│   │   ├── orders/                    # Commandes
│   │   │   ├── components/
│   │   │   │   ├── OrderCard.tsx
│   │   │   │   ├── OrderDetail.tsx
│   │   │   │   ├── OrderStatus.tsx
│   │   │   │   └── OrderList.tsx
│   │   │   ├── hooks/
│   │   │   │   ├── useOrders.ts
│   │   │   │   └── useOrder.ts
│   │   │   ├── services/
│   │   │   │   └── orderService.ts
│   │   │   ├── types/
│   │   │   │   └── orderTypes.ts
│   │   │   └── index.ts
│   │   │
│   │   ├── checkout/                  # Paiement
│   │   │   ├── components/
│   │   │   │   ├── CheckoutForm.tsx
│   │   │   │   ├── PaymentMethod.tsx
│   │   │   │   └── DeliveryInfo.tsx
│   │   │   ├── hooks/
│   │   │   │   └── useCheckout.ts
│   │   │   ├── services/
│   │   │   │   └── checkoutService.ts
│   │   │   ├── types/
│   │   │   │   └── checkoutTypes.ts
│   │   │   └── index.ts
│   │   │
│   │   ├── splash/                    # Écran de splash
│   │   │   ├── components/
│   │   │   │   └── SplashScreen.tsx
│   │   │   ├── hooks/
│   │   │   │   └── useSplash.ts
│   │   │   └── index.ts
│   │   │
│   │   └── profile/                   # Profil
│   │       ├── components/
│   │       │   ├── ProfileForm.tsx
│   │       │   └── ProfileHeader.tsx
│   │       ├── hooks/
│   │       │   └── useProfile.ts
│   │       ├── services/
│   │       │   └── profileService.ts
│   │       ├── types/
│   │       │   └── profileTypes.ts
│   │       └── index.ts
│   │
│   ├── shared/                        # Éléments partagés
│   │   ├── components/
│   │   │   ├── ui/                    # Composants UI de base
│   │   │   │   ├── Button.tsx
│   │   │   │   ├── Input.tsx
│   │   │   │   ├── Card.tsx
│   │   │   │   ├── Modal.tsx
│   │   │   │   ├── Badge.tsx
│   │   │   │   ├── Alert.tsx
│   │   │   │   ├── Spinner.tsx
│   │   │   │   ├── Toast.tsx
│   │   │   │   ├── ConfirmationDialog.tsx
│   │   │   │   ├── EmptyState.tsx
│   │   │   │   ├── LoadingState.tsx
│   │   │   │   └── ErrorState.tsx
│   │   │   ├── layout/
│   │   │   │   ├── Header.tsx
│   │   │   │   ├── Footer.tsx
│   │   │   │   ├── Navigation.tsx
│   │   │   │   ├── BottomNav.tsx
│   │   │   │   ├── Sidebar.tsx
│   │   │   │   └── Layout.tsx
│   │   │   └── icons/
│   │   │       ├── index.ts
│   │   │       └── *.tsx (toutes les icônes)
│   │   │
│   │   ├── hooks/                     # Hooks partagés
│   │   │   ├── useLocalStorage.ts
│   │   │   ├── useSessionStorage.ts
│   │   │   ├── useDebounce.ts
│   │   │   ├── useThrottle.ts
│   │   │   ├── useToggle.ts
│   │   │   ├── useMediaQuery.ts
│   │   │   └── useOnClickOutside.ts
│   │   │
│   │   ├── lib/                       # Bibliothèques utilitaires
│   │   │   ├── apiClient.ts           # Client API générique
│   │   │   ├── formatters.ts          # Formattage (dates, prix, etc.)
│   │   │   ├── validators.ts          # Validation des données
│   │   │   └── utils.ts               # Fonctions utilitaires
│   │   │
│   │   └── styles/                    # Styles partagés
│   │       ├── globals.css
│   │       ├── tailwind.css
│   │       └── theme.ts
│   │
│   ├── stores/                        # Zustand Stores
│   │   ├── authStore.ts
│   │   ├── cartStore.ts
│   │   ├── orderStore.ts
│   │   ├── vendorStore.ts
│   │   ├── uiStore.ts
│   │   └── index.ts
│   │
│   ├── types/                         # Types TypeScript globaux
│   │   ├── index.ts
│   │   ├── api.ts
│   │   ├── common.ts
│   │   └── enums.ts
│   │
│   ├── services/                     # Services (logique métier)
│   │   ├── authService.ts
│   │   ├── cartService.ts
│   │   ├── orderService.ts
│   │   ├── productService.ts
│   │   ├── vendorService.ts
│   │   └── index.ts
│   │
│   ├── repositories/                  # Repositories (accès données)
│   │   ├── mock/                      # Implémentations Mock
│   │   │   ├── authRepository.ts
│   │   │   ├── cartRepository.ts
│   │   │   ├── orderRepository.ts
│   │   │   ├── productRepository.ts
│   │   │   └── vendorRepository.ts
│   │   ├── api/                       # Implémentations API (à venir)
│   │   │   ├── authRepository.ts
│   │   │   ├── cartRepository.ts
│   │   │   ├── orderRepository.ts
│   │   │   ├── productRepository.ts
│   │   │   └── vendorRepository.ts
│   │   └── index.ts
│   │
│   ├── pages/                         # Pages principales
│   │   ├── HomePage.tsx
│   │   ├── ExplorePage.tsx
│   │   ├── VendorPage.tsx
│   │   ├── ProductPage.tsx
│   │   ├── CartPage.tsx
│   │   ├── CheckoutPage.tsx
│   │   ├── OrderSuccessPage.tsx
│   │   ├── OrdersPage.tsx
│   │   ├── OrderDetailPage.tsx
│   │   ├── LoginPage.tsx
│   │   ├── RegisterPage.tsx
│   │   ├── ProfilePage.tsx
│   │   ├── SettingsPage.tsx
│   │   ├── SplashPage.tsx
│   │   └── NotFoundPage.tsx
│   │
│   ├── hooks/                         # Hooks globaux
│   │   ├── useAuth.ts
│   │   ├── useCart.ts
│   │   ├── useOrders.ts
│   │   └── index.ts
│   │
│   └── assets/                        # Assets statiques
│       ├── images/
│       └── svg/
│
├── docs/                              # Documentation
│   ├── CAHIER_CHARGE_FONCTIONNELLE.md
│   ├── CAHIER_CHARGE_FONCTIONNELLE.svg
│   ├── CAHIER_TECHNIQUE.md
│   ├── ARCHITECTURE.md
│   ├── IMPLEMENTATION_NOTES.md
│   └── UI_GUIDELINES.md
│
├── .env                              # Variables d'environnement
├── .env.example                      # Exemple de variables d'environnement
├── .gitignore
├── .eslintrc.json
├── .prettierrc
├── index.html
├── package.json
├── tailwind.config.js
├── tsconfig.json
├── tsconfig.node.json
├── vite.config.ts
└── README.md
```

---

## 4. Décisions Techniques Clés

### 4.1 React Router v6

**Pourquoi ?**
- Syntaxe plus simple et plus déclarative
- Support natif des routes imbriquées
- Meilleure gestion des paramètres
- Hooks intégrés (`useParams`, `useNavigate`, `useLocation`)

**Exemple de configuration** :
```tsx
// src/app/router.tsx
import { createBrowserRouter, Navigate } from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'explore', element: <ExplorePage /> },
      { path: 'vendors/:id', element: <VendorPage /> },
      { path: 'products/:id', element: <ProductPage /> },
      { path: 'cart', element: <CartPage /> },
      { path: 'checkout', element: <CheckoutPage /> },
      { path: 'orders', element: <OrdersPage /> },
      { path: 'orders/:id', element: <OrderDetailPage /> },
      { path: 'orders/success', element: <OrderSuccessPage /> },
      { path: 'profile', element: <ProfilePage /> },
      { path: 'settings', element: <SettingsPage /> },
    ],
  },
  {
    path: '/auth',
    element: <AuthLayout />,
    children: [
      { path: 'login', element: <LoginPage /> },
      { path: 'register', element: <RegisterPage /> },
    ],
  },
  {
    path: '/splash',
    element: <SplashPage />,
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
]);

export default router;
```

### 4.2 Zustand pour la Gestion d'État

**Pourquoi ?**
- Léger et performant
- API simple et intuitive
- Pas besoin de providers imbriqués
- Support de la persistance
- Middlewares puissants

**Comparaison avec Redux** :
| Critère | Zustand | Redux |
|---------|---------|-------|
| Taille | ~2kB | ~15kB |
| Boilerplate | Minimal | Important |
| Learning Curve | Facile | Moyenne |
| DevTools | Oui | Oui |
| Persistence | Intégrée | Nécessite middleware |

### 4.3 Tailwind CSS

**Pourquoi ?**
- Productivité accrue
- Cohérence du design
- Pas de nommage de classes
- Personnalisation facile
- Support JIT (Just-In-Time)

**Configuration** :
```javascript
// tailwind.config.js
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#ecfdf5',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
          800: '#166534',
          900: '#14532d',
        },
        secondary: {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#22c55e',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
```

### 4.4 Vite comme Bundler

**Pourquoi ?**
- Démarrage ultra-rapide
- HMR (Hot Module Replacement) instantané
- Configuration minimale
- Support natif TypeScript
- Optimisation de production

**Avantages par rapport à Create React App** :
- Pas de dépendance à webpack
- Configuration plus simple
- Meilleure performance
- Support natif ESM

### 4.5 Pattern de Feature-based Structure

**Pourquoi ?**
- Meilleure organisation du code
- Isolation des fonctionnalités
- Facilité de maintenance
- Évolutivité
- Collaboration d'équipe

**Exemple** :
```
src/features/cart/
├── components/
│   ├── CartItem.tsx
│   ├── CartSummary.tsx
│   └── CartEmpty.tsx
├── hooks/
│   ├── useCart.ts
│   └── useCartActions.ts
├── services/
│   └── cartService.ts
├── types/
│   └── cartTypes.ts
└── index.ts
```

---

## 5. Gestion d'État avec Zustand

### Stores Implémentés

#### 5.1 Auth Store

```typescript
// src/stores/authStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

interface AuthActions {
  setUser: (user: User | null) => void;
  setToken: (token: string | null) => void;
  login: (user: User, token: string) => void;
  logout: () => void;
  setLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
  clearError: () => void;
}

type AuthStore = AuthState & AuthActions;

const initialState: AuthState = {
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
};

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      ...initialState,
      setUser: (user) => set({ user, isAuthenticated: !!user }),
      setToken: (token) => set({ token }),
      login: (user, token) =>
        set({
          user,
          token,
          isAuthenticated: true,
          isLoading: false,
          error: null,
        }),
      logout: () =>
        set({
          ...initialState,
        }),
      setLoading: (isLoading) => set({ isLoading }),
      setError: (error) => set({ error, isLoading: false }),
      clearError: () => set({ error: null }),
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);

// Sélecteurs pour optimiser les re-renders
export const selectUser = (state: AuthStore) => state.user;
export const selectIsAuthenticated = (state: AuthStore) => state.isAuthenticated;
export const selectIsLoading = (state: AuthStore) => state.isLoading;
export const selectError = (state: AuthStore) => state.error;
```

#### 5.2 Cart Store

```typescript
// src/stores/cartStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Cart, CartItem } from '../types/cartTypes';

interface CartState {
  cart: Cart;
}

interface CartActions {
  addItem: (item: CartItem) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  setVendor: (vendorId: string) => void;
  clearVendor: () => void;
}

type CartStore = CartState & CartActions;

const initialState: CartState = {
  cart: {
    items: [],
    vendorId: null,
    vendorName: null,
  },
};

export const useCartStore = create<CartStore>()(
  persist(
    (set) => ({
      ...initialState,
      addItem: (item) =>
        set((state) => {
          const existingIndex = state.cart.items.findIndex(
            (i) => i.productId === item.productId
          );
          
          let newItems: CartItem[];
          
          if (existingIndex >= 0) {
            newItems = [...state.cart.items];
            newItems[existingIndex] = {
              ...newItems[existingIndex],
              quantity: newItems[existingIndex].quantity + item.quantity,
            };
          } else {
            newItems = [...state.cart.items, item];
          }
          
          return {
            cart: {
              items: newItems,
              vendorId: item.vendorId,
              vendorName: item.vendorName,
            },
          };
        }),
      removeItem: (productId) =>
        set((state) => ({
          cart: {
            ...state.cart,
            items: state.cart.items.filter((item) => item.productId !== productId),
          },
        })),
      updateQuantity: (productId, quantity) =>
        set((state) => ({
          cart: {
            ...state.cart,
            items: state.cart.items.map((item) =>
              item.productId === productId ? { ...item, quantity } : item
            ),
          },
        })),
      clearCart: () =>
        set({
          cart: {
            items: [],
            vendorId: null,
            vendorName: null,
          },
        }),
      setVendor: (vendorId) =>
        set((state) => ({
          cart: {
            ...state.cart,
            vendorId,
          },
        })),
      clearVendor: () =>
        set((state) => ({
          cart: {
            ...state.cart,
            vendorId: null,
            vendorName: null,
          },
        })),
    }),
    {
      name: 'cart-storage',
      version: 2,
      migrate: (persistedState, version) => {
        if (version === 1) {
          // Migration de la version 1 à 2
          return {
            ...persistedState,
            cart: {
              ...persistedState.cart,
              vendorName: persistedState.cart.vendorName || null,
            },
          };
        }
        return persistedState;
      },
    }
  )
);

// Sélecteurs
export const selectCart = (state: CartStore) => state.cart;
export const selectCartItems = (state: CartStore) => state.cart.items;
export const selectCartTotal = (state: CartStore) =>
  state.cart.items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
export const selectCartItemCount = (state: CartStore) =>
  state.cart.items.reduce((count, item) => count + item.quantity, 0);
export const selectCartVendor = (state: CartStore) => ({
  id: state.cart.vendorId,
  name: state.cart.vendorName,
});
```

#### 5.3 Order Store

```typescript
// src/stores/orderStore.ts
import { create } from 'zustand';
import { Order, OrderStatus, PaymentStatus } from '../types/orderTypes';

interface OrderState {
  orders: Order[];
  currentOrder: Order | null;
  isLoading: boolean;
  error: string | null;
}

interface OrderActions {
  setOrders: (orders: Order[]) => void;
  addOrder: (order: Order) => void;
  updateOrder: (orderId: string, updates: Partial<Order>) => void;
  setCurrentOrder: (order: Order | null) => void;
  setLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
  clearError: () => void;
}

type OrderStore = OrderState & OrderActions;

const initialState: OrderState = {
  orders: [],
  currentOrder: null,
  isLoading: false,
  error: null,
};

export const useOrderStore = create<OrderStore>()((set) => ({
  ...initialState,
  setOrders: (orders) => set({ orders, isLoading: false }),
  addOrder: (order) =>
    set((state) => ({
      orders: [order, ...state.orders],
      currentOrder: order,
      isLoading: false,
    })),
  updateOrder: (orderId, updates) =>
    set((state) => ({
      orders: state.orders.map((order) =>
        order.id === orderId ? { ...order, ...updates } : order
      ),
      currentOrder:
        state.currentOrder?.id === orderId
          ? { ...state.currentOrder, ...updates }
          : state.currentOrder,
    })),
  setCurrentOrder: (order) => set({ currentOrder: order }),
  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error, isLoading: false }),
  clearError: () => set({ error: null }),
}));

// Sélecteurs
export const selectOrders = (state: OrderStore) => state.orders;
export const selectCurrentOrder = (state: OrderStore) => state.currentOrder;
export const selectPendingOrders = (state: OrderStore) =>
  state.orders.filter(
    (order) =>
      order.status === OrderStatus.PENDING ||
      order.status === OrderStatus.PREPARING ||
      order.status === OrderStatus.READY
  );
export const selectCompletedOrders = (state: OrderStore) =>
  state.orders.filter(
    (order) =>
      order.status === OrderStatus.COMPLETED ||
      order.status === OrderStatus.CANCELLED
  );
```

#### 5.4 Vendor Store

```typescript
// src/stores/vendorStore.ts
import { create } from 'zustand';
import { Vendor } from '../types/vendorTypes';

interface VendorState {
  vendors: Vendor[];
  currentVendor: Vendor | null;
  isLoading: boolean;
  error: string | null;
}

interface VendorActions {
  setVendors: (vendors: Vendor[]) => void;
  setCurrentVendor: (vendor: Vendor | null) => void;
  setLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
  clearError: () => void;
}

type VendorStore = VendorState & VendorActions;

const initialState: VendorState = {
  vendors: [],
  currentVendor: null,
  isLoading: false,
  error: null,
};

export const useVendorStore = create<VendorStore>()((set) => ({
  ...initialState,
  setVendors: (vendors) => set({ vendors, isLoading: false }),
  setCurrentVendor: (vendor) => set({ currentVendor: vendor }),
  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error, isLoading: false }),
  clearError: () => set({ error: null }),
}));

// Sélecteurs
export const selectVendors = (state: VendorStore) => state.vendors;
export const selectCurrentVendor = (state: VendorStore) => state.currentVendor;
export const selectOpenVendors = (state: VendorStore) =>
  state.vendors.filter((vendor) => vendor.isOpen);
export const selectVendorById = (vendorId: string) => (state: VendorStore) =>
  state.vendors.find((vendor) => vendor.id === vendorId) || null;
```

#### 5.5 UI Store

```typescript
// src/stores/uiStore.ts
import { create } from 'zustand';

interface UIState {
  isSidebarOpen: boolean;
  isModalOpen: boolean;
  modalContent: React.ReactNode | null;
  toast: { message: string; type: 'success' | 'error' | 'info' | 'warning' } | null;
  theme: 'light' | 'dark';
}

interface UIActions {
  toggleSidebar: () => void;
  setSidebarOpen: (isOpen: boolean) => void;
  openModal: (content: React.ReactNode) => void;
  closeModal: () => void;
  showToast: (message: string, type: UIState['toast']['type']) => void;
  hideToast: () => void;
  toggleTheme: () => void;
  setTheme: (theme: UIState['theme']) => void;
}

type UIStore = UIState & UIActions;

const initialState: UIState = {
  isSidebarOpen: false,
  isModalOpen: false,
  modalContent: null,
  toast: null,
  theme: 'light',
};

export const useUIStore = create<UIStore>()(
  persist(
    (set) => ({
      ...initialState,
      toggleSidebar: () =>
        set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
      setSidebarOpen: (isOpen) => set({ isSidebarOpen: isOpen }),
      openModal: (content) =>
        set({ isModalOpen: true, modalContent: content }),
      closeModal: () => set({ isModalOpen: false, modalContent: null }),
      showToast: (message, type = 'info') =>
        set({ toast: { message, type } }),
      hideToast: () => set({ toast: null }),
      toggleTheme: () =>
        set((state) => ({ theme: state.theme === 'light' ? 'dark' : 'light' })),
      setTheme: (theme) => set({ theme }),
    }),
    {
      name: 'ui-storage',
      partialize: (state) => ({
        theme: state.theme,
      }),
    }
  )
);

// Sélecteurs
export const selectIsSidebarOpen = (state: UIStore) => state.isSidebarOpen;
export const selectIsModalOpen = (state: UIStore) => state.isModalOpen;
export const selectModalContent = (state: UIStore) => state.modalContent;
export const selectToast = (state: UIStore) => state.toast;
export const selectTheme = (state: UIStore) => state.theme;
```

---

## 6. Flux de Données

### 6.1 Pattern de Communication

```
┌─────────────────────┐
│      Component       │
│                     │
│  1. Appel Hook     │───────────────────────────────────▶
│                     │                                   │
└─────────────────────┘                                   │
                                                        │
                                                        ▼
┌─────────────────────┐    ┌─────────────────────┐
│       Hook           │    │      Service         │
│                     │    │                     │
│  2. Appel Service  │───▶│  3. Logique Métier   │
│                     │    │                     │
└─────────────────────┘    └─────────────────────┘
                            │
                            ▼
                    ┌─────────────────────┐
                    │    Repository        │
                    │                     │
                    │  4. Accès Données   │
                    │  (Mock ou API)       │
                    └─────────────────────┘
                            │
                            ▼
                    ┌─────────────────────┐
                    │      Store           │
                    │  (Zustand)           │
                    │                     │
                    │  5. Mise à jour      │
                    │  de l'état global    │
                    └─────────────────────┘
                            │
                            ▼
                    ┌─────────────────────┐
                    │      Component       │
                    │                     │
                    │  6. Re-render avec   │
                    │  les nouvelles données│
                    └─────────────────────┘
```

### 6.2 Exemple Complet : Ajout au Panier

```
┌─────────────────────────────────────────────────────────────┐
│ 1. ProductCard.tsx (Component)                               │
│    - Affiche le produit avec bouton "Ajouter au panier"       │
│    - Appelle useCart() hook                                  │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│ 2. useCart.ts (Hook)                                         │
│    - Contient la logique d'ajout au panier                    │
│    - Appelle cartService.addItem()                            │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│ 3. cartService.ts (Service)                                  │
│    - Vérifie si le produit appartient au même vendeur        │
│    - Si OUI : appelle cartRepository.addItem()                │
│    - Si NON : ouvre VendorSwitchDialog                        │
└─────────────────────────────────────────────────────────────┘
                            │
            ┌───────────────────┴───────────────────┐
            │                                       │
            ▼                                       ▼
┌─────────────────────┐           ┌─────────────────────┐
│ cartRepository.ts    │           │ VendorSwitchDialog    │
│ (Mock Implementation)│           │                      │
│ - Ajoute l'item     │           │ - Affiche options :   │
│   au store Zustand   │           │   - Garder mon panier │
│ - Retourne succès   │           │   - Vider et ajouter   │
└─────────────────────┘           └─────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│ 4. useCartStore (Zustand Store)                              │
│    - Met à jour l'état du panier                              │
│    - Persiste dans localStorage                               │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│ 5. ProductCard.tsx (Re-render)                               │
│    - Affiche le toast de confirmation                          │
│    - Met à jour l'icône du panier                             │
└─────────────────────────────────────────────────────────────┘
```

### 6.3 Implémentation du Hook useCart

```typescript
// src/features/cart/hooks/useCart.ts
import { useCallback } from 'react';
import { useCartStore } from '../../../stores/cartStore';
import { useUIStore } from '../../../stores/uiStore';
import { CartItem } from '../types/cartTypes';
import { useVendorStore } from '../../vendors/stores/vendorStore';

interface AddToCartParams {
  productId: string;
  productName: string;
  price: number;
  quantity: number;
  vendorId: string;
  vendorName: string;
  image?: string;
}

export const useCart = () => {
  const {
    cart,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    setVendor,
    clearVendor,
  } = useCartStore();
  
  const { showToast } = useUIStore();
  const { currentVendor, setCurrentVendor: setStoreCurrentVendor } = useVendorStore();

  const addToCart = useCallback(
    ({ productId, productName, price, quantity, vendorId, vendorName, image }: AddToCartParams) => {
      // Vérifier si le panier a déjà un vendeur
      if (cart.vendorId && cart.vendorId !== vendorId) {
        // Ouvrir le dialogue de changement de vendeur
        // (implémentation via modal ou toast)
        showToast(
          `Votre panier contient des produits de ${cart.vendorName}. Voulez-vous vider le panier pour ajouter ce produit ?`,
          'warning'
        );
        return false;
      }

      const newItem: CartItem = {
        productId,
        productName,
        price,
        quantity,
        vendorId,
        vendorName,
        image,
      };

      addItem(newItem);
      setVendor(vendorId);
      setStoreCurrentVendor({ id: vendorId, name: vendorName, isOpen: true });
      
      showToast(`${productName} ajouté au panier`, 'success');
      return true;
    },
    [cart, addItem, setVendor, setStoreCurrentVendor, showToast]
  );

  const removeFromCart = useCallback(
    (productId: string) => {
      removeItem(productId);
      showToast('Produit retiré du panier', 'info');
    },
    [removeItem, showToast]
  );

  const updateCartItemQuantity = useCallback(
    (productId: string, quantity: number) => {
      if (quantity <= 0) {
        removeItem(productId);
        showToast('Produit retiré du panier', 'info');
      } else {
        updateQuantity(productId, quantity);
        showToast('Quantité mise à jour', 'info');
      }
    },
    [removeItem, updateQuantity, showToast]
  );

  const clearCartItems = useCallback(() => {
    clearCart();
    clearVendor();
    showToast('Panier vidé', 'info');
  }, [clearCart, clearVendor, showToast]);

  return {
    cart,
    addToCart,
    removeFromCart,
    updateCartItemQuantity,
    clearCartItems,
  };
};
```

---

## 7. Gestion des Erreurs

### 7.1 Types d'Erreurs

```typescript
// src/types/errors.ts
export enum ErrorType {
  NETWORK_ERROR = 'NETWORK_ERROR',
  VALIDATION_ERROR = 'VALIDATION_ERROR',
  AUTH_ERROR = 'AUTH_ERROR',
  NOT_FOUND_ERROR = 'NOT_FOUND_ERROR',
  CONFLICT_ERROR = 'CONFLICT_ERROR',
  SERVER_ERROR = 'SERVER_ERROR',
  UNKNOWN_ERROR = 'UNKNOWN_ERROR',
}

export interface AppError {
  type: ErrorType;
  message: string;
  code?: string;
  details?: Record<string, string[]>;
  timestamp: Date;
}

export class AppError extends Error {
  constructor(
    message: string,
    public type: ErrorType,
    public code?: string,
    public details?: Record<string, string[]>
  ) {
    super(message);
    this.name = 'AppError';
    this.timestamp = new Date();
  }
}
```

### 7.2 Middleware de Gestion des Erreurs

```typescript
// src/lib/errorHandler.ts
import { AppError, ErrorType } from '../types/errors';

export const handleError = (error: unknown): AppError => {
  if (error instanceof AppError) {
    return error;
  }

  if (error instanceof Error) {
    if (error.name === 'ValidationError') {
      return new AppError(
        error.message,
        ErrorType.VALIDATION_ERROR,
        undefined,
        // Extraire les détails de validation si disponibles
        'details' in error ? (error as any).details : undefined
      );
    }

    if (error.name === 'AxiosError') {
      const axiosError = error as any;
      const status = axiosError.response?.status;

      if (status === 401) {
        return new AppError(
          'Non autorisé. Veuillez vous connecter.',
          ErrorType.AUTH_ERROR,
          'UNAUTHORIZED'
        );
      }

      if (status === 404) {
        return new AppError(
          'Ressource non trouvée.',
          ErrorType.NOT_FOUND_ERROR,
          'NOT_FOUND'
        );
      }

      if (status === 409) {
        return new AppError(
          'Conflit de données.',
          ErrorType.CONFLICT_ERROR,
          'CONFLICT'
        );
      }

      if (status >= 500) {
        return new AppError(
          'Erreur serveur. Veuillez réessayer plus tard.',
          ErrorType.SERVER_ERROR,
          'SERVER_ERROR'
        );
      }

      return new AppError(
        axiosError.response?.data?.message || error.message,
        ErrorType.NETWORK_ERROR,
        'NETWORK_ERROR'
      );
    }
  }

  // Erreur inconnue
  return new AppError(
    'Une erreur inattendue est survenue.',
    ErrorType.UNKNOWN_ERROR,
    'UNKNOWN_ERROR'
  );
};

export const formatErrorMessage = (error: AppError): string => {
  switch (error.type) {
    case ErrorType.VALIDATION_ERROR:
      if (error.details) {
        return Object.values(error.details)
          .flat()
          .join(', ');
      }
      return error.message;
    case ErrorType.AUTH_ERROR:
      return 'Session expirée. Veuillez vous reconnecter.';
    case ErrorType.NETWORK_ERROR:
      return 'Problème de connexion. Vérifiez votre réseau.';
    default:
      return error.message;
  }
};
```

### 7.3 Boundary d'Erreur

```tsx
// src/shared/components/ErrorBoundary.tsx
import React, { Component, ErrorInfo, ReactNode } from 'react';
import { ErrorState } from './ErrorState';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }
  }

  render(): ReactNode {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }
      return (
        <ErrorState
          error={this.state.error}
          onRetry={() => this.setState({ hasError: false, error: null })}
        />
      );
    }

    return this.props.children;
  }
}
```

### 7.4 Composant ErrorState

```tsx
// src/shared/components/ErrorState.tsx
import React from 'react';
import { Button } from './ui/Button';

interface ErrorStateProps {
  error?: Error | null;
  message?: string;
  onRetry?: () => void;
  onGoBack?: () => void;
}

export const ErrorState: React.FC<ErrorStateProps> = ({
  error,
  message,
  onRetry,
  onGoBack,
}) => {
  const errorMessage = message || error?.message || 'Une erreur est survenue';

  return (
    <div className="flex flex-col items-center justify-center min-h-[300px] py-12 px-4">
      <div className="mb-6">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-16 w-16 text-red-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </div>
      
      <h3 className="text-lg font-semibold text-gray-900 mb-2">
        Oups ! Quelque chose s'est mal passé
      </h3>
      
      <p className="text-gray-600 text-center mb-6 max-w-md">
        {errorMessage}
      </p>
      
      <div className="flex gap-4">
        {onRetry && (
          <Button variant="primary" onClick={onRetry}>
            Réessayer
          </Button>
        )}
        {onGoBack && (
          <Button variant="secondary" onClick={onGoBack}>
            Retour
          </Button>
        )}
      </div>
    </div>
  );
};
```

---

## 8. Accessibilité

### 8.1 Principes de Base

✅ **Sémantique HTML** : Utiliser les balises HTML appropriées (`button`, `nav`, `main`, `article`, etc.)  
✅ **ARIA** : Utiliser les attributs ARIA quand nécessaire  
✅ **Contraste** : Respecter le ratio de contraste WCAG (4.5:1 pour le texte normal)  
✅ **Navigation clavier** : Tout doit être accessible via le clavier  
✅ **Focus visible** : Toujours afficher un focus visible  
✅ **Textes alternatifs** : Toujours fournir des `alt` pour les images  
✅ **Formulaires** : Associer les labels aux inputs  

### 8.2 Exemple : Bouton Accessible

```tsx
// ❌ Mauvaise pratique
<button onClick={handleClick} className="bg-green-500 text-white p-2 rounded">
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
    <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
  </svg>
</button>

// ✅ Bonne pratique
<button
  onClick={handleClick}
  className="bg-green-500 text-white p-2 rounded focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
  aria-label="Ajouter au panier"
>
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
    <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
  </svg>
</button>
```

### 8.3 Exemple : Formulaire Accessible

```tsx
// ✅ Formulaire accessible
<form onSubmit={handleSubmit} className="space-y-6">
  <div>
    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
      Adresse email
    </label>
    <input
      type="email"
      id="email"
      name="email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
      aria-describedby="email-error"
      aria-invalid={!!errors.email}
      required
    />
    {errors.email && (
      <p id="email-error" className="mt-1 text-sm text-red-600">
        {errors.email}
      </p>
    )}
  </div>
  
  <div>
    <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
      Mot de passe
    </label>
    <input
      type="password"
      id="password"
      name="password"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
      aria-describedby="password-error"
      aria-invalid={!!errors.password}
      required
    />
    {errors.password && (
      <p id="password-error" className="mt-1 text-sm text-red-600">
        {errors.password}
      </p>
    )}
  </div>
  
  <button
    type="submit"
    className="w-full bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
    disabled={isSubmitting}
  >
    {isSubmitting ? 'Connexion en cours...' : 'Se connecter'}
  </button>
</form>
```

### 8.4 Exemple : Navigation Accessible

```tsx
// ✅ Navigation accessible
<nav aria-label="Navigation principale">
  <ul className="flex space-x-8">
    <li>
      <NavLink
        to="/"
        className={({ isActive }) =>
          `text-sm font-medium transition-colors ${
            isActive ? 'text-green-600' : 'text-gray-600 hover:text-gray-900'
          }`
        }
        aria-current={({ isActive }) => (isActive ? 'page' : undefined)}
      >
        Accueil
      </NavLink>
    </li>
    <li>
      <NavLink
        to="/explore"
        className={({ isActive }) =>
          `text-sm font-medium transition-colors ${
            isActive ? 'text-green-600' : 'text-gray-600 hover:text-gray-900'
          }`
        }
      >
        Explorer
      </NavLink>
    </li>
    <li>
      <NavLink
        to="/orders"
        className={({ isActive }) =>
          `text-sm font-medium transition-colors ${
            isActive ? 'text-green-600' : 'text-gray-600 hover:text-gray-900'
          }`
        }
      >
        Commandes
      </NavLink>
    </li>
    <li>
      <NavLink
        to="/profile"
        className={({ isActive }) =>
          `text-sm font-medium transition-colors ${
            isActive ? 'text-green-600' : 'text-gray-600 hover:text-gray-900'
          }`
        }
      >
        Profil
      </NavLink>
    </li>
  </ul>
</nav>
```

### 8.5 Exemple : Modal Accessible

```tsx
// ✅ Modal accessible
import React, { useEffect, useRef } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.addEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'auto';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-50"
      aria-hidden="true"
    >
      <div
        className="fixed inset-0 flex items-center justify-center p-4"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        ref={modalRef}
      >
        <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
          <div className="flex justify-between items-center p-6 border-b">
            <h2 id="modal-title" className="text-xl font-semibold text-gray-900">
              {title}
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500"
              aria-label="Fermer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <div className="p-6">{children}</div>
        </div>
      </div>
    </div>
  );
};
```

---

## 9. Performance

### 9.1 Optimisations Implémentées

✅ **React.memo** : Pour les composants purs  
✅ **useMemo** : Pour les calculs coûteux  
✅ **useCallback** : Pour les fonctions de rappel  
✅ **Sélecteurs Zustand** : Pour éviter les re-renders inutiles  
✅ **Lazy Loading** : Pour les routes et composants lourds  
✅ **Code Splitting** : Avec React.lazy et Suspense  
✅ **Images optimisées** : Compression et formats modernes (WebP)  
✅ **SVG inline** : Pour les petites icônes  
✅ **Debounce/Throttle** : Pour les recherches et scrolls  
✅ **Virtualisation** : Pour les longues listes (react-window)  

### 9.2 Exemple : Lazy Loading des Pages

```tsx
// src/app/router.tsx
import { lazy, Suspense } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import Layout from '../shared/components/layout/Layout';
import LoadingSpinner from '../shared/components/ui/Spinner';

// Lazy loading des pages
const HomePage = lazy(() => import('../pages/HomePage'));
const ExplorePage = lazy(() => import('../pages/ExplorePage'));
const VendorPage = lazy(() => import('../pages/VendorPage'));
const ProductPage = lazy(() => import('../pages/ProductPage'));
const CartPage = lazy(() => import('../pages/CartPage'));
const CheckoutPage = lazy(() => import('../pages/CheckoutPage'));
const OrdersPage = lazy(() => import('../pages/OrdersPage'));
const OrderDetailPage = lazy(() => import('../pages/OrderDetailPage'));
const OrderSuccessPage = lazy(() => import('../pages/OrderSuccessPage'));
const LoginPage = lazy(() => import('../pages/LoginPage'));
const RegisterPage = lazy(() => import('../pages/RegisterPage'));
const ProfilePage = lazy(() => import('../pages/ProfilePage'));
const SettingsPage = lazy(() => import('../pages/SettingsPage'));
const SplashPage = lazy(() => import('../pages/SplashPage'));
const NotFoundPage = lazy(() => import('../pages/NotFoundPage'));

// Composant de fallback pour le lazy loading
const PageSuspense = ({ children }: { children: React.ReactNode }) => (
  <Suspense fallback={<LoadingSpinner fullScreen />}>{children}</Suspense>
);

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: (
          <PageSuspense>
            <HomePage />
          </PageSuspense>
        ),
      },
      {
        path: 'explore',
        element: (
          <PageSuspense>
            <ExplorePage />
          </PageSuspense>
        ),
      },
      {
        path: 'vendors/:id',
        element: (
          <PageSuspense>
            <VendorPage />
          </PageSuspense>
        ),
      },
      // ... autres routes
    ],
  },
  // ... autres configurations
]);

export default router;
```

### 9.3 Exemple : useMemo et useCallback

```tsx
// src/features/products/components/ProductGrid.tsx
import React, { useMemo, useCallback } from 'react';
import { ProductCard } from './ProductCard';
import { Product } from '../types/productTypes';

interface ProductGridProps {
  products: Product[];
  onAddToCart: (product: Product) => void;
}

export const ProductGrid: React.FC<ProductGridProps> = React.memo({
  products,
  onAddToCart,
}) => {
  // Memoize le composant ProductCard pour éviter les re-renders inutiles
  const MemoizedProductCard = useMemo(
    () => React.memo(ProductCard),
    []
  );

  // Memoize la fonction onAddToCart pour chaque produit
  const handleAddToCart = useCallback(
    (product: Product) => {
      onAddToCart(product);
    },
    [onAddToCart]
  );

  // Memoize la liste filtrée des produits disponibles
  const availableProducts = useMemo(
    () => products.filter((product) => product.isAvailable),
    [products]
  );

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {availableProducts.map((product) => (
        <MemoizedProductCard
          key={product.id}
          product={product}
          onAddToCart={handleAddToCart}
        />
      ))}
    </div>
  );
};

ProductGrid.displayName = 'ProductGrid';
```

### 9.4 Exemple : Debounce pour la Recherche

```typescript
// src/shared/hooks/useDebounce.ts
import { useState, useEffect } from 'react';

export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}
```

```tsx
// src/features/explore/components/SearchBar.tsx
import React, { useState, useCallback } from 'react';
import { useDebounce } from '../../../shared/hooks/useDebounce';
import { useVendorStore } from '../../vendors/stores/vendorStore';

export const SearchBar: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  const { setVendors } = useVendorStore();

  const handleSearch = useCallback(
    (term: string) => {
      // Ici, on pourrait appeler une API pour filtrer les résultats
      // Pour l'instant, on utilise le mock
      if (term.trim() === '') {
        // Recharger tous les vendeurs
        // setVendors(allVendors);
      } else {
        // Filtrer les vendeurs
        // const filtered = allVendors.filter(vendor =>
        //   vendor.name.toLowerCase().includes(term.toLowerCase())
        // );
        // setVendors(filtered);
      }
    },
    [setVendors]
  );

  useEffect(() => {
    handleSearch(debouncedSearchTerm);
  }, [debouncedSearchTerm, handleSearch]);

  return (
    <div className="relative">
      <input
        type="text"
        placeholder="Rechercher des boutiques..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
        aria-label="Rechercher des boutiques"
      />
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 text-gray-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>
    </div>
  );
};
```

---

## 10. Sécurité

### 10.1 Bonnes Pratiques Implémentées

✅ **Sanitization** : Nettoyage des inputs utilisateur  
✅ **Validation** : Validation côté client et serveur  
✅ **Storage Sécurisé** : Utilisation de httpOnly cookies pour les tokens  
✅ **Protection CSRF** : Tokens CSRF pour les formulaires  
✅ **CORS** : Configuration stricte des headers CORS  
✅ **Rate Limiting** : Limitation des requêtes API  
✅ **Helmet** : Protection des headers HTTP  
✅ **Content Security Policy** : CSP pour prévenir XSS  
✅ **Sensitive Data** : Ne jamais stocker de données sensibles dans le localStorage  

### 10.2 Exemple : Validation des Inputs

```typescript
// src/shared/lib/validators.ts
export const validateEmail = (email: string): { isValid: boolean; error?: string } => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email) {
    return { isValid: false, error: 'L\'email est requis' };
  }
  if (!emailRegex.test(email)) {
    return { isValid: false, error: 'Format d\'email invalide' };
  }
  return { isValid: true };
};

export const validatePassword = (password: string): { isValid: boolean; error?: string } => {
  if (!password) {
    return { isValid: false, error: 'Le mot de passe est requis' };
  }
  if (password.length < 8) {
    return { isValid: false, error: 'Le mot de passe doit contenir au moins 8 caractères' };
  }
  if (!/[A-Z]/.test(password)) {
    return { isValid: false, error: 'Le mot de passe doit contenir au moins une majuscule' };
  }
  if (!/[0-9]/.test(password)) {
    return { isValid: false, error: 'Le mot de passe doit contenir au moins un chiffre' };
  }
  if (!/[^A-Za-z0-9]/.test(password)) {
    return { isValid: false, error: 'Le mot de passe doit contenir au moins un caractère spécial' };
  }
  return { isValid: true };
};

export const validatePhone = (phone: string): { isValid: boolean; error?: string } => {
  const phoneRegex = /^\+?[0-9\s-]{10,}$/;
  if (!phone) {
    return { isValid: false, error: 'Le numéro de téléphone est requis' };
  }
  if (!phoneRegex.test(phone)) {
    return { isValid: false, error: 'Format de téléphone invalide' };
  }
  return { isValid: true };
};
```

### 10.3 Exemple : Sanitization

```typescript
// src/shared/lib/sanitize.ts
import DOMPurify from 'dompurify';

export const sanitizeInput = (input: string): string => {
  return DOMPurify.sanitize(input, {
    ALLOWED_TAGS: [], // Aucun tag HTML autorisé
    ALLOWED_ATTR: [], // Aucun attribut autorisé
  });
};

export const sanitizeHTML = (html: string): string => {
  return DOMPurify.sanitize(html, {
    ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'p', 'br', 'ul', 'ol', 'li'],
    ALLOWED_ATTR: [],
  });
};

export const sanitizeURL = (url: string): string => {
  try {
    const parsed = new URL(url);
    // Vérifier que l'URL utilise http ou https
    if (!['http:', 'https:'].includes(parsed.protocol)) {
      return '';
    }
    return url;
  } catch {
    return '';
  }
};
```

### 10.4 Exemple : Protection des Tokens

```typescript
// src/shared/lib/tokenManager.ts
// NE JAMAIS stocker les tokens dans localStorage !
// Utiliser httpOnly cookies ou sessionStorage avec prudence

const TOKEN_KEY = 'food-campus-token';
const REFRESH_TOKEN_KEY = 'food-campus-refresh-token';

export const setToken = (token: string, refreshToken?: string): void => {
  // En production, utiliser des cookies httpOnly
  // Pour le développement, on utilise sessionStorage
  if (typeof window !== 'undefined') {
    sessionStorage.setItem(TOKEN_KEY, token);
    if (refreshToken) {
      sessionStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
    }
  }
};

export const getToken = (): string | null => {
  if (typeof window !== 'undefined') {
    return sessionStorage.getItem(TOKEN_KEY);
  }
  return null;
};

export const getRefreshToken = (): string | null => {
  if (typeof window !== 'undefined') {
    return sessionStorage.getItem(REFRESH_TOKEN_KEY);
  }
  return null;
};

export const clearTokens = (): void => {
  if (typeof window !== 'undefined') {
    sessionStorage.removeItem(TOKEN_KEY);
    sessionStorage.removeItem(REFRESH_TOKEN_KEY);
  }
};

export const hasToken = (): boolean => {
  return !!getToken();
};
```

---

## 11. Internationalisation (i18n)

### 11.1 Configuration de base

```typescript
// src/i18n/config.ts
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Import des traductions
import frTranslations from './locales/fr/translation.json';
import enTranslations from './locales/en/translation.json';

// Configuration
i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      fr: {
        translation: frTranslations,
      },
      en: {
        translation: enTranslations,
      },
    },
    fallbackLng: 'fr',
    debug: import.meta.env.DEV,
    interpolation: {
      escapeValue: false, // React protège déjà contre XSS
    },
    detection: {
      order: ['navigator', 'localStorage', 'htmlTag', 'path', 'subdomain'],
      caches: ['localStorage'],
    },
  });

export default i18n;
```

### 11.2 Structure des Fichiers de Traduction

```
src/
├── i18n/
│   ├── config.ts
│   ├── locales/
│   │   ├── fr/
│   │   │   └── translation.json
│   │   └── en/
│   │       └── translation.json
│   └── types.ts
```

### 11.3 Exemple : Fichier de Traduction

```json
// src/i18n/locales/fr/translation.json
{
  "common": {
    "appName": "Food Campus",
    "tagline": "Commandez. Récupérez. Dégustez.",
    "loading": "Chargement...",
    "error": "Erreur",
    "success": "Succès",
    "warning": "Attention",
    "noData": "Aucune donnée disponible",
    "back": "Retour",
    "save": "Enregistrer",
    "cancel": "Annuler",
    "confirm": "Confirmer",
    "delete": "Supprimer",
    "edit": "Modifier"
  },
  "auth": {
    "login": "Se connecter",
    "register": "S'inscrire",
    "logout": "Se déconnecter",
    "email": "Adresse email",
    "password": "Mot de passe",
    "rememberMe": "Se souvenir de moi",
    "forgotPassword": "Mot de passe oublié ?",
    "dontHaveAccount": "Vous n'avez pas de compte ?",
    "alreadyHaveAccount": "Vous avez déjà un compte ?",
    "fullName": "Nom complet",
    "phone": "Numéro de téléphone",
    "studentId": "Numéro étudiant",
    "createAccount": "Créer un compte",
    "loginError": "Email ou mot de passe incorrect",
    "registerSuccess": "Compte créé avec succès. Veuillez vous connecter."
  },
  "navigation": {
    "home": "Accueil",
    "explore": "Explorer",
    "orders": "Commandes",
    "profile": "Profil",
    "settings": "Paramètres",
    "cart": "Panier"
  },
  "home": {
    "welcome": "Bienvenue sur Food Campus",
    "description": "Découvrez les meilleures boutiques de votre campus",
    "featuredVendors": "Boutiques en vedette",
    "popularProducts": "Produits populaires",
    "viewAll": "Voir tout"
  },
  "explore": {
    "title": "Explorer les boutiques",
    "searchPlaceholder": "Rechercher des boutiques...",
    "categories": "Catégories",
    "all": "Tous",
    "food": "Nourriture",
    "drinks": "Boissons",
    "snacks": "Snacks",
    "noResults": "Aucune boutique trouvée",
    "open": "Ouvert",
    "closed": "Fermé"
  },
  "vendor": {
    "products": "Produits",
    "about": "À propos",
    "location": "Emplacement",
    "hours": "Heures d'ouverture",
    "rating": "Note",
    "reviews": "Avis",
    "menu": "Menu",
    "contact": "Contact"
  },
  "product": {
    "description": "Description",
    "price": "Prix",
    "quantity": "Quantité",
    "addToCart": "Ajouter au panier",
    "inStock": "En stock",
    "outOfStock": "Rupture de stock",
    "categories": "Catégories",
    "ingredients": "Ingrédients",
    "allergens": "Allergènes"
  },
  "cart": {
    "title": "Votre panier",
    "empty": "Votre panier est vide",
    "emptyDescription": "Ajoutez des produits pour commencer votre commande",
    "items": "Articles",
    "subtotal": "Sous-total",
    "delivery": "Livraison",
    "free": "Gratuit",
    "total": "Total",
    "checkout": "Passer à la caisse",
    "continueShopping": "Continuer vos achats",
    "clearCart": "Vider le panier",
    "remove": "Retirer",
    "update": "Mettre à jour"
  },
  "checkout": {
    "title": "Paiement",
    "orderSummary": "Récapitulatif de la commande",
    "deliveryInfo": "Informations de livraison",
    "paymentMethod": "Méthode de paiement",
    "cashOnDelivery": "Paiement en espèces à la livraison",
    "deliveryLocation": "Point de remise",
    "selectLocation": "Sélectionnez un point de remise",
    "deliveryInstructions": "Instructions de livraison (optionnel)",
    "placeholderInstructions": "Ex: Je serai à la bibliothèque à 14h...",
    "placeOrder": "Passer la commande",
    "orderPlaced": "Commande passée avec succès !",
    "orderNumber": "Numéro de commande",
    "thankYou": "Merci pour votre commande !",
    "confirmationMessage": "Votre commande a été enregistrée. Présentez le code QR au vendeur pour récupérer votre commande et payer en espèces."
  },
  "orders": {
    "title": "Mes commandes",
    "recent": "Commandes récentes",
    "past": "Commandes passées",
    "noOrders": "Vous n'avez pas encore de commandes",
    "orderNumber": "Commande n°{{id}}",
    "status": "Statut",
    "date": "Date",
    "total": "Total",
    "items": "Articles",
    "viewDetails": "Voir les détails",
    "reorder": "Commander à nouveau",
    "cancelOrder": "Annuler la commande",
    "trackOrder": "Suivre la commande"
  },
  "orderStatus": {
    "pending": "En attente",
    "preparing": "En préparation",
    "ready": "Prête",
    "delivered": "Livrée",
    "completed": "Complétée",
    "cancelled": "Annulée",
    "paymentPending": "Paiement en attente",
    "paymentReceived": "Paiement reçu"
  },
  "profile": {
    "title": "Mon profil",
    "editProfile": "Modifier le profil",
    "personalInfo": "Informations personnelles",
    "name": "Nom",
    "email": "Email",
    "phone": "Téléphone",
    "studentId": "Numéro étudiant",
    "update": "Mettre à jour",
    "changePassword": "Changer le mot de passe",
    "currentPassword": "Mot de passe actuel",
    "newPassword": "Nouveau mot de passe",
    "confirmPassword": "Confirmer le nouveau mot de passe",
    "notifications": "Notifications",
    "orderUpdates": "Mises à jour des commandes",
    "promotionalEmails": "Emails promotionnels"
  },
  "settings": {
    "title": "Paramètres",
    "language": "Langue",
    "theme": "Thème",
    "light": "Clair",
    "dark": "Sombre",
    "system": "Système",
    "notifications": "Notifications",
    "enableNotifications": "Activer les notifications",
    "version": "Version"
  },
  "errors": {
    "networkError": "Problème de connexion. Vérifiez votre réseau.",
    "serverError": "Erreur serveur. Veuillez réessayer plus tard.",
    "notFound": "Ressource non trouvée.",
    "unauthorized": "Non autorisé. Veuillez vous connecter.",
    "validationError": "Veuillez corriger les erreurs dans le formulaire.",
    "cartEmpty": "Votre panier est vide.",
    "vendorClosed": "Cette boutique est actuellement fermée.",
    "productUnavailable": "Ce produit n'est plus disponible.",
    "insufficientStock": "Stock insuffisant.",
    "differentVendor": "Votre panier contient des produits d'une autre boutique. Voulez-vous vider le panier pour ajouter ce produit ?"
  },
  "messages": {
    "addedToCart": "{{product}} ajouté au panier",
    "removedFromCart": "{{product}} retiré du panier",
    "cartCleared": "Panier vidé",
    "orderPlaced": "Commande passée avec succès !",
    "orderCancelled": "Commande annulée",
    "profileUpdated": "Profil mis à jour avec succès",
    "passwordChanged": "Mot de passe changé avec succès",
    "loggedIn": "Connexion réussie",
    "loggedOut": "Déconnexion réussie"
  }
}
```

### 11.4 Utilisation dans les Composants

```tsx
// src/features/auth/components/LoginForm.tsx
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '../../../shared/components/ui/Button';
import { Input } from '../../../shared/components/ui/Input';

export const LoginForm: React.FC = () => {
  const { t } = useTranslation();
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Logique de connexion
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
          {t('auth.email')}
        </label>
        <Input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="jean.dupont@unikin.ac.cd"
          aria-label={t('auth.email')}
          required
        />
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
          {t('auth.password')}
        </label>
        <Input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder={t('auth.password')}
          aria-label={t('auth.password')}
          required
        />
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <input
            id="remember-me"
            name="remember-me"
            type="checkbox"
            className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
          />
          <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
            {t('auth.rememberMe')}
          </label>
        </div>

        <div className="text-sm">
          <a href="#" className="font-medium text-green-600 hover:text-green-500">
            {t('auth.forgotPassword')}
          </a>
        </div>
      </div>

      <Button type="submit" variant="primary" className="w-full">
        {t('auth.login')}
      </Button>

      <p className="text-sm text-center text-gray-600">
        {t('auth.dontHaveAccount')}{' '}
        <a href="/register" className="font-medium text-green-600 hover:text-green-500">
          {t('auth.register')}
        </a>
      </p>
    </form>
  );
};
```

---

## 12. Thèmes et Personnalisation

### 12.1 Configuration du Thème

```typescript
// src/shared/styles/theme.ts
export const theme = {
  colors: {
    primary: {
      50: '#ecfdf5',
      100: '#dcfce7',
      200: '#bbf7d0',
      300: '#86efac',
      400: '#4ade80',
      500: '#22c55e',
      600: '#16a34a',
      700: '#15803d',
      800: '#166534',
      900: '#14532d',
    },
    secondary: {
      50: '#f0fdf4',
      100: '#dcfce7',
      200: '#bbf7d0',
      300: '#86efac',
      400: '#4ade80',
      500: '#22c55e',
    },
    success: {
      50: '#f0fdf4',
      100: '#dcfce7',
      200: '#bbf7d0',
      300: '#86efac',
      400: '#4ade80',
      500: '#22c55e',
      600: '#16a34a',
    },
    warning: {
      50: '#fffbeb',
      100: '#fef3c7',
      200: '#fde68a',
      300: '#fcd34d',
      400: '#fbbf24',
      500: '#f59e0b',
      600: '#d97706',
    },
    error: {
      50: '#fef2f2',
      100: '#fee2e2',
      200: '#fecaca',
      300: '#fca5a5',
      400: '#f87171',
      500: '#ef4444',
      600: '#dc2626',
    },
    neutral: {
      50: '#fafafa',
      100: '#f4f4f5',
      200: '#e4e4e7',
      300: '#d4d4d8',
      400: '#a1a1aa',
      500: '#71717a',
      600: '#52525b',
      700: '#3f3f46',
      800: '#27272a',
      900: '#18181b',
    },
  },
  font: {
    family: {
      sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      mono: ['Fira Code', 'Monaco', 'Consolas', 'monospace'],
    },
    size: {
      xs: '0.75rem',
      sm: '0.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem',
    },
    weight: {
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
    },
  },
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    '2xl': '3rem',
  },
  borderRadius: {
    none: '0',
    sm: '0.125rem',
    md: '0.25rem',
    lg: '0.375rem',
    xl: '0.5rem',
    '2xl': '0.75rem',
    full: '9999px',
  },
  shadows: {
    sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
    lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
    xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
  },
  transitions: {
    fast: '150ms ease',
    normal: '250ms ease',
    slow: '350ms ease',
  },
};

export type Theme = typeof theme;
```

### 12.2 Hook pour le Thème

```typescript
// src/shared/hooks/useTheme.ts
import { useCallback, useEffect } from 'react';
import { useUIStore } from '../stores/uiStore';

export const useTheme = () => {
  const { theme, setTheme } = useUIStore();

  const toggleTheme = useCallback(() => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.classList.remove(theme);
    document.documentElement.classList.add(newTheme);
  }, [theme, setTheme]);

  const setDarkTheme = useCallback(() => {
    setTheme('dark');
    document.documentElement.classList.remove('light');
    document.documentElement.classList.add('dark');
  }, [setTheme]);

  const setLightTheme = useCallback(() => {
    setTheme('light');
    document.documentElement.classList.remove('dark');
    document.documentElement.classList.add('light');
  }, [setTheme]);

  useEffect(() => {
    // Appliquer le thème au chargement
    document.documentElement.classList.add(theme);
  }, [theme]);

  return {
    theme,
    toggleTheme,
    setDarkTheme,
    setLightTheme,
    isDark: theme === 'dark',
  };
};
```

### 12.3 Configuration Tailwind pour le Dark Mode

```javascript
// tailwind.config.js
module.exports = {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#ecfdf5',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
          800: '#166534',
          900: '#14532d',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
```

```css
/* src/shared/styles/globals.css */
@tailwind base;
@tailwind components;
@tailwind utilities;

/* Styles pour le dark mode */
.dark {
  @apply bg-gray-900 text-gray-100;
}

.dark .bg-white {
  @apply bg-gray-800;
}

.dark .text-gray-900 {
  @apply text-white;
}

.dark .text-gray-600 {
  @apply text-gray-300;
}

.dark .text-gray-500 {
  @apply text-gray-400;
}

.dark .border-gray-300 {
  @apply border-gray-600;
}

.dark .bg-gray-50 {
  @apply bg-gray-800;
}

.dark .bg-gray-100 {
  @apply bg-gray-700;
}
```

---

## 13. Tests

### 13.1 Configuration des Tests

```json
// package.json
{
  "scripts": {
    "test": "vitest",
    "test:watch": "vitest watch",
    "test:coverage": "vitest run --coverage",
    "test:ui": "storybook",
    "test:ui:build": "storybook build"
  }
}
```

```typescript
// vite.config.ts
/// <reference types="vitest" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
    css: true,
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: ['node_modules/', 'src/test/'],
    },
  },
});
```

### 13.2 Fichier de Setup des Tests

```typescript
// src/test/setup.ts
import '@testing-library/jest-dom';
import { cleanup } from '@testing-library/react';
import { afterEach, beforeAll, afterAll } from 'vitest';

// Nettoyer après chaque test
afterEach(() => {
  cleanup();
});

// Mock des requêtes API
beforeAll(() => {
  // Mock global
});

afterAll(() => {
  // Nettoyage global
});
```

### 13.3 Exemple : Test de Composant

```typescript
// src/features/products/components/ProductCard.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { ProductCard } from './ProductCard';
import { Product } from '../types/productTypes';

const mockProduct: Product = {
  id: '1',
  name: 'Burger Complet',
  description: 'Pain, steak, fromage, salade',
  price: 1200,
  category: 'food',
  image: '/images/burger.jpg',
  isAvailable: true,
  stock: 10,
  vendorId: 'vendor-1',
  vendorName: 'Fresh Corner',
  createdAt: new Date(),
  updatedAt: new Date(),
};

describe('ProductCard', () => {
  it('renders product information correctly', () => {
    render(
      <ProductCard
        product={mockProduct}
        onAddToCart={vi.fn()}
      />
    );

    expect(screen.getByText('Burger Complet')).toBeInTheDocument();
    expect(screen.getByText('1200 FC')).toBeInTheDocument();
    expect(screen.getByText('Fresh Corner')).toBeInTheDocument();
    expect(screen.getByText('✓ En stock')).toBeInTheDocument();
  });

  it('calls onAddToCart when add button is clicked', () => {
    const mockAddToCart = vi.fn();
    render(
      <ProductCard
        product={mockProduct}
        onAddToCart={mockAddToCart}
      />
    );

    const addButton = screen.getByRole('button', { name: /ajouter au panier/i });
    fireEvent.click(addButton);

    expect(mockAddToCart).toHaveBeenCalledWith(mockProduct);
  });

  it('shows out of stock badge when product is not available', () => {
    const unavailableProduct = { ...mockProduct, isAvailable: false, stock: 0 };
    render(
      <ProductCard
        product={unavailableProduct}
        onAddToCart={vi.fn()}
      />
    );

    expect(screen.getByText('Rupture')).toBeInTheDocument();
  });

  it('disables add button when product is out of stock', () => {
    const unavailableProduct = { ...mockProduct, isAvailable: false, stock: 0 };
    render(
      <ProductCard
        product={unavailableProduct}
        onAddToCart={vi.fn()}
      />
    );

    const addButton = screen.getByRole('button', { name: /ajouter au panier/i });
    expect(addButton).toBeDisabled();
  });
});
```

### 13.4 Exemple : Test de Hook

```typescript
// src/features/cart/hooks/useCart.test.tsx
import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useCart } from './useCart';
import { useCartStore } from '../../../stores/cartStore';
import { useUIStore } from '../../../stores/uiStore';
import { useVendorStore } from '../../vendors/stores/vendorStore';

// Mock des stores
vi.mock('../../../stores/cartStore');
vi.mock('../../../stores/uiStore');
vi.mock('../../vendors/stores/vendorStore');

describe('useCart', () => {
  const mockAddItem = vi.fn();
  const mockRemoveItem = vi.fn();
  const mockUpdateQuantity = vi.fn();
  const mockClearCart = vi.fn();
  const mockSetVendor = vi.fn();
  const mockClearVendor = vi.fn();
  const mockShowToast = vi.fn();
  const mockSetCurrentVendor = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();

    // Mock des sélecteurs et actions des stores
    vi.mocked(useCartStore).mockReturnValue({
      cart: {
        items: [],
        vendorId: null,
        vendorName: null,
      },
      addItem: mockAddItem,
      removeItem: mockRemoveItem,
      updateQuantity: mockUpdateQuantity,
      clearCart: mockClearCart,
      setVendor: mockSetVendor,
      clearVendor: mockClearVendor,
    });

    vi.mocked(useUIStore).mockReturnValue({
      showToast: mockShowToast,
    } as any);

    vi.mocked(useVendorStore).mockReturnValue({
      currentVendor: null,
      setCurrentVendor: mockSetCurrentVendor,
    } as any);
  });

  it('should add item to cart', () => {
    const { result } = renderHook(() => useCart());

    act(() => {
      result.current.addToCart({
        productId: '1',
        productName: 'Burger',
        price: 1200,
        quantity: 1,
        vendorId: 'vendor-1',
        vendorName: 'Fresh Corner',
      });
    });

    expect(mockAddItem).toHaveBeenCalled();
    expect(mockSetVendor).toHaveBeenCalledWith('vendor-1');
    expect(mockSetCurrentVendor).toHaveBeenCalled();
    expect(mockShowToast).toHaveBeenCalledWith(
      'Burger ajouté au panier',
      'success'
    );
  });

  it('should show warning when adding item from different vendor', () => {
    // Simuler un panier avec un vendeur existant
    vi.mocked(useCartStore).mockReturnValue({
      cart: {
        items: [],
        vendorId: 'vendor-2',
        vendorName: 'Other Vendor',
      },
      addItem: mockAddItem,
      removeItem: mockRemoveItem,
      updateQuantity: mockUpdateQuantity,
      clearCart: mockClearCart,
      setVendor: mockSetVendor,
      clearVendor: mockClearVendor,
    });

    const { result } = renderHook(() => useCart());

    act(() => {
      result.current.addToCart({
        productId: '1',
        productName: 'Burger',
        price: 1200,
        quantity: 1,
        vendorId: 'vendor-1',
        vendorName: 'Fresh Corner',
      });
    });

    expect(mockShowToast).toHaveBeenCalledWith(
      expect.stringContaining('Votre panier contient des produits de Other Vendor'),
      'warning'
    );
    expect(mockAddItem).not.toHaveBeenCalled();
  });

  it('should remove item from cart', () => {
    const { result } = renderHook(() => useCart());

    act(() => {
      result.current.removeFromCart('1');
    });

    expect(mockRemoveItem).toHaveBeenCalledWith('1');
    expect(mockShowToast).toHaveBeenCalledWith(
      'Produit retiré du panier',
      'info'
    );
  });

  it('should clear cart', () => {
    const { result } = renderHook(() => useCart());

    act(() => {
      result.current.clearCartItems();
    });

    expect(mockClearCart).toHaveBeenCalled();
    expect(mockClearVendor).toHaveBeenCalled();
    expect(mockShowToast).toHaveBeenCalledWith(
      'Panier vidé',
      'info'
    );
  });
});
```

### 13.5 Exemple : Test de Service

```typescript
// src/features/cart/services/cartService.test.ts
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { cartService } from './cartService';
import { cartRepository } from '../../../repositories/mock/cartRepository';

// Mock du repository
vi.mock('../../../repositories/mock/cartRepository');

describe('cartService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('addItem', () => {
    it('should add item to cart when cart is empty', async () => {
      const item = {
        productId: '1',
        productName: 'Burger',
        price: 1200,
        quantity: 1,
        vendorId: 'vendor-1',
        vendorName: 'Fresh Corner',
      };

      vi.mocked(cartRepository.addItem).mockResolvedValue(item);

      const result = await cartService.addItem(item);

      expect(cartRepository.addItem).toHaveBeenCalledWith(item);
      expect(result).toEqual(item);
    });

    it('should handle error when adding item', async () => {
      const item = {
        productId: '1',
        productName: 'Burger',
        price: 1200,
        quantity: 1,
        vendorId: 'vendor-1',
        vendorName: 'Fresh Corner',
      };

      const error = new Error('Failed to add item');
      vi.mocked(cartRepository.addItem).mockRejectedValue(error);

      await expect(cartService.addItem(item)).rejects.toThrow(
        'Failed to add item'
      );
    });
  });

  describe('removeItem', () => {
    it('should remove item from cart', async () => {
      vi.mocked(cartRepository.removeItem).mockResolvedValue(true);

      const result = await cartService.removeItem('1');

      expect(cartRepository.removeItem).toHaveBeenCalledWith('1');
      expect(result).toBe(true);
    });
  });

  describe('clearCart', () => {
    it('should clear all items from cart', async () => {
      vi.mocked(cartRepository.clearCart).mockResolvedValue(true);

      const result = await cartService.clearCart();

      expect(cartRepository.clearCart).toHaveBeenCalled();
      expect(result).toBe(true);
    });
  });
});
```

---

## 14. Déploiement

### 14.1 Configuration Vercel

```json
// vercel.json
{
  "version": 2,
  "builds": [
    {
      "src": "package.json",
      "use": "@vercel/static-build",
      "config": { "distDir": "dist" }
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "/index.html"
    },
    {
      "src": "/api/(.*)",
      "dest": "http://localhost:3000/api/$1",
      "methods": ["GET", "POST", "PUT", "DELETE"]
    }
  ],
  "rewrites": [
    {
      "source": "/api/(.*)",
      "destination": "http://localhost:3000/api/$1"
    }
  ]
}
```

### 14.2 Configuration pour le SPA Fallback

```typescript
// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: './index.html',
      },
    },
  },
});
```

### 14.3 Scripts de Déploiement

```json
// package.json
{
  "scripts": {
    "build": "tsc && vite build",
    "preview": "vite preview",
    "deploy": "npm run build && vercel --prod",
    "deploy:staging": "npm run build && vercel --env staging"
  }
}
```

### 14.4 Variables d'Environnement

```env
# .env
VITE_API_URL=https://api.food-campus.dev
VITE_APP_NAME=Food Campus
VITE_APP_VERSION=2.0.0
VITE_ENVIRONMENT=development

# Production
VITE_API_URL=https://api.food-campus.com
VITE_ENVIRONMENT=production

# Staging
VITE_API_URL=https://api-staging.food-campus.com
VITE_ENVIRONMENT=staging
```

```typescript
// src/app/constants.ts
export const APP_CONSTANTS = {
  API_URL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api',
  APP_NAME: import.meta.env.VITE_APP_NAME || 'Food Campus',
  APP_VERSION: import.meta.env.VITE_APP_VERSION || '1.0.0',
  ENVIRONMENT: import.meta.env.VITE_ENVIRONMENT || 'development',
  IS_PRODUCTION: import.meta.env.PROD,
  IS_DEVELOPMENT: !import.meta.env.PROD,
};
```

---

## 15. Améliorations Futures

### 15.1 Backend et Base de Données

- [ ] **Backend API** : Implémenter l'API Node.js/Express
- [ ] **Base de données** : PostgreSQL avec Prisma ORM
- [ ] **Authentification** : JWT avec refresh tokens
- [ ] **Upload de fichiers** : Cloudinary pour les images
- [ ] **Notifications** : WebSocket ou Firebase Cloud Messaging
- [ ] **Recherche** : Intégration d'Algolia ou Elasticsearch

### 15.2 Fonctionnalités Avancées

- [ ] **Recommandations** : Système de recommandation basé sur les commandes
- [ ] **Favoris** : Permettre aux utilisateurs de sauvegarder des boutiques
- [ ] **Avis et Notes** : Système de notation et commentaires
- [ ] **Suivi en temps réel** : Suivi GPS de la livraison
- [ ] **Chat** : Messagerie entre clients et vendeurs
- [ ] **Promotions** : Coupons et offres spéciales
- [ ] **Abonnements** : Abonnements mensuels pour les étudiants

### 15.3 Améliorations Techniques

- [ ] **Tests E2E** : Cypress ou Playwright
- [ ] **Monitoring** : Sentry pour le suivi des erreurs
- [ ] **Analytics** : Google Analytics ou Mixpanel
- [ ] **CI/CD** : Pipeline GitHub Actions complet
- [ ] **Docker** : Containerisation de l'application
- [ ] **Kubernetes** : Déploiement scalable

### 15.4 Expérience Utilisateur

- [ ] **Animation** : Animations fluides avec Framer Motion
- [ ] **Micro-interactions** : Feedback visuel amélioré
- [ ] **Mode hors-ligne** : Support complet PWA
- [ ] **Synchronisation** : Synchronisation automatique des données
- [ ] **Accessibilité** : Audit WCAG complet
- [ ] **Performance** : Optimisation continue

### 15.5 Évolutivité

- [ ] **Multi-campus** : Support de plusieurs campus
- [ ] **Multi-vendeurs** : Gestion de plusieurs points de vente
- [ ] **Livraison** : Intégration avec des services de livraison
- [ ] **Paiement en ligne** : Intégration de M-Pesa, Orange Money, etc.
- [ ] **International** : Support multi-devises et multi-langues

---

## 📚 Ressources et Références

### Documentation Officielle

- [React Documentation](https://react.dev/)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [Zustand Documentation](https://github.com/pmndrs/zustand)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Vite Documentation](https://vitejs.dev/guide/)
- [React Router Documentation](https://reactrouter.com/en/main)

### Outils Utilisés

- **Design** : Figma
- **Code** : Visual Studio Code
- **Versioning** : Git + GitHub
- **CI/CD** : GitHub Actions
- **Déploiement** : Vercel
- **Tests** : Vitest + Testing Library
- **Storybook** : Pour les composants UI

### Bonnes Pratiques

- [React Best Practices](https://react.dev/learn/best-practices)
- [TypeScript Best Practices](https://www.typescriptlang.org/docs/handbook/best-practices.html)
- [Zustand Best Practices](https://github.com/pmndrs/zustand/wiki/Best-Practices)
- [Tailwind CSS Best Practices](https://tailwindcss.com/docs/guides/best-practices)

---

> **Food Campus - Notes d'Implémentation**
> *Document technique complet pour le développement de l'application*
> *Généré par Arena.ai Agent Mode - 19 Octobre 2026*

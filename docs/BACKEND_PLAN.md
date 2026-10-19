# Food Campus - Plan de Conception Backend FastAPI

> **Version 1.0** - 19 Octobre 2026  
> **Backend avec FastAPI + Recommandation IA + Cartographie Livreur**
> **Approche : Sans ORM (SQL Brut / asyncpg)**

---

## 🎯 **Vue d'Ensemble du Projet Backend**

### Objectifs Principaux

1. **API RESTful** pour le marché étudiant Food Campus
2. **Module de recommandation IA** pour suggérer des produits/boutiques
3. **Système de cartographie** pour le suivi des livreurs
4. **Architecture sans ORM** (SQL brut avec asyncpg)
5. **Intégration transparente** avec le frontend React existant

### Stack Technique

| Couche | Technologie | Version | Rôle |
|--------|-------------|---------|------|
| **Framework** | FastAPI | 0.109+ | API RESTful |
| **ASGI Server** | Uvicorn | 0.27+ | Serveur de production |
| **Base de données** | PostgreSQL | 15+ | Stockage des données |
| **Driver DB** | asyncpg | 0.29+ | Connexion async PostgreSQL |
| **Authentification** | JWT (PyJWT) | 2.8+ | Gestion des tokens |
| **Validation** | Pydantic | 2.5+ | Validation des données |
| **IA/ML** | scikit-learn | 1.3+ | Recommandation basique |
| **Géolocalisation** | geopy | 2.4+ | Calcul de distances |
| **Cartographie** | Folium / Leaflet | - | Visualisation (optionnel) |
| **QR Code** | qrcode | 7.4+ | Génération de QR codes |
| **Tests** | pytest | 8.0+ | Tests unitaires/integration |
| **Async Tests** | httpx | 0.26+ | Tests des endpoints async |

---

## 🏗️ **Architecture Globale**

```
food-campus-backend/
├── main.py                      # Point d'entrée FastAPI
├── config.py                    # Configuration globale
├── database.py                  # Connexion PostgreSQL (asyncpg)
├── 
├── app/
│   ├── __init__.py
│   ├── 
│   ├── core/                    # Noyau de l'application
│   │   ├── __init__.py
│   │   ├── security.py          # Authentification, JWT
│   │   ├── dependencies.py      # Injection de dépendances
│   │   └── exceptions.py        # Gestion des erreurs
│   │
│   ├── models/                  # Modèles de données (Pydantic)
│   │   ├── __init__.py
│   │   ├── user.py
│   │   ├── vendor.py
│   │   ├── product.py
│   │   ├── order.py
│   │   ├── handover_location.py
│   │   ├── delivery.py
│   │   └── recommendation.py
│   │
│   ├── repositories/            # Accès aux données (SQL brut)
│   │   ├── __init__.py
│   │   ├── base_repository.py   # Classe de base
│   │   ├── user_repository.py
│   │   ├── vendor_repository.py
│   │   ├── product_repository.py
│   │   ├── order_repository.py
│   │   ├── handover_repository.py
│   │   └── delivery_repository.py
│   │
│   ├── services/                # Logique métier
│   │   ├── __init__.py
│   │   ├── auth_service.py
│   │   ├── user_service.py
│   │   ├── vendor_service.py
│   │   ├── product_service.py
│   │   ├── order_service.py
│   │   ├── handover_service.py
│   │   ├── delivery_service.py
│   │   ├── qr_service.py
│   │   └── recommendation_service.py  # Module IA
│   │
│   ├── api/                     # Routes API
│   │   ├── __init__.py
│   │   ├── v1/
│   │   │   ├── __init__.py
│   │   │   ├── auth.py
│   │   │   ├── users.py
│   │   │   ├── vendors.py
│   │   │   ├── products.py
│   │   │   ├── orders.py
│   │   │   ├── handover_locations.py
│   │   │   ├── deliveries.py
│   │   │   ├── recommendations.py  # Endpoints IA
│   │   │   └── maps.py            # Cartographie
│   │   └── health.py             # Health check
│   │
│   └── utils/                   # Utilitaires
│       ├── __init__.py
│       ├── db_utils.py          # Helpers SQL
│       ├── geo_utils.py        # Calculs géolocalisation
│       ├── qr_utils.py         # Génération QR
│       └── logger.py           # Logging
│
├── migrations/                  # Scripts SQL de migration
│   ├── 001_create_users_table.sql
│   ├── 002_create_vendors_table.sql
│   ├── 003_create_products_table.sql
│   ├── 004_create_orders_table.sql
│   ├── 005_create_handover_locations_table.sql
│   ├── 006_create_deliveries_table.sql
│   └── 007_create_recommendations_data.sql
│
├── scripts/                     # Scripts utilitaires
│   ├── init_db.py              # Initialisation DB
│   ├── seed_data.py            # Données de test
│   ├── train_recommender.py    # Entraînement modèle IA
│   └── generate_qr.py          # Génération QR en batch
│
├── tests/
│   ├── __init__.py
│   ├── conftest.py             # Fixtures pytest
│   ├── test_auth.py
│   ├── test_users.py
│   ├── test_vendors.py
│   ├── test_products.py
│   ├── test_orders.py
│   ├── test_deliveries.py
│   └── test_recommendations.py
│
├── .env                        # Variables d'environnement
├── .env.example                # Exemple de variables
├── requirements.txt            # Dépendances Python
├── requirements-dev.txt        # Dépendances de développement
├── Dockerfile                  # Container de production
├── Dockerfile.dev              # Container de développement
├── docker-compose.yml          # PostgreSQL + Backend
└── README.md                   # Documentation backend
```

---

## 📊 **Modèle de Données (PostgreSQL)**

### Diagramme Entité-Relation (MER)

```
┌─────────────────────────────────────────────────────────────────────────┐
│                                                                         │
│  ┌──────────────┐       ┌──────────────┐       ┌──────────────┐         │
│  │     USER      │       │    VENDOR     │       │   PRODUCT     │         │
│  ├──────────────┤       ├──────────────┤       ├──────────────┤         │
│  │ id (PK)       │       │ id (PK)       │       │ id (PK)       │         │
│  │ email         │       │ user_id (FK)  │◄──────┤ vendor_id     │         │
│  │ password_hash │       │ name          │   1:N │ name          │         │
│  │ full_name     │       │ description   │       │ description   │         │
│  │ phone         │       │ address       │       │ price         │         │
│  │ role          │       │ rating        │       │ category      │         │
│  │ is_active     │       │ is_active     │       │ image_url     │         │
│  │ created_at    │       │ created_at    │       │ stock         │         │
│  │ updated_at    │       │ updated_at    │       │ is_available  │         │
│  └──────────────┘       └──────────────┘       │ created_at    │         │
│           │                              │    └──────────────┘         │
│           │                              │              │              │
│           │         ┌────────────────────────────┼──────────────┐ │
│           │         │         ORDER                │              │
│           │         ├────────────────────────────┤              │
│           │         │ id (PK)                      │              │
│           │         │ user_id (FK) ───────────────┘              │
│           │         │ vendor_id (FK) ──────────────────────────┘ │
│           │         │ status (pending/preparing/delivering/completed)│
│           │         │ payment_method (cash)        │              │
│           │         │ payment_status (pending/paid)│              │
│           │         │ total_amount                 │              │
│           │         │ delivery_instructions        │              │
│           │         │ handover_location_id (FK)    │              │
│           │         │ qr_code                      │              │
│           │         │ created_at                   │              │
│           │         │ updated_at                   │              │
│           │         └────────────────────────────┘              │
│           │                         │                              │
│           │                         │ 1:N                          │
│           │                         ▼                              │
│           │         ┌────────────────────────────┐              │
│           │         │      ORDER_ITEM              │              │
│           │         ├────────────────────────────┤              │
│           │         │ id (PK)                      │              │
│           │         │ order_id (FK) ───────────────┘              │
│           │         │ product_id (FK)               │              │
│           │         │ quantity                     │              │
│           │         │ unit_price                   │              │
│           │         │ subtotal                     │              │
│           │         └────────────────────────────┘              │
│           │                                                  │
│           └──────────────────────────────────────────────────────┘
│                                                                         │
│  ┌────────────────────────────┐       ┌─────────────────────────┐  │
│  │   HANDOVER_LOCATION          │       │      DELIVERY            │  │
│  ├────────────────────────────┤       ├─────────────────────────┤  │
│  │ id (PK)                      │       │ id (PK)                   │  │
│  │ name                         │       │ order_id (FK, unique)     │  │
│  │ description                  │       │ delivery_person_id (FK)   │  │
│  │ address                      │       │ status                    │  │
│  │ latitude                     │       │ current_latitude          │  │
│  │ longitude                    │       │ current_longitude         │  │
│  │ is_active                    │       │ estimated_arrival_time    │  │
│  │ created_at                   │       │ actual_arrival_time       │  │
│  └────────────────────────────┘       │ created_at                │  │
│                                          │ updated_at                │  │
│                                          └─────────────────────────┘  │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## 📋 **Tables PostgreSQL (SQL Brut)**

### 1. Users (Étudiants, Vendeurs, Livreurs, Admin)

```sql
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(100) NOT NULL,
    phone VARCHAR(20),
    role VARCHAR(20) NOT NULL CHECK (role IN ('student', 'vendor', 'delivery', 'admin')),
    is_active BOOLEAN DEFAULT TRUE,
    avatar_url VARCHAR(500),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_role ON users(role);
```

### 2. Vendors (Boutiques)

```sql
CREATE TABLE vendors (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    address TEXT NOT NULL,
    latitude DECIMAL(10, 8),
    longitude DECIMAL(11, 8),
    phone VARCHAR(20),
    opening_hours JSONB,  -- {"monday": "08:00-18:00", ...}
    rating DECIMAL(3, 2) DEFAULT 0,
    review_count INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    logo_url VARCHAR(500),
    banner_url VARCHAR(500),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    
    UNIQUE(user_id)
);

CREATE INDEX idx_vendors_user_id ON vendors(user_id);
CREATE INDEX idx_vendors_rating ON vendors(rating);
CREATE INDEX idx_vendors_location ON vendors(latitude, longitude);
```

### 3. Products (Produits)

```sql
CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    vendor_id INTEGER NOT NULL REFERENCES vendors(id) ON DELETE CASCADE,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    category VARCHAR(50) NOT NULL,
    subcategory VARCHAR(50),
    image_url VARCHAR(500),
    stock INTEGER DEFAULT 0,
    is_available BOOLEAN DEFAULT TRUE,
    preparation_time_minutes INTEGER DEFAULT 15,
    tags TEXT[],  -- Array de tags pour la recherche
    nutritional_info JSONB,  -- {"calories": 350, "protein": 15, ...}
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_products_vendor_id ON products(vendor_id);
CREATE INDEX idx_products_category ON products(category);
CREATE INDEX idx_products_price ON products(price);
CREATE INDEX idx_products_available ON products(is_available) WHERE is_available = TRUE;
CREATE INDEX idx_products_tags ON products USING GIN(tags);
```

### 4. Handover Locations (Points de remise officiels)

```sql
CREATE TABLE handover_locations (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    address TEXT NOT NULL,
    latitude DECIMAL(10, 8) NOT NULL,
    longitude DECIMAL(11, 8) NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    opening_hours JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_handover_locations_name ON handover_locations(name);
CREATE INDEX idx_handover_locations_location ON handover_locations(latitude, longitude);
```

### 5. Orders (Commandes)

```sql
CREATE TYPE order_status AS ENUM (
    'pending',        -- En attente de confirmation
    'confirmed',      -- Confirmée par le vendeur
    'preparing',      -- En préparation
    'ready',          -- Prête pour la remise
    'delivering',     -- En cours de livraison (si applicable)
    'completed',      -- Complétée (paiement confirmé)
    'cancelled'       -- Annulée
);

CREATE TYPE payment_status AS ENUM (
    'pending',        -- Paiement non encore reçu
    'paid'            -- Paiement reçu (cash confirmé)
);

CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    order_number VARCHAR(20) UNIQUE NOT NULL,  -- FC-2026-0001
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    vendor_id INTEGER NOT NULL REFERENCES vendors(id) ON DELETE CASCADE,
    status order_status DEFAULT 'pending',
    payment_method VARCHAR(20) DEFAULT 'cash',
    payment_status payment_status DEFAULT 'pending',
    total_amount DECIMAL(10, 2) NOT NULL,
    delivery_fee DECIMAL(10, 2) DEFAULT 0,
    grand_total DECIMAL(10, 2) NOT NULL,
    delivery_instructions TEXT,
    handover_location_id INTEGER REFERENCES handover_locations(id),
    qr_code VARCHAR(100) UNIQUE,
    qr_code_expires_at TIMESTAMP WITH TIME ZONE,
    payment_confirmed_at TIMESTAMP WITH TIME ZONE,
    completed_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_orders_user_id ON orders(user_id);
CREATE INDEX idx_orders_vendor_id ON orders(vendor_id);
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_orders_payment_status ON orders(payment_status);
CREATE INDEX idx_orders_order_number ON orders(order_number);
CREATE INDEX idx_orders_qr_code ON orders(qr_code);
CREATE INDEX idx_orders_created_at ON orders(created_at);
```

### 6. Order Items (Articles de commande)

```sql
CREATE TABLE order_items (
    id SERIAL PRIMARY KEY,
    order_id INTEGER NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
    product_id INTEGER NOT NULL REFERENCES products(id) ON DELETE SET NULL,
    product_name VARCHAR(100) NOT NULL,  -- Snapshot au moment de la commande
    product_price DECIMAL(10, 2) NOT NULL,  -- Snapshot
    quantity INTEGER NOT NULL CHECK (quantity > 0),
    subtotal DECIMAL(10, 2) NOT NULL,
    special_instructions TEXT
);

CREATE INDEX idx_order_items_order_id ON order_items(order_id);
```

### 7. Deliveries (Livraisons - pour le suivi des livreurs)

```sql
CREATE TYPE delivery_status AS ENUM (
    'pending',        -- En attente de prise en charge
    'assigned',       -- Assignée à un livreur
    'picked_up',      -- Produits récupérés
    'in_transit',     -- En route
    'arrived',        -- Arrivé au point de remise
    'completed',      -- Livraison terminée
    'failed'          -- Échec de livraison
);

CREATE TABLE deliveries (
    id SERIAL PRIMARY KEY,
    order_id INTEGER NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
    delivery_person_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
    status delivery_status DEFAULT 'pending',
    current_latitude DECIMAL(10, 8),
    current_longitude DECIMAL(11, 8),
    estimated_arrival_time TIMESTAMP WITH TIME ZONE,
    actual_arrival_time TIMESTAMP WITH TIME ZONE,
    pickup_time TIMESTAMP WITH TIME ZONE,
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    
    UNIQUE(order_id)
);

CREATE INDEX idx_deliveries_order_id ON deliveries(order_id);
CREATE INDEX idx_deliveries_delivery_person_id ON deliveries(delivery_person_id);
CREATE INDEX idx_deliveries_status ON deliveries(status);
```

### 8. Delivery Tracking (Historique des positions)

```sql
CREATE TABLE delivery_tracking (
    id SERIAL PRIMARY KEY,
    delivery_id INTEGER NOT NULL REFERENCES deliveries(id) ON DELETE CASCADE,
    latitude DECIMAL(10, 8) NOT NULL,
    longitude DECIMAL(11, 8) NOT NULL,
    speed DECIMAL(10, 2),  -- en km/h
    accuracy DECIMAL(10, 2),  -- précision GPS en mètres
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_delivery_tracking_delivery_id ON delivery_tracking(delivery_id);
CREATE INDEX idx_delivery_tracking_timestamp ON delivery_tracking(timestamp);
```

### 9. User Ratings (Notes et avis)

```sql
CREATE TABLE user_ratings (
    id SERIAL PRIMARY KEY,
    order_id INTEGER NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
    rater_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    rated_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    rating INTEGER NOT NULL CHECK (rating BETWEEN 1 AND 5),
    comment TEXT,
    rated_as VARCHAR(20) NOT NULL CHECK (rated_as IN ('vendor', 'delivery_person')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_user_ratings_order_id ON user_ratings(order_id);
CREATE INDEX idx_user_ratings_rated_id ON user_ratings(rated_id);
```

### 10. Recommendation Data (Données pour le module IA)

```sql
CREATE TABLE user_product_interactions (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    product_id INTEGER NOT NULL REFERENCES products(id) ON DELETE CASCADE,
    interaction_type VARCHAR(20) NOT NULL CHECK (interaction_type IN ('view', 'add_to_cart', 'purchase', 'rate')),
    score DECIMAL(5, 2) DEFAULT 1.0,  -- Poids de l'interaction
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_user_product_interactions_user_id ON user_product_interactions(user_id);
CREATE INDEX idx_user_product_interactions_product_id ON user_product_interactions(product_id);

CREATE TABLE user_category_interactions (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    category VARCHAR(50) NOT NULL,
    interaction_count INTEGER DEFAULT 1,
    last_interaction_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, category)
);

CREATE INDEX idx_user_category_interactions_user_id ON user_category_interactions(user_id);
```

---

## 🎯 **Phases de Développement**

### Phase 0 : Préparation (1-2 jours)

**Objectif** : Configurer l'environnement et la structure de base

| Tâche | Durée | Livrable | Statut |
|-------|-------|----------|--------|
| 0.1 Créer le dépôt backend | 1h | Repository Git | ⏳ |
| 0.2 Configurer Python + FastAPI | 2h | `requirements.txt`, `main.py` de base | ⏳ |
| 0.3 Configurer PostgreSQL local | 2h | Docker Compose avec PostgreSQL | ⏳ |
| 0.4 Créer la structure de fichiers | 2h | Arborescence complète | ⏳ |
| 0.5 Configurer le logging | 1h | `logger.py`, configuration | ⏳ |
| 0.6 Configurer CORS | 1h | Middleware CORS | ⏳ |

**Livrables** :
- Repository Git fonctionnel
- Environnement de développement prêt
- FastAPI qui répond sur `/api/v1/health`

---

### Phase 1 : Noyau (3-4 jours)

**Objectif** : Implémenter l'authentification et les entités de base

| Tâche | Durée | Livrable | Priorité |
|-------|-------|----------|----------|
| 1.1 Créer les scripts SQL de migration | 4h | `migrations/*.sql` | Must Have |
| 1.2 Implémenter `database.py` (asyncpg) | 4h | Connexion DB async | Must Have |
| 1.3 Créer les modèles Pydantic | 4h | `app/models/*.py` | Must Have |
| 1.4 Implémenter les repositories de base | 6h | `app/repositories/base_repository.py` | Must Have |
| 1.5 Implémenter l'authentification JWT | 8h | `app/core/security.py`, endpoints auth | Must Have |
| 1.6 Créer les services users | 4h | `app/services/user_service.py` | Must Have |
| 1.7 Créer les endpoints users | 4h | `app/api/v1/users.py` | Must Have |

**Livrables** :
- Base de données PostgreSQL initialisée
- Authentification JWT fonctionnelle
- CRUD Users (sauf delete pour admin)
- Health check endpoint

---

### Phase 2 : Fonctionnalités Principales (5-7 jours)

**Objectif** : Implémenter le cœur du marché (boutiques, produits, commandes)

| Tâche | Durée | Livrable | Priorité |
|-------|-------|----------|----------|
| 2.1 Implémenter vendors | 6h | Repository + Service + Endpoints | Must Have |
| 2.2 Implémenter products | 6h | Repository + Service + Endpoints | Must Have |
| 2.3 Implémenter handover locations | 4h | Repository + Service + Endpoints | Must Have |
| 2.4 Implémenter orders | 8h | Repository + Service + Endpoints | Must Have |
| 2.5 Implémenter order items | 4h | Intégration avec orders | Must Have |
| 2.6 Génération de QR codes | 4h | `qr_service.py`, intégration | Must Have |
| 2.7 Validation des règles métier | 4h | Vérifications (mono-vendor cart, etc.) | Must Have |

**Livrables** :
- CRUD complet pour vendors, products, handover locations
- Processus de commande complet
- Génération et validation de QR codes
- Intégration avec le frontend existant

---

### Phase 3 : Module de Livraison (3-4 jours)

**Objectif** : Implémenter le suivi des livreurs et la cartographie

| Tâche | Durée | Livrable | Priorité |
|-------|-------|----------|----------|
| 3.1 Implémenter deliveries | 6h | Repository + Service + Endpoints | Should Have |
| 3.2 Implémenter delivery tracking | 4h | Repository + Service + Endpoints | Should Have |
| 3.3 Créer les utilitaires géolocalisation | 4h | `geo_utils.py` (distance, etc.) | Should Have |
| 3.4 Implémenter les endpoints de cartographie | 4h | `app/api/v1/maps.py` | Should Have |
| 3.5 Intégrer avec Google Maps/Leaflet | 4h | Visualisation des positions | Should Have |
| 3.6 Notifications de suivi | 4h | WebSocket ou polling pour le suivi en temps réel | Should Have |

**Livrables** :
- Suivi des livreurs en temps réel
- Calcul des distances et temps estimés
- Visualisation cartographique (backend)
- Endpoints pour récupérer les positions

---

### Phase 4 : Module de Recommandation IA (4-5 jours)

**Objectif** : Implémenter un système de recommandation intelligent

| Tâche | Durée | Livrable | Priorité |
|-------|-------|----------|----------|
| 4.1 Collecter les données d'interaction | 4h | Middleware pour tracker les views/add_to_cart | Should Have |
| 4.2 Créer les tables de recommandation | 2h | `user_product_interactions`, `user_category_interactions` | Should Have |
| 4.3 Implémenter l'algorithme basique | 8h | `recommendation_service.py` (content-based + collaborative) | Should Have |
| 4.4 Implémenter les endpoints de recommandation | 4h | `app/api/v1/recommendations.py` | Should Have |
| 4.5 Entraîner le modèle | 4h | Script `train_recommender.py` | Should Have |
| 4.6 Intégrer avec le frontend | 4h | Afficher les recommandations | Should Have |

**Algorithmes de Recommandation** :

#### 1. Content-Based Filtering (Basé sur le contenu)
```python
# Recommander des produits similaires à ceux que l'utilisateur a aimés
class ContentBasedRecommender:
    def __init__(self):
        self.vectorizer = TfidfVectorizer()
        self.product_features = None
        
    def train(self, products):
        # Créer des features à partir des descriptions, catégories, tags
        texts = [f"{p['name']} {p['description']} {' '.join(p['tags'])}" 
                 for p in products]
        self.product_features = self.vectorizer.fit_transform(texts)
        
    def recommend(self, user_preferences, n=5):
        # Calculer la similarité cosinus
        user_vector = self.vectorizer.transform([user_preferences])
        similarities = cosine_similarity(user_vector, self.product_features)
        return top n produits
```

#### 2. Collaborative Filtering (Filtrage collaboratif)
```python
# Recommander des produits populaires parmi les utilisateurs similaires
class CollaborativeFilteringRecommender:
    def __init__(self):
        self.user_item_matrix = None
        self.model = None
        
    def train(self, interactions):
        # Créer une matrice user-item
        self.user_item_matrix = self._create_matrix(interactions)
        # Utiliser SVD pour la factorisation
        self.model = TruncatedSVD(n_components=50)
        self.user_factors = self.model.fit_transform(self.user_item_matrix)
        
    def recommend(self, user_id, n=5):
        # Trouver les utilisateurs similaires
        user_idx = self.user_to_index[user_id]
        user_factor = self.user_factors[user_idx]
        similarities = cosine_similarity([user_factor], self.user_factors)
        # Recommander les produits des utilisateurs similaires
        return top n produits
```

#### 3. Hybrid Approach (Approche hybride)
```python
# Combiner les deux approches
class HybridRecommender:
    def __init__(self, content_based, collaborative):
        self.cb = content_based
        self.collab = collaborative
        
    def recommend(self, user_id, user_preferences, n=5):
        cb_recs = self.cb.recommend(user_preferences, n*2)
        collab_recs = self.collab.recommend(user_id, n*2)
        # Combiner et dédupliquer
        return combine_and_deduplicate(cb_recs, collab_recs)[:n]
```

**Types de Recommandations** :

| Type | Description | Endpoint | Utilisation |
|------|-------------|----------|-------------|
| **Produits populaires** | Produits les plus commandés | `/recommendations/popular` | Accueil |
| **Pour vous** | Recommandations personnalisées | `/recommendations/for-me` | Accueil, Explorer |
| **Similaires** | Produits similaires à un produit | `/recommendations/similar/{product_id}` | Page produit |
| **Boutiques** | Boutiques recommandées | `/recommendations/vendors` | Explorer |
| **Basé sur la commande** | Recommandations basées sur le panier | `/recommendations/cart` | Panier |

**Livrables** :
- Module de recommandation fonctionnel
- Données d'interaction collectées automatiquement
- Endpoints API pour récupérer les recommandations
- Intégration avec le frontend

---

### Phase 5 : Optimisation et Tests (3-4 jours)

**Objectif** : Optimiser les performances et valider le backend

| Tâche | Durée | Livrable | Priorité |
|-------|-------|----------|----------|
| 5.1 Optimiser les requêtes SQL | 4h | Index, requêtes optimisées | Should Have |
| 5.2 Implémenter le caching | 4h | Redis pour le caching | Should Have |
| 5.3 Écrire les tests unitaires | 8h | Tests avec pytest | Must Have |
| 5.4 Écrire les tests d'intégration | 6h | Tests des endpoints | Must Have |
| 5.5 Configurer le monitoring | 4h | Logging, métriques | Should Have |
| 5.6 Documentation API | 4h | Swagger + README | Must Have |

**Livrables** :
- Backend optimisé et performant
- Suite de tests complète (> 80% coverage)
- Documentation API complète

---

### Phase 6 : Déploiement (2-3 jours)

**Objectif** : Déployer le backend en production

| Tâche | Durée | Livrable | Priorité |
|-------|-------|----------|----------|
| 6.1 Configurer Docker | 4h | `Dockerfile`, `docker-compose.yml` | Must Have |
| 6.2 Configurer PostgreSQL cloud | 2h | Neon, Supabase ou AWS RDS | Must Have |
| 6.3 Configurer le backend cloud | 4h | Railway, Render ou AWS EC2 | Must Have |
| 6.4 Configurer CORS pour production | 2h | Domaine frontend autorisé | Must Have |
| 6.5 Configurer HTTPS | 2h | Certificats SSL | Must Have |
| 6.6 Configurer CI/CD | 4h | GitHub Actions | Should Have |

**Livrables** :
- Backend déployé en production
- Base de données cloud configurée
- CI/CD pipeline fonctionnel

---

## 📅 **Calendrier Global**

| Phase | Durée | Dates (estimées) | Livrables |
|-------|-------|------------------|-----------|
| Phase 0 | 1-2 jours | 20-21 Oct | Environnement prêt |
| Phase 1 | 3-4 jours | 22-25 Oct | Noyau (Auth + Users) |
| Phase 2 | 5-7 jours | 26 Oct - 1 Nov | Fonctionnalités principales |
| Phase 3 | 3-4 jours | 2-5 Nov | Module Livraison |
| Phase 4 | 4-5 jours | 6-10 Nov | Module IA Recommandation |
| Phase 5 | 3-4 jours | 11-14 Nov | Optimisation + Tests |
| Phase 6 | 2-3 jours | 15-17 Nov | Déploiement |
| **Total** | **21-25 jours** | **20 Oct - 17 Nov** | **Backend complet** |

---

## 🎯 **Priorisation (MoSCoW)**

### Must Have (Indispensable)
- [ ] Authentification JWT
- [ ] CRUD Users
- [ ] CRUD Vendors
- [ ] CRUD Products
- [ ] CRUD Handover Locations
- [ ] Processus de commande (Orders)
- [ ] Génération de QR codes
- [ ] Validation des règles métier
- [ ] Tests unitaires de base
- [ ] Déploiement fonctionnel

### Should Have (Important)
- [ ] Module de livraison (Deliveries)
- [ ] Suivi des livreurs (Delivery Tracking)
- [ ] Cartographie basique
- [ ] Module de recommandation IA (version simple)
- [ ] Caching (Redis)
- [ ] CI/CD pipeline
- [ ] Documentation API

### Could Have (Optionnel)
- [ ] Notifications en temps réel (WebSocket)
- [ ] Intégration avec Google Maps API
- [ ] Recommandation IA avancée (ML)
- [ ] Analytics et statistiques
- [ ] Système de coupons/promotions
- [ ] Abonnements mensuels

### Won't Have (Hors périmètre)
- [ ] Paiement électronique (Mobile Money, etc.)
- [ ] Chat en temps réel
- [ ] Système de fidélité complexe
- [ ] Multi-langues backend

---

## 🔧 **Détails Techniques**

### Configuration de la Base de Données

```python
# database.py
import asyncpg
from fastapi import Depends
from typing import AsyncGenerator

DATABASE_URL = "postgresql://user:password@localhost:5432/food_campus"

async def get_db() -> AsyncGenerator[asyncpg.pool.Pool, None]:
    pool = await asyncpg.create_pool(DATABASE_URL)
    try:
        yield pool
    finally:
        await pool.close()

# Utilisation dans les repositories
async def execute_query(query: str, params: tuple = None):
    pool = await get_db()
    async with pool.acquire() as conn:
        return await conn.fetch(query, *params)
```

### Exemple de Repository (sans ORM)

```python
# app/repositories/base_repository.py
from typing import Any, List, Optional, Dict
import asyncpg

class BaseRepository:
    def __init__(self, pool: asyncpg.pool.Pool):
        self.pool = pool
    
    async def execute(self, query: str, params: tuple = None):
        async with self.pool.acquire() as conn:
            return await conn.fetch(query, *params)
    
    async def execute_one(self, query: str, params: tuple = None):
        async with self.pool.acquire() as conn:
            return await conn.fetchrow(query, *params)
    
    async def execute_scalar(self, query: str, params: tuple = None):
        async with self.pool.acquire() as conn:
            return await conn.fetchval(query, *params)

# app/repositories/user_repository.py
from .base_repository import BaseRepository
from typing import Optional
from app.models.user import UserCreate, User

class UserRepository(BaseRepository):
    async def create(self, user_data: UserCreate) -> User:
        query = """
            INSERT INTO users (email, password_hash, full_name, phone, role)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING *
        """
        params = (
            user_data.email,
            user_data.password_hash,
            user_data.full_name,
            user_data.phone,
            user_data.role
        )
        result = await self.execute_one(query, params)
        return User.from_orm(result)
    
    async def get_by_email(self, email: str) -> Optional[User]:
        query = "SELECT * FROM users WHERE email = $1"
        result = await self.execute_one(query, (email,))
        return User.from_orm(result) if result else None
    
    async def get_by_id(self, user_id: int) -> Optional[User]:
        query = "SELECT * FROM users WHERE id = $1"
        result = await self.execute_one(query, (user_id,))
        return User.from_orm(result) if result else None
```

### Exemple de Service

```python
# app/services/user_service.py
from typing import Optional
from app.models.user import UserCreate, User
from app.repositories.user_repository import UserRepository
from app.core.security import hash_password

class UserService:
    def __init__(self, user_repo: UserRepository):
        self.user_repo = user_repo
    
    async def create_user(self, user_data: UserCreate) -> User:
        # Vérifier si l'email existe déjà
        existing_user = await self.user_repo.get_by_email(user_data.email)
        if existing_user:
            raise ValueError("Email already registered")
        
        # Hasher le mot de passe
        hashed_password = hash_password(user_data.password)
        user_data.password_hash = hashed_password
        
        # Créer l'utilisateur
        return await self.user_repo.create(user_data)
    
    async def get_user_by_email(self, email: str) -> Optional[User]:
        return await self.user_repo.get_by_email(email)
```

### Exemple d'Endpoint

```python
# app/api/v1/users.py
from fastapi import APIRouter, Depends, HTTPException, status
from typing import List
from app.models.user import User, UserCreate, UserUpdate
from app.services.user_service import UserService
from app.core.dependencies import get_user_service, get_current_user

router = APIRouter(prefix="/api/v1/users", tags=["users"])

@router.post("/", response_model=User, status_code=status.HTTP_201_CREATED)
async def create_user(
    user_data: UserCreate,
    user_service: UserService = Depends(get_user_service)
):
    try:
        return await user_service.create_user(user_data)
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.get("/me", response_model=User)
async def get_current_user(
    current_user: User = Depends(get_current_user)
):
    return current_user

@router.get("/{user_id}", response_model=User)
async def get_user(
    user_id: int,
    user_service: UserService = Depends(get_user_service)
):
    user = await user_service.get_user_by_id(user_id)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user
```

### Module de Recommandation (Exemple)

```python
# app/services/recommendation_service.py
from typing import List, Dict
import asyncpg
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import numpy as np

class RecommendationService:
    def __init__(self, pool: asyncpg.pool.Pool):
        self.pool = pool
        self.vectorizer = TfidfVectorizer()
        self.product_features = None
        self.product_ids = []
    
    async def initialize(self):
        """Charger les données et entraîner le modèle"""
        # Récupérer tous les produits
        products = await self._get_all_products()
        
        # Créer les features textuelles
        texts = [
            f"{p['name']} {p['description']} {' '.join(p['tags'])}"
            for p in products
        ]
        self.product_ids = [p['id'] for p in products]
        
        # Vectoriser
        self.product_features = self.vectorizer.fit_transform(texts)
    
    async def _get_all_products(self) -> List[Dict]:
        query = """
            SELECT id, name, description, tags 
            FROM products 
            WHERE is_available = TRUE
        """
        async with self.pool.acquire() as conn:
            return await conn.fetch(query)
    
    async def recommend_similar_products(self, product_id: int, limit: int = 5) -> List[Dict]:
        """Recommander des produits similaires"""
        # Trouver l'index du produit
        try:
            idx = self.product_ids.index(product_id)
        except ValueError:
            return []
        
        # Calculer les similarités
        product_vector = self.product_features[idx]
        similarities = cosine_similarity(product_vector, self.product_features).flatten()
        
        # Trier et retourner les plus similaires (hors le produit lui-même)
        similar_indices = np.argsort(similarities)[::-1][1:limit+1]
        
        # Récupérer les produits
        similar_product_ids = [self.product_ids[i] for i in similar_indices]
        return await self._get_products_by_ids(similar_product_ids)
    
    async def recommend_for_user(self, user_id: int, limit: int = 5) -> List[Dict]:
        """Recommander des produits pour un utilisateur"""
        # 1. Récupérer les interactions de l'utilisateur
        interactions = await self._get_user_interactions(user_id)
        
        if not interactions:
            # Si pas d'interactions, retourner les produits populaires
            return await self._get_popular_products(limit)
        
        # 2. Récupérer les catégories préférées
        categories = await self._get_user_preferred_categories(user_id)
        
        # 3. Combiner les recommandations
        # - Produits similaires aux produits achetés
        # - Produits des catégories préférées
        # - Produits populaires
        
        similar_products = []
        for interaction in interactions:
            similar = await self.recommend_similar_products(interaction['product_id'], limit//2)
            similar_products.extend(similar)
        
        # Dédoublonner et limiter
        unique_products = list({p['id']: p for p in similar_products}.values())
        return unique_products[:limit]
    
    async def _get_user_interactions(self, user_id: int) -> List[Dict]:
        query = """
            SELECT product_id, interaction_type 
            FROM user_product_interactions 
            WHERE user_id = $1 
            ORDER BY created_at DESC 
            LIMIT 20
        """
        async with self.pool.acquire() as conn:
            return await conn.fetch(query, user_id)
    
    async def _get_user_preferred_categories(self, user_id: int) -> List[str]:
        query = """
            SELECT category, interaction_count 
            FROM user_category_interactions 
            WHERE user_id = $1 
            ORDER BY interaction_count DESC 
            LIMIT 3
        """
        async with self.pool.acquire() as conn:
            results = await conn.fetch(query, user_id)
            return [r['category'] for r in results]
    
    async def _get_popular_products(self, limit: int) -> List[Dict]:
        query = """
            SELECT p.* 
            FROM products p
            JOIN (
                SELECT product_id, COUNT(*) as order_count
                FROM order_items
                GROUP BY product_id
                ORDER BY order_count DESC
                LIMIT $1
            ) oi ON p.id = oi.product_id
            WHERE p.is_available = TRUE
        """
        async with self.pool.acquire() as conn:
            return await conn.fetch(query, limit)
    
    async def _get_products_by_ids(self, product_ids: List[int]) -> List[Dict]:
        if not product_ids:
            return []
        
        query = """
            SELECT * FROM products 
            WHERE id = ANY($1) AND is_available = TRUE
        """
        async with self.pool.acquire() as conn:
            return await conn.fetch(query, product_ids)
```

### Module de Cartographie (Exemple)

```python
# app/services/delivery_service.py
from typing import List, Dict, Optional
import asyncpg
from geopy.distance import geodesic
from datetime import datetime, timedelta

class DeliveryService:
    def __init__(self, pool: asyncpg.pool.Pool):
        self.pool = pool
    
    async def get_delivery_position(self, delivery_id: int) -> Optional[Dict]:
        """Récupérer la position actuelle d'une livraison"""
        query = """
            SELECT current_latitude, current_longitude, status
            FROM deliveries 
            WHERE id = $1
        """
        async with self.pool.acquire() as conn:
            result = await conn.fetchrow(query, delivery_id)
            return dict(result) if result else None
    
    async def get_delivery_path(self, delivery_id: int) -> List[Dict]:
        """Récupérer le chemin complet d'une livraison"""
        query = """
            SELECT latitude, longitude, timestamp
            FROM delivery_tracking 
            WHERE delivery_id = $1 
            ORDER BY timestamp ASC
        """
        async with self.pool.acquire() as conn:
            return await conn.fetch(query, delivery_id)
    
    async def update_delivery_position(
        self, 
        delivery_id: int, 
        latitude: float, 
        longitude: float,
        accuracy: float = None
    ) -> Dict:
        """Mettre à jour la position d'une livraison"""
        query = """
            INSERT INTO delivery_tracking (delivery_id, latitude, longitude, accuracy)
            VALUES ($1, $2, $3, $4)
            RETURNING *
        """
        async with self.pool.acquire() as conn:
            result = await conn.fetchrow(
                query, 
                delivery_id, 
                latitude, 
                longitude, 
                accuracy
            )
            
            # Mettre à jour la position actuelle dans deliveries
            update_query = """
                UPDATE deliveries 
                SET current_latitude = $1, current_longitude = $2, updated_at = NOW()
                WHERE id = $3
                RETURNING *
            """
            delivery = await conn.fetchrow(update_query, latitude, longitude, delivery_id)
            
            return {"tracking": dict(result), "delivery": dict(delivery)}
    
    async def calculate_eta(
        self, 
        delivery_id: int, 
        destination_lat: float, 
        destination_lng: float
    ) -> Dict:
        """Calculer le temps estimé d'arrivée"""
        # Récupérer la position actuelle
        position = await self.get_delivery_position(delivery_id)
        if not position or not position['current_latitude']:
            return {"eta": None, "distance_km": None}
        
        # Calculer la distance
        start = (position['current_latitude'], position['current_longitude'])
        end = (destination_lat, destination_lng)
        distance_km = geodesic(start, end).kilometers
        
        # Estimation : 15 km/h pour un livreur à vélo
        speed_kmh = 15
        eta_minutes = (distance_km / speed_kmh) * 60
        
        return {
            "distance_km": round(distance_km, 2),
            "eta_minutes": round(eta_minutes, 1),
            "eta_time": (datetime.now() + timedelta(minutes=eta_minutes)).isoformat()
        }
    
    async def get_nearby_deliveries(
        self, 
        latitude: float, 
        longitude: float, 
        radius_km: float = 1.0
    ) -> List[Dict]:
        """Récupérer les livraisons à proximité"""
        # Cette requête utilise PostGIS si disponible, sinon on filtre en Python
        query = """
            SELECT id, delivery_person_id, status, current_latitude, current_longitude
            FROM deliveries 
            WHERE current_latitude IS NOT NULL 
            AND current_longitude IS NOT NULL
        """
        async with self.pool.acquire() as conn:
            deliveries = await conn.fetch(query)
        
        # Filtrer par distance
        center = (latitude, longitude)
        nearby = []
        for d in deliveries:
            point = (d['current_latitude'], d['current_longitude'])
            distance = geodesic(center, point).kilometers
            if distance <= radius_km:
                nearby.append({
                    **dict(d),
                    "distance_km": round(distance, 2)
                })
        
        return sorted(nearby, key=lambda x: x['distance_km'])
```

### Endpoints de Cartographie

```python
# app/api/v1/maps.py
from fastapi import APIRouter, Depends, HTTPException
from typing import List, Dict
from app.services.delivery_service import DeliveryService
from app.core.dependencies import get_delivery_service

router = APIRouter(prefix="/api/v1/maps", tags=["maps"])

@router.get("/deliveries/nearby", response_model=List[Dict])
async def get_nearby_deliveries(
    latitude: float,
    longitude: float,
    radius_km: float = 1.0,
    delivery_service: DeliveryService = Depends(get_delivery_service)
):
    """Récupérer les livraisons à proximité"""
    return await delivery_service.get_nearby_deliveries(latitude, longitude, radius_km)

@router.get("/deliveries/{delivery_id}/path", response_model=List[Dict])
async def get_delivery_path(
    delivery_id: int,
    delivery_service: DeliveryService = Depends(get_delivery_service)
):
    """Récupérer le chemin d'une livraison"""
    return await delivery_service.get_delivery_path(delivery_id)

@router.get("/deliveries/{delivery_id}/position", response_model=Dict)
async def get_delivery_position(
    delivery_id: int,
    delivery_service: DeliveryService = Depends(get_delivery_service)
):
    """Récupérer la position actuelle d'une livraison"""
    position = await delivery_service.get_delivery_position(delivery_id)
    if not position:
        raise HTTPException(status_code=404, detail="Delivery not found")
    return position

@router.post("/deliveries/{delivery_id}/position", response_model=Dict)
async def update_delivery_position(
    delivery_id: int,
    latitude: float,
    longitude: float,
    accuracy: float = None,
    delivery_service: DeliveryService = Depends(get_delivery_service)
):
    """Mettre à jour la position d'une livraison"""
    return await delivery_service.update_delivery_position(
        delivery_id, latitude, longitude, accuracy
    )

@router.get("/deliveries/{delivery_id}/eta", response_model=Dict)
async def get_delivery_eta(
    delivery_id: int,
    destination_lat: float,
    destination_lng: float,
    delivery_service: DeliveryService = Depends(get_delivery_service)
):
    """Calculer le temps estimé d'arrivée"""
    return await delivery_service.calculate_eta(
        delivery_id, destination_lat, destination_lng
    )
```

---

## 📦 **Configuration et Déploiement**

### requirements.txt

```
# Framework
fastapi==0.109.0
uvicorn[standard]==0.27.0
python-multipart==0.0.6

# Database
asyncpg==0.29.0

# Auth
python-jose[cryptography]==3.3.0
passlib[bcrypt]==1.7.4
python-dotenv==1.0.0

# Validation
pydantic==2.5.3
email-validator==2.1.0

# IA/ML
scikit-learn==1.3.2
numpy==1.26.2
pandas==2.1.4

# Géolocalisation
geopy==2.4.1

# QR Code
qrcode[pil]==7.4.2

# Tests
pytest==8.0.0
httpx==0.26.0
pytest-asyncio==0.23.3

# Dev
black==24.1.1
flake8==6.1.0
isort==5.13.2
```

### Dockerfile

```dockerfile
# Build stage
FROM python:3.11-slim as builder

WORKDIR /app

# Installer les dépendances de build
RUN apt-get update && apt-get install -y \
    gcc \
    python3-dev \
    && rm -rf /var/lib/apt/lists/*

# Copier les fichiers de dépendances
COPY requirements.txt .

# Installer les dépendances Python
RUN pip install --no-cache-dir --user -r requirements.txt

# Production stage
FROM python:3.11-slim

WORKDIR /app

# Copier les dépendances installées
COPY --from=builder /root/.local /root/.local
COPY --from=builder /app /app

# Configurer PATH
ENV PATH=/root/.local/bin:$PATH

# Copier le code source
COPY . .

# Créer un utilisateur non-root
RUN useradd -m appuser && chown -R appuser:appuser /app
USER appuser

# Exposer le port
EXPOSE 8000

# Commande de démarrage
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
```

### docker-compose.yml

```yaml
version: '3.8'

services:
  # Backend FastAPI
  backend:
    build:
      context: .
      dockerfile: Dockerfile
    ports:
      - "8000:8000"
    environment:
      - DATABASE_URL=postgresql://postgres:postgres@db:5432/food_campus
      - SECRET_KEY=your-secret-key-here
      - ALGORITHM=HS256
      - ACCESS_TOKEN_EXPIRE_MINUTES=30
    depends_on:
      - db
    volumes:
      - ./scripts:/app/scripts
    restart: unless-stopped

  # Base de données PostgreSQL
  db:
    image: postgres:15-alpine
    environment:
      - POSTGRES_USER=postgres
      - POSTGRES_PASSWORD=postgres
      - POSTGRES_DB=food_campus
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data
    restart: unless-stopped

  # PGAdmin (optionnel pour le développement)
  pgadmin:
    image: dpage/pgadmin4
    environment:
      - PGADMIN_DEFAULT_EMAIL=admin@foodcampus.com
      - PGADMIN_DEFAULT_PASSWORD=admin
    ports:
      - "5050:80"
    depends_on:
      - db
    restart: unless-stopped

volumes:
  postgres_data:
```

### .env.example

```
# Database
DATABASE_URL=postgresql://user:password@localhost:5432/food_campus

# Auth
SECRET_KEY=your-very-secret-key-here-at-least-32-characters
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30

# Server
DEBUG=True
PORT=8000

# CORS
CORS_ORIGINS=http://localhost:5173,http://localhost:3000,https://your-frontend-domain.com

# QR Code
QR_CODE_EXPIRE_MINUTES=60

# Delivery
DELIVERY_SPEED_KMH=15  # Vitesse moyenne du livreur
```

---

## 🎯 **Intégration avec le Frontend**

### Configuration Axios (Frontend)

```typescript
// src/lib/api.ts
import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000/api/v1',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Intercepteur pour ajouter le token JWT
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Intercepteur pour gérer les erreurs
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expiré, rediriger vers login
      localStorage.removeItem('access_token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;
```

### Exemple d'utilisation dans le frontend

```typescript
// src/features/products/useProducts.ts
import api from '@/lib/api';
import { useQuery } from '@tanstack/react-query';

const fetchProducts = async (vendorId?: number) => {
  const url = vendorId ? `/products?vendor_id=${vendorId}` : '/products';
  const response = await api.get(url);
  return response.data;
};

export const useProducts = (vendorId?: number) => {
  return useQuery({
    queryKey: ['products', vendorId],
    queryFn: () => fetchProducts(vendorId),
  });
};

// src/features/recommendations/useRecommendations.ts
import api from '@/lib/api';
import { useQuery } from '@tanstack/react-query';

const fetchRecommendations = async () => {
  const response = await api.get('/recommendations/for-me');
  return response.data;
};

export const useRecommendations = () => {
  return useQuery({
    queryKey: ['recommendations'],
    queryFn: fetchRecommendations,
  });
};

// src/features/delivery/useDeliveryTracking.ts
import api from '@/lib/api';
import { useQuery } from '@tanstack/react-query';

const fetchDeliveryPosition = async (deliveryId: number) => {
  const response = await api.get(`/maps/deliveries/${deliveryId}/position`);
  return response.data;
};

export const useDeliveryPosition = (deliveryId: number) => {
  return useQuery({
    queryKey: ['delivery-position', deliveryId],
    queryFn: () => fetchDeliveryPosition(deliveryId),
    refetchInterval: 10000, // Rafraîchir toutes les 10 secondes
  });
};
```

---

## 📊 **Métriques et Suivi**

### Indicateurs Clés (KPIs)

| KPI | Description | Cible |
|-----|-------------|-------|
| Temps de réponse API | Temps moyen des endpoints | < 200ms |
| Disponibilité | Uptime du backend | > 99.9% |
| Taux d'erreur | % de requêtes en erreur | < 0.1% |
| Couverture de tests | % de code couvert par les tests | > 80% |
| Précision recommandation | % de clics sur les recommandations | > 30% |
| Temps de livraison | Temps moyen de livraison | < 30 min |

### Monitoring

```python
# app/core/monitoring.py
from fastapi import Request
from datetime import datetime
import time
import logging

logger = logging.getLogger(__name__)

class MonitoringMiddleware:
    def __init__(self, app):
        self.app = app
    
    async def __call__(self, request: Request, call_next):
        start_time = time.time()
        
        response = await call_next(request)
        
        process_time = time.time() - start_time
        
        # Log les métriques
        logger.info(
            f"Method={request.method} Path={request.url.path} "
            f"Status={response.status_code} Duration={process_time:.4f}s"
        )
        
        # Ajouter le header de temps de traitement
        response.headers["X-Process-Time"] = str(process_time)
        
        return response
```

---

## 🚀 **Prochaines Étapes Immédiates**

### Étape 1 : Valider le Plan (Aujourd'hui)
- [ ] Revoir ce document
- [ ] Valider les choix techniques
- [ ] Ajuster les priorités si nécessaire

### Étape 2 : Démarrer la Phase 0 (Demain)
- [ ] Créer le dépôt Git pour le backend
- [ ] Configurer l'environnement local
- [ ] Créer la structure de fichiers
- [ ] Configurer FastAPI de base

### Étape 3 : Commencer la Phase 1
- [ ] Implémenter la base de données
- [ ] Créer les modèles Pydantic
- [ ] Implémenter l'authentification JWT

---

## 📝 **Résumé des Livrables par Phase**

| Phase | Livrables | Statut |
|-------|-----------|--------|
| **Phase 0** | Repository, Structure, FastAPI base, Docker | ⏳ |
| **Phase 1** | Base de données, Auth JWT, CRUD Users | ⏳ |
| **Phase 2** | CRUD Vendors/Products/Orders, QR Codes | ⏳ |
| **Phase 3** | Module Livraison, Cartographie | ⏳ |
| **Phase 4** | Module IA Recommandation | ⏳ |
| **Phase 5** | Optimisation, Tests, Documentation | ⏳ |
| **Phase 6** | Déploiement, CI/CD | ⏳ |

---

## 🎉 **Conclusion**

Ce plan de conception propose une **architecture backend solide** pour Food Campus avec :

✅ **FastAPI** pour une API performante et bien documentée  
✅ **PostgreSQL + asyncpg** pour une base de données robuste sans ORM  
✅ **Module de recommandation IA** pour une expérience utilisateur personnalisée  
✅ **Cartographie et suivi des livreurs** pour une logistique efficace  
✅ **Intégration transparente** avec le frontend React existant  
✅ **Plan d'évolution clair** avec des phases bien définies  

**Durée totale estimée** : **21-25 jours** (environ 1 mois)  
**Coût estimé** : Variable selon les ressources  
**Résultat** : Backend complet, performant et évolutif

---

**Document généré par** : Arena.ai Agent Mode  
**Date** : 19 Octobre 2026  
**Version** : 1.0  
**Statut** : À valider

---

> **Prochaine action** : Valider ce plan et commencer la Phase 0 (Configuration de l'environnement)

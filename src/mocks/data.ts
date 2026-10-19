import type { CampusLocation, Category, Notification, Order, Product, User, Vendor, VendorSummary } from '../domain/models'

export const categories: Category[] = [
  { id: 'boissons', name: 'Boissons', emoji: '🥤', color: '#fff0c7' },
  { id: 'gateaux', name: 'Gâteaux', emoji: '🍰', color: '#f6dfd8' },
  { id: 'snacks', name: 'Snacks', emoji: '🥟', color: '#ffe8c2' },
  { id: 'repas', name: 'Repas', emoji: '🍲', color: '#ddefd8' },
]

export const vendors: Vendor[] = [
  {
    id: 'fresh-corner', campusId: 'campus-kinshasa', name: 'Fresh Corner', initials: 'FC', active: true,
    description: 'Des boissons fraîches et des jus préparés pour accompagner vos journées de cours.',
    specialty: 'Jus frais et boissons', image: '/products/jus-mangue.webp', accentColor: '#dff1d8',
  },
  {
    id: 'campus-kitchen', campusId: 'campus-kinshasa', name: 'Campus Kitchen', initials: 'CK', active: true,
    description: 'Des repas et snacks généreux, préparés sur le campus et remis à votre point préféré.',
    specialty: 'Repas et snacks', image: '/products/samoussas.webp', accentColor: '#f1ead7',
  },
  {
    id: 'douceur-campus', campusId: 'campus-kinshasa', name: 'Douceur Campus', initials: 'DC', active: true,
    description: 'Une sélection de gâteaux et de pauses gourmandes pour les petites et grandes envies.',
    specialty: 'Gâteaux et desserts', image: '/products/gateau-chocolat.webp', accentColor: '#f3dfdc',
  },
]

const summary = (vendor: Vendor): VendorSummary => ({
  id: vendor.id,
  name: vendor.name,
  initials: vendor.initials,
  active: vendor.active,
})

const freshCorner = summary(vendors[0])
const campusKitchen = summary(vendors[1])
const douceurCampus = summary(vendors[2])

export const products: Product[] = [
  {
    id: 'jus-loulou', name: 'Jus de fruits frais', shortName: 'Jus Loulou',
    description: 'Un jus de mangue frais, naturellement fruité et préparé le matin. Parfait pour accompagner une pause productive.',
    price: 600, image: '/products/jus-mangue.webp', category: 'boissons',
    preparationMinutes: 4, popular: true, available: true, vendor: freshCorner,
  },
  {
    id: 'eau-campus', name: 'Eau minérale fraîche', shortName: 'Eau fraîche',
    description: 'Eau minérale de 500 ml, servie bien fraîche. La dose d’hydratation idéale entre deux cours.',
    price: 200, image: '/products/eau.webp', category: 'boissons',
    preparationMinutes: 2, popular: true, available: true, vendor: freshCorner,
  },
  {
    id: 'gateau-chocolat', name: 'Gâteau au chocolat', shortName: 'Choco fondant',
    description: 'Un gâteau moelleux au cacao, généreux et fondant, avec une ganache au chocolat noir.',
    price: 1200, image: '/products/gateau-chocolat.webp', category: 'gateaux',
    preparationMinutes: 5, popular: true, available: true, vendor: douceurCampus,
  },
  {
    id: 'samoussas', name: 'Assiette de samoussas', shortName: 'Samoussas',
    description: 'Trois samoussas dorés et croustillants accompagnés de deux mini rouleaux de printemps.',
    price: 1000, image: '/products/samoussas.webp', category: 'snacks',
    preparationMinutes: 8, popular: true, available: true, vendor: campusKitchen,
  },
  {
    id: 'combo-campus', name: 'Combo Campus', shortName: 'Combo étudiant',
    description: 'La formule complète : samoussas, rouleaux croustillants et jus de fruits frais.',
    price: 1800, image: '/food-campus-products.webp', category: 'repas',
    preparationMinutes: 12, available: true, vendor: campusKitchen,
  },
  {
    id: 'duo-gourmand', name: 'Duo gourmand', shortName: 'Jus + gâteau',
    description: 'Un jus de fruits frais accompagné d’une part de gâteau au chocolat.',
    price: 1600, image: '/food-campus-products.webp', category: 'gateaux',
    preparationMinutes: 6, available: true, vendor: douceurCampus,
  },
]

export const campusLocations: CampusLocation[] = [
  { id: 'bibliotheque', campusId: 'campus-kinshasa', label: 'Bibliothèque centrale', description: 'Devant l’entrée principale', active: true },
  { id: 'informatique', campusId: 'campus-kinshasa', label: 'Faculté d’informatique', description: 'Hall principal', active: true },
  { id: 'entree', campusId: 'campus-kinshasa', label: 'Entrée principale', description: 'Près du poste de sécurité', active: true },
  { id: 'residence', campusId: 'campus-kinshasa', label: 'Résidence universitaire', description: 'Espace commun extérieur', active: true },
]

export const demoUser: User = {
  id: 'user-001', name: 'Kouassi Jean', firstName: 'Jean', phone: '+243 970 000 007',
  email: 'jean.kouassi@campus.cd', faculty: 'Informatique', role: 'student',
}

export const initialNotifications: Notification[] = [
  { id: 'n1', title: 'Commande en préparation', message: 'Campus Kitchen prépare votre commande #FC123456.', type: 'order', time: 'Il y a 2 min', read: false },
  { id: 'n2', title: 'Votre commande est en route', message: 'Campus Kitchen se dirige vers la bibliothèque centrale.', type: 'delivery', time: 'Il y a 10 min', read: false },
  { id: 'n3', title: 'Paiement confirmé', message: 'Votre paiement en espèces de 1 400 FC a été confirmé.', type: 'payment', time: 'Il y a 3 jours', read: true },
]

export const initialOrders: Order[] = [
  {
    id: 'FC123456', items: [{ product: products[3], quantity: 1 }, { product: products[4], quantity: 1 }],
    vendor: campusKitchen, total: 2800, status: 'out_for_delivery', paymentMethod: 'cash', paymentStatus: 'pending',
    createdAt: '2026-08-11T11:20:00.000Z', deliveryLocation: { id: 'bibliotheque', label: 'Bibliothèque centrale' },
    deliveryInstructions: 'Je serai devant l’entrée principale.', code: 'FC123456789',
  },
  {
    id: 'FC123441', items: [{ product: products[2], quantity: 1 }, { product: products[5], quantity: 1 }],
    vendor: douceurCampus, total: 2800, status: 'completed', paymentMethod: 'cash', paymentStatus: 'received',
    createdAt: '2026-08-08T12:05:00.000Z', deliveryLocation: { id: 'informatique', label: 'Faculté d’informatique' },
    code: 'FC123441701',
  },
]

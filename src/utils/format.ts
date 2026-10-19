export const formatPrice = (value: number) => `${new Intl.NumberFormat('fr-FR').format(value)} FC`
export const formatDate = (iso: string) => new Intl.DateTimeFormat('fr-FR', { day: '2-digit', month: 'short', year: 'numeric' }).format(new Date(iso))

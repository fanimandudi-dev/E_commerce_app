import { useEffect } from 'react'
import { Navigate, Outlet, Route, Routes, useLocation } from 'react-router-dom'
import { AppShell } from '../components/layout/AppShell'
import { AuthLayout } from '../components/layout/AuthLayout'
import { useAuthStore } from '../features/auth/authStore'
import { useSettingsStore } from '../features/settings/settingsStore'
import { SplashScreen } from '../features/splash/SplashScreen'
import { CartPage } from '../pages/CartPage'
import { CheckoutPage } from '../pages/CheckoutPage'
import { ExplorePage } from '../pages/ExplorePage'
import { HomePage } from '../pages/HomePage'
import { LoginPage } from '../pages/LoginPage'
import { NotificationsPage } from '../pages/NotificationsPage'
import { OrderDetailPage, OrdersPage } from '../pages/OrdersPage'
import { OrderSuccessPage } from '../pages/OrderSuccessPage'
import { ProductDetailPage } from '../pages/ProductDetailPage'
import { ProductsPage } from '../pages/ProductsPage'
import { ProfilePage } from '../pages/ProfilePage'
import { SettingsPage } from '../pages/SettingsPage'
import { VendorDetailPage } from '../pages/VendorDetailPage'

function LegacyAppRedirect() {
  const location = useLocation()
  const path = location.pathname === '/app' ? '/home' : location.pathname.replace(/^\/app/, '')
  return <Navigate to={`${path}${location.search}${location.hash}`} replace />
}

function RequireAuth() {
  const isAuthenticated = useAuthStore(state => state.isAuthenticated)
  const location = useLocation()
  return isAuthenticated ? <Outlet/> : <Navigate to="/login" state={{ from: location.pathname }} replace/>
}

export default function App() {
  const darkMode = useSettingsStore(state => state.darkMode)

  useEffect(() => {
    document.documentElement.dataset.theme = darkMode ? 'dark' : 'light'
  }, [darkMode])

  return <Routes>
    <Route path="/" element={<SplashScreen/>}/>
    <Route path="/splash" element={<SplashScreen/>}/>

    <Route element={<AuthLayout/>}>
      <Route path="/login" element={<LoginPage/>}/>
    </Route>

    <Route element={<RequireAuth/>}>
      <Route element={<AppShell/>}>
        <Route path="/home" element={<HomePage/>}/>
        <Route path="/explore" element={<ExplorePage/>}/>
        <Route path="/vendors/:id" element={<VendorDetailPage/>}/>
        <Route path="/products" element={<ProductsPage/>}/>
        <Route path="/products/:id" element={<ProductDetailPage/>}/>
        <Route path="/cart" element={<CartPage/>}/>
        <Route path="/checkout" element={<CheckoutPage/>}/>
        <Route path="/order-success/:id" element={<OrderSuccessPage/>}/>
        <Route path="/orders" element={<OrdersPage/>}/>
        <Route path="/orders/:id" element={<OrderDetailPage/>}/>
        <Route path="/notifications" element={<NotificationsPage/>}/>
        <Route path="/profile" element={<ProfilePage/>}/>
        <Route path="/settings" element={<SettingsPage/>}/>
        <Route path="/messages" element={<Navigate to="/profile" replace/>}/>
      </Route>
    </Route>

    <Route path="/app" element={<LegacyAppRedirect/>}/>
    <Route path="/app/*" element={<LegacyAppRedirect/>}/>
    <Route path="*" element={<Navigate to="/home" replace/>}/>
  </Routes>
}

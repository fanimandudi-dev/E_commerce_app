import { Outlet } from 'react-router-dom'
import { VendorSidebar } from './VendorSidebar'
import { VendorHeader } from './VendorHeader'
import '../vendor/styles/vendor-shell.css'

export function VendorShell() {
  return (
    <div className="vendor-shell">
      <VendorSidebar />
      
      <div className="vendor-main">
        <VendorHeader />
        <main className="vendor-content">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

import { Navigate } from 'react-router-dom'

/** Messaging is intentionally outside the client MVP. */
export function MessagesPage() {
  return <Navigate to="/profile" replace/>
}

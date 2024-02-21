// Framework imports
import { useMemo, useState } from "react"
// Vendor imports
import { useStore } from "zustand"
// App imports
import { useAuthStore, hasAuthToken } from "/src/state/auth.store.ts"
import LoginForm from "./components/LoginForm.tsx"
import Dashboard from "./components/Dashboard.tsx"
import './App.css'

function App() {
  const isLoggedIn = useStore(hasAuthToken);

  return (
    <>
      {
        isLoggedIn ? <Dashboard /> : <LoginForm />
      }
    </>
  )
}

export default App

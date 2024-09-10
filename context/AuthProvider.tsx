import { Session } from '@supabase/supabase-js'
import React from 'react'
import { ActivityIndicator } from 'react-native'

import { supabase } from '@/utils/supabase'

interface AuthContextType {
  session: Session | null
  user: any
  isAuthenticated: boolean
}

const AuthContext = React.createContext<AuthContextType>({
  session: null,
  user: null,
  isAuthenticated: false,
})

export default function AuthProvider({ children }: React.PropsWithChildren) {
  const [session, setSession] = React.useState<Session | null>(null)
  const [isReady, setIsReady] = React.useState(false)

  React.useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      setIsReady(true)
    })

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  }, [])

  if (!isReady) return <ActivityIndicator />

  return (
    <AuthContext.Provider
      value={{ session, user: session?.user, isAuthenticated: !!session?.user }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => React.useContext(AuthContext)

import { Stack } from 'expo-router'

import AuthProvider from '@/context/AuthProvider'
import '@/global.css'

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(tabs)',
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen name="modal" options={{ presentation: 'modal' }} />
        {/* <Stack.Screen name="(auth)/login" options={{ headerShown: false }} /> */}
      </Stack>
    </AuthProvider>
  )
}

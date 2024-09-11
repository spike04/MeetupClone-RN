import { Stack } from 'expo-router'
import React, { useState } from 'react'
import {
  ActivityIndicator,
  Alert,
  AppState,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'

import { supabase } from '@/utils/supabase'

AppState.addEventListener('change', (nextAppState) => {
  if (nextAppState === 'active') {
    supabase.auth.startAutoRefresh()
  } else {
    supabase.auth.stopAutoRefresh()
  }
})

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  async function signInWithEmail() {
    setLoading(true)
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) Alert.alert(error.message)
    setLoading(false)
  }

  async function signUpWithEmail() {
    setLoading(true)
    const {
      data: { session },
      error,
    } = await supabase.auth.signUp({
      email,
      password,
    })

    if (error) Alert.alert(error.message)
    if (!session) Alert.alert('Please check your email for a verification link!')
    setLoading(false)
  }

  return (
    <>
      <Stack.Screen options={{ title: 'Authentication' }} />
      <View className="flex-1 gap-4 bg-white p-4 pt-10">
        <TextInput
          onChangeText={setEmail}
          value={email}
          placeholder="email@address.com"
          autoCapitalize="none"
          autoFocus
          className="rounded-lg border border-gray-300 p-4"
        />
        <TextInput
          onChangeText={setPassword}
          value={password}
          placeholder="********"
          autoCapitalize="none"
          secureTextEntry
          className="rounded-lg border border-gray-300 p-4"
        />

        <View className="mt-8 gap-4">
          <TouchableOpacity
            disabled={loading}
            className="flex-row items-center justify-center gap-3 rounded-lg bg-red-400 p-3 px-8 disabled:bg-gray-300"
            onPress={signInWithEmail}>
            {loading && <ActivityIndicator className="text-white" />}
            <Text className="text-lg font-semibold text-white">
              {loading ? 'Loading...' : 'Sign In'}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            disabled={loading}
            className="flex-row items-center justify-center gap-3 rounded-lg border border-red-400 p-3 px-8 disabled:border-gray-300"
            onPress={signUpWithEmail}>
            {loading && <ActivityIndicator className="text-white" />}
            <Text className={`text-lg font-semibold text-red-500 ${loading && 'text-gray-300'}`}>
              {loading ? 'Loading...' : 'Sign Up'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  )
}

export default Login

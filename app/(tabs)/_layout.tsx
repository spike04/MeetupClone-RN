import { Redirect, Tabs } from 'expo-router'

import { TabBarIcon } from '@/components/TabBarIcon'
import { useAuth } from '@/context/AuthProvider'

export default function TabLayout() {
  const { isAuthenticated } = useAuth()

  if (!isAuthenticated) {
    return <Redirect href="/login" /> // Testing Authentication Route
  }

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: 'black',
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Events',
          tabBarIcon: ({ color }) => <TabBarIcon name="calendar" color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color }) => <TabBarIcon name="user" color={color} />,
        }}
      />
    </Tabs>
  )
}

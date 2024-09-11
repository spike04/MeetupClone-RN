import { Stack, useLocalSearchParams } from 'expo-router'
import React, { useEffect, useState } from 'react'
import { FlatList, Text, View } from 'react-native'

import { Attendance } from '@/types'
import { supabase } from '@/utils/supabase'

export default function EventAttendance() {
  const { id } = useLocalSearchParams()

  const [attendees, setAttendees] = useState<Attendance[] | null>(null)

  useEffect(() => {
    async function fetchAttendees() {
      const { data } = await supabase.from('attendance').select('*, profiles(*)').eq('event_id', id)

      setAttendees(data)
    }
    fetchAttendees()
  }, [id])

  return (
    <>
      <Stack.Screen
        options={{
          title: 'Attendance',
          headerBackTitleVisible: false,
          headerTintColor: '#333333',
        }}
      />

      <FlatList
        data={attendees}
        renderItem={({ item }) => (
          <View className="p-3">
            <Text className="font-bold">{item.profiles.full_name || 'User'}</Text>
          </View>
        )}
      />
    </>
  )
}

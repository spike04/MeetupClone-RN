import { Stack } from 'expo-router'
import { useEffect, useState } from 'react'
import { FlatList, View } from 'react-native'

import EventListItem from '@/components/EventListItem'
import { Event } from '@/types'
import { supabase } from '@/utils/supabase'

export default function Events() {
  const [events, setEvents] = useState<Event[]>([])

  const fetchEvents = async () => {
    const { data } = await supabase.from('events').select('*')
    setEvents(data as Event[])
  }

  useEffect(() => {
    fetchEvents()
  }, [])

  return (
    <>
      <Stack.Screen options={{ title: 'Events' }} />

      {/* Event List Item */}
      <FlatList
        className="bg-white"
        data={events}
        renderItem={({ item }) => <EventListItem event={item} />}
        keyExtractor={(item) => item.id}
        ItemSeparatorComponent={() => <View className="h-px bg-gray-200" />}
      />
    </>
  )
}

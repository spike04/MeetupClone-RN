import { Feather } from '@expo/vector-icons'
import dayjs from 'dayjs'
import { Stack, useLocalSearchParams } from 'expo-router'
import React, { useEffect, useState } from 'react'
import { ActivityIndicator, Image, Text, TouchableOpacity, View } from 'react-native'

import { useAuth } from '@/context/AuthProvider'
import { Attendance, Event } from '@/types'
import { supabase } from '@/utils/supabase'

const EventDetails = () => {
  const { id } = useLocalSearchParams()
  const { user } = useAuth()

  const [event, setEvent] = useState<Event>()
  const [loading, setLoading] = useState(false)
  const [attendance, setAttendance] = useState<Attendance | null>(null)

  useEffect(() => {
    async function fetchEvent() {
      setLoading(true)
      try {
        const { data } = await supabase.from('events').select('*').eq('id', id).single()
        setEvent(data as Event)

        const { data: attendanceData } = await supabase
          .from('attendance')
          .select('*')
          .eq('user_id', user.id)
          .eq('event_id', id)
          .single()

        setAttendance(attendanceData)
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false)
      }
    }
    fetchEvent()
  }, [id])

  const joinTheEvent = async () => {
    const { data, error } = await supabase
      .from('attendance')
      .insert({
        user_id: user.id,
        event_id: event?.id,
      })
      .select()
      .single()

    setAttendance(data)
  }

  let widget

  if (loading || !event) {
    widget = (
      <View className="flex-1 items-center justify-center gap-2">
        <ActivityIndicator />
        <Text className="text-xl font-semibold">Loading...</Text>
      </View>
    )
  }
  if (!event && !loading) {
    widget = <Text>Event not found</Text>
  }

  if (event) {
    widget = (
      <View className="flex-1 gap-3 bg-white p-4">
        <Image className="aspect-video w-full rounded-xl" source={{ uri: event.image_uri }} />
        <Text className="text-3xl font-bold" numberOfLines={2}>
          {event.title}
        </Text>
        <Text className="text-md font-semibold uppercase text-amber-700">
          {dayjs(event.date).format('ddd, D MMM')} · {dayjs(event.date).format('h:mm A')}
        </Text>
        <Text className="text-md" numberOfLines={2}>
          {event.description}
        </Text>

        <TouchableOpacity className="mt-8 flex-row items-start gap-4">
          <Feather name="calendar" size={20} />
          <View className="flex-1 flex-row items-center justify-between">
            <View className="gap-1">
              <Text className="text-base font-semibold">
                {dayjs(event.date).format('dddd, D MMMM YYYY')}
              </Text>
              <View className="flex-row items-center gap-2">
                <Text className="text-sm font-light">
                  {dayjs(event.date).format('h:mm')} - {dayjs(event.date).format('h:mm')} CEST
                </Text>
                <Feather name="info" size={14} color="gray" />
              </View>
            </View>
            <Feather name="chevron-right" size={24} color="gray" className="ml-auto" />
          </View>
        </TouchableOpacity>

        <View className="h-px bg-gray-100" />

        <TouchableOpacity className="flex-row items-start gap-4">
          <Feather name="map-pin" size={20} />
          <View className="flex-1 flex-row items-center justify-between">
            <View className="gap-1">
              <Text className="text-base font-semibold">{event.location}</Text>
              <View className="flex-row items-center gap-2">
                <Text className="text-sm font-light">{event.location}</Text>
              </View>
            </View>
            <Feather name="chevron-right" size={24} color="gray" className="ml-auto" />
          </View>
        </TouchableOpacity>

        <View className="h-px bg-gray-100" />

        {/* Footer */}
        <View className="absolute bottom-0 left-0 right-0 flex-row items-center justify-between border-t border-gray-200 bg-white p-4 pb-10">
          <Text className="text-xl font-semibold">Free</Text>

          {attendance ? (
            <Text className="font-bold text-green-500">You are attending</Text>
          ) : (
            <TouchableOpacity
              className="flex-row items-center justify-center gap-3 rounded-lg bg-red-400 p-3 px-8"
              onPress={joinTheEvent}>
              <Text className="text-lg font-semibold text-white">Join and RSVP</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    )
  }

  return (
    <>
      <Stack.Screen
        options={{
          title: event?.title,
          headerBackTitleVisible: false,
          headerTintColor: '#333333',
          headerRight: () => <Feather name="bookmark" size={20} color="gray" />,
        }}
      />

      {widget}
    </>
  )
}

export default EventDetails

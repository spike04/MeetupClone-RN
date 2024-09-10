import { Feather } from '@expo/vector-icons';
import dayjs from 'dayjs';
import { Stack, useLocalSearchParams } from 'expo-router';
import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';

import events from '@/assets/events.json';

const EventDetails = () => {
  const { id } = useLocalSearchParams();

  const event = events.find((e) => e.id === id);

  if (!event) {
    return <Text>Event not found</Text>;
  }

  return (
    <>
      <Stack.Screen
        options={{
          title: event?.title,
          headerBackTitleVisible: false,
          headerTintColor: '#333',
          headerRight: () => <Feather name="bookmark" size={20} color="gray" />,
        }}
      />
      <View className="flex-1 gap-3 bg-white p-4">
        <Image className="aspect-video w-full rounded-xl" source={{ uri: event.image }} />
        <Text className="text-3xl font-bold" numberOfLines={2}>
          {event.title}
        </Text>
        <Text className="text-md font-semibold uppercase text-amber-700">
          {dayjs(event.datetime).format('ddd, D MMM')} · {dayjs(event.datetime).format('h:mm A')}
        </Text>
        <Text className="text-md" numberOfLines={2}>
          {event.description}
        </Text>

        <TouchableOpacity className="mt-8 flex-row items-start gap-4">
          <Feather name="calendar" size={20} />
          <View className="flex-1 flex-row items-center justify-between">
            <View className="gap-1">
              <Text className="text-base font-semibold">
                {dayjs(event.datetime).format('dddd, D MMMM YYYY')}
              </Text>
              <View className="flex-row items-center gap-2">
                <Text className="text-sm font-light">
                  {dayjs(event.datetime).format('h:mm')} - {dayjs(event.datetime).format('h:mm')}{' '}
                  CEST
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

          <TouchableOpacity className="flex-row items-center justify-center gap-3 rounded-lg bg-red-400 p-3 px-8">
            <Text className="text-lg font-semibold text-white">Join and RSVP</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

export default EventDetails;

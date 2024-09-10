import dayjs from 'dayjs';
import { Stack, useLocalSearchParams } from 'expo-router';
import React from 'react';
import { Image, Text, View } from 'react-native';

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
        options={{ title: event?.title, headerBackTitleVisible: false, headerTintColor: '#333' }}
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
      </View>
    </>
  );
};

export default EventDetails;

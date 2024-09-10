import { Feather } from '@expo/vector-icons';
import dayjs from 'dayjs';
import { Link } from 'expo-router';
import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';

import { Event } from '@/types';

interface Props {
  event: Event;
}

const EventListItem = ({ event }: Props) => {
  return (
    <Link href={`/${event.id}`} asChild>
      <TouchableOpacity className="gap-3 p-4">
        <View className="flex-row items-end">
          <View className="mr-2 flex-1 gap-2">
            <Text className="text-md font-semibold uppercase text-amber-700">
              {dayjs(event.datetime).format('ddd, D MMM')} ·{' '}
              {dayjs(event.datetime).format('h:mm A')}
            </Text>
            <Text className="text-2xl font-bold" numberOfLines={2}>
              {event.title}
            </Text>
            <Text className="text-gray-500">{event.location}</Text>
          </View>
          {/* Event Image */}
          <Image className="ml-auto aspect-video w-2/5 rounded-xl" source={{ uri: event.image }} />
        </View>
        {/* Footer */}
        <View className="flex-row items-center gap-3">
          <Text className="mr-auto">16 GOING · ICON BCN</Text>
          <Feather name="share" size={20} color="gray" />
          <Feather name="bookmark" size={20} color="gray" />
        </View>
      </TouchableOpacity>
    </Link>
  );
};

export default EventListItem;

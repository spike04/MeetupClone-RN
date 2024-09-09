import { Feather } from '@expo/vector-icons';
import React from 'react';
import { Image, Text, View } from 'react-native';

interface Props {
  event: Event;
}

const EventListItem = ({ event }: Props) => {
  return (
    <View className="gap-3 p-4">
      <View className="flex-row items-end">
        <View className="mr-4 flex-1 gap-2">
          <Text className="text-md font-semibold uppercase text-amber-700">
            Wed 13, Sep · 1930 CEST
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
    </View>
  );
};

export default EventListItem;

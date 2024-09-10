import { Stack } from 'expo-router';
import { FlatList, View } from 'react-native';

import events from '@/assets/events.json';
import EventListItem from '@/components/EventListItem';

export default function Events() {
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
  );
}

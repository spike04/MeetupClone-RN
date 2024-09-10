import { useLocalSearchParams } from 'expo-router';
import React from 'react';
import { Text, View } from 'react-native';

import events from '@/assets/events.json';

const EventDetails = () => {
  const { id } = useLocalSearchParams();

  const event = events.find((e) => e.id === id);

  return (
    <View>
      <Text>EventDetails: {event?.title}</Text>
    </View>
  );
};

export default EventDetails;

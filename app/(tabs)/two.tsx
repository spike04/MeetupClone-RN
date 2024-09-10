import { Stack } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { ScreenContent } from '@/components/ScreenContent';
import { supabase } from '@/utils/supabase';

export default function Home() {
  return (
    <>
      <Stack.Screen options={{ title: 'Tab Two' }} />

      <TouchableOpacity
        className="flex-row items-center justify-center gap-3 rounded-lg bg-red-400 p-3 px-8"
        onPress={() => supabase.auth.signOut()}>
        <Text className="text-lg font-semibold text-white">Logout</Text>
      </TouchableOpacity>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
});

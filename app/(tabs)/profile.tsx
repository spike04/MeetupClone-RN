import { Feather } from '@expo/vector-icons';
import { Stack } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, Text, TextInput, TouchableOpacity, View } from 'react-native';

import { useAuth } from '@/context/AuthProvider';
import { supabase } from '@/utils/supabase';

export default function Profile() {
  const { session } = useAuth();
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState('');
  const [website, setWebsite] = useState('');
  const [fullName, setFullName] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');

  useEffect(() => {
    if (session) getProfile();
  }, [session]);

  async function getProfile() {
    setLoading(true);
    try {
      if (!session?.user) throw new Error('No user found');

      const { data, error, status } = await supabase
        .from('profiles')
        .select('username, website, full_name, avatar_url')
        .eq('id', session.user.id)
        .single();

      if (error && status !== 406) throw error;

      if (data) {
        setUsername(data.username);
        setWebsite(data.website);
        setAvatarUrl(data.avatar_url);
        setFullName(data.full_name);
      }
    } catch (error) {
      if (error instanceof Error) Alert.alert(error.message);
    } finally {
      setLoading(false);
    }
  }

  async function updateProfile() {
    setLoading(true);
    try {
      const updates = {
        id: session?.user.id,
        username,
        website,
        full_name: fullName,
        avatar_url: avatarUrl,
        updated_at: new Date(),
      };

      const { error } = await supabase.from('profiles').upsert(updates);

      if (error) throw error;
    } catch (error) {
      if (error instanceof Error) Alert.alert(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Stack.Screen
        options={{
          title: 'Profile',
          headerRight: (props) => {
            return (
              <TouchableOpacity onPress={() => supabase.auth.signOut()} className="mr-4">
                <Feather name="log-out" size={24} />
              </TouchableOpacity>
            );
          },
        }}
      />

      <View className="flex-1 gap-4 bg-white p-4">
        <TextInput
          editable={false}
          value={session?.user.email}
          className="rounded-lg border border-gray-300 p-4 text-gray-600"
        />
        <TextInput
          onChangeText={setFullName}
          value={fullName}
          placeholder="John Doe"
          autoCapitalize="words"
          className="rounded-lg border border-gray-300 p-4"
        />
        <TextInput
          onChangeText={setUsername}
          value={username}
          placeholder="johndoe"
          autoCapitalize="none"
          className="rounded-lg border border-gray-300 p-4"
        />
        <TextInput
          onChangeText={setWebsite}
          value={website}
          placeholder="johndoe.com"
          autoCapitalize="none"
          className="rounded-lg border border-gray-300 p-4"
        />
        <TouchableOpacity
          disabled={loading}
          className="mt-8 flex-row items-center justify-center gap-3 rounded-lg bg-red-400 p-3 px-8 disabled:bg-gray-300"
          onPress={updateProfile}>
          {loading && <ActivityIndicator className="bg-gray-300 text-white" />}
          <Text className="text-lg font-semibold text-white">
            {loading ? 'Updating...' : 'Update'}
          </Text>
        </TouchableOpacity>
      </View>

      {/* <TouchableOpacity
        className="flex-row items-center justify-center gap-3 rounded-lg bg-red-400 p-3 px-8"
        onPress={() => supabase.auth.signOut()}>
        <Text className="text-lg font-semibold text-white">Logout</Text>
      </TouchableOpacity> */}
    </>
  );
}

import { Redirect, Stack } from 'expo-router';
import React from 'react';

import { useAuth } from '@/context/AuthProvider';

export default function AuthLayout() {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Redirect href="/(tabs)" />;
  }
  return <Stack />;
}

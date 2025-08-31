import { Stack } from 'expo-router';
import React from 'react';
import { useTheme } from '@/contexts/ThemeContext';

export default function SecurityLayout() {
  const { theme } = useTheme();

  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: theme.colors.background,
        },
        headerTintColor: theme.colors.text,
        headerTitleStyle: {
          fontSize: 28,
          fontWeight: '700',
        },
        headerShadowVisible: true,
      }}
    >
      <Stack.Screen 
        name="security" 
        options={{
          title: 'Security',
        }} 
      />
    </Stack>
  );
}
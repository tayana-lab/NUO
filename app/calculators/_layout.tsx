import { Stack } from 'expo-router';

export default function CalculatorsLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="mf-calculator" />
      <Stack.Screen name="sip-calculator" />
      <Stack.Screen name="sip-topup-calculator" />
      <Stack.Screen name="swp-calculator" />
      <Stack.Screen name="sip-swp-calculator" />
      <Stack.Screen name="fd-calculator" />
      <Stack.Screen name="aif-calculator" />
      <Stack.Screen name="lumpsum-calculator" />
      <Stack.Screen name="education-calculator" />
      <Stack.Screen name="marriage-calculator" />
      <Stack.Screen name="retirement-calculator" />
      <Stack.Screen name="future-value-calculator" />
    </Stack>
  );
}
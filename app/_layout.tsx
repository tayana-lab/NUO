import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack, router } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import React, { useEffect, useState } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { LanguageProvider } from "@/contexts/LanguageContext";
import SplashScreenComponent from "@/components/SplashScreen";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

const queryClient = new QueryClient();

function RootLayoutNav() {
  return (
    <Stack screenOptions={{ headerBackTitle: "Back" }} initialRouteName="auth/login">
      <Stack.Screen name="auth/login" options={{ headerShown: false }} />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="auth/signup" options={{ headerShown: false }} />
      <Stack.Screen name="auth/otp" options={{ headerShown: false }} />
      <Stack.Screen name="auth/set-pin" options={{ headerShown: false }} />
      <Stack.Screen name="calculators" options={{ headerShown: false }} />
      <Stack.Screen name="assets/index" options={{ headerShown: true }} />
      <Stack.Screen name="assets/bank-accounts" options={{ headerShown: true }} />
      <Stack.Screen name="liabilities/index" options={{ headerShown: true}} />
      <Stack.Screen name="security/index" options={{ headerShown: true }} />
      <Stack.Screen name="goals/index" options={{ headerShown: true }} />
      <Stack.Screen name="education/index" options={{ headerShown: true }} />
      <Stack.Screen name="+not-found" options={{ headerShown: true }} />
    </Stack>
  );
}

export default function RootLayout() {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    SplashScreen.hideAsync();
  }, []);

  const handleSplashFinish = () => {
    setShowSplash(false);
    // Navigate to login page after splash screen
    setTimeout(() => {
      router.replace('/auth/login');
    }, 100);
  };

  if (showSplash) {
    return (
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <LanguageProvider>
            <GestureHandlerRootView style={{ flex: 1 }}>
              <SplashScreenComponent onFinish={handleSplashFinish} />
            </GestureHandlerRootView>
          </LanguageProvider>
        </ThemeProvider>
      </QueryClientProvider>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <LanguageProvider>
          <GestureHandlerRootView style={{ flex: 1 }}>
            <RootLayoutNav />
          </GestureHandlerRootView>
        </LanguageProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
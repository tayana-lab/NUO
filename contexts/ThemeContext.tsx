import createContextHook from '@nkzw/create-context-hook';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState, useCallback, useMemo } from 'react';
import { Theme, themes } from '@/types/theme';

export const [ThemeProvider, useTheme] = createContextHook(() => {
  const [currentTheme, setCurrentTheme] = useState<Theme>(themes.default);
  const [isLoading, setIsLoading] = useState(true);

  const loadTheme = useCallback(async () => {
    try {
      const savedTheme = await AsyncStorage.getItem('theme');
      if (savedTheme && themes[savedTheme]) {
        setCurrentTheme(themes[savedTheme]);
      }
    } catch (error) {
      console.log('Error loading theme:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadTheme();
  }, [loadTheme]);

  const changeTheme = useCallback(async (themeName: string) => {
    if (themes[themeName]) {
      setCurrentTheme(themes[themeName]);
      try {
        await AsyncStorage.setItem('theme', themeName);
      } catch (error) {
        console.log('Error saving theme:', error);
      }
    }
  }, []);

  const availableThemes = useMemo(() => Object.keys(themes), []);

  return useMemo(() => ({
    theme: currentTheme,
    changeTheme,
    isLoading,
    availableThemes,
  }), [currentTheme, changeTheme, isLoading, availableThemes]);
});
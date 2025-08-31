import createContextHook from '@nkzw/create-context-hook';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState, useCallback, useMemo } from 'react';
import { translations } from '@/types/language';

export const [LanguageProvider, useLanguage] = createContextHook(() => {
  const [currentLanguage, setCurrentLanguage] = useState<string>('en');
  const [isLoading, setIsLoading] = useState(true);

  const loadLanguage = useCallback(async () => {
    try {
      const savedLanguage = await AsyncStorage.getItem('language');
      if (savedLanguage && translations[savedLanguage]) {
        setCurrentLanguage(savedLanguage);
      }
    } catch (error) {
      console.log('Error loading language:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadLanguage();
  }, [loadLanguage]);

  const changeLanguage = useCallback(async (languageCode: string) => {
    if (translations[languageCode]) {
      setCurrentLanguage(languageCode);
      try {
        await AsyncStorage.setItem('language', languageCode);
      } catch (error) {
        console.log('Error saving language:', error);
      }
    }
  }, []);

  const t = useMemo(() => translations[currentLanguage] || translations.en, [currentLanguage]);
  const availableLanguages = useMemo(() => Object.keys(translations), []);

  return useMemo(() => ({
    language: currentLanguage,
    changeLanguage,
    t,
    isLoading,
    availableLanguages,
  }), [currentLanguage, changeLanguage, t, isLoading, availableLanguages]);
});
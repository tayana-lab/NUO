import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Check } from 'lucide-react-native';
import { useTheme } from '@/contexts/ThemeContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { router, Stack } from 'expo-router';

export default function LanguageSelectionScreen() {
  const { theme } = useTheme();
  const { language, changeLanguage, availableLanguages } = useLanguage();

  const languageNames: Record<string, string> = {
    en: 'English',
    hi: 'हिन्दी (Hindi)',
    bn: 'বাংলা (Bengali)',
    ta: 'தமிழ் (Tamil)',
    te: 'తెలుగు (Telugu)',
    kn: 'ಕನ್ನಡ (Kannada)',
    ml: 'മലയാളം (Malayalam)',
  };

  const languageDescriptions: Record<string, string> = {
    en: 'English',
    hi: 'Hindi',
    bn: 'Bengali',
    ta: 'Tamil',
    te: 'Telugu',
    kn: 'Kannada',
    ml: 'Malayalam',
  };

  const handleLanguageSelect = (langCode: string) => {
    changeLanguage(langCode);
    router.back();
  };

  return (
    <>
      <Stack.Screen 
        options={{
          title: 'Language',
          headerStyle: { backgroundColor: theme.colors.background },
          headerTintColor: theme.colors.text,
          headerTitleStyle: { fontWeight: '600' },
        }} 
      />
      <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]} edges={['bottom']}>
        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          <View style={[styles.section, { backgroundColor: theme.colors.surface }]}>
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Choose Language</Text>
            <Text style={[styles.sectionSubtitle, { color: theme.colors.textSecondary }]}>Select your preferred app language</Text>
            
            {availableLanguages.map((langCode, index) => {
              const isSelected = language === langCode;
              
              return (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.languageItem,
                    { borderBottomColor: theme.colors.border },
                    index === availableLanguages.length - 1 && styles.lastItem,
                    isSelected && { backgroundColor: theme.colors.primary + '10' }
                  ]}
                  onPress={() => handleLanguageSelect(langCode)}
                >
                  <View style={styles.languageLeft}>
                    <View style={[styles.languageFlag, { backgroundColor: theme.colors.primary + '20' }]}>
                      <Text style={[styles.languageCode, { color: theme.colors.primary }]}>
                        {langCode.toUpperCase()}
                      </Text>
                    </View>
                    <View style={styles.languageTextContainer}>
                      <Text style={[styles.languageTitle, { color: theme.colors.text }]}>
                        {languageNames[langCode] || langCode.toUpperCase()}
                      </Text>
                      <Text style={[styles.languageDescription, { color: theme.colors.textSecondary }]}>
                        {languageDescriptions[langCode] || langCode}
                      </Text>
                    </View>
                  </View>
                  {isSelected && (
                    <Check size={20} color={theme.colors.primary} />
                  )}
                </TouchableOpacity>
              );
            })}
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  section: {
    margin: 16,
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 4,
  },
  sectionSubtitle: {
    fontSize: 14,
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  languageItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
  },
  lastItem: {
    borderBottomWidth: 0,
  },
  languageLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  languageFlag: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  languageCode: {
    fontSize: 10,
    fontWeight: '600',
  },
  languageTextContainer: {
    flex: 1,
  },
  languageTitle: {
    fontSize: 16,
    fontWeight: '500',
  },
  languageDescription: {
    fontSize: 14,
    marginTop: 2,
  },
});
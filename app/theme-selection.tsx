import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Check } from 'lucide-react-native';
import { useTheme } from '@/contexts/ThemeContext';

import { router, Stack } from 'expo-router';

export default function ThemeSelectionScreen() {
  const { theme, changeTheme, availableThemes } = useTheme();


  const themeDisplayNames = {
    default: 'Professional Blue',
    dark: 'Dark Professional',
    green: 'Wealth Green',
    premium: 'Premium Gold'
  };

  const themeColors = {
    default: '#0066CC',
    dark: '#3B82F6',
    green: '#059669',
    premium: '#B45309'
  };

  const getCurrentThemeKey = () => {
    return availableThemes.find(themeName => {
      const displayName = themeDisplayNames[themeName as keyof typeof themeDisplayNames];
      return theme.name === displayName;
    }) || 'default';
  };

  const handleThemeSelect = (themeName: string) => {
    changeTheme(themeName);
    router.back();
  };

  return (
    <>
      <Stack.Screen 
        options={{
          title: 'Theme',
          headerStyle: { backgroundColor: theme.colors.background },
          headerTintColor: theme.colors.text,
          headerTitleStyle: { fontWeight: '600' },
        }} 
      />
      <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]} edges={['bottom']}>
        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          <View style={[styles.section, { backgroundColor: theme.colors.surface }]}>
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Choose Theme</Text>
            <Text style={[styles.sectionSubtitle, { color: theme.colors.textSecondary }]}>Select your preferred app theme</Text>
            
            {availableThemes.map((themeName, index) => {
              const isSelected = getCurrentThemeKey() === themeName;
              const displayName = themeDisplayNames[themeName as keyof typeof themeDisplayNames];
              const themeColor = themeColors[themeName as keyof typeof themeColors];
              
              return (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.themeItem,
                    { borderBottomColor: theme.colors.border },
                    index === availableThemes.length - 1 && styles.lastItem,
                    isSelected && { backgroundColor: theme.colors.primary + '10' }
                  ]}
                  onPress={() => handleThemeSelect(themeName)}
                >
                  <View style={styles.themeLeft}>
                    <View style={[
                      styles.themeColorPreview,
                      { backgroundColor: themeColor }
                    ]} />
                    <View style={styles.themeTextContainer}>
                      <Text style={[styles.themeTitle, { color: theme.colors.text }]}>
                        {displayName}
                      </Text>
                      <Text style={[styles.themeDescription, { color: theme.colors.textSecondary }]}>
                        {themeName === 'default' ? 'Clean and professional' :
                         themeName === 'dark' ? 'Easy on the eyes' :
                         themeName === 'green' ? 'Wealth and growth focused' :
                         themeName === 'premium' ? 'Premium and elegant' : 'Custom theme'}
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
  themeItem: {
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
  themeLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  themeColorPreview: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 12,
  },
  themeTextContainer: {
    flex: 1,
  },
  themeTitle: {
    fontSize: 16,
    fontWeight: '500',
  },
  themeDescription: {
    fontSize: 14,
    marginTop: 2,
  },
});
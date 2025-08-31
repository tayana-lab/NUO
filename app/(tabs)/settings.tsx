import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Moon, Sun, User, Bell, Shield, HelpCircle, LogOut, ChevronRight, TrendingUp, Globe, Palette } from 'lucide-react-native';
import { useTheme } from '@/contexts/ThemeContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { router } from 'expo-router';

export default function SettingsScreen() {
  const { theme, changeTheme } = useTheme();
  const { language, t } = useLanguage();
  const isDark = theme.name === 'Dark Professional';

  const languageNames: Record<string, string> = {
    en: 'English',
    hi: 'हिन्दी',
    bn: 'বাংলা',
    ta: 'தமிழ்',
    te: 'తెలుగు',
    kn: 'ಕನ್ನಡ',
    ml: 'മലയാളം',
  };

  const getCurrentLanguageName = () => {
    return languageNames[language] || language.toUpperCase();
  };

  const getCurrentThemeName = () => {
    return theme.name;
  };

  const handleThemeToggle = () => {
    changeTheme(isDark ? 'default' : 'dark');
  };

  const appearanceOptions = [
    {
      title: 'Theme',
      subtitle: getCurrentThemeName(),
      icon: Palette,
      onPress: () => router.push('/theme-selection'),
      showArrow: true,
    },
    {
      title: t.settings.language,
      subtitle: getCurrentLanguageName(),
      icon: Globe,
      onPress: () => router.push('/language-selection'),
      showArrow: true,
    },
  ];

  const settingsOptions = [
    {
      title: t.settings.profileSettings,
      icon: User,
      onPress: () => router.push('/profile-settings'),
      showArrow: true,
    },
    {
      title: t.settings.riskProfile,
      icon: TrendingUp,
      onPress: () => router.push('/risk-profile'),
      showArrow: true,
    },
    {
      title: t.settings.notifications,
      icon: Bell,
      onPress: () => console.log('Notifications pressed'),
      showArrow: true,
    },
    {
      title: t.settings.security,
      icon: Shield,
      onPress: () => console.log('Security pressed'),
      showArrow: true,
    },
    {
      title: t.settings.help,
      icon: HelpCircle,
      onPress: () => console.log('Help pressed'),
      showArrow: true,
    },
  ];

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]} edges={['top', 'bottom']}>
        {/* Custom Header */}
        <View style={[styles.header, { backgroundColor: theme.colors.background, borderBottomColor: theme.colors.border }]}>
          <Text style={[styles.headerTitle, { color: theme.colors.text }]}>{t.settings.title}</Text>
        </View>
        
        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          {/* Appearance Section */}
          <View style={[styles.section, { backgroundColor: theme.colors.surface }]}>
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Appearance</Text>
            
            {/* Dark Mode Toggle */}
            <View style={[styles.settingItem, { borderBottomColor: theme.colors.border }]}>
              <View style={styles.settingLeft}>
                <View style={[styles.iconContainer, { backgroundColor: theme.colors.primary + '20' }]}>
                  {isDark ? (
                    <Moon size={20} color={theme.colors.primary} />
                  ) : (
                    <Sun size={20} color={theme.colors.primary} />
                  )}
                </View>
                <View style={styles.settingTextContainer}>
                  <Text style={[styles.settingTitle, { color: theme.colors.text }]}>
                    Dark Mode
                  </Text>
                  <Text style={[styles.settingSubtitle, { color: theme.colors.textSecondary }]}>
                    {isDark ? 'Dark theme enabled' : 'Light theme enabled'}
                  </Text>
                </View>
              </View>
              <Switch
                value={isDark}
                onValueChange={handleThemeToggle}
                trackColor={{ false: theme.colors.border, true: theme.colors.primary }}
                thumbColor={isDark ? '#ffffff' : '#f4f3f4'}
                testID="theme-toggle"
              />
            </View>

            {/* Theme and Language Options */}
            {appearanceOptions.map((option, index) => {
              const IconComponent = option.icon;
              return (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.settingItem,
                    { borderBottomColor: theme.colors.border },
                    index === appearanceOptions.length - 1 && styles.lastItem
                  ]}
                  onPress={option.onPress}
                >
                  <View style={styles.settingLeft}>
                    <View style={[styles.iconContainer, { backgroundColor: theme.colors.primary + '20' }]}>
                      <IconComponent size={20} color={theme.colors.primary} />
                    </View>
                    <View style={styles.settingTextContainer}>
                      <Text style={[styles.settingTitle, { color: theme.colors.text }]}>
                        {option.title}
                      </Text>
                      <Text style={[styles.settingSubtitle, { color: theme.colors.textSecondary }]}>
                        {option.subtitle}
                      </Text>
                    </View>
                  </View>
                  {option.showArrow && (
                    <ChevronRight size={20} color={theme.colors.textSecondary} />
                  )}
                </TouchableOpacity>
              );
            })}
          </View>

          {/* General Settings */}
          <View style={[styles.section, { backgroundColor: theme.colors.surface }]}>
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>General</Text>
            
            {settingsOptions.map((option, index) => {
              const IconComponent = option.icon;
              return (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.settingItem,
                    { borderBottomColor: theme.colors.border },
                    index === settingsOptions.length - 1 && styles.lastItem
                  ]}
                  onPress={option.onPress}
                >
                  <View style={styles.settingLeft}>
                    <View style={[styles.iconContainer, { backgroundColor: theme.colors.primary + '20' }]}>
                      <IconComponent size={20} color={theme.colors.primary} />
                    </View>
                    <Text style={[styles.settingTitle, { color: theme.colors.text }]}>
                      {option.title}
                    </Text>
                  </View>
                  {option.showArrow && (
                    <ChevronRight size={20} color={theme.colors.textSecondary} />
                  )}
                </TouchableOpacity>
              );
            })}
          </View>

          {/* Logout */}
          <View style={[styles.section, { backgroundColor: theme.colors.surface }]}>
            <TouchableOpacity
              style={[styles.settingItem, styles.logoutItem]}
              onPress={() => router.replace('/auth/login')}
            >
              <View style={styles.settingLeft}>
                <View style={[styles.iconContainer, { backgroundColor: theme.colors.error + '20' }]}>
                  <LogOut size={20} color={theme.colors.error} />
                </View>
                <Text style={[styles.settingTitle, { color: theme.colors.error }]}>
                  {t.settings.logout}
                </Text>
              </View>
            </TouchableOpacity>
          </View>

          <View style={styles.bottomSpacing} />
        </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    marginBottom: 8,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '700',
  },
  scrollView: {
    flex: 1,
  },
  section: {
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
  },
  settingItem: {
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
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  settingTextContainer: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '500',
  },
  settingSubtitle: {
    fontSize: 14,
    marginTop: 2,
  },
  logoutItem: {
    borderBottomWidth: 0,
  },
  bottomSpacing: {
    height: 32,
  },
});
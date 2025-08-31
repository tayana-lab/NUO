import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, StatusBar } from 'react-native';
import { Shield, Heart, Umbrella, PiggyBank, TrendingUp, Home, Car, Briefcase, DollarSign } from 'lucide-react-native';
import { useTheme } from '@/contexts/ThemeContext';

interface SecurityItem {
  id: string;
  name: string;
  icon: React.ComponentType<any>;
  value: string;
  change: string;
  isPositive: boolean;
}

const securityItems: SecurityItem[] = [
  { id: 'life-insurance', name: 'Life Insurance', icon: Heart, value: '₹25,00,000', change: 'Active', isPositive: true },
  { id: 'health-insurance', name: 'Health Insurance', icon: Shield, value: '₹10,00,000', change: 'Active', isPositive: true },
  { id: 'general-insurance', name: 'General Insurance', icon: Umbrella, value: '₹15,00,000', change: 'Active', isPositive: true },
  { id: 'emergency-fund', name: 'Emergency Fund', icon: PiggyBank, value: '₹5,00,000', change: '+2.5%', isPositive: true },
  { id: 'pension-fund', name: 'Pension Fund', icon: TrendingUp, value: '₹12,50,000', change: '+8.2%', isPositive: true },
  { id: 'home-insurance', name: 'Home Insurance', icon: Home, value: '₹50,00,000', change: 'Active', isPositive: true },
  { id: 'vehicle-insurance', name: 'Vehicle Insurance', icon: Car, value: '₹8,00,000', change: 'Active', isPositive: true },
  { id: 'professional-insurance', name: 'Professional Insurance', icon: Briefcase, value: '₹20,00,000', change: 'Active', isPositive: true },
];

export default function SecurityTabScreen() {
  const { theme } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <StatusBar barStyle={theme.name === 'dark' ? 'light-content' : 'dark-content'} backgroundColor={theme.colors.background} />
      
      <View style={[styles.summaryCard, { backgroundColor: theme.colors.surface }]}>
        <Text style={[styles.summaryLabel, { color: theme.colors.textSecondary }]}>Total Security</Text>
        <Text style={[styles.summaryValue, { color: theme.colors.text }]}>₹1,45,50,000</Text>
        <Text style={[styles.summaryChange, { color: theme.colors.success }]}>Comprehensive coverage</Text>
      </View>

      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {securityItems.map((item) => {
          const IconComponent = item.icon;
          return (
            <TouchableOpacity
              key={item.id}
              style={[styles.securityItem, { backgroundColor: theme.colors.surface, borderBottomColor: theme.colors.border }]}
              testID={`security-${item.id}`}
            >
              <View style={styles.securityItemLeft}>
                <View style={[styles.securityIcon, { backgroundColor: theme.colors.primary + '15' }]}>
                  <IconComponent size={24} color={theme.colors.primary} />
                </View>
                <View style={styles.securityInfo}>
                  <Text style={[styles.securityName, { color: theme.colors.text }]}>
                    {item.name}
                  </Text>
                  <View style={styles.securityMeta}>
                    <View style={[styles.statusDot, { backgroundColor: item.isPositive ? theme.colors.success : theme.colors.error }]} />
                    <Text style={[styles.securityStatus, { color: theme.colors.textSecondary }]}>
                      {item.change.includes('%') ? 'Growing' : 'Active Coverage'}
                    </Text>
                  </View>
                </View>
              </View>
              <View style={styles.securityItemRight}>
                <Text style={[styles.securityValue, { color: theme.colors.text }]}>
                  {item.value}
                </Text>
                <View style={[styles.securityChangeChip, { backgroundColor: theme.colors.success + '15' }]}>
                  <Text style={[
                    styles.securityChange, 
                    { color: theme.colors.success }
                  ]}>
                    {item.change}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          );
        })}
        
        <View style={[styles.categorySection, { backgroundColor: theme.colors.surface }]}>
          <View style={styles.categoryHeader}>
            <Shield size={20} color={theme.colors.primary} />
            <Text style={[styles.categoryTitle, { color: theme.colors.text }]}>Insurance Policies</Text>
          </View>
          <Text style={[styles.categoryDescription, { color: theme.colors.textSecondary }]}>
            Life, Health, and General insurance policies providing comprehensive protection.
          </Text>
        </View>

        <View style={[styles.categorySection, { backgroundColor: theme.colors.surface }]}>
          <View style={styles.categoryHeader}>
            <DollarSign size={20} color={theme.colors.primary} />
            <Text style={[styles.categoryTitle, { color: theme.colors.text }]}>Financial Security</Text>
          </View>
          <Text style={[styles.categoryDescription, { color: theme.colors.textSecondary }]}>
            Emergency funds and pension investments for long-term financial security.
          </Text>
        </View>

        <View style={[styles.categorySection, { backgroundColor: theme.colors.surface }]}>
          <View style={styles.categoryHeader}>
            <Home size={20} color={theme.colors.primary} />
            <Text style={[styles.categoryTitle, { color: theme.colors.text }]}>Asset Protection</Text>
          </View>
          <Text style={[styles.categoryDescription, { color: theme.colors.textSecondary }]}>
            Insurance coverage for your valuable assets including home, vehicles, and professional equipment.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  summaryCard: {
    marginHorizontal: 20,
    marginVertical: 16,
    padding: 20,
    borderRadius: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  summaryLabel: {
    fontSize: 14,
    marginBottom: 8,
  },
  summaryValue: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  summaryChange: {
    fontSize: 16,
    fontWeight: '600',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  securityItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderRadius: 12,
    marginBottom: 12,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  securityItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  securityIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  securityInfo: {
    flex: 1,
  },
  securityName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  securityMeta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  securityStatus: {
    fontSize: 12,
    fontWeight: '400',
  },
  securityItemRight: {
    alignItems: 'flex-end',
  },
  securityValue: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 4,
  },
  securityChange: {
    fontSize: 12,
    fontWeight: '600',
  },
  securityChangeChip: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginRight: 6,
  },
  categorySection: {
    padding: 16,
    borderRadius: 12,
    marginTop: 16,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  categoryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  categoryTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  categoryDescription: {
    fontSize: 14,
    lineHeight: 20,
  },
});
import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, StatusBar } from 'react-native';
import { router } from 'expo-router';
import { 
  Banknote,
  PiggyBank,
  TrendingUp,
  Building,
  Briefcase,
  Landmark,
  Home as HomeIcon,
  Coins,
  BarChart3
} from 'lucide-react-native';
import { useTheme } from '@/contexts/ThemeContext';
import { useLanguage } from '@/contexts/LanguageContext';

interface AssetItem {
  id: string;
  name: string;
  icon: React.ComponentType<any>;
  value: string;
  change: string;
  isPositive: boolean;
}

export default function AssetsTabScreen() {
  const { theme } = useTheme();
  const { t } = useLanguage();

  const assetItems: AssetItem[] = [
    { id: 'bank', name: t.assets.bankAccounts, icon: Banknote, value: '₹2,50,000', change: '+2.5%', isPositive: true },
    { id: 'mutual_funds', name: t.assets.mutualFunds, icon: TrendingUp, value: '₹3,25,000', change: '+12.8%', isPositive: true },
    { id: 'equity', name: t.assets.stocks, icon: BarChart3, value: '₹2,15,000', change: '-3.2%', isPositive: false },
    { id: 'pms', name: 'PMS', icon: Briefcase, value: '₹1,50,000', change: '+8.5%', isPositive: true },
    { id: 'aif', name: 'AIF', icon: Building, value: '₹75,000', change: '+6.1%', isPositive: true },
    { id: 'bonds', name: t.assets.bonds, icon: Landmark, value: '₹50,000', change: '+3.8%', isPositive: true },
    { id: 'real_estate', name: t.assets.realEstate, icon: HomeIcon, value: '₹25,00,000', change: '+15.2%', isPositive: true },
    { id: 'commodities', name: 'Commodities', icon: Coins, value: '₹35,000', change: '-1.5%', isPositive: false },
    { id: 'equity_unlisted', name: 'Equity (Unlisted)', icon: BarChart3, value: '₹1,25,000', change: '+22.3%', isPositive: true },
    { id: 'others', name: t.assets.others, icon: Briefcase, value: '₹45,000', change: '+5.7%', isPositive: true },
  ];

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <StatusBar barStyle={theme.name === 'dark' ? 'light-content' : 'dark-content'} backgroundColor={theme.colors.background} />
      
      <View style={[styles.summaryCard, { backgroundColor: theme.colors.surface }]}>
        <Text style={[styles.summaryLabel, { color: theme.colors.textSecondary }]}>{t.assets.totalAssets}</Text>
        <Text style={[styles.summaryValue, { color: theme.colors.text }]}>₹15,45,000</Text>
        <Text style={[styles.summaryChange, { color: theme.colors.success }]}>+8.2% this month</Text>
      </View>

      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {assetItems.map((item) => {
          const IconComponent = item.icon;
          return (
            <TouchableOpacity
              key={item.id}
              style={[styles.assetItem, { backgroundColor: theme.colors.surface, borderBottomColor: theme.colors.border }]}
              onPress={() => {
                if (item.id === 'bank') {
                  router.push('/assets/bank-accounts');
                }
              }}
              testID={`asset-${item.id}`}
            >
              <View style={styles.assetItemLeft}>
                <View style={[styles.assetIcon, { backgroundColor: theme.colors.primary + '15' }]}>
                  <IconComponent size={24} color={theme.colors.primary} />
                </View>
                <View style={styles.assetInfo}>
                  <Text style={[styles.assetName, { color: theme.colors.text }]}>
                    {item.name}
                  </Text>
                  <View style={styles.assetMeta}>
                    <View style={[styles.statusDot, { backgroundColor: item.isPositive ? theme.colors.success : theme.colors.error }]} />
                    <Text style={[styles.assetStatus, { color: theme.colors.textSecondary }]}>
                      {item.isPositive ? 'Growing' : 'Declining'}
                    </Text>
                  </View>
                </View>
              </View>
              <View style={styles.assetItemRight}>
                <Text style={[styles.assetValue, { color: theme.colors.text }]}>
                  {item.value}
                </Text>
                <View style={[styles.assetChangeChip, { backgroundColor: item.isPositive ? theme.colors.success + '15' : theme.colors.error + '15' }]}>
                  <Text style={[
                    styles.assetChange, 
                    { color: item.isPositive ? theme.colors.success : theme.colors.error }
                  ]}>
                    {item.change}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          );
        })}
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
  assetItem: {
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
  assetItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  assetIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  assetInfo: {
    flex: 1,
  },
  assetName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  assetMeta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  assetStatus: {
    fontSize: 12,
    fontWeight: '400',
  },
  assetItemRight: {
    alignItems: 'flex-end',
  },
  assetValue: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 4,
  },
  assetChange: {
    fontSize: 12,
    fontWeight: '600',
  },
  assetChangeChip: {
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
});
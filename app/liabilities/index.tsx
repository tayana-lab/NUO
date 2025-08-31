import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Stack, router } from 'expo-router';
import { Car, Home, CreditCard, User, ArrowLeft } from 'lucide-react-native';
import { useTheme } from '@/contexts/ThemeContext';

interface LiabilityItem {
  id: string;
  name: string;
  icon: React.ComponentType<any>;
  value: string;
  emi: string;
  tenure: string;
  interestRate: string;
}

const securedLoans: LiabilityItem[] = [
  { 
    id: 'home-loan', 
    name: 'Home Loan', 
    icon: Home, 
    value: '₹8,50,000', 
    emi: '₹12,500/month',
    tenure: '15 years remaining',
    interestRate: '8.5% p.a.'
  },
  { 
    id: 'car-loan', 
    name: 'Car Loan', 
    icon: Car, 
    value: '₹3,25,000', 
    emi: '₹8,200/month',
    tenure: '3 years remaining',
    interestRate: '9.2% p.a.'
  },
];

const unsecuredLoans: LiabilityItem[] = [
  { 
    id: 'personal-loan', 
    name: 'Personal Loan', 
    icon: User, 
    value: '₹1,50,000', 
    emi: '₹5,500/month',
    tenure: '2 years remaining',
    interestRate: '12.5% p.a.'
  },
  { 
    id: 'credit-card', 
    name: 'Credit Card Outstanding', 
    icon: CreditCard, 
    value: '₹45,000', 
    emi: 'Minimum ₹2,250',
    tenure: 'Revolving credit',
    interestRate: '18% p.a.'
  },
];

export default function LiabilitiesScreen() {
  const { theme } = useTheme();

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]} edges={['top', 'bottom']}>
      <Stack.Screen 
        options={{
          headerShown: false
        }} 
      />
      <StatusBar barStyle={theme.name === 'Dark Professional' ? 'light-content' : 'dark-content'} backgroundColor={theme.colors.background} />
      
      {/* Custom Header */}
      <View style={[styles.header, { backgroundColor: theme.colors.background, borderBottomColor: theme.colors.border }]}>
        <View style={styles.headerContent}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => router.back()}
            testID="back-button"
          >
            <ArrowLeft size={24} color={theme.colors.text} />
          </TouchableOpacity>
          <Text style={[styles.headerTitle, { color: theme.colors.text }]}>Liabilities</Text>
        </View>
      </View>
      
      <View style={[styles.summaryCard, { backgroundColor: theme.colors.surface }]}>
        <Text style={[styles.summaryLabel, { color: theme.colors.textSecondary }]}>Total Liabilities</Text>
        <Text style={[styles.summaryValue, { color: theme.colors.text }]}>₹13,70,000</Text>
        <View style={styles.summaryRow}>
          <View style={styles.summaryItem}>
            <Text style={[styles.summarySubLabel, { color: theme.colors.textSecondary }]}>Secured</Text>
            <Text style={[styles.summarySubValue, { color: theme.colors.text }]}>₹11,75,000</Text>
          </View>
          <View style={styles.summaryItem}>
            <Text style={[styles.summarySubLabel, { color: theme.colors.textSecondary }]}>Unsecured</Text>
            <Text style={[styles.summarySubValue, { color: theme.colors.text }]}>₹1,95,000</Text>
          </View>
        </View>
      </View>

      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Secured Loans Section */}
        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Secured Loans</Text>
          <Text style={[styles.sectionSubtitle, { color: theme.colors.textSecondary }]}>Loans backed by collateral</Text>
        </View>
        
        {securedLoans.map((item) => {
          const IconComponent = item.icon;
          return (
            <TouchableOpacity
              key={item.id}
              style={[styles.liabilityItem, { backgroundColor: theme.colors.surface }]}
              testID={`liability-${item.id}`}
            >
              <View style={styles.liabilityItemLeft}>
                <View style={[styles.liabilityIcon, { backgroundColor: theme.colors.success + '15' }]}>
                  <IconComponent size={24} color={theme.colors.success} />
                </View>
                <View style={styles.liabilityInfo}>
                  <Text style={[styles.liabilityName, { color: theme.colors.text }]}>
                    {item.name}
                  </Text>
                  <Text style={[styles.liabilityEmi, { color: theme.colors.textSecondary }]}>
                    {item.emi}
                  </Text>
                  <Text style={[styles.liabilityTenure, { color: theme.colors.textSecondary }]}>
                    {item.tenure} • {item.interestRate}
                  </Text>
                </View>
              </View>
              <View style={styles.liabilityItemRight}>
                <Text style={[styles.liabilityValue, { color: theme.colors.text }]}>
                  {item.value}
                </Text>
                <View style={[styles.liabilityChangeChip, { backgroundColor: theme.colors.success + '15' }]}>
                  <Text style={[
                    styles.liabilityChange, 
                    { color: theme.colors.success }
                  ]}>
                    Secured
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          );
        })}
        
        {/* Unsecured Loans Section */}
        <View style={[styles.sectionHeader, { marginTop: 32 }]}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Unsecured Loans</Text>
          <Text style={[styles.sectionSubtitle, { color: theme.colors.textSecondary }]}>Loans without collateral</Text>
        </View>
        
        {unsecuredLoans.map((item) => {
          const IconComponent = item.icon;
          return (
            <TouchableOpacity
              key={item.id}
              style={[styles.liabilityItem, { backgroundColor: theme.colors.surface }]}
              testID={`liability-${item.id}`}
            >
              <View style={styles.liabilityItemLeft}>
                <View style={[styles.liabilityIcon, { backgroundColor: theme.colors.warning + '15' }]}>
                  <IconComponent size={24} color={theme.colors.warning} />
                </View>
                <View style={styles.liabilityInfo}>
                  <Text style={[styles.liabilityName, { color: theme.colors.text }]}>
                    {item.name}
                  </Text>
                  <Text style={[styles.liabilityEmi, { color: theme.colors.textSecondary }]}>
                    {item.emi}
                  </Text>
                  <Text style={[styles.liabilityTenure, { color: theme.colors.textSecondary }]}>
                    {item.tenure} • {item.interestRate}
                  </Text>
                </View>
              </View>
              <View style={styles.liabilityItemRight}>
                <Text style={[styles.liabilityValue, { color: theme.colors.text }]}>
                  {item.value}
                </Text>
                <View style={[styles.liabilityChangeChip, { backgroundColor: theme.colors.warning + '15' }]}>
                  <Text style={[
                    styles.liabilityChange, 
                    { color: theme.colors.warning }
                  ]}>
                    Unsecured
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          );
        })}
        
        <View style={[styles.infoCard, { backgroundColor: theme.colors.surface }]}>
          <Text style={[styles.infoTitle, { color: theme.colors.text }]}>Loan Management Tips</Text>
          <Text style={[styles.infoDescription, { color: theme.colors.textSecondary }]}>
            • Prioritize paying off unsecured loans first due to higher interest rates{"\n"}
            • Consider prepaying secured loans to save on interest{"\n"}
            • Maintain a good credit score for better loan terms
          </Text>
        </View>
        
        <View style={[styles.tipCard, { backgroundColor: theme.colors.primary + '10' }]}>
          <Text style={[styles.tipTitle, { color: theme.colors.primary }]}>💡 Smart Strategy</Text>
          <Text style={[styles.tipDescription, { color: theme.colors.text }]}>
            Focus on clearing high-interest unsecured debts first while maintaining minimum payments on secured loans.
          </Text>
        </View>
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
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    marginRight: 16,
    padding: 4,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '700',
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
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  summaryItem: {
    flex: 1,
  },
  summarySubLabel: {
    fontSize: 12,
    marginBottom: 4,
  },
  summarySubValue: {
    fontSize: 18,
    fontWeight: '700',
  },
  sectionHeader: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 4,
  },
  sectionSubtitle: {
    fontSize: 14,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  liabilityItem: {
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
  liabilityItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  liabilityIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  liabilityInfo: {
    flex: 1,
  },
  liabilityName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  liabilityMeta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  liabilityStatus: {
    fontSize: 12,
    fontWeight: '400',
  },
  liabilityEmi: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 2,
  },
  liabilityTenure: {
    fontSize: 12,
    fontWeight: '400',
  },
  liabilityItemRight: {
    alignItems: 'flex-end',
  },
  liabilityValue: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 4,
  },
  liabilityChange: {
    fontSize: 12,
    fontWeight: '600',
  },
  liabilityChangeChip: {
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
  infoCard: {
    padding: 16,
    borderRadius: 12,
    marginTop: 16,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  infoDescription: {
    fontSize: 14,
    lineHeight: 20,
  },
  tipCard: {
    padding: 16,
    borderRadius: 12,
    marginTop: 12,
  },
  tipTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  tipDescription: {
    fontSize: 14,
    lineHeight: 20,
  },
});
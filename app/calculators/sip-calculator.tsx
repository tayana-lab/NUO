import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { ArrowLeft, Calculator } from 'lucide-react-native';
import { useTheme } from '@/contexts/ThemeContext';
import Input from '@/components/Input';
import Button from '@/components/Button';

export default function SIPCalculatorScreen() {
  const { theme } = useTheme();
  const [monthlyAmount, setMonthlyAmount] = useState<string>('');
  const [rate, setRate] = useState<string>('');
  const [years, setYears] = useState<string>('');
  const [result, setResult] = useState<{ maturityAmount: number; totalInvestment: number; totalGains: number } | null>(null);

  const calculateSIP = () => {
    const P = parseFloat(monthlyAmount);
    const annualRate = parseFloat(rate) / 100;
    const monthlyRate = annualRate / 12;
    const months = parseFloat(years) * 12;

    if (P && annualRate && years) {
      const maturityAmount = P * (((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * (1 + monthlyRate));
      const totalInvestment = P * months;
      const totalGains = maturityAmount - totalInvestment;
      
      setResult({ maturityAmount, totalInvestment, totalGains });
    }
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <LinearGradient
        colors={[theme.colors.primary + '10', theme.colors.background]}
        style={styles.gradient}
      >
        <ScrollView contentContainerStyle={styles.content}>
          <View style={styles.header}>
            <TouchableOpacity onPress={handleBack} style={styles.backButton}>
              <ArrowLeft size={24} color={theme.colors.text} />
            </TouchableOpacity>
            <Text style={[styles.headerTitle, { color: theme.colors.text }]}>
              SIP Calculator
            </Text>
            <View style={styles.placeholder} />
          </View>

          <View style={[styles.calculatorCard, { backgroundColor: theme.colors.surface, borderColor: theme.colors.border }]}>
            <View style={styles.iconHeader}>
              <LinearGradient
                colors={['#4299e1' + '20', '#4299e1' + '10']}
                style={styles.iconContainer}
              >
                <Calculator size={32} color="#4299e1" />
              </LinearGradient>
              <Text style={[styles.cardTitle, { color: theme.colors.text }]}>SIP Calculator</Text>
              <Text style={[styles.cardSubtitle, { color: theme.colors.textSecondary }]}>Calculate your SIP returns</Text>
            </View>

            <View style={styles.inputContainer}>
              <Input
                label="Monthly Investment (₹)"
                value={monthlyAmount}
                onChangeText={setMonthlyAmount}
                placeholder="Enter monthly SIP amount"
                keyboardType="numeric"
              />
              <Input
                label="Expected Annual Return (%)"
                value={rate}
                onChangeText={setRate}
                placeholder="Enter expected return rate"
                keyboardType="numeric"
              />
              <Input
                label="Investment Period (Years)"
                value={years}
                onChangeText={setYears}
                placeholder="Enter investment period"
                keyboardType="numeric"
              />
            </View>

            <Button
              title="Calculate SIP"
              onPress={calculateSIP}
              style={styles.calculateButton}
            />

            {result && (
              <View style={[styles.resultCard, { backgroundColor: theme.colors.primary + '10', borderColor: theme.colors.primary + '30' }]}>
                <Text style={[styles.resultLabel, { color: theme.colors.textSecondary }]}>Maturity Amount</Text>
                <Text style={[styles.resultValue, { color: theme.colors.primary }]}>₹{result.maturityAmount.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</Text>
                <View style={styles.resultDetails}>
                  <Text style={[styles.resultDetail, { color: theme.colors.textSecondary }]}>Total Investment: ₹{result.totalInvestment.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</Text>
                  <Text style={[styles.resultGain, { color: '#38a169' }]}>Total Gains: ₹{result.totalGains.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</Text>
                </View>
              </View>
            )}
          </View>
        </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
  },
  content: {
    flexGrow: 1,
    paddingBottom: 24,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
  },
  placeholder: {
    width: 40,
  },
  calculatorCard: {
    margin: 24,
    padding: 24,
    borderRadius: 20,
    borderWidth: 1,
  },
  iconHeader: {
    alignItems: 'center',
    marginBottom: 32,
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 8,
    textAlign: 'center',
  },
  cardSubtitle: {
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 22,
  },
  inputContainer: {
    gap: 20,
    marginBottom: 32,
  },
  calculateButton: {
    marginBottom: 24,
  },
  resultCard: {
    padding: 24,
    borderRadius: 16,
    borderWidth: 1,
    alignItems: 'center',
  },
  resultLabel: {
    fontSize: 16,
    marginBottom: 8,
  },
  resultValue: {
    fontSize: 32,
    fontWeight: '700',
    marginBottom: 16,
  },
  resultDetails: {
    alignItems: 'center',
    gap: 8,
  },
  resultDetail: {
    fontSize: 16,
  },
  resultGain: {
    fontSize: 18,
    fontWeight: '600',
  },
});
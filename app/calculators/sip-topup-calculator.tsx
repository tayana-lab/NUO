import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { ArrowLeft, TrendingUp } from 'lucide-react-native';
import { useTheme } from '@/contexts/ThemeContext';
import Input from '@/components/Input';
import Button from '@/components/Button';

export default function SIPTopupCalculatorScreen() {
  const { theme } = useTheme();
  const [monthlyAmount, setMonthlyAmount] = useState<string>('');
  const [rate, setRate] = useState<string>('');
  const [years, setYears] = useState<string>('');
  const [topupRate, setTopupRate] = useState<string>('');
  const [result, setResult] = useState<{ maturityAmount: number; totalInvestment: number; totalGains: number } | null>(null);

  const calculateSIPTopup = () => {
    const initialSIP = parseFloat(monthlyAmount);
    const annualRate = parseFloat(rate) / 100;
    const monthlyRate = annualRate / 12;
    const period = parseFloat(years);
    const annualTopup = parseFloat(topupRate) / 100;

    if (initialSIP && annualRate && period && topupRate) {
      let totalInvestment = 0;
      let maturityAmount = 0;
      let currentSIP = initialSIP;

      for (let year = 1; year <= period; year++) {
        const months = 12;
        const yearlyInvestment = currentSIP * months;
        totalInvestment += yearlyInvestment;

        // Calculate future value for this year's investments
        const remainingYears = period - year + 1;
        const futureValue = currentSIP * (((Math.pow(1 + monthlyRate, months * remainingYears) - 1) / monthlyRate) * (1 + monthlyRate));
        maturityAmount += futureValue;

        // Increase SIP for next year
        currentSIP = currentSIP * (1 + annualTopup);
      }

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
              SIP Topup Calculator
            </Text>
            <View style={styles.placeholder} />
          </View>

          <View style={[styles.calculatorCard, { backgroundColor: theme.colors.surface, borderColor: theme.colors.border }]}>
            <View style={styles.iconHeader}>
              <LinearGradient
                colors={['#38b2ac' + '20', '#38b2ac' + '10']}
                style={styles.iconContainer}
              >
                <TrendingUp size={32} color="#38b2ac" />
              </LinearGradient>
              <Text style={[styles.cardTitle, { color: theme.colors.text }]}>SIP Topup Calculator</Text>
              <Text style={[styles.cardSubtitle, { color: theme.colors.textSecondary }]}>Calculate SIP with annual increase</Text>
            </View>

            <View style={styles.inputContainer}>
              <Input
                label="Initial Monthly SIP (₹)"
                value={monthlyAmount}
                onChangeText={setMonthlyAmount}
                placeholder="Enter initial monthly SIP"
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
              <Input
                label="Annual Topup Rate (%)"
                value={topupRate}
                onChangeText={setTopupRate}
                placeholder="Enter annual increase rate"
                keyboardType="numeric"
              />
            </View>

            <Button
              title="Calculate SIP Topup"
              onPress={calculateSIPTopup}
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
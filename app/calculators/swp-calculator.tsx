import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { ArrowLeft, PiggyBank } from 'lucide-react-native';
import { useTheme } from '@/contexts/ThemeContext';
import Input from '@/components/Input';
import Button from '@/components/Button';

export default function SWPCalculatorScreen() {
  const { theme } = useTheme();
  const [initialAmount, setInitialAmount] = useState<string>('');
  const [monthlyWithdrawal, setMonthlyWithdrawal] = useState<string>('');
  const [rate, setRate] = useState<string>('');
  const [years, setYears] = useState<string>('');
  const [result, setResult] = useState<{ finalAmount: number; totalWithdrawn: number; remainingAmount: number } | null>(null);

  const calculateSWP = () => {
    const initial = parseFloat(initialAmount);
    const withdrawal = parseFloat(monthlyWithdrawal);
    const annualRate = parseFloat(rate) / 100;
    const monthlyRate = annualRate / 12;
    const months = parseFloat(years) * 12;

    if (initial && withdrawal && annualRate && years) {
      let balance = initial;
      let totalWithdrawn = 0;

      for (let i = 0; i < months; i++) {
        // Apply monthly return
        balance = balance * (1 + monthlyRate);
        // Withdraw monthly amount
        balance -= withdrawal;
        totalWithdrawn += withdrawal;
        
        // If balance becomes negative, break
        if (balance < 0) {
          balance = 0;
          break;
        }
      }

      setResult({
        finalAmount: balance,
        totalWithdrawn,
        remainingAmount: balance
      });
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
              SWP Calculator
            </Text>
            <View style={styles.placeholder} />
          </View>

          <View style={[styles.calculatorCard, { backgroundColor: theme.colors.surface, borderColor: theme.colors.border }]}>
            <View style={styles.iconHeader}>
              <LinearGradient
                colors={['#ed8936' + '20', '#ed8936' + '10']}
                style={styles.iconContainer}
              >
                <PiggyBank size={32} color="#ed8936" />
              </LinearGradient>
              <Text style={[styles.cardTitle, { color: theme.colors.text }]}>SWP Calculator</Text>
              <Text style={[styles.cardSubtitle, { color: theme.colors.textSecondary }]}>Systematic Withdrawal Plan</Text>
            </View>

            <View style={styles.inputContainer}>
              <Input
                label="Initial Investment (₹)"
                value={initialAmount}
                onChangeText={setInitialAmount}
                placeholder="Enter initial investment"
                keyboardType="numeric"
              />
              <Input
                label="Monthly Withdrawal (₹)"
                value={monthlyWithdrawal}
                onChangeText={setMonthlyWithdrawal}
                placeholder="Enter monthly withdrawal"
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
                label="Withdrawal Period (Years)"
                value={years}
                onChangeText={setYears}
                placeholder="Enter withdrawal period"
                keyboardType="numeric"
              />
            </View>

            <Button
              title="Calculate SWP"
              onPress={calculateSWP}
              style={styles.calculateButton}
            />

            {result && (
              <View style={[styles.resultCard, { backgroundColor: theme.colors.primary + '10', borderColor: theme.colors.primary + '30' }]}>
                <Text style={[styles.resultLabel, { color: theme.colors.textSecondary }]}>Remaining Amount</Text>
                <Text style={[styles.resultValue, { color: theme.colors.primary }]}>₹{result.remainingAmount.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</Text>
                <View style={styles.resultDetails}>
                  <Text style={[styles.resultDetail, { color: theme.colors.textSecondary }]}>Total Withdrawn: ₹{result.totalWithdrawn.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</Text>
                  <Text style={[styles.resultDetail, { color: theme.colors.textSecondary }]}>Final Balance: ₹{result.finalAmount.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</Text>
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
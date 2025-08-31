import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { ArrowLeft, Building2 } from 'lucide-react-native';
import { useTheme } from '@/contexts/ThemeContext';
import Input from '@/components/Input';
import Button from '@/components/Button';

export default function FDCalculatorScreen() {
  const { theme } = useTheme();
  const [principal, setPrincipal] = useState<string>('');
  const [rate, setRate] = useState<string>('');
  const [years, setYears] = useState<string>('');
  const [compoundingFrequency, setCompoundingFrequency] = useState<string>('4'); // Quarterly by default
  const [result, setResult] = useState<{ maturityAmount: number; interest: number } | null>(null);

  const calculateFD = () => {
    const P = parseFloat(principal);
    const r = parseFloat(rate) / 100;
    const t = parseFloat(years);
    const n = parseFloat(compoundingFrequency);

    if (P && r && t && n) {
      const maturityAmount = P * Math.pow(1 + r / n, n * t);
      const interest = maturityAmount - P;
      
      setResult({ maturityAmount, interest });
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
              FD Calculator
            </Text>
            <View style={styles.placeholder} />
          </View>

          <View style={[styles.calculatorCard, { backgroundColor: theme.colors.surface, borderColor: theme.colors.border }]}>
            <View style={styles.iconHeader}>
              <LinearGradient
                colors={['#3182ce' + '20', '#3182ce' + '10']}
                style={styles.iconContainer}
              >
                <Building2 size={32} color="#3182ce" />
              </LinearGradient>
              <Text style={[styles.cardTitle, { color: theme.colors.text }]}>FD Calculator</Text>
              <Text style={[styles.cardSubtitle, { color: theme.colors.textSecondary }]}>Fixed Deposit Calculator</Text>
            </View>

            <View style={styles.inputContainer}>
              <Input
                label="Principal Amount (₹)"
                value={principal}
                onChangeText={setPrincipal}
                placeholder="Enter principal amount"
                keyboardType="numeric"
              />
              <Input
                label="Annual Interest Rate (%)"
                value={rate}
                onChangeText={setRate}
                placeholder="Enter interest rate"
                keyboardType="numeric"
              />
              <Input
                label="Time Period (Years)"
                value={years}
                onChangeText={setYears}
                placeholder="Enter time period"
                keyboardType="numeric"
              />
              <Input
                label="Compounding Frequency (per year)"
                value={compoundingFrequency}
                onChangeText={setCompoundingFrequency}
                placeholder="1=Yearly, 2=Half-yearly, 4=Quarterly, 12=Monthly"
                keyboardType="numeric"
              />
            </View>

            <Button
              title="Calculate FD"
              onPress={calculateFD}
              style={styles.calculateButton}
            />

            {result && (
              <View style={[styles.resultCard, { backgroundColor: theme.colors.primary + '10', borderColor: theme.colors.primary + '30' }]}>
                <Text style={[styles.resultLabel, { color: theme.colors.textSecondary }]}>Maturity Amount</Text>
                <Text style={[styles.resultValue, { color: theme.colors.primary }]}>₹{result.maturityAmount.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</Text>
                <View style={styles.resultDetails}>
                  <Text style={[styles.resultDetail, { color: theme.colors.textSecondary }]}>Principal: ₹{parseFloat(principal).toLocaleString('en-IN', { maximumFractionDigits: 0 })}</Text>
                  <Text style={[styles.resultGain, { color: '#38a169' }]}>Interest Earned: ₹{result.interest.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</Text>
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
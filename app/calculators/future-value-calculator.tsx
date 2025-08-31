import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { ArrowLeft, Banknote } from 'lucide-react-native';
import { useTheme } from '@/contexts/ThemeContext';
import Input from '@/components/Input';
import Button from '@/components/Button';

export default function FutureValueCalculatorScreen() {
  const { theme } = useTheme();
  const [presentValue, setPresentValue] = useState<string>('');
  const [rate, setRate] = useState<string>('');
  const [years, setYears] = useState<string>('');
  const [compoundingFrequency, setCompoundingFrequency] = useState<string>('1'); // Annual by default
  const [result, setResult] = useState<{ futureValue: number; totalGains: number } | null>(null);

  const calculateFutureValue = () => {
    const pv = parseFloat(presentValue);
    const r = parseFloat(rate) / 100;
    const t = parseFloat(years);
    const n = parseFloat(compoundingFrequency);

    if (pv && r && t && n) {
      // Future Value = PV * (1 + r/n)^(n*t)
      const futureValue = pv * Math.pow(1 + r / n, n * t);
      const totalGains = futureValue - pv;
      
      setResult({ futureValue, totalGains });
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
              Future Value Calculator
            </Text>
            <View style={styles.placeholder} />
          </View>

          <View style={[styles.calculatorCard, { backgroundColor: theme.colors.surface, borderColor: theme.colors.border }]}>
            <View style={styles.iconHeader}>
              <LinearGradient
                colors={['#ed8936' + '20', '#ed8936' + '10']}
                style={styles.iconContainer}
              >
                <Banknote size={32} color="#ed8936" />
              </LinearGradient>
              <Text style={[styles.cardTitle, { color: theme.colors.text }]}>Future Value Calculator</Text>
              <Text style={[styles.cardSubtitle, { color: theme.colors.textSecondary }]}>Calculate future value of money</Text>
            </View>

            <View style={styles.inputContainer}>
              <Input
                label="Present Value (₹)"
                value={presentValue}
                onChangeText={setPresentValue}
                placeholder="Enter present value"
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
                placeholder="1=Annual, 2=Semi-annual, 4=Quarterly, 12=Monthly"
                keyboardType="numeric"
              />
            </View>

            <Button
              title="Calculate Future Value"
              onPress={calculateFutureValue}
              style={styles.calculateButton}
            />

            {result && (
              <View style={[styles.resultCard, { backgroundColor: theme.colors.primary + '10', borderColor: theme.colors.primary + '30' }]}>
                <Text style={[styles.resultLabel, { color: theme.colors.textSecondary }]}>Future Value</Text>
                <Text style={[styles.resultValue, { color: theme.colors.primary }]}>₹{result.futureValue.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</Text>
                <View style={styles.resultDetails}>
                  <Text style={[styles.resultDetail, { color: theme.colors.textSecondary }]}>Present Value: ₹{parseFloat(presentValue).toLocaleString('en-IN', { maximumFractionDigits: 0 })}</Text>
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
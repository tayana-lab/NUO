import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { ArrowLeft, TrendingUp } from 'lucide-react-native';
import { useTheme } from '@/contexts/ThemeContext';
import Input from '@/components/Input';
import Button from '@/components/Button';

export default function MFCalculatorScreen() {
  const { theme } = useTheme();
  const [investment, setInvestment] = useState<string>('');
  const [rate, setRate] = useState<string>('');
  const [years, setYears] = useState<string>('');
  const [result, setResult] = useState<number | null>(null);

  const calculateMF = () => {
    const principal = parseFloat(investment);
    const annualRate = parseFloat(rate) / 100;
    const time = parseFloat(years);

    if (principal && annualRate && time) {
      const futureValue = principal * Math.pow(1 + annualRate, time);
      setResult(futureValue);
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
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity onPress={handleBack} style={styles.backButton}>
              <ArrowLeft size={24} color={theme.colors.text} />
            </TouchableOpacity>
            <Text style={[styles.headerTitle, { color: theme.colors.text }]}>
              MF Calculator
            </Text>
            <View style={styles.placeholder} />
          </View>

          {/* Calculator Card */}
          <View style={[styles.calculatorCard, { backgroundColor: theme.colors.surface, borderColor: theme.colors.border }]}>
            <View style={styles.iconHeader}>
              <LinearGradient
                colors={['#38a169' + '20', '#38a169' + '10']}
                style={styles.iconContainer}
              >
                <TrendingUp size={32} color="#38a169" />
              </LinearGradient>
              <Text style={[styles.cardTitle, { color: theme.colors.text }]}>Mutual Fund Calculator</Text>
              <Text style={[styles.cardSubtitle, { color: theme.colors.textSecondary }]}>Calculate your mutual fund returns</Text>
            </View>

            <View style={styles.inputContainer}>
              <Input
                label="Investment Amount (₹)"
                value={investment}
                onChangeText={setInvestment}
                placeholder="Enter investment amount"
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
              title="Calculate Returns"
              onPress={calculateMF}
              style={styles.calculateButton}
            />

            {result && (
              <View style={[styles.resultCard, { backgroundColor: theme.colors.primary + '10', borderColor: theme.colors.primary + '30' }]}>
                <Text style={[styles.resultLabel, { color: theme.colors.textSecondary }]}>Future Value</Text>
                <Text style={[styles.resultValue, { color: theme.colors.primary }]}>₹{result.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</Text>
                <Text style={[styles.resultGain, { color: '#38a169' }]}>Gain: ₹{(result - parseFloat(investment)).toLocaleString('en-IN', { maximumFractionDigits: 0 })}</Text>
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
    marginBottom: 8,
  },
  resultGain: {
    fontSize: 18,
    fontWeight: '600',
  },
});
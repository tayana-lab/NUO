import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { ArrowLeft, GraduationCap } from 'lucide-react-native';
import { useTheme } from '@/contexts/ThemeContext';
import Input from '@/components/Input';
import Button from '@/components/Button';

export default function EducationCalculatorScreen() {
  const { theme } = useTheme();
  const [currentCost, setCurrentCost] = useState<string>('');
  const [inflationRate, setInflationRate] = useState<string>('6'); // Default 6%
  const [yearsToEducation, setYearsToEducation] = useState<string>('');
  const [returnRate, setReturnRate] = useState<string>('');
  const [result, setResult] = useState<{ 
    futureCost: number; 
    monthlyInvestment: number; 
    totalInvestment: number; 
  } | null>(null);

  const calculateEducation = () => {
    const current = parseFloat(currentCost);
    const inflation = parseFloat(inflationRate) / 100;
    const years = parseFloat(yearsToEducation);
    const returns = parseFloat(returnRate) / 100;

    if (current && inflation && years && returns) {
      // Future cost of education considering inflation
      const futureCost = current * Math.pow(1 + inflation, years);
      
      // Monthly investment required to achieve future cost
      const monthlyRate = returns / 12;
      const months = years * 12;
      const monthlyInvestment = futureCost / (((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * (1 + monthlyRate));
      
      const totalInvestment = monthlyInvestment * months;
      
      setResult({ futureCost, monthlyInvestment, totalInvestment });
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
              Education Calculator
            </Text>
            <View style={styles.placeholder} />
          </View>

          <View style={[styles.calculatorCard, { backgroundColor: theme.colors.surface, borderColor: theme.colors.border }]}>
            <View style={styles.iconHeader}>
              <LinearGradient
                colors={['#4299e1' + '20', '#4299e1' + '10']}
                style={styles.iconContainer}
              >
                <GraduationCap size={32} color="#4299e1" />
              </LinearGradient>
              <Text style={[styles.cardTitle, { color: theme.colors.text }]}>Education Calculator</Text>
              <Text style={[styles.cardSubtitle, { color: theme.colors.textSecondary }]}>Plan for your child&apos;s education</Text>
            </View>

            <View style={styles.inputContainer}>
              <Input
                label="Current Education Cost (₹)"
                value={currentCost}
                onChangeText={setCurrentCost}
                placeholder="Enter current cost of education"
                keyboardType="numeric"
              />
              <Input
                label="Education Inflation Rate (%)"
                value={inflationRate}
                onChangeText={setInflationRate}
                placeholder="Enter education inflation rate"
                keyboardType="numeric"
              />
              <Input
                label="Years to Education"
                value={yearsToEducation}
                onChangeText={setYearsToEducation}
                placeholder="Enter years until education starts"
                keyboardType="numeric"
              />
              <Input
                label="Expected Return Rate (%)"
                value={returnRate}
                onChangeText={setReturnRate}
                placeholder="Enter expected investment return"
                keyboardType="numeric"
              />
            </View>

            <Button
              title="Calculate Education Plan"
              onPress={calculateEducation}
              style={styles.calculateButton}
            />

            {result && (
              <View style={[styles.resultCard, { backgroundColor: theme.colors.primary + '10', borderColor: theme.colors.primary + '30' }]}>
                <Text style={[styles.resultLabel, { color: theme.colors.textSecondary }]}>Monthly Investment Required</Text>
                <Text style={[styles.resultValue, { color: theme.colors.primary }]}>₹{result.monthlyInvestment.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</Text>
                <View style={styles.resultDetails}>
                  <Text style={[styles.resultDetail, { color: theme.colors.textSecondary }]}>Future Education Cost: ₹{result.futureCost.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</Text>
                  <Text style={[styles.resultDetail, { color: theme.colors.textSecondary }]}>Total Investment: ₹{result.totalInvestment.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</Text>
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
});
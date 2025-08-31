import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { ArrowLeft, Home } from 'lucide-react-native';
import { useTheme } from '@/contexts/ThemeContext';
import Input from '@/components/Input';
import Button from '@/components/Button';

export default function RetirementCalculatorScreen() {
  const { theme } = useTheme();
  const [currentAge, setCurrentAge] = useState<string>('');
  const [retirementAge, setRetirementAge] = useState<string>('60');
  const [currentExpenses, setCurrentExpenses] = useState<string>('');
  const [inflationRate, setInflationRate] = useState<string>('6');
  const [returnRate, setReturnRate] = useState<string>('');
  const [lifeExpectancy, setLifeExpectancy] = useState<string>('80');
  const [result, setResult] = useState<{ 
    retirementCorpus: number; 
    monthlyInvestment: number; 
    totalInvestment: number; 
  } | null>(null);

  const calculateRetirement = () => {
    const age = parseFloat(currentAge);
    const retAge = parseFloat(retirementAge);
    const expenses = parseFloat(currentExpenses);
    const inflation = parseFloat(inflationRate) / 100;
    const returns = parseFloat(returnRate) / 100;
    const lifeExp = parseFloat(lifeExpectancy);

    if (age && retAge && expenses && inflation && returns && lifeExp) {
      const yearsToRetirement = retAge - age;
      const yearsInRetirement = lifeExp - retAge;
      
      // Future monthly expenses at retirement
      const futureExpenses = expenses * Math.pow(1 + inflation, yearsToRetirement);
      
      // Retirement corpus needed (considering inflation during retirement)
      const retirementCorpus = futureExpenses * 12 * yearsInRetirement * Math.pow(1 + inflation, yearsInRetirement / 2);
      
      // Monthly investment required
      const monthlyRate = returns / 12;
      const months = yearsToRetirement * 12;
      const monthlyInvestment = retirementCorpus / (((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * (1 + monthlyRate));
      
      const totalInvestment = monthlyInvestment * months;
      
      setResult({ retirementCorpus, monthlyInvestment, totalInvestment });
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
              Retirement Calculator
            </Text>
            <View style={styles.placeholder} />
          </View>

          <View style={[styles.calculatorCard, { backgroundColor: theme.colors.surface, borderColor: theme.colors.border }]}>
            <View style={styles.iconHeader}>
              <LinearGradient
                colors={['#38b2ac' + '20', '#38b2ac' + '10']}
                style={styles.iconContainer}
              >
                <Home size={32} color="#38b2ac" />
              </LinearGradient>
              <Text style={[styles.cardTitle, { color: theme.colors.text }]}>Retirement Calculator</Text>
              <Text style={[styles.cardSubtitle, { color: theme.colors.textSecondary }]}>Plan your retirement corpus</Text>
            </View>

            <View style={styles.inputContainer}>
              <Input
                label="Current Age"
                value={currentAge}
                onChangeText={setCurrentAge}
                placeholder="Enter your current age"
                keyboardType="numeric"
              />
              <Input
                label="Retirement Age"
                value={retirementAge}
                onChangeText={setRetirementAge}
                placeholder="Enter retirement age"
                keyboardType="numeric"
              />
              <Input
                label="Current Monthly Expenses (₹)"
                value={currentExpenses}
                onChangeText={setCurrentExpenses}
                placeholder="Enter current monthly expenses"
                keyboardType="numeric"
              />
              <Input
                label="Inflation Rate (%)"
                value={inflationRate}
                onChangeText={setInflationRate}
                placeholder="Enter inflation rate"
                keyboardType="numeric"
              />
              <Input
                label="Expected Return Rate (%)"
                value={returnRate}
                onChangeText={setReturnRate}
                placeholder="Enter expected investment return"
                keyboardType="numeric"
              />
              <Input
                label="Life Expectancy"
                value={lifeExpectancy}
                onChangeText={setLifeExpectancy}
                placeholder="Enter life expectancy"
                keyboardType="numeric"
              />
            </View>

            <Button
              title="Calculate Retirement Plan"
              onPress={calculateRetirement}
              style={styles.calculateButton}
            />

            {result && (
              <View style={[styles.resultCard, { backgroundColor: theme.colors.primary + '10', borderColor: theme.colors.primary + '30' }]}>
                <Text style={[styles.resultLabel, { color: theme.colors.textSecondary }]}>Monthly Investment Required</Text>
                <Text style={[styles.resultValue, { color: theme.colors.primary }]}>₹{result.monthlyInvestment.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</Text>
                <View style={styles.resultDetails}>
                  <Text style={[styles.resultDetail, { color: theme.colors.textSecondary }]}>Retirement Corpus: ₹{result.retirementCorpus.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</Text>
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
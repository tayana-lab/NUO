import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { ArrowLeft, TrendingDown } from 'lucide-react-native';
import { useTheme } from '@/contexts/ThemeContext';
import Input from '@/components/Input';
import Button from '@/components/Button';

export default function SIPSWPCalculatorScreen() {
  const { theme } = useTheme();
  const [sipAmount, setSipAmount] = useState<string>('');
  const [swpAmount, setSwpAmount] = useState<string>('');
  const [rate, setRate] = useState<string>('');
  const [sipYears, setSipYears] = useState<string>('');
  const [swpYears, setSwpYears] = useState<string>('');
  const [result, setResult] = useState<{ 
    accumulationValue: number; 
    finalValue: number; 
    totalSIP: number; 
    totalSWP: number; 
  } | null>(null);

  const calculateSIPSWP = () => {
    const monthlySIP = parseFloat(sipAmount);
    const monthlySWP = parseFloat(swpAmount);
    const annualRate = parseFloat(rate) / 100;
    const monthlyRate = annualRate / 12;
    const sipMonths = parseFloat(sipYears) * 12;
    const swpMonths = parseFloat(swpYears) * 12;

    if (monthlySIP && monthlySWP && annualRate && sipYears && swpYears) {
      // Phase 1: SIP Accumulation
      const accumulationValue = monthlySIP * (((Math.pow(1 + monthlyRate, sipMonths) - 1) / monthlyRate) * (1 + monthlyRate));
      const totalSIP = monthlySIP * sipMonths;

      // Phase 2: SWP from accumulated amount
      let balance = accumulationValue;
      let totalSWP = 0;

      for (let i = 0; i < swpMonths; i++) {
        balance = balance * (1 + monthlyRate);
        balance -= monthlySWP;
        totalSWP += monthlySWP;
        
        if (balance < 0) {
          balance = 0;
          break;
        }
      }

      setResult({
        accumulationValue,
        finalValue: balance,
        totalSIP,
        totalSWP
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
              SIP SWP Calculator
            </Text>
            <View style={styles.placeholder} />
          </View>

          <View style={[styles.calculatorCard, { backgroundColor: theme.colors.surface, borderColor: theme.colors.border }]}>
            <View style={styles.iconHeader}>
              <LinearGradient
                colors={['#805ad5' + '20', '#805ad5' + '10']}
                style={styles.iconContainer}
              >
                <TrendingDown size={32} color="#805ad5" />
              </LinearGradient>
              <Text style={[styles.cardTitle, { color: theme.colors.text }]}>SIP SWP Calculator</Text>
              <Text style={[styles.cardSubtitle, { color: theme.colors.textSecondary }]}>Combined SIP & SWP Planning</Text>
            </View>

            <View style={styles.inputContainer}>
              <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>SIP Phase</Text>
              <Input
                label="Monthly SIP Amount (₹)"
                value={sipAmount}
                onChangeText={setSipAmount}
                placeholder="Enter monthly SIP amount"
                keyboardType="numeric"
              />
              <Input
                label="SIP Period (Years)"
                value={sipYears}
                onChangeText={setSipYears}
                placeholder="Enter SIP period"
                keyboardType="numeric"
              />
              
              <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>SWP Phase</Text>
              <Input
                label="Monthly SWP Amount (₹)"
                value={swpAmount}
                onChangeText={setSwpAmount}
                placeholder="Enter monthly withdrawal"
                keyboardType="numeric"
              />
              <Input
                label="SWP Period (Years)"
                value={swpYears}
                onChangeText={setSwpYears}
                placeholder="Enter withdrawal period"
                keyboardType="numeric"
              />
              
              <Input
                label="Expected Annual Return (%)"
                value={rate}
                onChangeText={setRate}
                placeholder="Enter expected return rate"
                keyboardType="numeric"
              />
            </View>

            <Button
              title="Calculate SIP SWP"
              onPress={calculateSIPSWP}
              style={styles.calculateButton}
            />

            {result && (
              <View style={[styles.resultCard, { backgroundColor: theme.colors.primary + '10', borderColor: theme.colors.primary + '30' }]}>
                <Text style={[styles.resultLabel, { color: theme.colors.textSecondary }]}>Final Remaining Amount</Text>
                <Text style={[styles.resultValue, { color: theme.colors.primary }]}>₹{result.finalValue.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</Text>
                <View style={styles.resultDetails}>
                  <Text style={[styles.resultDetail, { color: theme.colors.textSecondary }]}>Accumulation Value: ₹{result.accumulationValue.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</Text>
                  <Text style={[styles.resultDetail, { color: theme.colors.textSecondary }]}>Total SIP: ₹{result.totalSIP.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</Text>
                  <Text style={[styles.resultDetail, { color: theme.colors.textSecondary }]}>Total SWP: ₹{result.totalSWP.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</Text>
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
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 16,
    marginBottom: 8,
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
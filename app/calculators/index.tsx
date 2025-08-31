import React, { useRef } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Animated } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { ArrowLeft, Calculator, TrendingUp, PiggyBank, CreditCard, Home, Target, GraduationCap, Heart, DollarSign, Banknote, TrendingDown, Building2 } from 'lucide-react-native';
import { useTheme } from '@/contexts/ThemeContext';
import { useLanguage } from '@/contexts/LanguageContext';



export default function CalculatorsScreen() {
  const { theme } = useTheme();
  const { t } = useLanguage();

  const calculators = [
    {
      id: 'mf-calculator',
      icon: TrendingUp,
      title: 'MF Calculator',
      subtitle: 'Mutual Fund Calculator',
      color: '#38a169',
    },
    {
      id: 'sip-calculator',
      icon: Calculator,
      title: 'SIP Calculator',
      subtitle: 'Systematic Investment Plan',
      color: '#4299e1',
    },
    {
      id: 'sip-topup-calculator',
      icon: TrendingUp,
      title: 'SIP Topup Calculator',
      subtitle: 'SIP with Annual Increase',
      color: '#38b2ac',
    },
    {
      id: 'swp-calculator',
      icon: PiggyBank,
      title: 'SWP Calculator',
      subtitle: 'Systematic Withdrawal Plan',
      color: '#ed8936',
    },
    {
      id: 'sip-swp-calculator',
      icon: TrendingDown,
      title: 'SIP SWP Calculator',
      subtitle: 'Combined SIP & SWP',
      color: '#805ad5',
    },
    {
      id: 'fd-calculator',
      icon: Building2,
      title: 'FD Calculator',
      subtitle: 'Fixed Deposit Calculator',
      color: '#3182ce',
    },
    {
      id: 'aif-calculator',
      icon: Target,
      title: 'AIF Calculator',
      subtitle: 'Alternative Investment Fund',
      color: '#9f7aea',
    },
    {
      id: 'lumpsum-calculator',
      icon: DollarSign,
      title: 'Lumpsum Calculator',
      subtitle: 'One-time Investment',
      color: '#38a169',
    },
    {
      id: 'education-calculator',
      icon: GraduationCap,
      title: 'Education Calculator',
      subtitle: 'Plan for Education',
      color: '#4299e1',
    },
    {
      id: 'marriage-calculator',
      icon: Heart,
      title: 'Marriage Calculator',
      subtitle: 'Plan for Marriage',
      color: '#e53e3e',
    },
    {
      id: 'retirement-calculator',
      icon: Home,
      title: 'Retirement Calculator',
      subtitle: 'Plan your Retirement',
      color: '#38b2ac',
    },
    {
      id: 'future-value-calculator',
      icon: Banknote,
      title: 'Future Value Calculator',
      subtitle: 'Calculate Future Value',
      color: '#ed8936',
    },
  ];
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;

  React.useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }),
    ]).start();
  }, [fadeAnim, slideAnim]);

  const handleBack = () => {
    router.back();
  };

  const handleCalculatorPress = (calculatorId: string) => {
    console.log('Calculator pressed:', calculatorId);
    router.push(`/calculators/${calculatorId}`);
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <LinearGradient
        colors={[theme.colors.primary + '10', theme.colors.background]}
        style={styles.gradient}
      >
        <Animated.View
          style={[
            styles.content,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity onPress={handleBack} style={styles.backButton}>
              <ArrowLeft size={24} color={theme.colors.text} />
            </TouchableOpacity>
            <Text style={[styles.headerTitle, { color: theme.colors.text }]}>
              {t.calculators.title}
            </Text>
            <View style={styles.placeholder} />
          </View>

          {/* Calculators Grid */}
          <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
            <View style={styles.grid}>
              {calculators.map((calculator, index) => {
                const Icon = calculator.icon;
                return (
                  <TouchableOpacity
                    key={calculator.id}
                    style={[styles.calculatorCard, { backgroundColor: theme.colors.surface, borderColor: theme.colors.border }]}
                    onPress={() => handleCalculatorPress(calculator.id)}
                    testID={`calculator-${calculator.id}`}
                  >
                    <LinearGradient
                      colors={[calculator.color + '20', calculator.color + '10']}
                      style={styles.iconContainer}
                    >
                      <Icon size={28} color={calculator.color} />
                    </LinearGradient>
                    <Text style={[styles.calculatorTitle, { color: theme.colors.text }]}>
                      {calculator.title}
                    </Text>
                    <Text style={[styles.calculatorSubtitle, { color: theme.colors.textSecondary }]}>
                      {calculator.subtitle}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </ScrollView>
        </Animated.View>
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
    flex: 1,
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
  scrollContent: {
    paddingHorizontal: 24,
    paddingBottom: 24,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 16,
  },
  calculatorCard: {
    width: '47%',
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
    alignItems: 'center',
    minHeight: 140,
  },
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  calculatorTitle: {
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 4,
  },
  calculatorSubtitle: {
    fontSize: 12,
    textAlign: 'center',
    lineHeight: 16,
  },
});
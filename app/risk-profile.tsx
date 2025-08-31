import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Stack } from 'expo-router';
import { BarChart3, Shield, AlertTriangle, Target, ChevronLeft } from 'lucide-react-native';
import { useTheme } from '@/contexts/ThemeContext';

type RiskLevel = 'conservative' | 'balanced' | 'growth' | 'highGrowth';

interface Question {
  id: number;
  question: string;
  options: {
    text: string;
    score: number;
  }[];
}

const questions: Question[] = [
  {
    id: 1,
    question: "What is your age?",
    options: [
      { text: "I am less than 40 yrs old", score: 6 },
      { text: "I am between 40-55yrs old", score: 4 },
      { text: "I am between 55-70 yrs old", score: 2 },
      { text: "I am > 70 yrs old", score: 1 }
    ]
  },
  {
    id: 2,
    question: "What best describes your income levels?",
    options: [
      { text: "I expect my income to increase at a high rate", score: 6 },
      { text: "I expect my income to remain steady", score: 4 },
      { text: "I do not have a fixed monthly income", score: 2 },
      { text: "I am retired and /or do not have a source of income", score: 1 }
    ]
  },
  {
    id: 3,
    question: "What is your investment horizon and when do you plan to start withdrawing money from the portfolio?",
    options: [
      { text: "Less than 1 year", score: 1 },
      { text: "From 1-3 years", score: 2 },
      { text: "Between 3-5 years", score: 3 },
      { text: "More than 5 years", score: 4 }
    ]
  },
  {
    id: 4,
    question: "If a few months after investing, the value of your investments declines by 20%, what would you do?",
    options: [
      { text: "Cut losses immediately and liquidate all investments. Capital preservation is paramount.", score: 1 },
      { text: "I would be worried, but would give my investments a little more time.", score: 2 },
      { text: "I will be ok with volatility and accept decline in portfolio value as a part of investing. I would keep my investments as they are.", score: 3 },
      { text: "I would add to my investments. I am confident about my investments and will not be worried by notional losses.", score: 4 }
    ]
  },
  {
    id: 5,
    question: "Your investment knowledge is best described as:",
    options: [
      { text: "Limited: I have little/no investment knowledge beyond traditional bank savings accounts and fixed deposits.", score: 1 },
      { text: "Moderate: I have knowledge and understanding of financial products beyond traditional investments and am aware of related risks.", score: 2 },
      { text: "Advanced: I have sufficient understanding of various financial products and am a regular investor.", score: 3 },
      { text: "Extensive: I have extensive knowledge and understanding of investment products, and am an active and experienced investor comfortable making my own investment decisions.", score: 4 }
    ]
  }
];

const riskProfiles = {
  conservative: {
    name: 'Conservative',
    description: 'You are an investor who is prepared to accept lower returns with lower levels of risk in order to preserve your capital.',
    icon: Shield,
    color: '#059669',
    allocation: 'DEBT: 80%, EQUITY: 20%',
    expectedReturn: 'Lower returns with capital preservation',
    volatility: 'Low'
  },
  balanced: {
    name: 'Balanced',
    description: 'You are an investor who would like to invest in both income and growth assets. You will be comfortable with calculated risks to achieve good returns.',
    icon: BarChart3,
    color: '#7C3AED',
    allocation: 'DEBT: 50%, EQUITY: 50%',
    expectedReturn: 'Balanced returns with calculated risks',
    volatility: 'Medium'
  },
  growth: {
    name: 'Growth',
    description: 'You are an investor who is comfortable with a high volatility and high level of risk in order to achieve higher returns over long term. Your objective is to accumulate assets over long term by primarily investing in growth assets.',
    icon: Target,
    color: '#DC2626',
    allocation: 'DEBT: 30%, EQUITY: 70%',
    expectedReturn: 'Higher returns over long term',
    volatility: 'High'
  },
  highGrowth: {
    name: 'High Growth',
    description: 'You are an investor who is comfortable with a higher level of risk in order to achieve potentially higher returns. Capital security is secondary to potential wealth accumulation.',
    icon: AlertTriangle,
    color: '#EA580C',
    allocation: 'DEBT: 10%, EQUITY: 90%',
    expectedReturn: 'Potentially higher returns with wealth accumulation focus',
    volatility: 'Very High'
  }
};

function getRiskLevel(score: number): RiskLevel {
  if (score >= 6 && score <= 10) return 'conservative';
  if (score >= 11 && score <= 20) return 'balanced';
  if (score >= 21 && score <= 24) return 'growth';
  if (score >= 25 && score <= 28) return 'highGrowth';
  return 'conservative';
}

export default function RiskProfileScreen() {
  const { theme } = useTheme();
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [showResult, setShowResult] = useState<boolean>(false);
  const [riskLevel, setRiskLevel] = useState<RiskLevel>('conservative');

  const handleAnswer = (score: number) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = score;
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      const totalScore = newAnswers.reduce((sum, answer) => sum + answer, 0);
      const calculatedRiskLevel = getRiskLevel(totalScore);
      setRiskLevel(calculatedRiskLevel);
      setShowResult(true);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const resetAssessment = () => {
    setCurrentQuestion(0);
    setAnswers([]);
    setShowResult(false);
  };

  const saveProfile = () => {
    Alert.alert(
      'Profile Saved',
      `Your ${riskProfiles[riskLevel].name} risk profile has been saved successfully.`,
      [{ text: 'OK' }]
    );
  };

  if (showResult) {
    const profile = riskProfiles[riskLevel];
    const IconComponent = profile.icon;

    return (
      <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]} edges={['top', 'bottom']}>
        <Stack.Screen 
          options={{ 
            title: 'Risk Profile Result',
            headerStyle: { backgroundColor: theme.colors.background },
            headerTintColor: theme.colors.text,
            headerTitleStyle: { fontWeight: '600' }
          }} 
        />
        
        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          <View style={[styles.resultCard, { backgroundColor: theme.colors.surface }]}>
            <View style={[styles.resultHeader, { backgroundColor: profile.color + '20' }]}>
              <View style={[styles.resultIconContainer, { backgroundColor: profile.color }]}>
                <IconComponent size={32} color="#FFFFFF" />
              </View>
              <Text style={[styles.resultTitle, { color: theme.colors.text }]}>
                {profile.name} Investor
              </Text>
              <Text style={[styles.resultDescription, { color: theme.colors.textSecondary }]}>
                {profile.description}
              </Text>
            </View>

            <View style={styles.resultContent}>
              <View style={styles.resultSection}>
                <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Asset Allocation</Text>
                <Text style={[styles.sectionContent, { color: theme.colors.textSecondary }]}>
                  {profile.allocation}
                </Text>
              </View>

              <View style={styles.resultSection}>
                <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Expected Returns</Text>
                <Text style={[styles.sectionContent, { color: theme.colors.textSecondary }]}>
                  {profile.expectedReturn}
                </Text>
              </View>

              <View style={styles.resultSection}>
                <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Risk Level</Text>
                <Text style={[styles.sectionContent, { color: theme.colors.textSecondary }]}>
                  {profile.volatility} volatility
                </Text>
              </View>
            </View>
          </View>

          <View style={styles.actionButtons}>
            <TouchableOpacity
              style={[styles.primaryButton, { backgroundColor: theme.colors.primary }]}
              onPress={saveProfile}
            >
              <Text style={[styles.primaryButtonText, { color: '#FFFFFF' }]}>
                Save Profile
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.secondaryButton, { borderColor: theme.colors.border }]}
              onPress={resetAssessment}
            >
              <Text style={[styles.secondaryButtonText, { color: theme.colors.text }]}>
                Retake Assessment
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.bottomSpacing} />
        </ScrollView>
      </SafeAreaView>
    );
  }

  const question = questions[currentQuestion];
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]} edges={['top', 'bottom']}>
      <Stack.Screen 
        options={{ 
          title: 'Risk Profile Assessment',
          headerStyle: { backgroundColor: theme.colors.background },
          headerTintColor: theme.colors.text,
          headerTitleStyle: { fontWeight: '600' }
        }} 
      />
      
      <View style={styles.progressContainer}>
        <View style={[styles.progressBar, { backgroundColor: theme.colors.border }]}>
          <View 
            style={[
              styles.progressFill, 
              { backgroundColor: theme.colors.primary, width: `${progress}%` }
            ]} 
          />
        </View>
        <Text style={[styles.progressText, { color: theme.colors.textSecondary }]}>
          Question {currentQuestion + 1} of {questions.length}
        </Text>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={[styles.questionCard, { backgroundColor: theme.colors.surface }]}>
          <Text style={[styles.questionText, { color: theme.colors.text }]}>
            {question.question}
          </Text>

          <View style={styles.optionsContainer}>
            {question.options.map((option, index) => {
              const isSelected = answers[currentQuestion] === option.score;
              return (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.optionButton,
                    { 
                      backgroundColor: isSelected ? theme.colors.primary + '20' : theme.colors.background,
                      borderColor: isSelected ? theme.colors.primary : theme.colors.border,
                      borderWidth: isSelected ? 2 : 1
                    }
                  ]}
                  onPress={() => handleAnswer(option.score)}
                >
                  <Text style={[styles.optionText, { color: isSelected ? theme.colors.primary : theme.colors.text }]}>
                    {option.text}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {currentQuestion > 0 && (
          <View style={styles.navigationContainer}>
            <TouchableOpacity
              style={[styles.previousButton, { borderColor: theme.colors.border }]}
              onPress={handlePrevious}
            >
              <ChevronLeft size={20} color={theme.colors.text} />
              <Text style={[styles.previousButtonText, { color: theme.colors.text }]}>
                Previous
              </Text>
            </TouchableOpacity>
          </View>
        )}

        <View style={styles.bottomSpacing} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  progressContainer: {
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  progressBar: {
    height: 4,
    borderRadius: 2,
    marginBottom: 8,
  },
  progressFill: {
    height: '100%',
    borderRadius: 2,
  },
  progressText: {
    fontSize: 14,
    textAlign: 'center',
  },
  questionCard: {
    margin: 16,
    padding: 24,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  questionText: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 24,
    lineHeight: 28,
  },
  optionsContainer: {
    gap: 12,
  },
  optionButton: {
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
  },
  optionText: {
    fontSize: 16,
    textAlign: 'center',
  },
  resultCard: {
    margin: 16,
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  resultHeader: {
    padding: 24,
    alignItems: 'center',
  },
  resultIconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  resultTitle: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 8,
  },
  resultDescription: {
    fontSize: 16,
    textAlign: 'center',
  },
  resultContent: {
    padding: 24,
    paddingTop: 0,
  },
  resultSection: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  sectionContent: {
    fontSize: 14,
    lineHeight: 20,
  },
  actionButtons: {
    paddingHorizontal: 16,
    gap: 12,
  },
  primaryButton: {
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  primaryButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  secondaryButton: {
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    alignItems: 'center',
  },
  secondaryButtonText: {
    fontSize: 16,
    fontWeight: '500',
  },
  bottomSpacing: {
    height: 32,
  },
  navigationContainer: {
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  previousButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    gap: 8,
  },
  previousButtonText: {
    fontSize: 16,
    fontWeight: '500',
  },
});
import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Animated, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { ArrowLeft, Phone, MessageSquare, Lock, CreditCard } from 'lucide-react-native';
import { useTheme } from '@/contexts/ThemeContext';
import { useLanguage } from '@/contexts/LanguageContext';
import Button from '@/components/Button';
import Input from '@/components/Input';

const ProgressStep = ({ step, currentStep, icon: Icon, label, isCompleted }: {
  step: number;
  currentStep: number;
  icon: any;
  label: string;
  isCompleted: boolean;
}) => {
  const { theme } = useTheme();
  const isActive = step === currentStep;
  const isPast = step < currentStep;
  
  return (
    <View style={styles.stepContainer}>
      <View style={[
        styles.stepCircle,
        {
          backgroundColor: isActive || isPast ? theme.colors.primary : theme.colors.surface,
          borderColor: isActive ? theme.colors.primary : theme.colors.border,
        }
      ]}>
        <Icon 
          size={16} 
          color={isActive || isPast ? '#ffffff' : theme.colors.textSecondary} 
        />
      </View>
      <Text style={[
        styles.stepLabel,
        {
          color: isActive ? theme.colors.primary : theme.colors.textSecondary,
          fontWeight: isActive ? '600' : '400',
        }
      ]}>
        {label}
      </Text>
      {step < 4 && (
        <View style={[
          styles.stepConnector,
          {
            backgroundColor: isPast ? theme.colors.primary : theme.colors.border,
          }
        ]} />
      )}
    </View>
  );
};

export default function SignupScreen() {
  const { theme } = useTheme();
  useLanguage();
  const [mobile, setMobile] = useState('');
  const [loading, setLoading] = useState(false);
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

  const handleContinue = async () => {
    if (!mobile || mobile.length !== 10) return;
    
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      router.push({
        pathname: '/auth/otp',
        params: { mobile, flow: 'signup' },
      });
    }, 1000);
  };

  const handleBack = () => {
    router.back();
  };

  const handleLogin = () => {
    router.replace('/auth/login');
  };

  const isDark = theme.name === 'Dark Professional';

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
        <LinearGradient
        colors={isDark ? 
          [theme.colors.background, theme.colors.surface, theme.colors.primary + '20'] : 
          [theme.colors.background, theme.colors.surface, theme.colors.primary + '15']
        }
        style={styles.backgroundGradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <SafeAreaView style={styles.safeArea}>
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity onPress={handleBack} style={styles.backButton}>
              <ArrowLeft size={24} color={theme.colors.text} />
            </TouchableOpacity>
            <Text style={[styles.headerTitle, { color: theme.colors.text }]}>Create Account</Text>
            <View style={styles.placeholder} />
          </View>

          {/* Progress Steps */}
          <View style={styles.progressContainer}>
            <ProgressStep
              step={1}
              currentStep={1}
              icon={Phone}
              label="Mobile"
              isCompleted={false}
            />
            <ProgressStep
              step={2}
              currentStep={1}
              icon={MessageSquare}
              label="OTP"
              isCompleted={false}
            />
            <ProgressStep
              step={3}
              currentStep={1}
              icon={Lock}
              label="PIN"
              isCompleted={false}
            />
            <ProgressStep
              step={4}
              currentStep={1}
              icon={CreditCard}
              label="PAN"
              isCompleted={false}
            />
          </View>

          <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
            <Animated.View
              style={[
                styles.content,
                {
                  opacity: fadeAnim,
                  transform: [{ translateY: slideAnim }],
                },
              ]}
            >
              {/* Main Card */}
              <View style={[styles.mainCard, { backgroundColor: theme.colors.surface }]}>
                <View style={styles.cardContent}>
                  <Text style={[styles.title, { color: theme.colors.text }]}>
                    Enter Mobile Number
                  </Text>
                  <Text style={[styles.subtitle, { color: theme.colors.textSecondary }]}>
                    We&apos;ll send you a verification code
                  </Text>

                  <View style={styles.inputGroup}>
                    <Text style={[styles.inputLabel, { color: theme.colors.text }]}>Mobile Number</Text>
                    <View style={[styles.inputContainer, { 
                      backgroundColor: theme.colors.background,
                      borderColor: theme.colors.border
                    }]}>
                      <View style={[styles.inputIcon, { backgroundColor: theme.colors.primary + '15' }]}>
                        <Phone size={20} color={theme.colors.primary} />
                      </View>
                      <Input
                        value={mobile}
                        onChangeText={setMobile}
                        keyboardType="phone-pad"
                        placeholder="Enter mobile number"
                        maxLength={10}
                        style={[styles.input, { color: theme.colors.text }]}
                        testID="mobile-input"
                        placeholderTextColor={theme.colors.textSecondary}
                        hideContainer={true}
                      />
                    </View>
                  </View>

                  <Button
                    title="Send OTP"
                    onPress={handleContinue}
                    loading={loading}
                    disabled={!mobile || mobile.length !== 10}
                    style={styles.continueButton}
                    testID="continue-button"
                  />
                </View>
              </View>

              {/* Login Section */}
              <View style={styles.loginSection}>
                <Text style={[styles.loginText, { color: theme.colors.textSecondary }]}>
                  Already have an account?
                </Text>
                <TouchableOpacity onPress={handleLogin}>
                  <Text style={[styles.loginLink, { color: theme.colors.primary }]}>
                    Sign In
                  </Text>
                </TouchableOpacity>
              </View>
            </Animated.View>
          </ScrollView>
        </SafeAreaView>
        </LinearGradient>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundGradient: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  placeholder: {
    width: 40,
  },
  progressContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
    paddingVertical: 20,
    position: 'relative',
  },
  stepContainer: {
    alignItems: 'center',
    flex: 1,
    position: 'relative',
  },
  stepCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  stepLabel: {
    fontSize: 12,
    fontWeight: '500',
  },
  stepConnector: {
    position: 'absolute',
    top: 20,
    left: '70%',
    right: '-70%',
    height: 2,
    opacity: 0.3,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  content: {
    flex: 1,
  },
  mainCard: {
    borderRadius: 24,
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.25,
    shadowRadius: 20,
    elevation: 15,
  },
  cardContent: {
    padding: 32,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 32,
    textAlign: 'center',
    opacity: 0.7,
  },
  inputGroup: {
    marginBottom: 32,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
    marginLeft: 4,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 2,
  },
  inputIcon: {
    width: 36,
    height: 36,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    fontWeight: '500',
    paddingVertical: 12,
    backgroundColor: 'transparent',
    borderWidth: 0,
  },
  continueButton: {
    borderRadius: 16,
    paddingVertical: 16,
  },
  loginSection: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 32,
    gap: 4,
  },
  loginText: {
    fontSize: 16,
    opacity: 0.9,
  },
  loginLink: {
    fontSize: 16,
    fontWeight: '600',
    textDecorationLine: 'underline',
  },
});
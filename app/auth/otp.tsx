import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Animated, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { router, useLocalSearchParams } from 'expo-router';
import { ArrowLeft, Phone, MessageSquare, Lock, CreditCard } from 'lucide-react-native';
import { useTheme } from '@/contexts/ThemeContext';
import { useLanguage } from '@/contexts/LanguageContext';
import Button from '@/components/Button';
import OTPInput from '@/components/OTPInput';

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

export default function OTPScreen() {
  const { theme } = useTheme();
  useLanguage();
  const { mobile, flow } = useLocalSearchParams<{ mobile: string; flow: string }>();
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [timer, setTimer] = useState(30);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;

  useEffect(() => {
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

    const interval = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(interval);
  }, [fadeAnim, slideAnim]);

  const handleVerify = async () => {
    if (otp.length !== 6) return;
    
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      if (flow === 'signup') {
        router.push({
          pathname: '/auth/set-pin',
          params: { mobile },
        });
      } else {
        router.replace('/(tabs)');
      }
    }, 1500);
  };

  const handleResend = async () => {
    setResendLoading(true);
    setTimer(30);
    // Simulate API call
    setTimeout(() => {
      setResendLoading(false);
    }, 1000);
  };

  const handleBack = () => {
    router.back();
  };

  const isDark = theme.name === 'Dark Professional';

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
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
            <Text style={[styles.headerTitle, { color: theme.colors.text }]}>Verify OTP</Text>
            <View style={styles.placeholder} />
          </View>

          {/* Progress Steps */}
          <View style={styles.progressContainer}>
            <ProgressStep
              step={1}
              currentStep={2}
              icon={Phone}
              label="Mobile"
              isCompleted={true}
            />
            <ProgressStep
              step={2}
              currentStep={2}
              icon={MessageSquare}
              label="OTP"
              isCompleted={false}
            />
            <ProgressStep
              step={3}
              currentStep={2}
              icon={Lock}
              label="PIN"
              isCompleted={false}
            />
            <ProgressStep
              step={4}
              currentStep={2}
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
                    Enter Verification Code
                  </Text>
                  <Text style={[styles.subtitle, { color: theme.colors.textSecondary }]}>
                    We&apos;ve sent a 6-digit code to
                  </Text>
                  <Text style={[styles.phoneNumber, { color: theme.colors.text }]}>
                    +91 {mobile}
                  </Text>

                  <View style={styles.otpContainer}>
                    <OTPInput
                      length={6}
                      onComplete={setOtp}
                      value={otp}
                    />
                  </View>

                  <Button
                    title="Verify Code"
                    onPress={handleVerify}
                    loading={loading}
                    disabled={otp.length !== 6}
                    style={styles.verifyButton}
                    testID="verify-button"
                  />

                  <View style={styles.resendSection}>
                    {timer > 0 ? (
                      <Text style={[styles.timerText, { color: theme.colors.textSecondary }]}>
                        Resend code in {timer}s
                      </Text>
                    ) : (
                      <TouchableOpacity onPress={handleResend} disabled={resendLoading}>
                        <Text style={[styles.resendText, { color: theme.colors.primary }]}>
                          {resendLoading ? 'Sending...' : 'Resend Code'}
                        </Text>
                      </TouchableOpacity>
                    )}
                  </View>
                </View>
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
    backgroundColor: '#ffffff',
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
    backgroundColor: '#ffffff',
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
    alignItems: 'center',
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
    marginBottom: 4,
    textAlign: 'center',
    opacity: 0.7,
  },
  phoneNumber: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 32,
    textAlign: 'center',
  },
  otpContainer: {
    marginBottom: 32,
    width: '100%',
  },
  verifyButton: {
    borderRadius: 16,
    paddingVertical: 16,
    width: '100%',
  },
  resendSection: {
    marginTop: 24,
    alignItems: 'center',
  },
  timerText: {
    fontSize: 14,
    opacity: 0.7,
  },
  resendText: {
    fontSize: 14,
    fontWeight: '600',
  },
});
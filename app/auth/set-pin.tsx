import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Animated, Alert, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { ArrowLeft, Phone, MessageSquare, Lock, Eye, EyeOff, CreditCard } from 'lucide-react-native';
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

export default function SetPinScreen() {
  const { theme } = useTheme();
  useLanguage();
  const [currentStep, setCurrentStep] = useState<'pin' | 'pan'>('pin');
  const [pin, setPin] = useState('');
  const [confirmPin, setConfirmPin] = useState('');
  const [panCard, setPanCard] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPin, setShowPin] = useState(false);
  const [showConfirmPin, setShowConfirmPin] = useState(false);
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

  const handleSetPin = async () => {
    if (!pin || !confirmPin) return;
    
    if (pin !== confirmPin) {
      Alert.alert('Error', 'PINs do not match');
      return;
    }
    
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setCurrentStep('pan');
    }, 1500);
  };

  const handleSetPanCard = async () => {
    if (!panCard || !validatePanCard(panCard)) {
      Alert.alert('Error', 'Please enter a valid PAN card number');
      return;
    }
    
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      router.replace('/(tabs)');
    }, 1500);
  };

  const validatePanCard = (text: string) => {
    // Remove spaces and convert to uppercase
    const cleanText = text.replace(/\s/g, '').toUpperCase();
    // PAN card format: 5 letters, 4 digits, 1 letter
    const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
    return panRegex.test(cleanText);
  };

  const formatPanCard = (text: string) => {
    // Remove spaces and convert to uppercase
    const cleanText = text.replace(/\s/g, '').toUpperCase();
    // Add spaces for better readability: ABCDE 1234 F
    if (cleanText.length <= 5) return cleanText;
    if (cleanText.length <= 9) return cleanText.slice(0, 5) + ' ' + cleanText.slice(5);
    return cleanText.slice(0, 5) + ' ' + cleanText.slice(5, 9) + ' ' + cleanText.slice(9);
  };

  const handlePanCardChange = (text: string) => {
    const formatted = formatPanCard(text);
    if (formatted.replace(/\s/g, '').length <= 10) {
      setPanCard(formatted);
    }
  };

  const handleBack = () => {
    router.back();
  };

  const isPinValid = pin.length >= 4 && confirmPin.length >= 4 && pin === confirmPin;
  const isPanValid = validatePanCard(panCard);
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
            <Text style={[styles.headerTitle, { color: theme.colors.text }]}>
              {currentStep === 'pin' ? 'Set PIN' : 'PAN Card'}
            </Text>
            <View style={styles.placeholder} />
          </View>

          {/* Progress Steps */}
          <View style={styles.progressContainer}>
            <ProgressStep
              step={1}
              currentStep={currentStep === 'pin' ? 3 : 4}
              icon={Phone}
              label="Mobile"
              isCompleted={true}
            />
            <ProgressStep
              step={2}
              currentStep={currentStep === 'pin' ? 3 : 4}
              icon={MessageSquare}
              label="OTP"
              isCompleted={true}
            />
            <ProgressStep
              step={3}
              currentStep={currentStep === 'pin' ? 3 : 4}
              icon={Lock}
              label="PIN"
              isCompleted={currentStep === 'pan'}
            />
            <ProgressStep
              step={4}
              currentStep={currentStep === 'pin' ? 3 : 4}
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
                  {currentStep === 'pin' ? (
                    <>
                      <Text style={[styles.title, { color: theme.colors.text }]}>
                        Create Your PIN
                      </Text>
                      <Text style={[styles.subtitle, { color: theme.colors.textSecondary }]}>
                        Set a secure 6-digit PIN to protect your account
                      </Text>

                      {/* PIN Input */}
                      <View style={styles.inputGroup}>
                        <Text style={[styles.inputLabel, { color: theme.colors.text }]}>PIN</Text>
                        <View style={[styles.inputContainer, { 
                          backgroundColor: theme.colors.background,
                          borderColor: theme.colors.border
                        }]}>
                          <View style={[styles.inputIcon, { backgroundColor: theme.colors.primary + '15' }]}>
                            <Lock size={20} color={theme.colors.primary} />
                          </View>
                          <Input
                            value={pin}
                            onChangeText={setPin}
                            secureTextEntry={!showPin}
                            keyboardType="numeric"
                            placeholder="Enter 6-digit PIN"
                            maxLength={6}
                            style={[styles.input, { color: theme.colors.text }]}
                            testID="pin-input"
                            placeholderTextColor={theme.colors.textSecondary}
                            hideContainer={true}
                          />
                          <TouchableOpacity
                            style={styles.eyeIcon}
                            onPress={() => setShowPin(!showPin)}
                          >
                            {showPin ? (
                              <EyeOff size={20} color={theme.colors.textSecondary} />
                            ) : (
                              <Eye size={20} color={theme.colors.textSecondary} />
                            )}
                          </TouchableOpacity>
                        </View>
                      </View>

                      {/* Confirm PIN Input */}
                      <View style={styles.inputGroup}>
                        <Text style={[styles.inputLabel, { color: theme.colors.text }]}>Confirm PIN</Text>
                        <View style={[
                          styles.inputContainer, 
                          { 
                            backgroundColor: theme.colors.background,
                            borderColor: confirmPin && pin !== confirmPin ? '#ff4757' : theme.colors.border 
                          }
                        ]}>
                          <View style={[styles.inputIcon, { backgroundColor: theme.colors.primary + '15' }]}>
                            <Lock size={20} color={theme.colors.primary} />
                          </View>
                          <Input
                            value={confirmPin}
                            onChangeText={setConfirmPin}
                            secureTextEntry={!showConfirmPin}
                            keyboardType="numeric"
                            placeholder="Confirm your PIN"
                            maxLength={6}
                            style={[styles.input, { color: theme.colors.text }]}
                            testID="confirm-pin-input"
                            placeholderTextColor={theme.colors.textSecondary}
                            hideContainer={true}
                          />
                          <TouchableOpacity
                            style={styles.eyeIcon}
                            onPress={() => setShowConfirmPin(!showConfirmPin)}
                          >
                            {showConfirmPin ? (
                              <EyeOff size={20} color={theme.colors.textSecondary} />
                            ) : (
                              <Eye size={20} color={theme.colors.textSecondary} />
                            )}
                          </TouchableOpacity>
                        </View>
                        {confirmPin && pin !== confirmPin && (
                          <Text style={styles.errorText}>PINs do not match</Text>
                        )}
                      </View>

                      <Button
                        title="Continue"
                        onPress={handleSetPin}
                        loading={loading}
                        disabled={!isPinValid}
                        style={styles.continueButton}
                        testID="continue-button"
                      />
                    </>
                  ) : (
                    <>
                      <Text style={[styles.title, { color: theme.colors.text }]}>
                        Enter PAN Card
                      </Text>
                      <Text style={[styles.subtitle, { color: theme.colors.textSecondary }]}>
                        Please enter your PAN card number for verification
                      </Text>

                      {/* PAN Card Input */}
                      <View style={styles.inputGroup}>
                        <Text style={[styles.inputLabel, { color: theme.colors.text }]}>PAN Card Number</Text>
                        <View style={[
                          styles.inputContainer, 
                          { 
                            backgroundColor: theme.colors.background,
                            borderColor: panCard && !isPanValid ? '#ff4757' : theme.colors.border 
                          }
                        ]}>
                          <View style={[styles.inputIcon, { backgroundColor: theme.colors.primary + '15' }]}>
                            <CreditCard size={20} color={theme.colors.primary} />
                          </View>
                          <Input
                            value={panCard}
                            onChangeText={handlePanCardChange}
                            placeholder="ABCDE 1234 F"
                            autoCapitalize="characters"
                            style={[styles.input, { color: theme.colors.text }]}
                            testID="pan-input"
                            placeholderTextColor={theme.colors.textSecondary}
                            hideContainer={true}
                          />
                        </View>
                        {panCard && !isPanValid && (
                          <Text style={styles.errorText}>Please enter a valid PAN card number</Text>
                        )}
                      </View>

                      <View style={styles.panInfoContainer}>
                        <Text style={[styles.panInfoText, { color: theme.colors.textSecondary }]}>
                          • PAN format: 5 letters, 4 digits, 1 letter
                        </Text>
                        <Text style={[styles.panInfoText, { color: theme.colors.textSecondary }]}>
                          • Example: ABCDE1234F
                        </Text>
                      </View>

                      <Button
                        title="Create Account"
                        onPress={handleSetPanCard}
                        loading={loading}
                        disabled={!isPanValid}
                        style={styles.continueButton}
                        testID="create-account-button"
                      />
                    </>
                  )}
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
    marginBottom: 16,
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
  eyeIcon: {
    padding: 12,
  },
  errorText: {
    color: '#ff4757',
    fontSize: 12,
    marginTop: 4,
    marginLeft: 16,
  },
  continueButton: {
    marginTop: 24,
    borderRadius: 16,
    paddingVertical: 16,
  },
  panInfoContainer: {
    backgroundColor: '#f0f8ff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
  },
  panInfoText: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 4,
  },
});
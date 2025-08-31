import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated, Linking, Dimensions, Image, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { Calculator, Phone, Lock, Eye, EyeOff } from 'lucide-react-native';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTheme } from '@/contexts/ThemeContext';
import Input from '@/components/Input';

const { height } = Dimensions.get('window');

export default function LoginScreen() {
  useLanguage();
  const { theme } = useTheme();
  const isDark = theme.name === 'Dark Professional';
  const [mobile, setMobile] = useState('');
  const [pin, setPin] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPin, setShowPin] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const logoAnim = useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    Animated.sequence([
      Animated.timing(logoAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
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
      ]),
    ]).start();
  }, [fadeAnim, slideAnim, logoAnim]);

  const handleLogin = async () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      router.replace('/(tabs)');
    }, 1500);
  };

  const handleSignup = () => {
    router.push('/auth/signup');
  };

  const handleCalculators = () => {
    router.push('/calculators');
  };

  const openTerms = () => {
    Linking.openURL('https://example.com/terms');
  };

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
        {/* Background Pattern */}
        <View style={styles.backgroundPattern}>
          <View style={[styles.circle, styles.circle1, { backgroundColor: theme.colors.primary }]} />
          <View style={[styles.circle, styles.circle2, { backgroundColor: theme.colors.secondary }]} />
          <View style={[styles.circle, styles.circle3, { backgroundColor: theme.colors.accent }]} />
        </View>
        
        <SafeAreaView style={styles.safeArea}>
          <View style={styles.content}>
            {/* Logo Section */}
            <Animated.View
              style={[
                styles.logoSection,
                {
                  opacity: logoAnim,
                  transform: [{
                    scale: logoAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0.8, 1],
                    }),
                  }],
                },
              ]}
            >
              <View style={styles.logoContainer}>
                <Image 
                  source={{ uri: 'https://r2-pub.rork.com/attachments/7ka3kuswj9ooq10usjf8y' }}
                  style={styles.logoImage}
                  resizeMode="contain"
                />
              </View>
              <Text style={[styles.brandSubtitle, { color: theme.colors.textSecondary }]}>Wealth Management</Text>
              <View style={styles.brandAccent}>
                <View style={[styles.accentDot, { backgroundColor: theme.colors.primary }]} />
                <View style={[styles.accentDot, { backgroundColor: theme.colors.secondary }]} />
                <View style={[styles.accentDot, { backgroundColor: theme.colors.accent }]} />
              </View>
            </Animated.View>

            {/* Login Card */}
            <Animated.View
              style={[
                styles.loginCard,
                {
                  opacity: fadeAnim,
                  transform: [{ translateY: slideAnim }],
                },
              ]}
            >
              <LinearGradient
                colors={[
                  theme.colors.surface + 'F5',
                  theme.colors.surface + 'E8'
                ]}
                style={styles.cardGradient}
              >


                <View style={styles.formContainer}>
                  {/* Mobile Input */}
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
                        placeholder="Enter your mobile number"
                        maxLength={10}
                        style={[styles.input, { color: theme.colors.text }]}
                        testID="mobile-input"
                        placeholderTextColor={theme.colors.textSecondary}
                        hideContainer={true}
                      />
                    </View>
                  </View>

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
                        placeholder="Enter your 6-digit PIN"
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

                  <TouchableOpacity style={styles.forgotPin}>
                    <Text style={[styles.forgotPinText, { color: theme.colors.primary }]}>
                      Forgot PIN?
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.loginButton}
                    onPress={handleLogin}
                    testID="login-button"
                  >
                    <LinearGradient
                      colors={[theme.colors.primary, theme.colors.secondary]}
                      style={styles.loginButtonGradient}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 0 }}
                    >
                      {loading ? (
                        <Text style={styles.loginButtonText}>Signing in...</Text>
                      ) : (
                        <Text style={styles.loginButtonText}>Sign In</Text>
                      )}
                    </LinearGradient>
                  </TouchableOpacity>

                  <View style={styles.divider}>
                    <View style={[styles.dividerLine, { backgroundColor: theme.colors.border }]} />
                    <Text style={[styles.dividerText, { color: theme.colors.textSecondary }]}>or</Text>
                    <View style={[styles.dividerLine, { backgroundColor: theme.colors.border }]} />
                  </View>

                  <TouchableOpacity
                    style={[styles.signupButton, { borderColor: theme.colors.primary }]}
                    onPress={handleSignup}
                  >
                    <Text style={[styles.signupButtonText, { color: theme.colors.primary }]}>
                      Create New Account
                    </Text>
                  </TouchableOpacity>
                </View>
              </LinearGradient>
            </Animated.View>

            {/* Bottom Section */}
            <Animated.View
              style={[
                styles.bottomSection,
                {
                  opacity: fadeAnim,
                },
              ]}
            >
              {/* Calculators */}
              <TouchableOpacity
                style={styles.calculatorButton}
                onPress={handleCalculators}
              >
                <LinearGradient
                  colors={[
                    theme.colors.primary + '20', 
                    theme.colors.secondary + '20'
                  ]}
                  style={[styles.calculatorGradient, { 
                    borderColor: theme.colors.primary + '30' 
                  }]}
                >
                  <View style={[styles.calculatorIconContainer, { backgroundColor: theme.colors.surface }]}>
                    <Calculator size={24} color={theme.colors.primary} />
                  </View>
                  <Text style={[styles.calculatorText, { color: theme.colors.text }]}>BYLD Calculators</Text>
                  <Text style={[styles.calculatorSubtext, { color: theme.colors.textSecondary }]}>SIP, STP, SWP & More</Text>
                </LinearGradient>
              </TouchableOpacity>

              {/* Terms */}
              <TouchableOpacity onPress={openTerms} style={styles.termsButton}>
                <Text style={[styles.termsText, { color: theme.colors.textSecondary }]}>Terms & Conditions</Text>
              </TouchableOpacity>
            </Animated.View>
          </View>
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
  backgroundPattern: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  circle: {
    position: 'absolute',
    borderRadius: 1000,
    opacity: 0.1,
  },
  circle1: {
    width: 200,
    height: 200,
    top: -100,
    right: -100,
  },
  circle2: {
    width: 150,
    height: 150,
    bottom: 100,
    left: -75,
  },
  circle3: {
    width: 100,
    height: 100,
    top: height * 0.3,
    right: 50,
  },
  safeArea: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: 'space-between',
  },
  logoSection: {
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 16,
  },
  logoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoImage: {
    width: 160,
    height: 160,
  },
  brandTitle: {
    fontSize: 32,
    fontWeight: '900',
    marginBottom: 4,
    letterSpacing: 3,
    textShadowColor: 'rgba(0,0,0,0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  brandSubtitle: {
    fontSize: 16,
    opacity: 0.9,
    fontWeight: '500',
    letterSpacing: 1,
    marginTop: -25,
  },
  brandAccent: {
    flexDirection: 'row',
    marginTop: 4,
    gap: 8,
  },
  accentDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  loginCard: {
    borderRadius: 20,
    marginHorizontal: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.25,
    shadowRadius: 20,
    elevation: 15,
    overflow: 'hidden',
  },
  cardGradient: {
    borderRadius: 20,
  },
  cardHeader: {
    padding: 20,
    paddingBottom: 12,
    alignItems: 'center',
  },
  cardTitle: {
    fontSize: 24,
    fontWeight: '800',
    marginBottom: 4,
  },
  cardSubtitle: {
    fontSize: 14,
    opacity: 0.8,
    fontWeight: '500',
  },
  formContainer: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 20,
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
  forgotPin: {
    alignSelf: 'flex-end',
    marginBottom: 16,
    marginTop: 2,
  },
  forgotPinText: {
    fontSize: 14,
    fontWeight: '600',
  },
  loginButton: {
    marginBottom: 16,
    borderRadius: 12,
    shadowColor: '#f093fb',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 6,
  },
  loginButtonGradient: {
    paddingVertical: 14,
    alignItems: 'center',
    borderRadius: 12,
  },
  loginButtonText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#ffffff',
    letterSpacing: 0.5,
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 12,
  },
  dividerLine: {
    flex: 1,
    height: 1,
  },
  dividerText: {
    marginHorizontal: 16,
    fontSize: 14,
    fontWeight: '500',
  },
  signupButton: {
    borderWidth: 2,
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  signupButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  bottomSection: {
    paddingTop: 16,
    paddingBottom: 20,
    alignItems: 'center',
  },
  calculatorButton: {
    borderRadius: 20,
    marginBottom: 16,
    width: '100%',
    maxWidth: 300,
    overflow: 'hidden',
  },
  calculatorGradient: {
    padding: 20,
    alignItems: 'center',
    borderRadius: 20,
    borderWidth: 1,
  },
  calculatorIconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  calculatorText: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 6,
  },
  calculatorSubtext: {
    fontSize: 14,
    opacity: 0.9,
    fontWeight: '500',
  },
  termsButton: {
    paddingVertical: 16,
  },
  termsText: {
    fontSize: 14,
    opacity: 0.8,
    textDecorationLine: 'underline',
    fontWeight: '500',
  },
});
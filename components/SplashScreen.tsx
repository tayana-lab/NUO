import React, { useEffect, useRef, useCallback } from 'react';
import { View, Text, StyleSheet, Animated, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { TrendingUp, Shield, DollarSign } from 'lucide-react-native';
import { useTheme } from '@/contexts/ThemeContext';

interface SplashScreenProps {
  onFinish: () => void;
}

export default function SplashScreen({ onFinish }: SplashScreenProps) {
  const { theme } = useTheme();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;

  const iconFadeAnim = useRef(new Animated.Value(0)).current;
  const iconRotateAnim = useRef(new Animated.Value(0)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;

  const startAnimation = useCallback(() => {
    const logoAnimation = Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
      }),
    ]);

    const iconsAnimation = Animated.stagger(200, [
      Animated.timing(iconFadeAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.timing(iconRotateAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
    ]);

    const pulseAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    );

    const animationSequence = Animated.sequence([
      logoAnimation,
      Animated.delay(300),
      iconsAnimation,
      Animated.delay(1200),
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }),
    ]);

    pulseAnimation.start();
    animationSequence.start(() => {
      pulseAnimation.stop();
      onFinish();
    });
  }, [fadeAnim, scaleAnim, slideAnim, iconFadeAnim, iconRotateAnim, pulseAnim, onFinish]);

  useEffect(() => {
    startAnimation();
  }, [startAnimation]);

  const isDark = theme.name === 'Dark Professional';

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={isDark ? 
          [theme.colors.background, theme.colors.surface, theme.colors.primary + '20'] : 
          [theme.colors.background, theme.colors.surface, theme.colors.primary + '15']
        }
        style={styles.gradient}
      >
        <Animated.View
          style={[
            styles.content,
            {
              opacity: fadeAnim,
              transform: [
                { scale: scaleAnim },
                { translateY: slideAnim },
              ],
            },
          ]}
        >
          {/* Floating Icons Background */}
          <Animated.View 
            style={[
              styles.floatingIcon,
              styles.floatingIcon1,
              {
                opacity: iconFadeAnim,
                transform: [
                  {
                    rotate: iconRotateAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: ['0deg', '360deg'],
                    }),
                  },
                ],
              },
            ]}
          >
            <TrendingUp size={24} color={theme.colors.primary + '40'} />
          </Animated.View>
          
          <Animated.View 
            style={[
              styles.floatingIcon,
              styles.floatingIcon2,
              {
                opacity: iconFadeAnim,
                transform: [
                  {
                    rotate: iconRotateAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: ['360deg', '0deg'],
                    }),
                  },
                ],
              },
            ]}
          >
            <Shield size={20} color={theme.colors.secondary + '50'} />
          </Animated.View>
          
          <Animated.View 
            style={[
              styles.floatingIcon,
              styles.floatingIcon3,
              {
                opacity: iconFadeAnim,
                transform: [
                  {
                    rotate: iconRotateAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: ['0deg', '-360deg'],
                    }),
                  },
                ],
              },
            ]}
          >
            <DollarSign size={28} color={theme.colors.accent + '55'} />
          </Animated.View>

          {/* Main Logo */}
          <Animated.View
            style={[
              styles.logoContainer,
              { 
                transform: [{ scale: pulseAnim }],
              },
            ]}
          >
            <Image 
              source={{ uri: 'https://r2-pub.rork.com/attachments/7ka3kuswj9ooq10usjf8y' }}
              style={styles.logoImage}
              resizeMode="contain"
            />
          </Animated.View>
          
          
          <Text style={[styles.tagline, { color: theme.colors.text }]}>
            Wealth Management
          </Text>
          <Text style={[styles.subtitle, { color: theme.colors.textSecondary }]}>
            Build Your Legacy Daily
          </Text>
        </Animated.View>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    alignItems: 'center',
    position: 'relative',
  },
  floatingIcon: {
    position: 'absolute',
  },
  floatingIcon1: {
    top: -80,
    right: -60,
  },
  floatingIcon2: {
    top: -40,
    left: -80,
  },
  floatingIcon3: {
    bottom: -60,
    right: -40,
  },
  logoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  logoImage: {
    width: 160,
    height: 160,
  },
  brandText: {
    fontSize: 32,
    fontWeight: '900',
    letterSpacing: 2,
    marginBottom: 8,
  },
  tagline: {
    fontSize: 18,
    fontWeight: '400',
    letterSpacing: 1.5,
    opacity: 0.95,
    marginTop: -10,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    fontWeight: '300',
    letterSpacing: 2,
    opacity: 0.8,
    fontStyle: 'italic',
  },
});
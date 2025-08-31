import React, { useRef, useState, useEffect } from 'react';
import { View, TextInput, StyleSheet, Animated } from 'react-native';
import { useTheme } from '@/contexts/ThemeContext';

interface OTPInputProps {
  length: number;
  onComplete: (otp: string) => void;
  value?: string;
}

export default function OTPInput({ length, onComplete, value = '' }: OTPInputProps) {
  const { theme } = useTheme();
  const [otp, setOtp] = useState<string[]>(new Array(length).fill(''));
  const inputRefs = useRef<TextInput[]>([]);
  const animatedValues = useRef(
    new Array(length).fill(0).map(() => new Animated.Value(1))
  ).current;

  useEffect(() => {
    if (value) {
      const otpArray = value.split('').slice(0, length);
      while (otpArray.length < length) {
        otpArray.push('');
      }
      setOtp(otpArray);
    }
  }, [value, length]);

  const handleChange = (text: string, index: number) => {
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);

    // Animate the input
    Animated.sequence([
      Animated.timing(animatedValues[index], {
        toValue: 1.1,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(animatedValues[index], {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();

    if (text && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }

    const otpString = newOtp.join('');
    if (otpString.length === length) {
      onComplete(otpString);
    }
  };

  const handleKeyPress = (key: string, index: number) => {
    if (key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  return (
    <View style={styles.container}>
      {otp.map((digit, index) => (
        <Animated.View
          key={index}
          style={[
            styles.inputContainer,
            {
              borderColor: digit ? theme.colors.primary : theme.colors.border,
              backgroundColor: digit ? theme.colors.surface : theme.colors.background,
              transform: [{ scale: animatedValues[index] }],
            },
          ]}
        >
          <TextInput
            ref={(ref) => {
              if (ref) inputRefs.current[index] = ref;
            }}
            style={[styles.input, { color: theme.colors.text }]}
            value={digit}
            onChangeText={(text) => handleChange(text, index)}
            onKeyPress={({ nativeEvent }) => handleKeyPress(nativeEvent.key, index)}
            keyboardType="numeric"
            maxLength={1}
            selectTextOnFocus
            testID={`otp-input-${index}`}
          />
        </Animated.View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 20,
  },
  inputContainer: {
    width: 45,
    height: 55,
    borderWidth: 2,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5,
  },
  input: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    width: '100%',
    height: '100%',
  },
});
import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet, TextInputProps } from 'react-native';
import { useTheme } from '@/contexts/ThemeContext';

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  containerStyle?: any;
  hideContainer?: boolean;
}

export default function Input({ label, error, containerStyle, hideContainer, ...props }: InputProps) {
  const { theme } = useTheme();
  const [isFocused, setIsFocused] = useState(false);

  const inputElement = (
    <TextInput
      style={[
        hideContainer ? styles.bareInput : styles.input,
        {
          borderColor: !hideContainer
            ? error
              ? theme.colors.error
              : isFocused
              ? theme.colors.primary
              : theme.colors.border
            : 'transparent',
          backgroundColor: hideContainer ? 'transparent' : theme.colors.surface,
          color: theme.colors.text,
        },
        hideContainer ? props.style : {},
      ]}
      placeholderTextColor={theme.colors.textSecondary}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      {...props}
    />
  );

  if (hideContainer) {
    return inputElement;
  }

  return (
    <View style={[styles.container, containerStyle]}>
      {label && (
        <Text style={[styles.label, { color: theme.colors.text }]}>{label}</Text>
      )}
      {inputElement}
      {error && (
        <Text style={[styles.error, { color: theme.colors.error }]}>{error}</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 0,
    fontSize: 16,
    height: 50,
    textAlignVertical: 'center',
    includeFontPadding: false,
  },
  error: {
    fontSize: 12,
    marginTop: 4,
  },
  bareInput: {
    fontSize: 16,
    fontWeight: '500',
    height: 50,
    backgroundColor: 'transparent',
    borderWidth: 0,
    textAlign: 'center',
    textAlignVertical: 'center',
    paddingVertical: 15,
    includeFontPadding: false,
  },
});

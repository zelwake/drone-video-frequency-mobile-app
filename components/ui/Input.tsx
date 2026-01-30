import { borderRadius, fontSize, minTouchSize, spacing } from '@/constants/Layout';
import { useTheme } from '@/contexts/ThemeContext';
import React from 'react';
import {
  KeyboardTypeOptions,
  StyleProp,
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
  ViewStyle,
} from 'react-native';

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  keyboardType?: KeyboardTypeOptions;
  viewStyle?: StyleProp<ViewStyle>;
}

export function Input({ label, error, keyboardType = 'default', viewStyle, ...props }: InputProps) {
  const { colors } = useTheme();

  return (
    <View style={[styles.container, viewStyle]}>
      {label && <Text style={[styles.label, { color: colors.text }]}>{label}</Text>}
      <TextInput
        style={[
          styles.input,
          {
            backgroundColor: colors.background,
            borderColor: error ? colors.error : colors.border,
            color: colors.text,
          },
        ]}
        placeholderTextColor={colors.textSecondary}
        keyboardType={keyboardType}
        {...props}
      />
      {error && <Text style={[styles.error, { color: colors.error }]}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.md,
  },
  label: {
    fontSize: fontSize.sm,
    marginBottom: spacing.xs,
    fontWeight: '500',
  },
  input: {
    borderWidth: 1,
    borderRadius: borderRadius.sm,
    padding: spacing.md,
    paddingTop: spacing.sm,
    paddingBottom: spacing.sm,
    fontSize: fontSize.md,
    minHeight: minTouchSize,
  },
  error: {
    fontSize: fontSize.xs,
    marginTop: spacing.xs,
  },
});

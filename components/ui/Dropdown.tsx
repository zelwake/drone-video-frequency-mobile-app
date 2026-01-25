import React from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useTheme } from '@/contexts/ThemeContext';
import { Layout } from '@/constants/Layout';

interface DropdownItem {
  label: string;
  value: string | number;
}

interface DropdownProps {
  label?: string;
  value: string | number;
  onValueChange: (value: string | number) => void;
  items: DropdownItem[];
  placeholder?: string;
  enabled?: boolean;
}

export function Dropdown({
  label,
  value,
  onValueChange,
  items,
  placeholder = 'Select...',
  enabled = true,
}: DropdownProps) {
  const { colors } = useTheme();

  return (
    <View style={styles.container}>
      {label && <Text style={[styles.label, { color: colors.text }]}>{label}</Text>}
      <View
        style={[
          styles.pickerContainer,
          {
            backgroundColor: colors.background,
            borderColor: colors.border,
          },
        ]}
      >
        <Picker
          selectedValue={value}
          onValueChange={onValueChange}
          enabled={enabled}
          style={[styles.picker, { color: colors.text }]}
          dropdownIconColor={colors.textSecondary}
        >
          <Picker.Item label={placeholder} value="" color={colors.textSecondary} />
          {items.map((item) => (
            <Picker.Item key={item.value} label={item.label} value={item.value} />
          ))}
        </Picker>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: Layout.spacing.md,
  },
  label: {
    fontSize: Layout.fontSize.sm,
    marginBottom: Layout.spacing.xs,
    fontWeight: '500',
  },
  pickerContainer: {
    borderWidth: 1,
    borderRadius: Layout.borderRadius.sm,
    overflow: 'hidden',
  },
  picker: {
    height: Platform.OS === 'ios' ? 150 : Layout.minTouchSize,
  },
});

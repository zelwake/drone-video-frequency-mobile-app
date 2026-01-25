import React, { useState } from 'react';
import { Input } from './ui/Input';
import { isValidFrequency } from '@/utils/frequency';

interface FrequencyInputProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit?: () => void;
}

export function FrequencyInput({ value, onChange, onSubmit }: FrequencyInputProps) {
  const [error, setError] = useState<string | undefined>();

  const handleChange = (text: string) => {
    // Povolit pouze čísla
    const numericValue = text.replace(/[^0-9]/g, '');
    onChange(numericValue);

    // Validovat pokud je vyplněno
    if (numericValue) {
      const freq = parseInt(numericValue, 10);
      if (!isValidFrequency(freq)) {
        setError('Frequency should be between 1000-6000 MHz');
      } else {
        setError(undefined);
      }
    } else {
      setError(undefined);
    }
  };

  return (
    <Input
      label="Frequency (MHz)"
      value={value}
      onChangeText={handleChange}
      keyboardType="numeric"
      placeholder="e.g. 5800"
      error={error}
      onSubmitEditing={onSubmit}
      returnKeyType="search"
    />
  );
}

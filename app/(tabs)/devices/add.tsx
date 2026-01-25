import { BandSelector } from '@/components/BandSelector';
import { Button } from '@/components/ui/Button';
import { Dropdown } from '@/components/ui/Dropdown';
import { Input } from '@/components/ui/Input';
import { spacing } from '@/constants/Layout';
import { useTheme } from '@/contexts/ThemeContext';
import { useCreateDevice } from '@/hooks/useDevices';
import type { DeviceType } from '@/types';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { View, StyleSheet, ScrollView, Alert, KeyboardAvoidingView, Platform } from 'react-native';

const AddDeviceScreen = () => {
  const { colors } = useTheme();
  const router = useRouter();
  const createDevice = useCreateDevice();

  const [name, setName] = useState('');
  const [type, setType] = useState<DeviceType>('VTX');
  const [selectedBandIds, setSelectedBandIds] = useState<number[]>([]);

  const [errors, setErrors] = useState<{
    name?: string;
    bands?: string;
  }>({});

  const validate = () => {
    const newErrors: typeof errors = {};

    if (!name.trim()) {
      newErrors.name = 'Device name is required';
    }

    if (selectedBandIds.length === 0) {
      newErrors.bands = 'Please select at least one band';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (!validate()) {
      return;
    }

    createDevice.mutate(
      {
        name: name.trim(),
        type,
        bandIds: selectedBandIds,
      },
      {
        onSuccess: () => {
          Alert.alert('Success', 'Device created successfully');
          router.back();
        },
        onError: (error) => {
          Alert.alert('Error', error.message || 'Failed to create device');
        },
      },
    );
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        style={[styles.container, { backgroundColor: colors.background }]}
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
      >
        <Input
          label="Device Name *"
          placeholder="e.g., TBS Unify Pro32"
          value={name}
          onChangeText={(text) => {
            setName(text);
            if (errors.name) setErrors({ ...errors, name: undefined });
          }}
          error={errors.name}
        />

        <Dropdown
          label="Device Type *"
          value={type}
          onChange={(value) => setType(value as DeviceType)}
          options={[
            { label: 'VTX (Transmitter)', value: 'VTX' },
            { label: 'VRX (Receiver)', value: 'VRX' },
          ]}
        />

        <BandSelector
          label="Supported Bands *"
          selectedBandIds={selectedBandIds}
          onChange={(ids) => {
            setSelectedBandIds(ids);
            if (errors.bands) setErrors({ ...errors, bands: undefined });
          }}
          error={errors.bands}
        />

        <View style={styles.buttonContainer}>
          <Button
            title="Cancel"
            onPress={() => router.back()}
            variant="secondary"
            style={styles.button}
          />
          <Button
            title={createDevice.isPending ? 'Creating...' : 'Create Device'}
            onPress={handleSave}
            disabled={createDevice.isPending}
            style={styles.button}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: spacing.lg,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: spacing.md,
    marginTop: spacing.xl,
  },
  button: {
    flex: 1,
  },
});

export default AddDeviceScreen;

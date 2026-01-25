import { useTheme } from '@/contexts/ThemeContext';
import { Stack } from 'expo-router';

const DevicesLayout = () => {
  const { colors } = useTheme();

  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.card,
        },
        headerTintColor: colors.text,
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: 'Devices',
        }}
      />
      <Stack.Screen
        name="add"
        options={{
          title: 'Add Device',
          presentation: 'modal',
        }}
      />
      <Stack.Screen
        name="[id]"
        options={{
          title: 'Edit Device',
        }}
      />
    </Stack>
  );
};

export default DevicesLayout;

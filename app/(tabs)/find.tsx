import { useTheme } from '@/contexts/ThemeContext';
import { View, Text, StyleSheet } from 'react-native';

const FindScreen = () => {
  const { colors } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.text, { color: colors.text }]}>Find Free Channel</Text>
      <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
        Coming soon: Analyze channels and find free frequencies to avoid interference
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    textAlign: 'center',
  },
});

export default FindScreen;

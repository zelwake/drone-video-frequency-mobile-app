/**
 * Barevné palety pro světlý a tmavý režim
 */
export const Colors = {
  light: {
    background: '#FFFFFF',
    card: '#F5F5F5',
    text: '#000000',
    textSecondary: '#666666',
    border: '#E0E0E0',
    primary: '#007AFF',
    primaryLight: '#E3F2FD',
    success: '#34C759',
    successLight: '#E8F5E9',
    warning: '#FF9500',
    warningLight: '#FFF3E0',
    error: '#FF3B30',
    errorLight: '#FFEBEE',
    disabled: '#C7C7CC',
  },
  dark: {
    background: '#000000',
    card: '#1C1C1E',
    text: '#FFFFFF',
    textSecondary: '#999999',
    border: '#38383A',
    primary: '#0A84FF',
    primaryLight: '#1E3A5F',
    success: '#30D158',
    successLight: '#1B3A26',
    warning: '#FF9F0A',
    warningLight: '#3D2F1A',
    error: '#FF453A',
    errorLight: '#3D1F1D',
    disabled: '#48484A',
  },
};

export type ColorScheme = 'light' | 'dark';
export type ThemeColors = typeof Colors.light;

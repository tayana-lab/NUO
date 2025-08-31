export interface ColorTheme {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  surface: string;
  text: string;
  textSecondary: string;
  border: string;
  success: string;
  error: string;
  warning: string;
}

export interface Theme {
  colors: ColorTheme;
  name: string;
}

export const themes: Record<string, Theme> = {
  default: {
    name: 'Professional Blue',
    colors: {
      primary: '#0066CC',
      secondary: '#00A86B',
      accent: '#FF6B35',
      background: '#FFFFFF',
      surface: '#F8FAFC',
      text: '#1E293B',
      textSecondary: '#64748B',
      border: '#E2E8F0',
      success: '#10B981',
      error: '#EF4444',
      warning: '#F59E0B',
    },
  },
  dark: {
    name: 'Dark Professional',
    colors: {
      primary: '#3B82F6',
      secondary: '#10B981',
      accent: '#F97316',
      background: '#0F172A',
      surface: '#1E293B',
      text: '#F1F5F9',
      textSecondary: '#94A3B8',
      border: '#334155',
      success: '#22C55E',
      error: '#EF4444',
      warning: '#F59E0B',
    },
  },
  green: {
    name: 'Wealth Green',
    colors: {
      primary: '#059669',
      secondary: '#0D9488',
      accent: '#DC2626',
      background: '#FFFFFF',
      surface: '#F0FDF4',
      text: '#064E3B',
      textSecondary: '#6B7280',
      border: '#BBF7D0',
      success: '#10B981',
      error: '#DC2626',
      warning: '#D97706',
    },
  },
  premium: {
    name: 'Premium Gold',
    colors: {
      primary: '#B45309',
      secondary: '#7C2D12',
      accent: '#DC2626',
      background: '#FFFBEB',
      surface: '#FEF3C7',
      text: '#92400E',
      textSecondary: '#A16207',
      border: '#FDE68A',
      success: '#059669',
      error: '#DC2626',
      warning: '#D97706',
    },
  },
};
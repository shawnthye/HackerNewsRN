import {StyleSheet} from 'react-native';

export const colors = {
  primary: '#a43d00',
  onPrimary: '#ffffff',

  secondary: '#77574a',
  onSecondary: '#ffffff',

  tertiary: '#675f30',
  onTertiary: '#ffffff',

  neutral: '#655c59',

  surface: '#fcfcfc',
  onSurface: '#201a18',

  surfaceVariant: '#f5ded5',
  onSurfaceVariant: '#53443d',
};

export const texts = StyleSheet.create({
  titleMedium: {
    color: colors.onSurface,
    lineHeight: 24,
    fontSize: 16,
    fontWeight: '500',
  },
  titleSmall: {
    color: colors.onSurface,
    lineHeight: 20,
    fontSize: 14,
    fontWeight: '500',
  },
  labelLarge: {
    color: colors.onSurface,
    lineHeight: 20,
    fontSize: 14,
    fontWeight: '500',
  },
  labelMedium: {
    color: colors.onSurface,
    lineHeight: 16,
    fontSize: 12,
    fontWeight: '500',
  },
  labelSmall: {
    color: colors.neutral,
    lineHeight: 15,
    fontSize: 11,
    fontWeight: '500',
  },
  bodyLarge: {
    color: colors.onSurface,
    lineHeight: 24,
    fontSize: 16,
    fontWeight: '400',
  },
  bodyMedium: {
    color: colors.onSurface,
    lineHeight: 20,
    fontSize: 14,
    fontWeight: '400',
  },
  bodySmall: {
    color: colors.onSurface,
    lineHeight: 16,
    fontSize: 12,
    fontWeight: '400',
  },
});

export const sizes = {
  contentHorizontalPadding: 16,
  contentVerticalPadding: 16,
};

import React from 'react';
import {StyleSheet, Text} from 'react-native';
import {RectButton, RectButtonProps} from 'react-native-gesture-handler';
import {colors, texts} from '../core-theme';

const styles = StyleSheet.create({
  textButton: {
    minHeight: 40,
    padding: 12,
    minWidth: 48,
  },
  text: {
    ...texts.labelLarge,
    color: colors.primary,
  },
});

interface TextButtonProps extends RectButtonProps {
  text: string;
}

const TextButton: React.FC<TextButtonProps> = ({style, text, ...props}) => {
  return (
    <RectButton {...props} style={[styles.textButton, style]}>
      <Text style={styles.text}>{text}</Text>
    </RectButton>
  );
};

export default TextButton;

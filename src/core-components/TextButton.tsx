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

const TextButton: React.FC<RectButtonProps> = ({style, ...props}) => {
  return (
    <RectButton {...props} style={[styles.textButton, style]}>
      <Text style={styles.text}>asd</Text>
    </RectButton>
  );
};

export default TextButton;

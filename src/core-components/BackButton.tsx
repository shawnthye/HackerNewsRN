import React from 'react';
import {StyleSheet} from 'react-native';
import {
  HeaderBackButton,
  HeaderBackButtonProps,
} from '@react-navigation/elements';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

const styles = StyleSheet.create({
  back: {
    marginStart: 0,
  },
});

const BackButton: React.FC<HeaderBackButtonProps> = ({style, ...props}) => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  return (
    <HeaderBackButton
      style={[styles.back, style]}
      onPress={() => navigation.goBack()}
      {...props}
    />
  );
};

export default BackButton;

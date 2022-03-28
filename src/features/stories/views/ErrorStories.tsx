import React from 'react';
import {StyleSheet, Text} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import TextButton from '../../../core-components/TextButton';

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  message: {
    fontSize: 21,
  },
  description: {
    fontSize: 14,
  },
});

const ErrorStories: React.FC<{refresh: () => void}> = ({refresh}) => {
  return (
    <SafeAreaView style={styles.root}>
      <Text style={styles.message}>Oops! Something went wrong.</Text>
      <TextButton
        text="RETRY"
        onPress={() => {
          refresh();
        }}
      />
    </SafeAreaView>
  );
};

export default ErrorStories;

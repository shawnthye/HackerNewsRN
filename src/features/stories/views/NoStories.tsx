import React from 'react';
import {StyleSheet, Text} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

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

const NoStories = () => {
  return (
    <SafeAreaView style={styles.root}>
      <Text style={styles.message}>No stories</Text>
      <Text style={styles.description}>Please try again later</Text>
    </SafeAreaView>
  );
};

export default NoStories;

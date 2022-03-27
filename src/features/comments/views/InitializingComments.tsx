import React from 'react';
import {StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import CircularProgress from '../../../core-components/CircularProgress';

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const InitializingComments = () => {
  return (
    <SafeAreaView style={styles.root}>
      <CircularProgress size={'large'} />
    </SafeAreaView>
  );
};

export default InitializingComments;

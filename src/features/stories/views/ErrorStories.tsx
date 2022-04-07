import React from 'react';
import {StyleSheet, Text} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import TextButton from '../../../@core-components/TextButton';
import {useAppSelector} from '../../../@core-store/hooks';
import {texts} from '../../../@core-theme';
import {selectState} from '../domain/stories-slice';

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    ...texts.titleLarge,
  },
  message: {
    ...texts.bodySmall,
  },
  description: {
    fontSize: 14,
  },
});

const ErrorStories: React.FC<{refresh: () => void}> = ({refresh}) => {
  const {errorMessage} = useAppSelector(selectState);

  return (
    <SafeAreaView style={styles.root}>
      <Text style={styles.title}>Oops!</Text>
      <Text style={styles.message}>{errorMessage}</Text>
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

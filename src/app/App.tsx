/**
 * @format
 */
import React from 'react';
import {StyleSheet} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import {Provider} from 'react-redux';
import store from '../core-store/store';
import Navigation from './Navigation';

const styles = StyleSheet.create({
  gesture: {
    flex: 1,
  },
  statusBarTop: {
    backgroundColor: 'rgba(255,255,255,.60)',
    position: 'absolute',
    width: '100%',
    top: 0,
    start: 0,
    end: 0,
  },
  statusBarBottom: {
    backgroundColor: 'rgba(255,255,255,.60)',
    position: 'absolute',
    width: '100%',
    bottom: 0,
    start: 0,
    end: 0,
  },
  statusBarStart: {
    backgroundColor: 'rgba(255,255,255,0.60)',
    position: 'absolute',
    height: '100%',
    start: 0,
    top: 0,
    bottom: 0,
  },
  statusBarEnd: {
    backgroundColor: 'rgba(255,255,255,0.60)',
    position: 'absolute',
    height: '100%',
    end: 0,
    top: 0,
    bottom: 0,
  },
});

const App = () => {
  return (
    <Provider store={store}>
      <GestureHandlerRootView style={styles.gesture}>
        <SafeAreaProvider>
          <Navigation />
          <SafeAreaView style={styles.statusBarTop} edges={['top']} />
          <SafeAreaView style={styles.statusBarBottom} edges={['bottom']} />
          <SafeAreaView style={styles.statusBarStart} edges={['left']} />
          <SafeAreaView style={styles.statusBarEnd} edges={['right']} />
        </SafeAreaProvider>
      </GestureHandlerRootView>
    </Provider>
  );
};

export default App;

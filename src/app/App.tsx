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

const STATUS_BAR_COLOR = 'rgba(255,255,255,.60)';

const styles = StyleSheet.create({
  gesture: {
    flex: 1,
  },
  statusBar: {
    backgroundColor: STATUS_BAR_COLOR,
    position: 'absolute',
  },
  statusBarTop: {
    width: '100%',
    top: 0,
    start: 0,
    end: 0,
  },
  statusBarBottom: {
    width: '100%',
    bottom: 0,
    start: 0,
    end: 0,
  },
  statusBarStart: {
    height: '100%',
    start: 0,
    top: 0,
    bottom: 0,
  },
  statusBarEnd: {
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
          <SafeAreaView
            style={[styles.statusBar, styles.statusBarTop]}
            edges={['top']}
          />

          {/**
           * TODO: remove the bottom bar from Android API level < 23,
           * because the we fallback the dark color on lower api version
           */}
          <SafeAreaView
            style={[styles.statusBar, styles.statusBarBottom]}
            edges={['bottom']}
          />
          <SafeAreaView
            style={[styles.statusBar, styles.statusBarStart]}
            edges={['left']}
          />
          <SafeAreaView
            style={[styles.statusBar, styles.statusBarEnd]}
            edges={['right']}
          />
        </SafeAreaProvider>
      </GestureHandlerRootView>
    </Provider>
  );
};

export default App;

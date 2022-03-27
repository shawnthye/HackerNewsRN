/**
 * @format
 */
import React from 'react';
import 'react-native';
import {NavigationContainer} from '@react-navigation/native';
// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
import BackButton from './BackButton';

beforeEach(() => {
  jest.useFakeTimers();
});

afterEach(() => {
  jest.useRealTimers();
});

it('renders correctly', () => {
  renderer.create(
    <NavigationContainer>
      <BackButton />
    </NavigationContainer>,
  );
});

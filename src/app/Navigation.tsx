import React from 'react';
import {
  DefaultTheme,
  NavigationContainer,
  Theme,
} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import BackButton from '../core-components/BackButton';
import {colors} from '../core-theme';
import Comments from '../features/comments/views/Comments';
import Stories from '../features/stories/views/Stories';
import StoryHtml from '../features/stories/views/StoryHtml';

const theme: Theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#FFFFFF',
  },
};

const Stack = createNativeStackNavigator<StackParamList>();

const Navigator = () => {
  return (
    <Stack.Navigator
      initialRouteName={'Stories'}
      screenOptions={{
        headerShown: true,
        animation: 'none',
        headerTintColor: colors.onSurface,
        headerLeft: props => <BackButton {...props} />,
      }}>
      <Stack.Screen
        name={'Stories'}
        component={Stories}
        options={{headerShown: false}}
      />
      <Stack.Screen name={'StoryHtml'} component={StoryHtml} />
      <Stack.Screen
        name={'Comments'}
        component={Comments}
        options={{
          title: '',
        }}
      />
    </Stack.Navigator>
  );
};

const Navigation = () => {
  return (
    <NavigationContainer theme={theme}>
      <Navigator />
    </NavigationContainer>
  );
};

export default Navigation;

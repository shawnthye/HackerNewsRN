import React from 'react';
import {
  DefaultTheme,
  NavigationContainer,
  Theme,
} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Comments from '../features/comments/Comments';
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

const Navigation = () => {
  return (
    <NavigationContainer theme={theme}>
      <Stack.Navigator
        initialRouteName={'Stories'}
        screenOptions={{
          headerShown: false,
          animation: 'none',
        }}>
        <Stack.Screen name={'Stories'} component={Stories} />
        <Stack.Screen name={'StoryHtml'} component={StoryHtml} />
        <Stack.Screen name={'Comments'} component={Comments} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;

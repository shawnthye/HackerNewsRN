import React from 'react';
import {Pressable, PressableProps} from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

const ScalablePressable: React.FC<PressableProps> = ({children, ...rest}) => {
  const scale = useSharedValue(100);
  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [{scale: scale.value / 100}],
    };
  });

  const props = {
    ...rest,
    /**
     * we do this here to bypass TS error, it worked, but TS missing defination
     * @see https://reactnative.dev/docs/pressable#unstable_pressdelay
     */
    unstable_pressDelay: 300,
  };

  return (
    <Pressable
      {...props}
      android_ripple={{
        foreground: true,
      }}
      onResponderStart={() => {
        scale.value = withTiming(96, {duration: 80, easing: Easing.quad});
      }}
      onResponderEnd={() => {
        scale.value = withSpring(100, {overshootClamping: true, mass: 0.5});
      }}>
      <Animated.View style={animatedStyles} children={children} />
    </Pressable>
  );
};

export default ScalablePressable;

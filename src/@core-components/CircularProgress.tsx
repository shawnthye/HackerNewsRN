import React from 'react';
import {ActivityIndicator, ActivityIndicatorProps} from 'react-native';
import {colors} from '../@core-theme';

const CircularProgress: React.FC<ActivityIndicatorProps> = props => {
  const internalProps: ActivityIndicatorProps = {
    color: colors.primary, // default to theme color, but still allow to override with props
    ...props,
  };

  return <ActivityIndicator {...internalProps} />;
};

export default CircularProgress;

import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const Comments = () => (
  <View style={styles.screen}>
    <Text>Comments Screen</Text>
  </View>
);

export default Comments;

const styles = StyleSheet.create({
  screen: {flex: 1, alignItems: 'center', justifyContent: 'center'},
});

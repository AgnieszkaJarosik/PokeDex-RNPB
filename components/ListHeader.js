import React from 'react';
import {View, TextInput} from 'react-native';

export const ListHeader = props => {
  return (
    <View style={styles.container}>
      <TextInput placeholder="search" onChangeText={props.onChange} style={styles.input}/>
    </View>
  );
};

const styles = {
  container: {
    backgroundColor: 'rgba(53, 253, 203, 0.8)',
  },
  input: {
    backgroundColor: 'rgba(0,0,0,0.15)',
    borderRadius: 18,
    color: 'white',
  },
};

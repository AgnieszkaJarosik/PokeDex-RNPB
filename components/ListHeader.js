import React from 'react';
import {View, TextInput, StyleSheet} from 'react-native';

const ListHeader = (props) => {
  return (
    <View>
      <TextInput
        style={styles.inputStyle}
        placeholder="Search"
        onChangeText={props.onChangeText}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  inputStyle: {
    borderBottomColor: 'black',
    borderBottomWidth: 1,
  }
})

export default ListHeader;

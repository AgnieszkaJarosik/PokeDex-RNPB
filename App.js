
import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Platform,
  FlatList,
  TouchableOpacity
} from 'react-native';
import { fetchPokemonList } from './apiService';

const App = () => {
  const [data, setData] = useState([])
  const barStyle = Platform.OS === 'ios' ? 'default' : 'light-content';

  useEffect(()=>{
    (async()=>{
      const response = await fetchPokemonList();
      setData(response.results);
    })();
  },[]);

  return (
    <>
      <StatusBar barStyle={barStyle} backgroundColor="black" />
      <SafeAreaView style={styles.appContainer}>
        <View style={styles.container}>
          {/* <Text style={styles.text}>Hello World</Text> */}
          <FlatList  
             data={data}
             renderItem={({ item, index }) => (
              <TouchableOpacity
                style={styles.button}
                onPress={()=>console.log(item)}
                key={Date.now()+index} >
                <Text style={styles.text}>{item.name}</Text>
              </TouchableOpacity> 
             )}
           />
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  appContainer: {
    backgroundColor: 'white',
    flex: 1
  },
  container: {
    backgroundColor: '#eee',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  text: {
    fontSize: 20,
    fontWeight: "100"
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    padding: 8,
  }
});

export default App;

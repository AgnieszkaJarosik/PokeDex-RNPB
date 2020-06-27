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
import AsyncStorage from '@react-native-community/async-storage';
import { fetchPokemonList } from './apiService';
import ListHeader from './components/ListHeader';

const App = () => {
  const [data, setData] = useState([])
  const barStyle = Platform.OS === 'ios' ? 'default' : 'light-content';

  const PokeList = '@poke_List';

  const storeData = async (value) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(PokeList, jsonValue);
    } catch (e) {
      console.error('saving error ', e);
    }
  }


  const getData = async (key) => {
    try {
      const jsonValue = await AsyncStorage.getItem(key);
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      console.error('reading error ', e);
    }
  }

  const filterPokemons = async text => {
    const pokemons = await getData(PokeList);
    if (text) {
      const filteredList = pokemons.filter( pokemon => pokemon.name.toLowerCase().includes(text.toLowerCase()) );
      setData(filteredList);
    } else {
      setData(pokemons);
    }
  }


  useEffect(() => {
    (async () => {
      const pokemons = await getData(PokeList);
      if (pokemons === null) {
        const response = await fetchPokemonList();
        setData(response.results);
        await storeData(response.results);
      } else {
        setData(pokemons);
      }
    })();
  },[]);

  return (
    <>
      <StatusBar barStyle={barStyle} backgroundColor="black" />
      <SafeAreaView style={styles.appContainer}>
        <View style={styles.container}>
          {/* <Text style={styles.text}>Hello World</Text> */}
          <FlatList
            ListHeaderComponent={
              <ListHeader onChangeText={(text)=> filterPokemons(text)} />
            }
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

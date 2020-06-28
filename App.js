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
import { useDebounce } from './hooks/useDebounce';

const App = () => {
  const [data, setData] = useState([]);
  const [term, setTerm] = useState('');
  const [refreshing, setRefreshing] = useState(false);

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

  const refreshPokeList = async () => {
    setRefreshing(true);
    const response = await fetchPokemonList();
    await storeData(response.results);
    setData(response.results);
    setTerm('');
    setRefreshing(false);
  }

  const debouncedSearchTerm = useDebounce(term, 250);

  const filterPokemons = (list, text) =>
    list.filter( item => item.name.toLowerCase().includes(text.toLowerCase()) );

  useEffect(() => {
    (async () => {
      const pokemons = await getData(PokeList);
      if(debouncedSearchTerm){
        const filteredList = filterPokemons(pokemons, debouncedSearchTerm);
        setData(filteredList);
      } else {
        setData(pokemons);
      }
    })();
  }, [debouncedSearchTerm]);

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
          <FlatList
            onRefresh={refreshPokeList}
            refreshing={refreshing}
            scrollEnabled={!refreshing}
            ListHeaderComponent={
              <ListHeader onChangeText={(text)=> setTerm(text)} />
            }
            keyExtractor={(item, index) => item.name + index}
            data={data}
            renderItem={({ item, index }) => (
              <TouchableOpacity
                onPress={() => Alert.alert(item.name, item.url)}
                style={[styles.button, refreshing && styles.isDisabled]}
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
  },
  isDisabled: {
    backgroundColor: 'gray',
  }

});

export default App;

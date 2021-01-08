import React, {useState} from 'react';
import {TextInput, Button, Card} from 'react-native-paper';
import {View, Text, FlatList} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Header from './Header';

const Search = ({navigation}) => {
  const [city, setCity] = useState('');
  const [cities, setCities] = useState([]);
  const fetchCities = (text) => {
    setCity(text);
    fetch(
      'https://api.weather.com/v3/location/search?apiKey=6532d6454b8aa370768e63d6ba5a832e&language=en-US&query=' +
        text +
        '&locationType=city&format=json',
    )
      .then((item) => item.json())
      .then((cityData) => {
        setCities(cityData.location.address.slice(0, 9));
      });
  };

  const btnClick = async () => {
    await AsyncStorage.setItem('newCity', city);
    navigation.navigate('home', {city: city});
  };

  const listClick = async (cityName) => {
    setCity(cityName);
    await AsyncStorage.setItem('newCity', cityName);
    navigation.navigate('home', {city: cityName});
  };

  return (
    <View style={{flex: 1}}>
      <Header name="Search Screen" />
      <TextInput
        label="city name"
        theme={{colors: {primary: '#00aaff'}}}
        value={city}
        onChangeText={(text) => fetchCities(text)}
      />

      <Button
        icon="content-save"
        mode="contained"
        onPress={() => btnClick()}
        theme={{colors: {primary: '#00aaff'}}}
        style={{margin: 20}}>
        <Text style={{color: 'white'}}>Press me</Text>
      </Button>
      <FlatList
        data={cities}
        renderItem={({item}) => {
          return (
            <Card
              onPress={() => listClick(item)}
              style={{margin: 2, padding: 12}}>
              <Text>{item}</Text>
            </Card>
          );
        }}
        keyExtractor={(item) => item}
      />
    </View>
  );
};

export default Search;

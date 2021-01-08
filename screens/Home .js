import React, {useEffect, useState} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {Card, Title} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Header from './Header';

const Home = (props) => {
  const [info, setInfo] = useState({
    name: 'loading',
    temp: 'loading',
    humidity: 'loading',
    desc: 'loading',
    icon: 'loading',
  });

  useEffect(() => {
    getWeather();
  }, []);

  const getWeather = async () => {
    let myCity = await AsyncStorage.getItem('newCity');
    if (!myCity) {
      const {city} = props.route.params;
      myCity = city;
    }

    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${myCity}&APPID=1e5d18515761dbcb4941a25907b98062&units=metric`,
    )
      .then((res) => res.json())
      .then((data) => {
        setInfo({
          name: data.name,
          temp: data.main.temp,
          humidity: data.main.humidity,
          desc: data.weather[0].description,
          icon: data.weather[0].icon,
        });
      })
      .catch((err) => alert(err.message));
  };

  if (props.route.params.city != 'london') {
    getWeather();
  }

  return (
    <View style={{flex: 1}}>
      <Header name="Weather App" />
      <View style={{alignItems: 'center'}}>
        <Title style={{color: '#00aaff', marginTop: 30, fontSize: 30}}>
          {info.name}
        </Title>
        <Image
          style={{width: 120, height: 120}}
          source={{uri: `https://openweathermap.org/img/w/${info.icon}.png`}}
        />
      </View>

      <Card style={{margin: 5, padding: 12}}>
        <Title style={{color: '#00aaff'}}>Temperature - {info.temp} </Title>
      </Card>
      <Card style={{margin: 5, padding: 12}}>
        <Title style={{color: '#00aaff'}}>Humidity - {info.humidity} </Title>
      </Card>
      <Card style={{margin: 5, padding: 12}}>
        <Title style={{color: '#00aaff'}}>Description - {info.desc} </Title>
      </Card>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({});

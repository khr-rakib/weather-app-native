import React from 'react';
import {StyleSheet, Text} from 'react-native';
import Home from './screens/Home ';
import Search from './screens/Search';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Tab = createBottomTabNavigator();

const App = () => {
  return (
    <>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({route}) => ({
            tabBarIcon: ({color}) => {
              let iconName;
              if (route.name === 'home') {
                iconName = 'home-city-outline';
              } else if (route.name === 'search') {
                iconName = 'city';
              }
              return (
                <MaterialCommunityIcons
                  name={iconName}
                  size={25}
                  color={color}
                />
              );
            },
          })}
          tabBarOptions={{
            activeTintColor: 'white',
            inactiveTintColor: 'gray',
            activeBackgroundColor: '#00aaff',
          }}>
          <Tab.Screen
            name="home"
            component={Home}
            initialParams={{city: 'london'}}
          />
          <Tab.Screen name="search" component={Search} />
        </Tab.Navigator>
      </NavigationContainer>
      {/* <Search /> */}
    </>
  );
};

const styles = StyleSheet.create({});

export default App;

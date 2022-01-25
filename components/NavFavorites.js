import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';
import React from 'react';
import { Icon } from 'react-native-elements';
import tw from 'tailwind-react-native-classnames';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectDestination,
  selectOrigin,
  setDestination,
} from '../slices/navSlice';
import { useNavigation } from '@react-navigation/native';

const NavFavorites = () => {
  const data = [
    {
      id: '1',
      icon: 'home',
      location: 'Home',
      destination: '22277 Mulholland Hwy, Calabasas, CA 91302',
      display: '22277 Mulholland Hwy, Calabasas, CA',
      coordinate: {
        lat: 34.1481372,
        lng: -118.6133349,
      },
    },
    {
      id: '2',
      icon: 'briefcase',
      location: 'Work',
      destination: '1221 2nd St, Santa Monica, CA 90401',
      display: '1221 2nd St, Santa Monica, CA',
      coordinate: {
        lat: 34.0172386,
        lng: -118.4993122,
      },
    },
  ];

  const dispatch = useDispatch();
  const origin = useSelector(selectOrigin);
  const navigation = useNavigation();
  const theme = useColorScheme();

  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id}
      ItemSeparatorComponent={() => (
        <View
          style={[
            tw`${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'}`,
            { height: 0.5 },
          ]}
        />
      )}
      renderItem={({ item }) => (
        <TouchableOpacity
          onPress={() => {
            dispatch(
              setDestination({
                location: item.coordinate,
                description: item.destination,
              })
            );
            navigation.navigate('MapScreen', { screen: 'RideOptionsCard' });
          }}
          disabled={!origin}
          style={tw`flex-row items-center pr-5 py-5 ${
            theme === 'dark' && 'bg-black'
          } ${!origin && 'opacity-20'}`}
        >
          <Icon
            style={tw`mr-4 rounded-full bg-gray-500 p-3`}
            name={item.icon}
            type='ionicon'
            color={theme === 'dark' ? 'black' : 'white'}
            size={18}
          />
          <View>
            <Text
              style={tw`font-semibold text-lg ${
                theme === 'dark' && 'text-white'
              }`}
            >
              {item.location}
            </Text>
            <Text
              style={tw`${
                theme === 'dark' ? 'text-gray-300' : 'text-gray-500'
              }`}
            >
              {item.display}
            </Text>
          </View>
        </TouchableOpacity>
      )}
    />
  );
};

export default NavFavorites;

const styles = StyleSheet.create({});

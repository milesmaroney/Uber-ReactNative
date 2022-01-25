import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  useColorScheme,
} from 'react-native';
import React from 'react';
import tw from 'tailwind-react-native-classnames';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { GOOGLE_MAPS_APIKEY } from '@env';
import { useDispatch } from 'react-redux';
import { setDestination } from '../slices/navSlice';
import { useNavigation } from '@react-navigation/native';
import NavFavorites from './NavFavorites';
import { Icon } from 'react-native-elements';

const NavigateCard = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const theme = useColorScheme();

  return (
    <SafeAreaView style={tw`flex-1 ${theme === 'dark' && 'bg-black'}`}>
      <Text
        style={tw`text-center text-xl py-5 ${theme === 'dark' && 'text-white'}`}
      >
        Good Morning, Miles
      </Text>
      <View
        style={tw`border-t ${
          theme === 'dark' ? 'border-gray-600' : 'border-gray-200'
        } flex-shrink px-4 pt-4`}
      >
        <View>
          <GooglePlacesAutocomplete
            styles={{
              container: { flex: 0 },
              textInput: {
                fontSize: 18,
                color: theme === 'dark' ? 'white' : 'black',
                backgroundColor: theme === 'dark' ? '#374151' : '#d1d5db',
              },
            }}
            placeholder='Where To?'
            fetchDetails={true}
            enablePoweredByContainer={false}
            minLength={2}
            onPress={(data, details = null) => {
              dispatch(
                setDestination({
                  location: details.geometry.location,
                  description: data.description,
                })
              );
              navigation.navigate('RideOptionsCard');
            }}
            query={{
              key: GOOGLE_MAPS_APIKEY,
              language: 'en',
            }}
            debounce={400}
            nearbyPlacesAPI='GooglePlacesSearch'
          />
        </View>
        <NavFavorites />
      </View>
      <View
        style={tw`flex-row justify-evenly py-2 mt-auto border-t ${
          theme === 'dark' ? 'border-gray-600' : 'border-gray-200'
        }`}
      >
        <TouchableOpacity
          onPress={() => navigation.navigate('RideOptionsCard')}
          style={tw`flex flex-row justify-between ${
            theme === 'dark' ? 'bg-white' : 'bg-black'
          } w-24 px-4 py-3 rounded-full`}
        >
          <Icon
            name='car'
            type='font-awesome'
            color={theme === 'dark' ? 'black' : 'white'}
            size={16}
          />
          <Text style={tw`${theme === 'light' && 'text-white'} text-center`}>
            Rides
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('FoodOptionsCard')}
          style={tw`flex flex-row justify-between ${
            theme === 'dark' ? 'bg-white' : 'bg-black'
          } w-24 px-4 py-3 rounded-full`}
        >
          <Icon
            name='fast-food-outline'
            type='ionicon'
            color={theme === 'dark' ? 'black' : 'white'}
            size={16}
          />
          <Text
            style={tw`${theme === 'light' && 'text-white'} text-center pl-3`}
          >
            Eats
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default NavigateCard;

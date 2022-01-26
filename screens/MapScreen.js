import { View, Text, useColorScheme } from 'react-native';
import React from 'react';
import tw from 'tailwind-react-native-classnames';
import Map from '../components/Map';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import NavigateCard from '../components/NavigateCard';
import RideOptionsCard from '../components/RideOptionsCard';
import { TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import FoodOptionsCard from '../components/FoodOptionsCard';
import { useDispatch } from 'react-redux';
import { setDestination } from '../slices/navSlice';

const MapScreen = () => {
  const Stack = createNativeStackNavigator();
  const navigation = useNavigation();
  const theme = useColorScheme();
  const dispatch = useDispatch();

  return (
    <View>
      <TouchableOpacity
        style={tw`${
          theme === 'dark' ? 'bg-gray-500' : 'bg-gray-100'
        } absolute top-16 left-8 z-10 p-3 rounded-full`}
        onPress={() => {
          dispatch(setDestination(null));
          navigation.navigate('HomeScreen');
        }}
      >
        <Icon name='menu' color={theme === 'dark' ? 'white' : 'black'} />
      </TouchableOpacity>
      <View style={tw`h-1/2`}>
        <Map />
      </View>
      <View style={tw`h-1/2`}>
        <Stack.Navigator>
          <Stack.Screen
            name='NavigateCard'
            component={NavigateCard}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name='RideOptionsCard'
            component={RideOptionsCard}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name='FoodOptionsCard'
            component={FoodOptionsCard}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </View>
    </View>
  );
};

export default MapScreen;

import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';
import React from 'react';
import tw from 'tailwind-react-native-classnames';
import { Icon } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { selectOrigin } from '../slices/navSlice';
import UberX from '../assets/UberXCrop.png';
import Food from '../assets/food.png';
import Package from '../assets/Package.png';
import ParkingIcon from '../assets/ParkingIcon.png';

const data = [
  {
    id: '1',
    title: 'Ride',
    image: UberX,
    screen: 'MapScreen',
  },
  {
    id: '2',
    title: 'Food',
    image: Food,
    screen: 'FoodScreen',
  },
  {
    id: '3',
    title: 'Package',
    image: Package,
    screen: 'ShippingScreen',
  },
  {
    id: '4',
    title: 'Parking',
    image: ParkingIcon,
    screen: 'ParkingScreen',
  },
];

const NavOptions = () => {
  const navigation = useNavigation();
  const origin = useSelector(selectOrigin);
  const theme = useColorScheme();

  const navElements = data.map((item, i) => (
    <TouchableOpacity
      onPress={() => navigation.navigate(item.screen)}
      disabled={!origin}
      key={i}
    >
      <View style={tw`${!origin && 'opacity-20'}`}>
        <View
          style={tw`${
            theme === 'light' ? 'bg-gray-300' : 'bg-gray-700'
          } rounded-lg p-2`}
        >
          <Image
            source={item.image}
            style={{ width: 60, height: 40, resizeMode: 'contain' }}
          />
        </View>
        <Text
          style={tw`mt-2 pb-2 font-semibold text-center ${
            theme === 'dark' && 'text-white'
          }`}
        >
          {item.title}
        </Text>
      </View>
    </TouchableOpacity>
  ));

  return (
    <>
      {!origin && (
        <Text
          style={tw`text-center font-bold mb-2 ${
            theme === 'dark' && 'text-white'
          }`}
        >
          Please choose your location
        </Text>
      )}
      <View style={tw`flex flex-row justify-between pt-4`}>{navElements}</View>
    </>
  );
};

export default NavOptions;

const styles = StyleSheet.create({});

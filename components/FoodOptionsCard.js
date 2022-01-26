import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  Image,
  useColorScheme,
} from 'react-native';
import React from 'react';
import tw from 'tailwind-react-native-classnames';
import { Icon } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { selectTravelTimeInformation } from '../slices/navSlice';

const data = [
  {
    id: '1',
    title: 'Walk',
    multiplier: 0,
    time: 7,
    image: 'https://i.imgur.com/fcxSJvJ.png',
  },
  {
    id: '2',
    title: 'Premium',
    multiplier: 1.2,
    time: 1.5,
    image:
      'https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,w_485,h_385/f_auto,q_auto/products/carousel/UberX.png',
  },
  {
    id: '3',
    title: 'Diamond',
    multiplier: 2.5,
    time: 1,
    image:
      'https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,w_485,h_385/f_auto,q_auto/products/carousel/Lux.png',
  },
];

const FoodOptionsCard = () => {
  const navigation = useNavigation();
  const [active, setActive] = React.useState(null);
  const travelTimeInformation = useSelector(selectTravelTimeInformation);
  const theme = useColorScheme();

  const surgeChargeRate = 1.5;

  return (
    <SafeAreaView
      style={tw`${theme === 'dark' ? 'bg-black' : 'bg-white'} flex-grow`}
    >
      <View>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('NavigateCard');
          }}
          style={[tw`absolute top-3 left-5 p-3 rounded-full`, { zIndex: 1 }]}
        >
          <Icon
            name='chevron-left'
            type='fontawesome'
            color={theme === 'dark' ? 'white' : 'black'}
          />
        </TouchableOpacity>
        <Text
          style={tw`text-center py-5 text-xl ${
            theme === 'dark' && 'text-white'
          }`}
        >
          Start Navigation
          {travelTimeInformation &&
            ` - ${travelTimeInformation?.distance?.text}`}
        </Text>
      </View>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => setActive(item)}
            style={tw`flex-row items-center justify-between px-10 ${
              item.id === active?.id &&
              (theme === 'dark' ? 'bg-gray-700' : 'bg-gray-300')
            }`}
          >
            <Image
              source={{ uri: item.image }}
              style={{ width: 80, height: 80, resizeMode: 'contain' }}
            />
            <View style={tw`ml-4 mr-auto`}>
              <Text
                style={tw`font-semibold text-xl ${
                  theme === 'dark' && 'text-white'
                }`}
              >
                {item.title}
              </Text>
              <Text style={tw`${theme === 'dark' && 'text-white'}`}>
                {travelTimeInformation?.duration?.text.split(' ')[0] *
                  item.time}{' '}
                minutes
              </Text>
            </View>
            <Text style={tw`text-xl ${theme === 'dark' && 'text-white'}`}>
              {new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
                currencyDisplay: 'narrowSymbol',
              }).format(
                (travelTimeInformation?.duration?.value * item.multiplier) / 100
              )}
            </Text>
          </TouchableOpacity>
        )}
      />
      <View>
        <TouchableOpacity
          style={tw`bg-black py-3 m-3 rounded ${
            !active && theme === 'dark' ? 'bg-gray-700' : 'bg-gray-300'
          }`}
          disabled={!active}
        >
          <Text style={tw`text-center text-xl`}>
            {active ? `Select ${active.title}` : 'Pick an Option'}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default FoodOptionsCard;

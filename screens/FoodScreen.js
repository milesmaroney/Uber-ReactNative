import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  Image,
} from 'react-native';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectOrigin, setDestination } from '../slices/navSlice';
import { GOOGLE_MAPS_APIKEY } from '@env';
import tw from 'tailwind-react-native-classnames';
import { Icon } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';

const FoodScreen = () => {
  const origin = useSelector(selectOrigin);
  const [nearby, setNearby] = React.useState([]);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const foodLinks = [
    'https://d1ralsognjng37.cloudfront.net/b612983b-81ed-48ba-b44d-770c6634ba05.jpeg',
    'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/delish-chickfila-1570879550.jpg',
    'https://cdn2.howtostartanllc.com/images/business-ideas/business-idea-images/fast-food.jpg',
    'https://www.mashed.com/img/gallery/this-is-the-most-nutritious-fast-food-pizza-you-can-buy/l-intro-1626224309.jpg',
    'https://cdn2.lamag.com/wp-content/uploads/sites/6/2018/10/best-ayce-sushi-los-angeles-county-Nattapol-Poonpiriya-EyeEm-getty-images-1-1068x712.jpg',
    'https://hips.hearstapps.com/hmg-prod/images/delish-bucatinipasta-028-ls-1607552701.jpg',
  ];

  React.useEffect(() => {
    function fetchNearbyFood() {
      fetch(
        `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${origin.location.lat},${origin.location.lng}&radius=5000&type=restaurant&keyword=cruise&key=${GOOGLE_MAPS_APIKEY}`
      )
        .then((res) => res.json())
        .then((data) => {
          setNearby(data.results);
        });
    }

    fetchNearbyFood();
  }, [origin]);
  return (
    <SafeAreaView style={tw``}>
      <View style={tw`p-4`}>
        <Text>Deliver now</Text>
        <View style={tw`flex flex-row`}>
          <Text style={tw`font-semibold`}>
            {origin.description.split(',')[0]}
          </Text>
        </View>
      </View>
      <FlatList
        data={nearby}
        keyExtractor={(item) => item.place_id}
        style={tw`mb-16`}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={tw`px-4 pb-4`}
            onPress={() => {
              dispatch(
                setDestination({
                  location: item.geometry.location,
                  description: item.name,
                })
              );
              navigation.navigate('MapScreen');
            }}
          >
            <View style={tw`h-40 overflow-hidden`}>
              <Image
                source={{
                  uri: foodLinks[Math.floor(Math.random() * foodLinks.length)],
                }}
                style={{ width: 400, height: 160, resizeMode: 'cover' }}
              />
            </View>
            <View style={tw`flex flex-row items-center pt-1`}>
              <Text style={tw`text-lg font-bold`}>{item.name}</Text>
              <View
                style={tw`ml-auto h-6 w-6 flex justify-center items-center rounded-full bg-gray-300`}
              >
                <Text style={tw`text-xs`}>{item.rating}</Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
};

export default FoodScreen;

import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import React from 'react';
import tw from 'tailwind-react-native-classnames';
import UberLogo from '../assets/uberlogo.png';
import UberLogoWhite from '../assets/uberlogowhite.png';
import mapperLogo from '../assets/mapperlogo.png';
import mapperLogoWhite from '../assets/mapperlogowhite.png';
import NavOptions from '../components/NavOptions';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { GOOGLE_MAPS_APIKEY } from '@env';
import { useDispatch } from 'react-redux';
import { setOrigin, setDestination } from '../slices/navSlice';
import NavFavorites from '../components/NavFavorites';

const HomeScreen = () => {
  const dispatch = useDispatch();
  const theme = useColorScheme();

  const darkTheme = tw`h-full bg-black text-white`;
  const lightTheme = tw`h-full bg-white text-black`;

  return (
    <SafeAreaView style={theme === 'dark' ? darkTheme : lightTheme}>
      <View style={tw`p-5`}>
        <Image
          style={{ width: 100, height: 100, resizeMode: 'contain' }}
          source={theme === 'dark' ? mapperLogoWhite : mapperLogo}
        />

        <GooglePlacesAutocomplete
          placeholder='Where Are You?'
          styles={{
            container: { flex: 0 },
            textInput: {
              fontSize: 18,
              color: theme === 'dark' ? 'white' : 'black',
              backgroundColor: theme === 'dark' ? '#374151' : '#d1d5db',
            },
            row: {
              backgroundColor: theme === 'dark' ? '#374151' : '#d1d5db',
            },
          }}
          onPress={(data, details = null) => {
            dispatch(
              setOrigin({
                location: details.geometry.location,
                description: data.description,
              })
            );
            dispatch(setDestination(null));
          }}
          returnKeyType={'search'}
          fetchDetails={true}
          query={{
            key: GOOGLE_MAPS_APIKEY,
            language: 'en',
          }}
          enablePoweredByContainer={false}
          minLength={2}
          nearbyPlacesAPI='GooglePlacesSearch'
          debounce={400}
        />

        <NavOptions />
        <NavFavorites />
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  text: {
    color: 'blue',
  },
});

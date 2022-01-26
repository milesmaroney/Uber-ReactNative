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
  selectHome,
  selectOrigin,
  selectWork,
  setDestination,
  setHome,
  setWork,
} from '../slices/navSlice';
import { useNavigation } from '@react-navigation/native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { GOOGLE_MAPS_APIKEY } from '@env';

const NavFavorites = () => {
  const [showHomeEditor, setShowHomeEditor] = React.useState(false);
  const [showWorkEditor, setShowWorkEditor] = React.useState(false);
  const [showDelHome, setShowDelHome] = React.useState(false);
  const [showDelWork, setShowDelWork] = React.useState(false);

  const dispatch = useDispatch();
  const origin = useSelector(selectOrigin);
  const home = useSelector(selectHome);
  const work = useSelector(selectWork);
  const navigation = useNavigation();
  const theme = useColorScheme();

  return (
    <View>
      {!home && (
        <>
          <TouchableOpacity
            style={tw`flex-row items-center pr-5 py-5 ${
              theme === 'dark' && 'bg-black'
            }`}
            onPress={() => setShowHomeEditor((x) => !x)}
          >
            <Icon
              style={tw`mr-4`}
              name={showHomeEditor ? 'minus-circle' : 'plus-circle'}
              type='font-awesome'
              color={theme === 'dark' ? 'white' : 'black'}
              size={45}
            />
            <View>
              <Text
                style={tw`font-semibold text-lg ${
                  theme === 'dark' && 'text-white'
                }`}
              >
                {showHomeEditor ? 'Cancel' : 'Set Home Location'}
              </Text>
            </View>
          </TouchableOpacity>
          {showHomeEditor && (
            <GooglePlacesAutocomplete
              placeholder='Set Home Location'
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
                  setHome({
                    location: details.geometry.location,
                    description: data.description,
                  })
                );
                setShowHomeEditor(false);
              }}
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
          )}
        </>
      )}
      {home && (
        <>
          <TouchableOpacity
            onPress={() => {
              setShowDelHome(false);
              dispatch(
                setDestination({
                  location: home.location,
                  description: home.description,
                })
              );
              navigation.navigate('MapScreen', { screen: 'RideOptionsCard' });
            }}
            onLongPress={() => setShowDelHome((x) => !x)}
            disabled={!origin}
            style={tw`flex-row items-center pr-5 py-5 ${
              theme === 'dark' && 'bg-black'
            } ${!origin && 'opacity-20'}`}
          >
            <Icon
              style={tw`mr-4 rounded-full bg-gray-500 p-3`}
              name='home'
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
                Home
              </Text>
              <Text
                style={tw`${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-500'
                }`}
              >
                {home.description.split(',')[0]}
              </Text>
            </View>
            {showDelHome && (
              <TouchableOpacity
                onPress={() => {
                  dispatch(setHome(null));
                  setShowDelHome(false);
                }}
                style={tw`ml-auto`}
              >
                <Icon
                  name='minus-circle'
                  type='font-awesome'
                  color='red'
                  size={40}
                />
              </TouchableOpacity>
            )}
          </TouchableOpacity>
        </>
      )}
      {!work && (
        <>
          <TouchableOpacity
            style={tw`flex-row items-center pr-5 py-5 ${
              theme === 'dark' && 'bg-black'
            }`}
            onPress={() => setShowWorkEditor((x) => !x)}
          >
            <Icon
              style={tw`mr-4`}
              name={showWorkEditor ? 'minus-circle' : 'plus-circle'}
              type='font-awesome'
              color={theme === 'dark' ? 'white' : 'black'}
              size={45}
            />
            <View>
              <Text
                style={tw`font-semibold text-lg ${
                  theme === 'dark' && 'text-white'
                }`}
              >
                {showWorkEditor ? 'Cancel' : 'Set Work Location'}
              </Text>
            </View>
          </TouchableOpacity>
          {showWorkEditor && (
            <GooglePlacesAutocomplete
              placeholder='Set Work Location'
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
                  setWork({
                    location: details.geometry.location,
                    description: data.description,
                  })
                );
                setShowWorkEditor(false);
              }}
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
          )}
        </>
      )}
      {work && (
        <>
          <TouchableOpacity
            onPress={() => {
              setShowDelWork(false);
              dispatch(
                setDestination({
                  location: work.location,
                  description: work.description,
                })
              );
              navigation.navigate('MapScreen', { screen: 'RideOptionsCard' });
            }}
            onLongPress={() => setShowDelWork((x) => !x)}
            disabled={!origin}
            style={tw`flex-row items-center pr-5 py-5 ${
              theme === 'dark' && 'bg-black'
            } ${!origin && 'opacity-20'}`}
          >
            <Icon
              style={tw`mr-4 rounded-full bg-gray-500 p-3`}
              name='briefcase'
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
                Work
              </Text>
              <Text
                style={tw`${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-500'
                }`}
              >
                {work.description.split(',')[0]}
              </Text>
            </View>
            {showDelWork && (
              <TouchableOpacity
                onPress={() => {
                  dispatch(setWork(null));
                  setShowDelWork(false);
                }}
                style={tw`ml-auto`}
              >
                <Icon
                  name='minus-circle'
                  type='font-awesome'
                  color='red'
                  size={40}
                />
              </TouchableOpacity>
            )}
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

export default NavFavorites;

const styles = StyleSheet.create({});

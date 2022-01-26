import { View, Text, SafeAreaView, TouchableOpacity } from 'react-native';
import React from 'react';
import tw from 'tailwind-react-native-classnames';
import { Icon } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';

const ParkingScreen = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView>
      <TouchableOpacity
        style={tw`flex justify-center items-center h-full`}
        onPress={() => navigation.navigate('HomeScreen')}
      >
        <View style={tw`flex flex-row items-center absolute top-8 left-8`}>
          <Icon name='chevron-left' type='font-awesome' />
          <Text style={tw`text-xl pl-2`}>Back</Text>
        </View>
        <Text style={tw`text-4xl text-center`}>👷🏻‍♂️</Text>
        <Text style={tw`text-4xl text-center font-bold`}>
          UNDER CONSTRUCTION
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default ParkingScreen;

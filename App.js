import { Platform, StatusBar, StyleSheet, Text, View } from 'react-native';
import { Provider } from 'react-redux';
import HomeScreen from './screens/HomeScreen';
import MapScreen from './screens/MapScreen';
import { store } from './store';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { KeyboardAvoidingView } from 'react-native';
import { useColorScheme } from 'react-native';
import FoodScreen from './screens/FoodScreen';
import ShippingScreen from './screens/ShippingScreen';
import ParkingScreen from './screens/ParkingScreen';
import SuccessScreen from './screens/SuccessScreen';

export default function App() {
  const Stack = createNativeStackNavigator();

  const theme = useColorScheme();

  React.useEffect(() => {});

  return (
    <Provider store={store}>
      <NavigationContainer>
        <StatusBar
          barStyle={theme === 'dark' ? 'light-content' : 'dark-content'}
        />
        <SafeAreaProvider>
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={{ flex: 1 }}
            keyboardVerticalOffset={Platform.OS === 'ios' ? -64 : 0}
          >
            <Stack.Navigator>
              <Stack.Screen
                name='HomeScreen'
                component={HomeScreen}
                options={{
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name='MapScreen'
                component={MapScreen}
                options={{
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name='FoodScreen'
                component={FoodScreen}
                options={{
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name='ShippingScreen'
                component={ParkingScreen}
                options={{
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name='ParkingScreen'
                component={ParkingScreen}
                options={{
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name='SuccessScreen'
                component={SuccessScreen}
                options={{
                  headerShown: false,
                }}
              />
            </Stack.Navigator>
          </KeyboardAvoidingView>
        </SafeAreaProvider>
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

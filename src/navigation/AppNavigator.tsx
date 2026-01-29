import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from '../screens/auth/SplashScreen';
import LoginScreen from '../screens/auth/LoginScreen';
import SignupScreen from '../screens/auth/SignupScreen';
import BottomTabNavigator from './BottomTabNavigator';
import CheckoutScreen from '../screens/dashboard/CheckoutScreen';


const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName='Splash'>
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
      <Stack.Screen name="HomeTabs" component={BottomTabNavigator} />
       <Stack.Screen name="Checkout" component={CheckoutScreen} />
     </Stack.Navigator>
  );
};

export default AppNavigator;

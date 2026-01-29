import { View, Text, StatusBar, useColorScheme } from 'react-native'
import React from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import AppNavigator from './src/navigation/AppNavigator'
import { ThemeProvider } from './src/theme/ThemeProvider'
import { NavigationContainer } from '@react-navigation/native';
const App = () => {
   const isDarkMode = useColorScheme() === 'dark';

  return (
   <SafeAreaProvider>    
     <ThemeProvider>
       <NavigationContainer>
    <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
    <AppNavigator/>
    </NavigationContainer>
    </ThemeProvider>
   </SafeAreaProvider>
  )
}

export default App
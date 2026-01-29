import { View, Text, StatusBar, useColorScheme } from 'react-native'
import React from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import AppNavigator from './src/navigation/AppNavigator'
import { ThemeProvider } from './src/theme/ThemeProvider'
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux'
import { persistor, store } from './src/redux/store'
import { PersistGate } from 'redux-persist/integration/react'
const App = () => {
   const isDarkMode = useColorScheme() === 'dark';

  return (
   <SafeAreaProvider> 
      <Provider store={store}>
       <PersistGate loading={null} persistor={persistor}>
     <ThemeProvider>
       <NavigationContainer>
    <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
    <AppNavigator/>
    </NavigationContainer>
    </ThemeProvider>
    </PersistGate>
    </Provider>
   </SafeAreaProvider>
  )
}

export default App
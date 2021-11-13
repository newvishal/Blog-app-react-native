import React, {useEffect} from 'react';

// navigation
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

// splash screen
import SplashScreen from 'react-native-splash-screen';

//list of screens
import HomeScreen from './src/screens/HomeScreen';
import BlogDescriptionScreen from './src/screens/BlogDescriptionScreen';

const Stack = createNativeStackNavigator();

const App = () => {
  useEffect(() => {
    const interval = setInterval(() => {
      SplashScreen.hide();
      clearInterval(interval);
    }, 3000);
  });

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen
          name="BlogDesc"
          component={BlogDescriptionScreen}
          options={({route}) => ({title: route.params.name})}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

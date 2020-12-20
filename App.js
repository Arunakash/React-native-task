import React,{Component} from 'react';
import {StackNavigator} from 'react-navigation';
import Signinscrn from './Components/Signinscrn';
import Signupscrn from './Components/Signupscrn';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
const Stack = createStackNavigator();
const App =() =>{
  return(
    <NavigationContainer>
      <Stack.Navigator
      screenOptions={{headerShown: false}}>
        <Stack.Screen name="Signinscrn" component={Signinscrn} />
        <Stack.Screen name="Signupscrn" component={Signupscrn} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App;
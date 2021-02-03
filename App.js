import React,{Component} from 'react';
import Signinscrn from './Components/Signinscrn';
import Signupscrn from './Components/Signupscrn';
import Home from './Components/Home';
import Splashscrn from './Components/Splashscrn'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator,  CardStyleInterpolators } from '@react-navigation/stack';
import {StackNavigator,NavigationActions,StackActions} from 'react-navigation';
const Stack = createStackNavigator()
class App extends Component{
  constructor(props){
     super(props);
  }
  
  render(){
    return(
    <NavigationContainer>
      <Stack.Navigator
      screenOptions={{headerShown: false,cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS}}>
        <Stack.Screen name= "splashscrn" component = {Splashscrn}/>
        <Stack.Screen name="Signinscrn" component={Signinscrn}/>
        <Stack.Screen name="Signupscrn" component={Signupscrn}/>
        <Stack.Screen name= "home" component = {Home}/>
      </Stack.Navigator>
    </NavigationContainer>
    )
  }
}
export default App;



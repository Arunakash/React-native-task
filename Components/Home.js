import React, { Component } from 'react';
import {View,Text} from 'react-native';
import { withNavigation} from 'react-navigation';

class Home extends Component{
   constructor(props){
      super(props)
   }
   render(){
      return(
         <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
            <Text style={{fontSize:28,color:'#36e809'}}>Welcome {this.props.route.params.name} !</Text>
        </View>
        )
   }
}
export default withNavigation(Home);
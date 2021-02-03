import React,{Component} from 'react';
import { View ,Text,StatusBar, Image,Animated} from 'react-native';
import { withNavigation} from 'react-navigation';
class Splashscrn extends Component{
    constructor(props){
        super(props);
        this.rotation = new Animated.Value(0);

    }
    componentDidMount(){

        Animated.spring(this.rotation, {
            toValue: 1,
            tension: 150,
            friction: 5,
            useNativeDriver: true,
          }).start();

        StatusBar.setBarStyle( 'light-content',true)
        StatusBar.setBackgroundColor("transparent")
        StatusBar.setTranslucent(true)
        setTimeout(() =>{
            this.props.navigation.replace("Signinscrn")
        },1000)
       
    }
    render(){
        const { style, rotation } = this.props
        const rotate = this.rotation.interpolate({
          inputRange: [0, 1],
          outputRange: ['0deg', '360deg'],
        })
        return(<View style={{flex:1,justifyContent:'center',alignItems:'center',backgroundColor:"white"}}>
           {/* <Image  resizeMode ='contain' source={require('../assets/image.png')}></Image> */}
           <Animated.Image  source={require('../assets/rnd-icon.png')}
        style={[style, { transform: [{ rotate }] ,height:100,width:100}]} />
        </View>)
    }
}

export default withNavigation(Splashscrn);
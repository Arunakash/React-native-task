import React, {Component} from 'react';
import { StyleSheet, Text, ScrollView,StatusBar,View, Image, TouchableOpacity, Button, ActivityIndicator,Dimensions, TextInput, Alert } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { withNavigation } from 'react-navigation';

const devicewidth = Dimensions.get('window').width;
const deviceheight= Dimensions.get('window').height;


class Signupscrn extends Component{
  constructor(){
    super();
    this.state ={
        username:"",
        useremail:"",
        userpassword:"",
    }
  }
  componentDidMount(){
    StatusBar.setBarStyle( 'light-content',true)
    StatusBar.setBackgroundColor("transparent")
    StatusBar.setTranslucent(true)
  }
  _submit = (text) =>{
    var isEmailValid = false;

    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (reg.test(text) === false) {
      console.log("Email is Not Correct");
      this.setState({ email: text })
      isEmailValid = false;
    }
    else {
      this.setState({ email: text })
      isEmailValid = true;
    }
    if(this.state.useremail !="" && this.state.userpassword !="" && this.state.username !=""){
      if(isEmailValid){
     
       Alert.alert("Registered sucessfully"),[{text:'okay'}]
       this.props.navigation.navigate("Signinscrn");
      }
       else{
      
         Alert.alert('Try again',"Please enter valid email-address"),[{text:'okay'}]
       }
    }
    else{
     
      Alert.alert('Try again',"Please fill required feilds"),[{text:'okay'}]
    }
  }
  render(){
    
    return( 
     
    
    <ScrollView style={{backgroundColor:'#364B5f'}}>
       
    <View style={styles.container}>
     
     <View style={styles.regform}>
       <Text style={styles.header}>Registration</Text>
       <TextInput style={styles.textinput} placeholder="Your name" placeholderTextColor='#cccccc'  underlineColorAndroid={'transparent'}
        onChangeText={(username) =>this.setState({username})}
        value ={this.state.username}>

       </TextInput>
       <TextInput style={styles.textinput} placeholder="Your email" placeholderTextColor='#cccccc'  underlineColorAndroid={'transparent'}
       onChangeText={(useremail) =>this.setState({useremail})}
       value ={this.state.useremail}>
         
       </TextInput>
       <TextInput style={styles.textinput} placeholder="your password" placeholderTextColor='#cccccc'  secureTextEntry={true} underlineColorAndroid={'transparent'}
       onChangeText={(userpassword) =>this.setState({userpassword})}
       value ={this.state.userpassword}
       >
         
       </TextInput>
       
     
       <TouchableOpacity onPress={()=> this._submit(this.state.useremail)}>
       
       <LinearGradient
         start={{ x: 0, y: 0 }}
         end={{x: 1, y: 1 }}
         colors={['#037ADE','#03E5B7']}
         style={styles.button}
         >
         <Text style={styles.btntext}>
           Sign Up
         </Text>
       </LinearGradient>
       </TouchableOpacity> 
       
     </View>
     <TouchableOpacity style={styles.btmView}
           activeOpacity={0.5}
          onPress={() => { this.props.navigation.navigate("Signinscrn") }}>
          <View style={{width:'100%',alignItems:"center"}}>
            <Text style={{bottom:4,fontSize:14,color:'#d4d2d2'}}>Already have an account?<Text style={{fontWeight:'bold',color:'#0d2ad4'}}> SignIn</Text></Text>
          </View>
          </TouchableOpacity>
     </View>
    </ScrollView>
    );
  }
}

export default withNavigation(Signupscrn);
const styles = StyleSheet.create({
  container:{
flex:1,
height:760,
paddingTop:150,
backgroundColor:'#364B5f',
paddingLeft:45,
paddingRight:45,


  },
  regform:{
    
  },
  header:{
    fontSize:24,
    color:'#fff',
    paddingBottom:10,
    marginBottom:40,
    borderBottomColor:'#199187',
    borderBottomWidth:2,
  },
  textinput:{
    alignSelf:'stretch',
    height:40,
    marginBottom:30,
    color:'#fff',
    borderBottomColor:'#f8f8f8',
    borderBottomWidth:1,
  },
  button:{
    alignSelf:'stretch',
    alignItems:'center',
    padding:20,
    backgroundColor:'#59cbbd',
   // background: linear-gradient(90deg, rgba(91,36,122,1) 13%, rgba(27,206,223,1) 100%);
    marginTop:50
  },
  btntext:{
  color:"#fff",
  fontWeight:'bold'
  },
  btn:{
    alignSelf:'stretch',
    alignItems:'center',
    padding:20,
    
  },
  btmView:{
    backgroundColor: 'rgba(255,255,255,0.15)', 
    borderColor:'transparent',
    borderTopColor:'#a8a0a0',
    borderWidth:0.7,
    justifyContent:"center",
    shadowColor: "#000",
    shadowOpacity: 0.8,
    shadowRadius: 2,
    color:'#000',
    width:devicewidth,
    height:70,
   position:"absolute",
   bottom:0,
    fontSize:15,
    paddingLeft:10,
    color:'white',
   
  }

})
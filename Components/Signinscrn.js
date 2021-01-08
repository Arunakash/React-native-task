import React,{Component} from 'react';
import { SafeAreaView,StyleSheet,ScrollView,Image,View,Text,StatusBar,TextInput,Button,TouchableHighlight,TouchableOpacity,Dimensions,ImageBackground,NativeModules,Alert} from 'react-native';
import auth from '@react-native-firebase/auth';
import *as firebase from 'firebase';
import { LoginManager, AccessToken,LoginButton ,GraphRequest, GraphRequestManager } from 'react-native-fbsdk';
import {GoogleSignin,GoogleSigninButton,statusCodes} from 'react-native-google-signin';
import { withNavigation } from 'react-navigation';

const  {RNTwitterSignIn} = NativeModules;
const devicewidth = Dimensions.get('window').width;
const deviceheight= Dimensions.get('window').height;

const APIKEY = {
  TWITTER_API_KEY : "dPeI8sKykRuWeeFTx60g8l0ZO",
  TWITTER_SECRET_KEY : "8ZstsMkGULO2tcS7NWQ3AI8vp2VmBCxYVTNJRTNBFQayq7f4Mc"
}

const twitterLogin =() =>{
  RNTwitterSignIn.init(APIKEY.TWITTER_API_KEY,APIKEY.TWITTER_SECRET_KEY)
  RNTwitterSignIn.logIn().then(loginData =>{
   console.log("loginData :",loginData)
  }).catch(err =>{console.log(err)}) 
}

class Signinscrn extends Component {
  constructor(props){
    super(props);
    this.state = {
      userInfo: null,
      UserNameTxt:null,
      passWordTxt:null,
      gettingLoginStatus: true,
    };
  }  

  componentDidMount() {
    //initial configuration <StatusBar barStyle="light-content" backgroundColor="transparent" translucent={true}/>
    StatusBar.setBarStyle( 'light-content',true)
    StatusBar.setBackgroundColor("transparent")
    StatusBar.setTranslucent(true)

    GoogleSignin.configure({
      //It is mandatory to call this method before attempting to call signIn()
      scopes: ['https://www.googleapis.com/auth/drive.readonly'],
      // Repleace with your webClientId generated from Firebase console
      webClientId: '144031093661-ntksru1dtivv1oq73ls211jsef55fui8.apps.googleusercontent.com',
    });
    //Check if user is already signed in
    this._isSignedIn();
    
    const APIKEY ={
      TWITTER_API_KEY : 'dPeI8sKykRuWeeFTx60g8l0ZO',
      TWITTER_SECRET_KEY :'8ZstsMkGULO2tcS7NWQ3AI8vp2VmBCxYVTNJRTNBFQayq7f4Mc'
    }
  }
  TwitterLogin =() =>{
    RNTwitterSingin.init(APIKEY.TWITTER_API_KEY, APIKEY.TWITTER_SECRET_KEY)
    RNTwitterSingin.login().then(loginData =>{
      console.log("loginData  ",loginData)
    }).catch.log(error =>{
      console.log("error",error)
    })
   }
  _isSignedIn = async () => {
    const isSignedIn = await GoogleSignin.isSignedIn();
    if (isSignedIn) {
      alert('User is already signed in');
      //Get the User details as user is already signed in
      this._getCurrentUserInfo();
    } else {
      //alert("Please Login");
      console.log('Please Login');
    }
    this.setState({ gettingLoginStatus: false });
  };


  _getCurrentUserInfo = async () => {
    try {
      const userInfo = await GoogleSignin.signInSilently();
      console.log('User Info --> ', userInfo);
      this.setState({ userInfo: userInfo });
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_REQUIRED) {
        alert('User has not signed in yet');
        console.log('User has not signed in yet');
      } else {
        alert("Something went wrong. Unable to get user's info");
        console.log("Something went wrong. Unable to get user's info");
      }
    }
  };

  _signIn = async () => {
    //Prompts a modal to let the user sign in into your application.
    try {
      await GoogleSignin.hasPlayServices({
        //Check if device has Google Play Services installed.
        //Always resolves to true on iOS.
        showPlayServicesUpdateDialog: true,
      });
      const userInfo = await GoogleSignin.signIn();
      console.log('User Info --> ', userInfo);
      this.setState({ userInfo: userInfo });
    } catch (error) {
      console.log('Message', error.message);
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log('User Cancelled the Login Flow');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        console.log('Signing In');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        console.log('Play Services Not Available or Outdated');
      } else {
        console.log('Some Other Error Happened');
      }
    }
  };
  _signOut = async () => {
    //Remove user session from the device.
    try {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
      this.setState({ userInfo: null }); // Remove the user from your app's state as well
    } catch (error) {
      console.error(error);
    }
  };

  _submit = async ()=>{
   // Alert.alert('Info',this.state.UserNameTxt+"  "+this.state.passWordTxt),[{text:'okay'}]
    if(this.state.UserNameTxt != null && this.state.passWordTxt != null){
     
      Alert.alert('Info',"login sucessfully"),[{text:'okay'}]
      this.setState({})
      this.setState({UserNameTxt:null,passWordTxt:null})
      
    }
    else{
      Alert.alert('Info',"Please enter vaild username or password"),[{text:'okay'}]
    }
  }
render(){
    return (
      
        <View style={[styles.container]}>
      <ImageBackground source={require('../assets/bcgrnd2.png')} style={{width:"100%"}}>
    

      <ScrollView style={{width:"100%"}}>
        <View style={{height:720,width:"100%",alignItems:"center",marginTop:40}}>
          <View style={styles.imageContainer}>
           
            <Image style={styles.image} resizeMode ='contain' source={require('../assets/image.png')}></Image>
          
          </View>
          <View style={styles.formContainer}>
          
            <TextInput style={styles.input}
                placeholder="UserName" 
                placeholderTextColor="#f2ebeb"
                returnKeyType='go' 
                autoCapitalize='none'
                maxLength={20}
                autoCorrect={false}
                
                onSubmitEditing ={(event) => {this.ref.passwordTextInputRef.focus();}}
                value ={this.state.UserNameTxt}
                 onChangeText= {(UserNameTxt) => this.setState({UserNameTxt})} 
                
            ></TextInput>
            <TextInput 
            // ref="passwordTextInputRef"
            style={[styles.input,{marginTop:20}]}
            placeholder="Password"
            placeholderTextColor="#f2ebeb"
            returnKeyType="go"
            autoCapitalize ="none"
            secureTextEntry={true}
            maxLength={8}
            autoCorrect={false}
             onChangeText={(passWordTxt) =>this.setState({passWordTxt})}
             value ={this.state.passWordTxt}
            onSubmitEditing={(event)=>{
              this._submit();
            }}
            >
            </TextInput>
            <TouchableHighlight style={styles.button}
            underlayColor='rgba(255,255,255,0.15)'
            onPress={()=> this._submit()}>
            <Text style={styles.buttonText}>Log in</Text>
            </TouchableHighlight>
            <TouchableHighlight style={styles.buttonSignup}  underlayColor={'transparent'}
          >
              <Text style={styles.buttonTextSingup,[{color:'#f2ebeb'}]}>Forgot your login details?Get help signing in.</Text>
            </TouchableHighlight>
            {/* <TouchableHighlight  style={styles.buttonSignup}
              underlayColor={'transparent'}
            onPress={() =>{
              Alert.alert('Info',"jhgjdgjvdjhgd"),[{text:'okay'}]
            }}
            >
            <Text style={[styles.buttonTextSingup],{color:'#6D6E70'}}>Don't have account?Click here</Text>
            </TouchableHighlight> */}
           <View style={{flexDirection: 'row', alignItems: 'center',marginTop:45}}>
               <View style={{flex: 1, height: 1, backgroundColor: 'rgba(255,255,255,0.4)'}} />
               <View>
                  <Text style={{width: 50, textAlign: 'center',color:'white'}}>OR</Text>
               </View>
            <View style={{flex: 1, height: 1, backgroundColor: 'rgba(255,255,255,0.4)'}} />
           </View>
           

         <TouchableHighlight 
         underlayColor="#DDDDDD"
         onPress={this._signIn}
         style={[styles.bttn2,{height:40},{marginTop:16},{backgroundColor:'white'},{borderColor:'transparent'}]}>
         <View style={{flexDirection:'row',alignItems:"center",width:'100%'}}>
         <Image style={{height:23,width:25,marginRight:10,left:11}} resizeMode ='contain' source={require('../assets/g-icon.png')}></Image>
           <Text style={styles.signupTextNewG}>Sign-in with Google</Text>
           </View>
         </TouchableHighlight>
       
          <TouchableHighlight 
         onPress={() => onFacebookButtonPress().then(() => console.log('Signed in with Facebook!')).catch((error)=>{
         console.log("Api call error"+error)})}
         underlayColor="#668cff"  style={[styles.bttn2,{height:40},{marginTop:15},{backgroundColor:'#166fe5'},{borderColor:'transparent'}]}>
         <View style={{flexDirection:'row',alignItems:"center",width:"100%"}}>
         <Image style={{height:25,width:25,marginRight:10,left:3}} resizeMode ='contain' source={require('../assets/facebook.png')}></Image>
           <Text style={styles.signupTextNew}>Sign-in with facebook</Text>
           </View>
         </TouchableHighlight>
             
         <TouchableHighlight onPress={twitterLogin}   underlayColor="#66ccff" style={[styles.button,{height:40},{width:310},{borderWidth:0},{marginTop:15,backgroundColor:"#00acee",justifyContent:"center",borderColor:'transparent'}]}>
         <View style={{flexDirection:'row',alignItems:"center",width:'100%'}}>
         <Image style={{height:25,width:25,marginRight:10,left:11}} resizeMode ='contain' source={require('../assets/twit-whi.png')}></Image>
           <Text style={styles.signupTextNew}>Sign-in with Twitter</Text>
           </View>
         </TouchableHighlight>      
          </View>
          <TouchableOpacity style={styles.btmView}
           activeOpacity={0.5}
          onPress={() => { this.props.navigation.navigate("Signupscrn") }}>
          <View style={{width:'100%',alignItems:"center"}}>
            <Text style={{bottom:4,fontSize:14,color:'#d4d2d2'}}>Don't have an account?<Text style={{fontWeight:'bold',color:'#0d2ad4'}}> SignUp</Text></Text>
          </View>
          </TouchableOpacity>
        </View>
      </ScrollView>

      </ImageBackground>
    </View>
 
    
      );
    }
  }
 
  export default withNavigation(Signinscrn);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:"white"
  },
imageContainer:{
  alignItems:"center"
},
image:{
  height:148,
  width:175,
  marginTop:0
},
formContainer:{
  paddingHorizontal:30,
  alignItems:'center'
},
textInputStyle:{
  borderBottomColor:'#000',
},
input:{
  backgroundColor: 'rgba(255,255,255,0.15)', 
  width:310,
  height:48,
  fontSize:15,
  paddingLeft:10,
  color:'white',
  borderRadius:3,
  
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
 
},
textInputBottomLine:{
  height:1.5,
  backgroundColor:'#E6E7E9'
}
,
backGrndImg:{
height :deviceheight,
width:devicewidth
},
button:{
  height:48,
  width:310,
  alignItems:'center',
  justifyContent:'center',
  marginTop:20,
  borderRadius:2,
  borderWidth:2,
  borderColor:'rgba(255,255,255,0.3)'
},
bttn2:{

  width:310,
  borderRadius:2,
  alignItems:'center',
  justifyContent:'center',
  marginTop:20,
  borderColor:'rgba(255,255,255,0.3)'
},
buttonText:{
  fontSize:17,
  color:'rgba(255,255,255,0.6)',
  fontWeight:'bold'
},
signupText:{
fontSize:13,
color:'white',
fontWeight:'bold',
},
signupTextNew:{
  fontSize:13,
  color:'white',
  fontWeight:'bold',
  right:-60
},
signupTextNewG:{
  fontSize:13,
  color:'gray',
  fontWeight:'bold',
  right:-60
},
buttonSignup:{
  alignItems:'center',
  justifyContent:'center',
  marginTop:20
},
buttonTextSingup:{
  fontSize: 12,
},
viewTextRights:{
  alignItems:'center',
  justifyContent:'center',
  marginTop:75
},
textRights:{
  marginTop:30,
  fontSize:10,
  color:'#A3BF3A'
}
});


async function onFacebookButtonPress(){
  // Attempt login with permissions
  // alert("function called");
 // const result = await LoginManager.logInWithPermissions(['public_profile', 'email']);
 const result=await LoginManager.logInWithPermissions(['public_profile','email']).then(
    function(result) {
      if (result.isCancelled) {
        alert('Login was cancelled');
      } else {
        
        // alert('Login was successful with permissions: '
        //   + result.grantedPermissions.toString());
        AccessToken.getCurrentAccessToken().then(
          (data) => {const infoRequest = new GraphRequest('/me?fields=id,name,email',null,this._responseInfoCallback);
            new GraphRequestManager().addRequest(infoRequest).start();
          })
      }
    },
    function(error) {
      alert('Login failed with error: ' + error);
    }
  );
  if (result.isCancelled) {
    throw 'User cancelled the login process';
  }

  // Once signed in, get the users AccesToken
  const data = await AccessToken.getCurrentAccessToken();

  if (!data) {
    throw 'Something went wrong obtaining access token';
  }

  // Create a Firebase credential with the AccessToken
  
  const facebookCredential = auth.FacebookAuthProvider.credential(data.accessToken);
  // Sign-in the user with the credential
  // return auth().signInWithCredential(facebookCredential);
  var myauth = auth().signInWithCredential(facebookCredential);
  console.log(myauth)
  return myauth;
}

_responseInfoCallback = (error, result) => {
  if (error) {
    alert('Error fetching data: ' + error.toString());
  } else {
   
console.log(result.email,result.id,result.name)
  }
}


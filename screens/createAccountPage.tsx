import React, { useState, useEffect, Component  } from 'react';
import { StyleSheet, Text, View, KeyboardAvoidingView,TouchableWithoutFeedback, Keyboard, ScrollView, Image, Dimensions} from 'react-native';
import firebase from "../firebase";
import {Form, Item, Label, Input, Button} from 'native-base';
import { TouchableHighlight, TouchableOpacity } from 'react-native-gesture-handler';


const CreateAccountPage = ({navigation}) => {
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorText, setErrortext] = useState('');
  const [userCreated, setUserCreated] = useState(false)
signUpUser = (email, password) => {
  var emailTrimmed = email.trim();
  var userName = name.trim();
  if (userName.length == 0) {
    setErrortext('Please enter a name')
  }
  else if (emailTrimmed.length == 0) {
    setErrortext('Please enter an email')
  }
    else if (password.length < 8) {
      setErrortext('Password must be 8 or more characters')
    }
    else {
      firebase.auth().createUserWithEmailAndPassword(emailTrimmed, password).catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          setErrortext('Email already in use')
        }
    
        else if (error.code === 'auth/invalid-email') {
          setErrortext('Invalid email address')
        }

        else {
          setUserCreated(true);
        }

        console.log(error);
      }).then(userCreated?(userInfo) =>{userInfo.user.updateProfile({displayName: userName}).then(firebase.auth().currentUser.reload()).then(() => {console.log(firebase.auth().currentUser.displayName)})}:null)
    }
}

useEffect(() => {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      console.log('user logged')
      navigation.navigate('AppNavigator')          
    }
 })}, []);

return (
  <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
  <KeyboardAvoidingView // adjust the value here if you need more padding
    behavior="position"
    keyboardVerticalOffset={Platform.select({ios: () => -0, android: () => -(Dimensions.get("window").width + Dimensions.get("window").height) / (1080/100),})()} style={styles.container}>
        
      <Text style={{color:'white', paddingTop:30, paddingLeft:30, fontSize:25, fontFamily:'MuliSemi'}}>Dulcis</Text>
      <View style={{width:300, height:300, borderRadius:300, position:"absolute", top:-100, right:-100, borderColor:"#FFAE6C", borderWidth:60,}}></View>
      <View style={{paddingHorizontal:30, marginTop:(Dimensions.get("window").width + Dimensions.get("window").height) / (1080/55),}}>
      <Text style={{color:'white', fontSize:(Dimensions.get("window").width + Dimensions.get("window").height) / (1080/30), fontFamily:'MuliSemi', marginBottom:(Dimensions.get("window").width + Dimensions.get("window").height) / (1080/10),}}>Create{'\n'}Account</Text>
      <Text style={{color:'white', fontSize:(Dimensions.get("window").width + Dimensions.get("window").height) / (1080/18), paddingTop:5, fontFamily:'MuliLight', opacity:0.8}}>Create a free acount and get full access to our revolutionary AI and ML powered platform</Text>
      </View>          
      
      <Form style={{alignItems:"center", marginTop:25, paddingHorizontal:30,}}>
      <Item floatingLabel style={{borderColor:"white",paddingBottom:10, marginTop:4,width:"100%", marginRight:15,}}>
    <Label style={{color:"white", fontFamily:"MuliLight"}}>Name</Label>
    <Input 
      autoCorrect={false}
      style={{color:"white", fontFamily:"MuliLight"}}
      autoCapitalize="none"
      onChangeText= {(name) => setName(name)}
    />
  </Item>
    <Item floatingLabel style={{borderColor:"white",paddingBottom:10, marginTop:4,width:"100%", marginRight:15,}}>
    <Label style={{color:"white", fontFamily:"MuliLight"}}>Email</Label>
    <Input 
      autoCorrect={false}
      style={{color:"white", fontFamily:"MuliLight"}}
      autoCapitalize="none"
      onChangeText= {(email) => setEmail(email)}
    />
  </Item>
  <Item floatingLabel style={{borderColor:"white",paddingBottom:10, marginTop:4,width:"100%", marginRight:15,}}>
    <Label style={{color:"white", fontFamily:"MuliLight"}}>Password</Label>
    <Input 
      autoCorrect={false}
      style={{color:"white", fontFamily:"MuliLight"}}
      autoCapitalize="none"
      secureTextEntry={true}
      onChangeText= {(password) => setPassword(password)}
    />
  </Item>
  </Form>
  <Text style={{textAlign:'center',marginHorizontal:20, paddingTop:20, color:'tomato', fontSize:15,fontFamily:'MuliLight', opacity:0.8}}>{errorText}</Text>
  <Button style={{backgroundColor:'#FFAE6C', marginHorizontal:30, marginTop:20, borderRadius:15, shadowColor: "#363940", shadowOffset: {width: 0, height: 2,}, shadowOpacity: 0.25, shadowRadius: 3.84, elevation: 5,}} full onPress={()=> signUpUser(email, password)}><Text style={{color:'#363940',fontSize:18, fontFamily:'MuliBold'}}>CREATE ACCOUNT</Text></Button>
  <Text style={{textAlign:'center', marginHorizontal:30, color:'white', marginTop:20, fontSize:15, paddingTop:5, fontFamily:'MuliLight', opacity:0.8}}>Already have an account? <TouchableWithoutFeedback onPress={()=> navigation.navigate('LoginPage')}><Text style={{textDecorationLine:"underline"}}>Sign In.</Text></TouchableWithoutFeedback></Text>
  </KeyboardAvoidingView>
</TouchableWithoutFeedback>
)
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#363940',
  }
});

export default CreateAccountPage;
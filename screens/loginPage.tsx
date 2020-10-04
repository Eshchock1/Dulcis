import React, { useState, useEffect, Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
  Image,
  Dimensions,
  Platform,
} from "react-native";
import firebase from "../firebase";
import { Form, Item, Label, Input, Button } from "native-base";
import {
  TouchableHighlight,
  TouchableOpacity,
} from "react-native-gesture-handler";

const LoginPage = ({ navigation}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorText, setErrortext] = useState("");

  loginUser = (email, password) => {
    var emailTrimmed = email.trim();
    firebase
      .auth()
      .signInWithEmailAndPassword(emailTrimmed, password)
      .catch((error) => {
        if (error.code === "auth/invalid-email") {
          setErrortext("Invalid email address");
        } else if (error.code === "auth/wrong-password") {
          setErrortext("Invalid password");
        } else if (error.code === "auth/user-not-found") {
          setErrortext("User not found");
        }
        console.log(error);
      });
  };

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        console.log("user logged");
        navigation.navigate("AppNavigator");
      }
    });
  }, []);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView // adjust the value here if you need more padding
        behavior="position"
        keyboardVerticalOffset={Platform.select({ios: () => 0, android: () => -(Dimensions.get("window").width + Dimensions.get("window").height) / (1080/100),})()} style={styles.container}>
            
          <Text style={{color:'white', paddingTop:30, paddingLeft:30, fontSize:25, fontFamily:'MuliSemi'}}>Dulcis</Text>
          <View style={{width:300, height:300, borderRadius:300, position:"absolute", top:-100, right:-100, borderColor:"#FFAE6C", borderWidth:60,}}></View>
          <View style={{paddingHorizontal:30, marginTop:(Dimensions.get("window").width + Dimensions.get("window").height) / (1080/75),}}>
          <Text style={{color:'white', fontSize:(Dimensions.get("window").width + Dimensions.get("window").height) / (1080/30), fontFamily:'MuliSemi', marginBottom:(Dimensions.get("window").width + Dimensions.get("window").height) / (1080/10),}}>Welcome{'\n'}Back</Text>
          <Text style={{color:'white', fontSize:(Dimensions.get("window").width + Dimensions.get("window").height) / (1080/18), paddingTop:5, fontFamily:'MuliLight', opacity:0.8}}>Good to see you. Sign back in to you Dulcis account and get access to all our premium features</Text>
          </View>          
          
          <Form style={{alignItems:"center", marginTop:50, paddingHorizontal:30,}}>
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
      <Button style={{backgroundColor:'#FFAE6C', marginHorizontal:30, marginTop:20, borderRadius:15, shadowColor: "#363940", shadowOffset: {width: 0, height: 2,}, shadowOpacity: 0.25, shadowRadius: 3.84, elevation: 5,}} full onPress={()=> loginUser(email, password)}><Text style={{color:'#363940',fontSize:18, fontFamily:'MuliBold'}}>SIGN IN</Text></Button>
      <Text style={{textAlign:'center',marginHorizontal:10, color:'white', marginTop:20, fontSize:15, paddingTop:5, fontFamily:'MuliLight', opacity:0.8}}>Dont have an account yet? <TouchableWithoutFeedback onPress={()=> navigation.navigate('CreateAccountPage')}><Text style={{textDecorationLine:"underline"}}>Create Account.</Text></TouchableWithoutFeedback></Text>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#363940",
  },
});

export default LoginPage;

import React, { useState, useEffect, Component  } from 'react';
import { StyleSheet, Text, View, KeyboardAvoidingView,TouchableWithoutFeedback, Keyboard, ScrollView, Image, Dimensions} from 'react-native';
import firebase from "../firebase";
import {Form, Item, Label, Input, Button} from 'native-base';
import { TouchableHighlight, TouchableOpacity } from 'react-native-gesture-handler';
// import { SkypeIndicator } from 'react-native-indicators';


const LoadingPage = ({navigation}) => {

return (
    <View style={styles.container}>
        <View style={{flex:0.75,}}>
          <Text style={{color:'white', paddingTop:30, paddingLeft:30, fontSize:25, fontFamily:'MuliSemi'}}>Dulcis</Text>
          <Image
          source={require('../assets/person.png')}
          style={{height:(Dimensions.get("window").width + Dimensions.get("window").height) / (1080/350), width:(Dimensions.get("window").width + Dimensions.get("window").height) / (1080/250), marginTop:(Dimensions.get("window").width + Dimensions.get("window").height) / (1080/50),}}
          />
          <View style={{width:(Dimensions.get("window").width + Dimensions.get("window").height) / (1080/300), height:(Dimensions.get("window").width + Dimensions.get("window").height) / (1080/300), borderRadius:300, position:"absolute", top:-100, right:-100, borderColor:"#FFAE6C", borderWidth:60,}}></View>
          <View style={{width:(Dimensions.get("window").width + Dimensions.get("window").height) / (1080/140), height:(Dimensions.get("window").width + Dimensions.get("window").height) / (1080/140), borderRadius:140, position:"absolute", top:230, right:40, borderColor:"#646874", borderWidth:40,}}></View>
          <View style={{width:(Dimensions.get("window").width + Dimensions.get("window").height) / (1080/75), height:(Dimensions.get("window").width + Dimensions.get("window").height) / (1080/75), borderRadius:75, position:"absolute", top:160, right:165, borderColor:"#23262D", borderWidth:25,}}></View>
        </View>
        <View style={{flex:0.4, paddingHorizontal:40,}}>
          <Text style={{color:'white', fontSize:(Dimensions.get("window").width + Dimensions.get("window").height) / (1080/23), fontFamily:'MuliSemi'}}>A revolutionary management app for diabetics</Text>
          <Text style={{color:'white', fontSize:(Dimensions.get("window").width + Dimensions.get("window").height) / (1080/18), paddingTop:5, fontFamily:'MuliLight', opacity:0.8}}>The only application you will ever need to manage your diabetes</Text>
          <Button style={{backgroundColor:'#FFAE6C', marginTop:20, borderRadius:15, shadowColor: "#363940", shadowOffset: {width: 0, height: 2,}, shadowOpacity: 0.25, shadowRadius: 3.84, elevation: 5,}} full onPress={()=> navigation.navigate('CreateAccountPage')}><Text style={{color:'#363940',fontSize:18, fontFamily:'MuliBold'}}>GET STARTED</Text></Button>
        </View>
      </View>
)
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#363940',
  },
});

export default LoadingPage;
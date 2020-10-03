import React, { useState, useEffect, Component} from 'react';
import { StyleSheet, Text, View, KeyboardAvoidingView,TouchableWithoutFeedback, Keyboard, ScrollView, Dimensions, Image, Modal, Alert} from 'react-native';
import firebase from "../firebase";
import {Form, Item, Label, Input, Button} from 'native-base';
import { TouchableHighlight, TouchableOpacity } from 'react-native-gesture-handler';

export default class WelcomePage extends Component {     
  signOut = () => {
    firebase.auth().signOut().then(() => console.log('Signed out'));
    this.props.navigation.navigate('SplashPage');
  }
  render(){
  return (
      <View style={styles.container}>
      <Text>ASD</Text>
      <Text>ASD</Text>
      <Text>ASD</Text>
      <Text>ASD</Text>
      <Text>ASD</Text>
      <Text>ASD</Text>
      <Text>ASD</Text>
      <Text>ASD</Text>
      <Text>ASD</Text>
      <Text>ASD</Text>
      <Button onPress={()=>this.signOut()}><Text>Sign Out</Text></Button>
      </View>
  );}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  logo: {
    color: "white",
    marginHorizontal:(Dimensions.get("window").width + Dimensions.get("window").height) / (1080/30),
    fontSize: (Dimensions.get("window").width + Dimensions.get("window").height) / (1080/38),
    fontWeight: "bold",
    paddingTop: (Dimensions.get("window").width + Dimensions.get("window").height) / (1080/20),
  },
});

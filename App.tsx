// Application created by Eshwar Chockalingam
import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect, Component  } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import AppStack from './navigators/appStack';
import * as Font from "expo-font";
import { Dialogflow_V2 } from 'react-native-dialogflow';
import { dialogflowConfig } from './env';
export default class App extends Component {
  
  constructor(props:any) {
    super(props)
    this.state = {
      fontLoaded: false
    }
  }
  
  async componentDidMount() {
    
  Dialogflow_V2.setConfiguration(
    dialogflowConfig.client_email,
    dialogflowConfig.private_key,
    Dialogflow_V2.LANG_ENGLISH_US,
    dialogflowConfig.project_id
  );
    try {
      await Font.loadAsync({
        MuliBlack: require("./assets/fonts/muli/Muli-Black.ttf"),
        MuliLight: require("./assets/fonts/muli/Muli-Light.ttf"),
        MuliRegular: require("./assets/fonts/muli/Muli-Regular.ttf"),
        MuliSemi: require("./assets/fonts/muli/Muli-SemiBold.ttf"),
        MuliBold: require("./assets/fonts/muli/Muli-Bold.ttf"),
        MuliBoldItalic: require("./assets/fonts/muli/Muli-BoldItalic.ttf")
  
      })
      this.setState({ fontLoaded: true })
    } catch (error) {
      console.log(error)
      return
    }
  }



render(){
  const { fontLoaded } = this.state

  if (!fontLoaded) return null;

  return (
    <View style={styles.container}>
    <AppStack />
      <StatusBar style="dark"/>
    </View>
  );}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

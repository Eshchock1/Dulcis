import React, { useState, useEffect,useRef } from "react";
import { Text, View, TouchableOpacity, Dimensions, AsyncStorage, Alert } from "react-native";
import { Camera } from "expo-camera";
import { AntDesign } from '@expo/vector-icons'; 
import { EvilIcons } from "@expo/vector-icons";
import RBSheet from "react-native-raw-bottom-sheet";
import { WaveIndicator, } from 'react-native-indicators';
import * as ImagePicker from "expo-image-picker";
import firebase from "../firebase";


export default class WelcomePage extends React.Component {   
    
    componentDidMount(){
        this.permission();
        if (this.state.hasPermission === null) {
            return <View />;
          }
          if (this.state.hasPermission === false) {
            return <Text>No access to camera</Text>;
          }
    }

    async permission(){
      
        let { status } = await Camera.requestPermissionsAsync();
        this.setState({hasPermission:status==="granted"});

    }
    state = {
        hasPermission:false,
        camera: Camera.Constants.Type,
        photoTaken:false,
        ingredients:[],
        ingredientsString:'',
        type: Camera.Constants.Type.back,
        avgGi:0,
    }
 

  async pickImageCameraRoll() {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      base64: true,
    });
    if (!result.cancelled) {
        this.setState({photoTaken:true});
        this.identifyImage(result.base64);
    }
  }

  async takePicture() {
    if (this.state.camera) {
      console.log("pressed");
      let photo = await this.state.camera.takePictureAsync({ skipProcessing: true, base64: true });
      this.setState({photoTaken:true});
      this.identifyImage(photo.base64);
    }
  }

identifyImage(imageData) {
    const Clarifai = require("clarifai");
    const app = new Clarifai.App({
      apiKey: "fe4abe3a221348ecb15b4c3058e52db7",
    });
    app.models.predict(Clarifai.FOOD_MODEL, { base64: imageData }).then(
      (response) => {
        this.setState({ingredients:[]});
        let concatList = [];
        for (i = 0; i < response.outputs[0].data.concepts.length; i++) {
          if (response.outputs[0].data.concepts[i].value > 0.84) {
            concatList = [...this.state.ingredients , response.outputs[0].data.concepts[i].name]
              this.setState({ingredients:concatList});
        }
        }
        this.displayAnswer(this.state.ingredients, this);
      }
    );
  }

async displayAnswer(identifiedImage:any, obj) {
    
    
  this.setState({avgGi:0})
  this.setState({ingredientsString:''})
    let total = 0;
    let items = 0;
    for (i = 0; i < identifiedImage.length; i++) {
      let GI = await firebase.firestore().collection('food').doc(identifiedImage[i])
      GI.get().then(function(doc) {
        if (doc.exists) {
          total += Number(doc.data().gi)
          items += 1
          obj.setState({avgGi:Math.round(total/items * 10) / 10})
        }
    })

        if (i==identifiedImage.length - 1) {
            let tempString1 = this.state.ingredientsString + identifiedImage[i]
            this.setState({ingredientsString:tempString1})
        }
        else {
            let tempString2 = this.state.ingredientsString + identifiedImage[i] + ", "
            this.setState({ingredientsString:tempString2})
            }
          }
    this.setState({photoTaken:false});
    this.RBSheet.open()
  }

  render() {
  return (
    <View style={{ flex: 1 }}>
    {this.state.photoTaken?<View style={{backgroundColor: "rgba(0, 0, 0, 0.5)",width:"100%", height:"100%", position:'absolute', zIndex:100,alignItems:'center', justifyContent:"center"}}><WaveIndicator color='#FFAE6C' size={(Dimensions.get("window").width + Dimensions.get("window").height) / 10.8}/></View>:null}

<RBSheet
        ref={ref => {
            this.RBSheet = ref;
          }}
        closeOnDragDown={true}
        closeOnPressMask={false}
        customStyles={{
          wrapper: {
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          },
          draggableIcon: {
            marginTop:20,
            backgroundColor: "#FFAE6C"
          },
          container:{
              backgroundColor:"#323339"
          }
        }}
      >
        <View style={{flex:1}}>
            <View style={{flexDirection:'row', flex:0.3, paddingHorizontal:20, paddingTop:10,}}>
                <View style={{flex:0.7, flexDirection:'column', justifyContent:'center'}}>
                <Text style={{color:'#FFAE6C', fontSize:18, fontFamily:'MuliSemi',}}>Glycemic Index</Text>
                <Text style={{color:'white', opacity:0.7, fontSize:14, fontFamily:'MuliRegular',}}>Tues, Aug 23 6:15 PM</Text>
                </View>
                <View style={{flex:0.3, alignItems:'center', justifyContent:'center'}}>
      <Text style={{color:'#FFAE6C', fontSize:40, fontFamily:'MuliBold',}}>{this.state.avgGi}</Text>
                </View>
            </View>
            <View style={{flexDirection:'column', flex:0.7,paddingHorizontal:20,}}>
            {this.state.avgGi < 40?<Text style={{color:'white', opacity:0.9, fontSize:16, fontFamily:'MuliRegular',}}>An average glycemic index of {this.state.avgGi} is quite low. This is a great meal for you to eat!</Text>:this.state.avgGi >= 56?<Text style={{color:'white', opacity:0.9, fontSize:16, fontFamily:'MuliRegular',}}>An average glycemic index of {this.state.avgGi} is very high. We recommend that you do not eat this meal.</Text>:<Text style={{color:'white', opacity:0.9, fontSize:16, fontFamily:'MuliRegular',}}>An average glycemic index of {this.state.avgGi} is pretty normal. This is a good meal for you to eat!</Text>}
            <Text style={{color:'white', opacity:0.9, fontSize:16, fontFamily:'MuliRegular', marginTop:10,}}>Food detected:</Text>
    <Text style={{color:'white', opacity:0.7, fontSize:14, fontFamily:'MuliRegular', marginTop:5,}}>{this.state.ingredientsString}</Text>
            </View>

        </View>
      </RBSheet>







      <View
        style={{
          height: (Dimensions.get("window").height - (Dimensions.get("window").width * 4) / 3) / 3,
          backgroundColor: "#0a0a0a",
          justifyContent:'center'
        }}>
            <Text style={{color:'white', paddingLeft:30, fontSize:25, fontFamily:'MuliBold'}}>Dulcis</Text>
      <TouchableOpacity style={{right:30, position:'absolute'}}  onPress={()=>this.props.navigation.goBack()}><AntDesign name="back" size={30} color="white" /></TouchableOpacity>
        </View>
      <Camera
        style={{ flex: 1 }}
        type={this.state.type}
        ref={(ref) => {
          this.state.camera = ref;
        }}>
        <View
          style={{
            flex: 1,
            flexDirection: "column",
            backgroundColor: "transparent",
          }}></View>
      </Camera>
      <View
        style={{
          height: (Dimensions.get("window").height - (Dimensions.get("window").width * 4) / 3) / (3 / 2),
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          marginTop: "auto",
          marginBottom: 0,
          backgroundColor: "#0a0a0a",
        }}>
        <TouchableOpacity
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
          }}
          onPress={() => this.pickImageCameraRoll()}>
          <Text
            style={{
              fontSize: (Dimensions.get("window").width + Dimensions.get("window").height) / 50,
              color: "white",
            }}>
            <EvilIcons name="image" size={(Dimensions.get("window").width + Dimensions.get("window").height) / (1080 / 60)} color="white" />
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            flex: 0.01,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "white",
            padding: "10%",
            borderRadius: (Dimensions.get("window").width + Dimensions.get("window").height) / (1080 / 700),
          }}
          onPress={() => {
            this.takePicture();
          }}></TouchableOpacity>

        <TouchableOpacity
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
          }}
          onPress={() => {
            this.setState({type:this.state.type === Camera.Constants.Type.back ? Camera.Constants.Type.front : Camera.Constants.Type.back})
          }}>
          <Text
            style={{
              fontSize: (Dimensions.get("window").width + Dimensions.get("window").height) / (Dimensions.get("window").width + Dimensions.get("window").height) / (1080 / 50),
              color: "white",
            }}>
            <EvilIcons name="refresh" size={(Dimensions.get("window").width + Dimensions.get("window").height) / (1080 / 70)} color="white" />
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
}
// const storeImageLocally = async (key, result) => {
//   try {
//     await AsyncStorage.setItem(key, result.uri);
//   } catch (e) {}
// };
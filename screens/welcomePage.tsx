import React, { useState, useEffect, Component} from 'react';
import { StyleSheet, Text, View, KeyboardAvoidingView,TouchableWithoutFeedback, Keyboard, ScrollView, Dimensions, Image, Alert,TouchableOpacity} from 'react-native';
import firebase from "../firebase";
import {Form, Item, Label, Input, Button} from 'native-base';
// import { TouchableHighlight, TouchableOpacity } from 'react-native-gesture-handler';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import { AntDesign } from '@expo/vector-icons'; 
import Modal from 'react-native-modal';
import { round } from 'react-native-reanimated';
import Menu, { MenuItem, MenuDivider } from 'react-native-material-menu';
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart
} from "react-native-chart-kit";
import { Feather } from '@expo/vector-icons'; 
export default class WelcomePage extends Component {     
  signOut = () => {
    firebase.auth().signOut().then(() => console.log('Signed out'));
    this.props.navigation.navigate('SplashPage');
  }

  // firebase.firestore().collection(userInfo.user.uid).doc().set({})

  componentDidMount(){
    this.getLogs()
  }


async getLogs() {
    const logs = await firebase.firestore().collection(firebase.auth().currentUser.uid).orderBy("timeStamp", "desc").get()
    this.setState({logs:logs.docs.map(doc => doc.data())});
    this.calcAvgs();
    }

    async calcAvgs() {
      const todayLogs = await firebase.firestore().collection(firebase.auth().currentUser.uid).where('timeStamp', '>=', Date.now() - 86400000).orderBy("timeStamp", "desc").get()
    const todaysLogs = todayLogs.docs.map(doc => doc.data())
    const weekLogs = await firebase.firestore().collection(firebase.auth().currentUser.uid).where('timeStamp', '>=', Date.now() - 604800000).orderBy("timeStamp", "desc").get()
    const weeksLogs = weekLogs.docs.map(doc => doc.data())
    const monthLogs = await firebase.firestore().collection(firebase.auth().currentUser.uid).where('timeStamp', '>=', Date.now() - 2592000000).orderBy("timeStamp", "desc").get()
    const monthsLogs = monthLogs.docs.map(doc => doc.data())

      let todayTotal = 0
      let weekAvg = 0
      let monthAvg = 0
      todaysLogs.map(log => todayTotal += Number(log.bs))
      weeksLogs.map(log => weekAvg += Number(log.bs))
      monthsLogs.map(log => monthAvg += Number(log.bs))
      this.setState({todayAvg:Math.round(todayTotal/todaysLogs.length * 10) / 10})
      this.setState({weekAvg:Math.round(weekAvg/weeksLogs.length * 10) / 10})
      this.setState({monthAvg:Math.round(monthAvg/monthsLogs.length * 10) / 10})
    }

  state = {
    _menu:null,
    modalOpen:false,
    BloodSugar:0,
    CurrentTimeDate:'',
    logs: [],
    todayAvg:0,
    weekAvg:0,
    monthAvg:0,
  }

  getTime = () => {
    const date = new Date()
    let pmam = "AM"
    let hours = date.getHours()
    let minutes = date.getMinutes()
    let dayOfWeek  = date.getDay()
    let day = date.getDate();
    let month = date.getMonth();
    if (date.getHours() > 12) {
      pmam = "PM"
      hours -= 12
    }
    const daysDict = {1:"Mon", 2:"Tues",3:"Wed",4:"Thurs",5:"Fri",6:"Sat",0:"Sun",}
    const monthsDict = {0:"Jan", 1:"Feb",2:"Mar",3:"April", 4:"May",5:"June",6:"July",7:"Aug",8:"Sep",9:"Oct",10:"Nov",11:"Dec",}
    const time = hours + ":" + minutes + " " + pmam
    const dayFormatted = daysDict[dayOfWeek] + ", " + monthsDict[month] + " " + day

    this.setState({CurrentTimeDate:dayFormatted + " " + time})
  }


  addLog = () => {
    const date = new Date()
    let pmam = "AM"
    let hours = date.getHours()
    let minutes = date.getMinutes()
    let dayOfWeek  = date.getDay()
    let day = date.getDate();
    let month = date.getMonth();
    if (date.getHours() > 12) {
      pmam = "PM"
      hours -= 12
    }
    const daysDict = {1:"Mon", 2:"Tues",3:"Wed",4:"Thurs",5:"Fri",6:"Sat",0:"Sun",}
    const monthsDict = {0:"Jan", 1:"Feb",2:"Mar",3:"April", 4:"May",5:"June",6:"July",7:"Aug",8:"Sep",9:"Oct",10:"Nov",11:"Dec",}
    const time = hours + ":" + minutes + " " + pmam
    const bs = this.state.BloodSugar
    const hrs = date.getHours();
    const dayFormatted = daysDict[dayOfWeek] + ", " + monthsDict[month] + " " + day
    let updatedLogs = [{time:time, date:dayFormatted, hrs:hrs, bs:bs, timeStamp:date.getTime(),}, ...this.state.logs]

    this.setState({logs:updatedLogs})
    firebase.firestore().collection(firebase.auth().currentUser.uid).doc().set({
      time:time,
      date:dayFormatted,
      hrs:hrs,
      bs:bs,
      timeStamp:date.getTime(),
    })

    this.calcAvgs();


    console.log('added')
  }
 
  setMenuRef = ref => {
    this.setState({_menu:ref})
  };
 
  hideMenu = () => {
    this.state._menu.hide();
  };
 
  showMenu = () => {
    this.state._menu.show();
  };

  render(){
  return (
      <View style={styles.container}>




<Modal isVisible={this.state.modalOpen} style={{ width: "80%", marginLeft: "10%" }}>
          <View style={{backgroundColor: '#323339', borderRadius:10, width:"100%", padding:20,}}>
            <Text style={{fontFamily:"MuliSemi", fontSize:20, color:"white"}}>New Entry</Text>
  <Text style={{fontFamily:"MuliLight", fontSize:16, color:"white", opacity:0.7}}>{this.state.CurrentTimeDate}</Text>
            <Form style={{alignItems:"center",}}>
            <Item style={styles.input}>
        <Input 
          autoCorrect={false}
          autoCapitalize="none"
          placeholder = "Enter Blood Sugar Level"
          style={{color:"white"}}
          keyboardType="numeric"
          placeholderTextColor="white"
          onChangeText= {(BloodSugar) => this.setState({BloodSugar})}
        />
      </Item>
      </Form>
              
              <View style={{ flexDirection:'row', justifyContent:'space-between', marginTop:20,}}>
                <Button style={{ backgroundColor:'#646874', width:100,  borderRadius:200,  justifyContent:'center'}} onPress={() => this.setState({modalOpen:false})}><Text style={{color:"white", fontFamily:"MuliRegular"}}>Cancel</Text></Button>
                <Button style={{ backgroundColor:'#FFAE6C', width:100,  borderRadius:200,  justifyContent:'center'}} onPress={() => {this.setState({modalOpen:false});this.addLog()}}><Text style={{color:"#323339", fontFamily:"MuliRegular"}}>Submit</Text></Button>
              </View>
            </View>
          </Modal>



        

        <View style={{flex:0.58,}}>
        <Text style={{color:'#23262D', paddingTop:(Dimensions.get("window").width + Dimensions.get("window").height) / (1080/25), paddingLeft:30, fontSize:25, fontFamily:'MuliBold'}}>Dulcis</Text>   
      <View style={{top:(Dimensions.get("window").width + Dimensions.get("window").height) / (1080/30), right:30, position:'absolute'}}>
      <Menu
        style={{backgroundColor:"#23262D"}}
          ref={this.setMenuRef}
          button={<TouchableOpacity onPress={this.showMenu}><MaterialCommunityIcons name="settings-outline" size={30} color="#23262D" /></TouchableOpacity>}
        >
          <MenuItem onPress={this.hideMenu}><Text style={{fontFamily:"MuliBold", color:"white"}}>{firebase.auth().currentUser.displayName}</Text></MenuItem>
          <MenuItem onPress={()=>this.signOut()}><Text style={{fontFamily:"MuliBold", color:"#FFAE6C"}}>Sign Out</Text></MenuItem>
        </Menu>
        </View>

      <View style={{backgroundColor:"#323339", width:"87%", alignSelf:"center", height:(Dimensions.get("window").width + Dimensions.get("window").height) / (1080/200), marginTop:(Dimensions.get("window").width + Dimensions.get("window").height) / (1080/20), borderRadius:30, elevation:5,}}>

      <View style={{flexDirection:'row', alignItems:'center', justifyContent:'space-evenly', paddingTop:12,}}>
      <View style={{flexDirection:'column', alignItems:'center'}}>
  <Text style={{color:'white', fontSize:(Dimensions.get("window").width + Dimensions.get("window").height) / (1080/30), fontFamily:'MuliBold',}}>{this.state.todayAvg?this.state.todayAvg:0}</Text>
      <Text style={{color:'white', fontSize:11, fontFamily:'MuliRegular',}}>today's avg.</Text>
      </View>
      
      <View style={{flexDirection:'column', alignItems:'center'}}>
      <Text style={{color:'white', fontSize:(Dimensions.get("window").width + Dimensions.get("window").height) / (1080/30), fontFamily:'MuliBold',}}>{this.state.weekAvg?this.state.weekAvg:0}</Text>
      <Text style={{color:'white', fontSize:11, fontFamily:'MuliRegular',}}>7 day avg.</Text>
      </View>
      
      <View style={{flexDirection:'column', alignItems:'center'}}>
      <Text style={{color:'white', fontSize:(Dimensions.get("window").width + Dimensions.get("window").height) / (1080/30), fontFamily:'MuliBold',}}>{this.state.monthAvg?this.state.monthAvg:0}</Text>
      <Text style={{color:'white', fontSize:11, fontFamily:'MuliRegular',}}>30 day avg.</Text>
      </View>
      </View>

      <View style={{alignItems:'center', justifyContent:'center', paddingTop:10,}}>
        




  <LineChart
    data={{
      labels: ["Mon", "Tues", "Wed", "Thurs", "Fri", "Sat", "Sun"],
      datasets: [
        {
          data: [
            this.state.logs[6]?this.state.logs[6].bs:0,
            this.state.logs[5]?this.state.logs[5].bs:0,
            this.state.logs[4]?this.state.logs[4].bs:0,
            this.state.logs[3]?this.state.logs[3].bs:0,
            this.state.logs[2]?this.state.logs[2].bs:0,
            this.state.logs[1]?this.state.logs[1].bs:0,
            this.state.logs[0]?this.state.logs[0].bs:0,
          ]
        }
      ]
    }}
    width={280} // from react-native
    height={(Dimensions.get("window").width + Dimensions.get("window").height) / (1080/100)}
    xLabelsOffset={10}
    yAxisInterval={1} // optional, defaults to 1
    chartConfig={{
      backgroundColor: "#323339",
      backgroundGradientFromOpacity:0,
      backgroundGradientToOpacity:0,
      decimalPlaces: 0, // optional, defaults to 2dp
      color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
      labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
      style: {
        // borderRadius: 16
      },
      propsForDots: {
        r: "3",
        strokeWidth: "2",
        stroke: "#FFAE6C"
      }
    }}
    bezier
    style={{
      marginLeft:-30,
    }}
  />




      </View>


      </View>

    <View style={{flexDirection:"row", alignItems:'center', justifyContent:"space-evenly", height:"35%"}}>
    <View style={{alignItems:'center', justifyContent:'center'}}>
    <TouchableOpacity activeOpacity={0.8} onPress={()=> {this.setState({modalOpen:true});this.getTime()}}><View style={{width:(Dimensions.get("window").width + Dimensions.get("window").height) / (1080/75), height:(Dimensions.get("window").width + Dimensions.get("window").height) / (1080/75), borderRadius:(Dimensions.get("window").width + Dimensions.get("window").height) / (1080/75), backgroundColor:"#23262D", alignItems:'center', justifyContent:'center', elevation:5,}}><AntDesign name="plus" size={30} color="white" /></View></TouchableOpacity>
    <Text style={{color:'#23262D', fontSize:16, fontFamily:'MuliBold',marginTop:5,}}>New Log</Text>
    </View>
    <View style={{alignItems:'center', justifyContent:'center'}}>
    <TouchableOpacity activeOpacity={0.8} onPress={()=> this.props.navigation.navigate('CameraPage')}><View style={{width:(Dimensions.get("window").width + Dimensions.get("window").height) / (1080/75), height:(Dimensions.get("window").width + Dimensions.get("window").height) / (1080/75), borderRadius:(Dimensions.get("window").width + Dimensions.get("window").height) / (1080/75), backgroundColor:"#23262D", alignItems:'center', justifyContent:'center', elevation:5,}}><AntDesign name="camerao" size={30} color="white" /></View></TouchableOpacity>
    <Text style={{color:'#23262D', fontSize:16, fontFamily:'MuliBold',marginTop:5,}}>Food AI</Text>
    </View>
    <View style={{alignItems:'center', justifyContent:'center'}}>
    <TouchableOpacity activeOpacity={0.8} onPress={()=> this.props.navigation.navigate('ChatBotPage')}><View style={{width:(Dimensions.get("window").width + Dimensions.get("window").height) / (1080/75), height:(Dimensions.get("window").width + Dimensions.get("window").height) / (1080/75), borderRadius:(Dimensions.get("window").width + Dimensions.get("window").height) / (1080/75), backgroundColor:"#23262D", alignItems:'center', justifyContent:'center', elevation:5,}}><AntDesign name="message1" size={30} color="white" /></View></TouchableOpacity>
    <Text style={{color:'#23262D', fontSize:16, fontFamily:'MuliBold',marginTop:5,}}>Chat</Text>
    </View>
    

    </View>




        </View>

        <View style={{flex:0.42, backgroundColor:"#363940", borderTopLeftRadius:40, borderTopRightRadius:40, elevation:5, paddingHorizontal:20,}}>
        <Text style={{color:'white',paddingTop:25, fontSize:23, fontFamily:'MuliSemi', marginBottom:15,paddingLeft:10,}}>Blood Sugar</Text>
        {this.state.logs.length == 0?<Text style={{color:'white',paddingTop:25, fontSize:23, fontFamily:'MuliRegular', marginBottom:15,paddingLeft:10, opacity:0.7}}>Click 'New Log' to get started</Text>:null}
        <ScrollView>
          {
            this.state.logs.map((item) => 
            
            <TouchableOpacity activeOpacity={0.5} style={{flexDirection:'row', width:"100%", height:70, marginBottom:15,}}>
              <View style={{flex:0.25, justifyContent:'center', alignItems:'center'}}>
                <View style={{height:65, width:65, backgroundColor:'#646874', borderRadius:25,justifyContent:'center', alignItems:'center'}}>{item.hrs >= 17 || item.hrs <=4?<Feather name="moon" size={37} color="#FFAE6C" />:<Feather name="sun" size={37} color="#FFAE6C" />}</View>
              </View>
              <View style={{flex:0.5,justifyContent:'center',}}>
          <Text style={{color:'white', opacity:0.9, fontSize:17, fontFamily:'MuliRegular', paddingLeft:10,}}>{item.date}</Text>
          <Text style={{color:'white', opacity:0.6, fontSize:14, fontFamily:'MuliRegular', paddingLeft:10,}}>{item.time}</Text>

              </View>
              <View style={{flex:0.25, justifyContent:'center', alignItems:'flex-start'}}>
              {item.bs >= 4 && item.bs<=10?<Text style={{color:'white', opacity:0.9, fontSize:30, fontFamily:'MuliBold',}}>{item.bs}</Text>:item.bs < 4?<Text style={{color:'orange', fontSize:30, fontFamily:'MuliBold',opacity:0.9,}}>{item.bs}</Text>:<Text style={{color:'tomato', fontSize:30, fontFamily:'MuliBold',opacity:0.9,}}>{item.bs}</Text>}
              </View>
            </TouchableOpacity>


            )
          }
        </ScrollView>
        </View>
      
      
      </View>
  );}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFAE6C',
  },
  input:{
    backgroundColor:'#646874', 
    borderRadius:10, 
    marginLeft:0, 
    marginTop:20,
    paddingLeft:10,
    elevation: 3,
    borderBottomWidth:0,
  },
});

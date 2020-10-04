import React, { Component } from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import { GiftedChat, InputToolbar, Send, Bubble, Day, Time, Avatar} from 'react-native-gifted-chat';
import { Dialogflow_V2 } from 'react-native-dialogflow';
import { AntDesign } from '@expo/vector-icons'; 

const BOT = {
  _id: 2,
  name: 'Dulcis',
  avatar: require('../assets/logoLight.png')
};
class chatBotPage extends Component {
state = {
    messages: [
      {
        _id: 1,
        text: "Hi! I am Drake the Dulcis Bot!\n\nAsk me a question, or tell me about a symptom you would like me to check?",
        createdAt: new Date(),
        user: BOT
      }
    ]
  };

onSend(messages = []) {
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages)
}));

let message = messages[0].text;
    Dialogflow_V2.requestQuery(
      message,
      result => this.handleGoogleResponse(result),
      error => console.log(error)
    );
  }

handleGoogleResponse(result) {
    let text = result.queryResult.fulfillmentMessages[0].text.text[0];
    this.sendBotResponse(text);
  }

sendBotResponse(text) {
    let msg = {
      _id: this.state.messages.length + 1,
      text,
      createdAt: new Date(),
      user: BOT
    };

this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, [msg])
    }));
  }

renderInputToolbar (props) {
return <InputToolbar {...props} textInputStyle={{ color: "white", opacity:0.8 }}containerStyle={{borderTopWidth: 0, backgroundColor: "#646874",borderRadius:100,bottom:0, marginHorizontal:20, padding:2, marginBottom:0,color:'white'}}/> 
}

renderSendButton (props) {
  return <Send {...props} textStyle={{color:'#FFAE6C', opacity:0.9,}} containerStyle={{paddingLeft:20,}}/>
}

renderBubble(props) {
  return (
    <Bubble
      {...props}
      wrapperStyle={{
        left: {
          backgroundColor: '#646874',
          marginLeft:10,
          marginBottom:10,
        },
        right: {
          backgroundColor: '#FFAE6C',
          marginRight:20,
          marginBottom:10,
        }
      }}
      textStyle={{
        left: {
    color: 'white',
    fontFamily:"MuliRegular",
    padding:5,
  },
  right: {
    color: '#45484f',
    fontFamily:"MuliRegular",
    padding:5,
	}
      }}
     />
  );
}

renderDay(props) {
  return <Day {...props} textStyle={{display:'none'}}/>
}

renderTime(props) {
  return <Time {...props} timeTextStyle={{
    left: {
      display: 'none',
    },
    right: {
      display: 'none',
    },
  }}/>
}

render() {
    return (
      <View style={styles.container}>
        <View style={{paddingBottom:15,}}>
        <Text style={{color:'#FFAE6C', opacity:0.8, paddingTop:35, paddingLeft:30, fontSize:25, fontFamily:'MuliBold'}}>Dulcis</Text>
        <TouchableOpacity style={{top:40, right:30, position:'absolute'}}  onPress={()=>this.props.navigation.goBack()}><AntDesign name="back" size={30} color="#FFAE6C" /></TouchableOpacity>
        </View>
        <GiftedChat
          messages={this.state.messages}
          onSend={messages => this.onSend(messages)}
          user={{
            _id: 1
          }}
          renderInputToolbar={this.renderInputToolbar}
          renderBubble={this.renderBubble.bind(this)}
          renderSend={this.renderSendButton}
          renderDay={this.renderDay}
          renderTime={this.renderTime}
          messagesContainerStyle={{paddingBottom: 20 }}
          alignTop = {true}
          keyboardShouldPersistTaps = {null}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#323339',
    paddingBottom:18,
  },
});
export default chatBotPage;
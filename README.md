# Dulcis 
<img src="https://i.ibb.co/2PX1yZ4/logo.png"  height="100" width="100"/> <br>
A revolutionary management app for diabetics

### Explanatory video (3 minutes)
https://www.youtube.com/watch?v=PdTgYJRXTSU&ab_channel=EshwaraChock

### Inspiration
Directly involving people most affected by a problem is often the solution to many issues. With a rapidly rising number of over 3 million Canadians with Diabetes, we decided to create a simple, but revolutionary application for diabetics to stay in control of their condition. Combining the idea of gamification and a virtual assistant is how Dulcis was created. 

### What it does
Dulcis revolutionizes the way diabetics can keep track of their blood sugar levels through its 3 main features:
#### Food AI
* Using Dulcis you can take a picture of a meal, and upon analyzing the image for food and ingredients, it will return the average glycemic index (essentially sugar content) of the meal, and provide a recommendation of whether or not to eat it.
#### Drake the Chatbot
* Ask Drake any questions you have about diabetes such as:
1. What is insulin?
2. Is my blood sugar healthy?
3. What does type 2 diabetes mean?
* Or you can also tell Drake your symptoms such as:
1. Im feeling faint
2. My vision is blurry
3. I’m very thirsty
* After some follow up questions, Drake will make a recommendation based on your symptoms to visit a doctor, monitor your symptoms, or if you are good to go. 
* Try out a demo of Drake the Chatbot here: https://bot.dialogflow.com/47e40892-d48a-4373-a227-9e9ff2cb77df
#### Blood Sugar Logs
* By simply clicking ‘new log’, you can add a new blood sugar log at a certain time in the day by entering your blood sugar level after getting a reading from your device. Dulcis will automatically do some analysis and calculations to provide you with a graph, and average stats. 

### How I built it
The application was developed using a react native, a universally used JS framework for building cross platform applications for android and ios. We used react native in a combination with Typescript, an open source language which adds strong typing to vanilla JS, and expo, an open source platform for building react native applications. Services such as Firebase (auth and database), Clarifai (ML image classification model), and DialogFlow (chatbot) were also used to create the application. 

### Next Steps
Dulcis has a lot of potential and room for both improvement and adjustments. The first improvement would be to expand the database of Glycemic Indices through possibly web scrapers to provide the most accurate information. By that same token, the second step would be to incorporate recommendations for healthcare locations near the user when Drake the chatbot detects concerning symptoms from the user. Finally, the most important expansion to the application would be incorporating telemedicine. Especially with Covid-19 restrictions, having doctors on the application itself, having video calls to provide prescriptions for the user based on their data in the application, or chatting with users who feel certain symptoms. Connecting doctors with patients on the application would be a game changing update for Dulcis. 

### Download Dulcis (android)
Click the link below to download Dulcis on your android device<br />
https://expo.io/artifacts/77a120d3-a633-4eea-bbd5-f965b8cccd59

### Services and Dependancies 
#### Services
* Firebase
* Clarifai
* DialogFlow

#### Packages
* react-navigation
* react-navigation-tabs
* firebase
* clarifai
* react-navigation-stack
* react-native-indicators
* react-native-chart-kit
* expo-image-picker
* expo-camera
* react-native-raw-bottom-sheet
* react-native-dialogflow
* react-native-gifted-chat
* react-native-material-menu

# Test Change
testing

import WelcomePage from '../screens/welcomePage';
import CameraPage from '../screens/camera';
import ChatBotPage from '../screens/chatBotPage';
import { createStackNavigator, TransitionPresets } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';

const LoginStack = createStackNavigator({
    WelcomePage: {screen: WelcomePage,
        navigationOptions: {
            headerShown: false,
        },
    },
    CameraPage: {screen: CameraPage,
        navigationOptions: {
            headerShown: false,
        },
    },
    ChatBotPage: {screen: ChatBotPage,
        navigationOptions: {
            headerShown: false,
        },
    },
}, {
    defaultNavigationOptions: {
        ...TransitionPresets.RevealFromBottomAndroid,
    },
    initialRouteName:'WelcomePage',
})
export default createAppContainer(LoginStack);
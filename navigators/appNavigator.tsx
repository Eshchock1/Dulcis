
import WelcomePage from '../screens/welcomePage';
import CameraPage from '../screens/camera';
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
}, {
    defaultNavigationOptions: {
        ...TransitionPresets.RevealFromBottomAndroid,
    },
    initialRouteName:'WelcomePage',
})
export default createAppContainer(LoginStack);
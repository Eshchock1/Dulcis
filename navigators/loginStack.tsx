import { createAppContainer } from 'react-navigation';
import CreateAccountPage from '../screens/createAccountPage';
import LoginPage from '../screens/loginPage';
import SplashPage from '../screens/splashPage';
import {createMaterialTopTabNavigator} from 'react-navigation-tabs';

const LoginStack = createMaterialTopTabNavigator({
    SplashPage: {screen: SplashPage,
        navigationOptions: {
            tabBarVisible:false,
        },
    },
    LoginPage: {screen: LoginPage,
        navigationOptions: {
            tabBarVisible:false,
        },
    },
    CreateAccountPage: {screen: CreateAccountPage,
        navigationOptions: {
            tabBarVisible:false,
        },
    },
    
}, {
    initialRouteName: 'SplashPage',
   });

export default createAppContainer(LoginStack);
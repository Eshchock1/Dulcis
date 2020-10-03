
import WelcomePage from '../screens/welcomePage';
import { createAppContainer } from 'react-navigation';
import {createMaterialTopTabNavigator} from 'react-navigation-tabs';
            
const LoginStack = createMaterialTopTabNavigator({
    WelcomePage: {screen: WelcomePage,
        navigationOptions: {
            tabBarVisible:false,
        },
    },
}, {
    initialRouteName: 'WelcomePage',
})
export default createAppContainer(LoginStack);
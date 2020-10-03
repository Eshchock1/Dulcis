import { TransitionPresets } from 'react-navigation-stack';
import { createSwitchNavigator, createAppContainer } from 'react-navigation';
import LoginStack from './loginStack';
import AppNavigator from './appNavigator';
import LoadingPage from '../screens/loadingPage';

const AppStack = createSwitchNavigator({
LoadingPage: {screen: LoadingPage},
LoginStack:LoginStack,
AppNavigator:AppNavigator,
},);

export default createAppContainer(AppStack);
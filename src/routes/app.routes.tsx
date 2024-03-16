
import { createStackNavigator } from '@react-navigation/stack';

import Splash from '../screens/SplashScreen';
import {MyTabs} from '../routes/tab.routes';
import InvestmentScreen from '../screens/InvestmentScreen';

const {Navigator, Screen} = createStackNavigator();

export function StackRoutes(){
    return (
    <Navigator screenOptions={{headerShown: false, animationEnabled: true, gestureEnabled: false, gestureDirection: 'horizontal'}} initialRouteName="splash">
        <Screen 
            name="splash"
            component={Splash}
        />
         <Screen 
            name="home"
            component={MyTabs}
        />
         <Screen 
            name="investment"
            component={InvestmentScreen}
        />
    </Navigator>
)}
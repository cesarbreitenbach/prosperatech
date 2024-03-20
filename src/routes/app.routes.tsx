
import { createStackNavigator } from '@react-navigation/stack';

import Splash from '../screens/SplashScreen';
import {MyTabs} from '../routes/tab.routes';
import InvestmentScreen from '../screens/InvestmentScreen';
import ActivateUserScreen from '../screens/ActivateUserScreen';
import ChangePassword from '../screens/ChangePassword';

const {Navigator, Screen} = createStackNavigator();

export function StackRoutes(){
    return (
    <Navigator screenOptions={{headerShown: false, animationEnabled: true, gestureEnabled: false, gestureDirection: 'horizontal'}} initialRouteName="splash">
        <Screen 
            name="splash"
            component={Splash}
        />
         <Screen 
               name='activate'
               component={ActivateUserScreen}
          />
         <Screen 
            name="home"
            component={MyTabs}
        />
        <Screen 
            name="changePassword"
            component={ChangePassword}
        />
         <Screen 
            name="investment"
            component={InvestmentScreen}
        />
    </Navigator>
)}
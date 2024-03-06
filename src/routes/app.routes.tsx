
import { createStackNavigator } from '@react-navigation/stack';

import { AuthRoutes } from '../routes/auth.routes';
import Splash from '../screens/SplashScreen';
import Home from '../screens/Home';

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
            component={Home}
        />
        <Screen 
            name="logout"
            component={AuthRoutes}
        />
    </Navigator>
)}
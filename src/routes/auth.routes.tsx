import { createStackNavigator } from '@react-navigation/stack';
import { StackRoutes } from '../routes/app.routes';
import LoginScreen from '../screens/Login';

const { Navigator, Screen } = createStackNavigator();

export function AuthRoutes(){
    return (
        <Navigator screenOptions={{headerShown: false, animationEnabled: true, gestureEnabled: false, gestureDirection: 'horizontal'}} >
            <Screen 
               name='Signin'
               component={LoginScreen}
            />
            <Screen 
               name='StackRoutes'
               component={StackRoutes}
            />
        </Navigator>
    )
}
import { createStackNavigator } from '@react-navigation/stack';
import { StackRoutes } from '../routes/app.routes';
import LoginScreen from '../screens/Login';
import CreateUser from '../screens/CreateUser';
import RecoveryScreen from '../screens/RecoveryScreen';

const { Navigator, Screen } = createStackNavigator();

export function AuthRoutes(){
    return (
        <Navigator screenOptions={{headerShown: false, animationEnabled: true, gestureEnabled: false, gestureDirection: 'horizontal'}} >
            <Screen 
               name='LoginScreen'
               component={LoginScreen}
            />
            <Screen 
               name='Signup'
               component={CreateUser}
            />
            <Screen 
               name='recovery'
               component={RecoveryScreen}
          />
            <Screen 
               name='StackRoutes'
               component={StackRoutes}
            />
        </Navigator>
    )
}
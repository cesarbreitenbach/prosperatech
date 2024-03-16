import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Home from '../screens/Home';
import SlotMachineScreen from '../screens/SlotMachineScreen';

import FontAwesome from 'react-native-vector-icons/FontAwesome5'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import theme from '../styles/theme';

const Tab = createBottomTabNavigator();

export function MyTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: theme.colors.verde_esmeralda,
        tabBarInactiveTintColor: theme.colors.dark_gold,
        tabBarLabelStyle: { marginBottom: 6},
        tabBarStyle: { backgroundColor: theme.colors.shape_dark, height: 80},
      }}
      initialRouteName='Wallet'
       >
      <Tab.Screen name="Wallet" 
                  component={Home} 
                  options={{
                    tabBarLabel: 'Wallet',
                    tabBarIcon: ({ color, size }) => (
                      <FontAwesome name="wallet" color={color} size={30} />
                    ),
                  }}
                  
                  />
      <Tab.Screen 
                  name="Machine" 
                  component={SlotMachineScreen} 
                  options={{
                    tabBarLabel: 'Machine',
                    tabBarIcon: ({ color, size }) => (
                      <MaterialCommunityIcons name="slot-machine" color={color} size={38} />
                    ),
                  }}
                  />
    </Tab.Navigator>
  );
}
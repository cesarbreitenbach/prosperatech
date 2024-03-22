import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Home from '../screens/Home';
import SlotMachineScreen from '../screens/SlotMachineScreen';
import SettingsScreen from '../screens/SettingsScreen';

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
        tabBarStyle: { backgroundColor: theme.colors.shape_dark, paddingBottom: 8},
      }}
      initialRouteName='Wallet'
       >
      <Tab.Screen name="Wallet" 
                  component={Home} 
                  options={{
                    tabBarLabel: 'Cryptominas',
                    tabBarIcon: ({ color, size }) => (
                      <MaterialCommunityIcons name="piggy-bank" color={color} size={20} />
                    ),
                  }}
                  
                  />
      <Tab.Screen 
                  name="Machine" 
                  component={SlotMachineScreen} 
                  options={{
                    tabBarLabel: 'Jogue na SlotMachine',
                    tabBarIcon: ({ color, size }) => (
                      <MaterialCommunityIcons name="robot" color={color} size={20} />
                    ),
                  }}
                  />
      <Tab.Screen 
                  name="Settings" 
                  component={SettingsScreen} 
                  options={{
                    tabBarLabel: 'Opções',
                    tabBarIcon: ({ color, size }) => (
                      <MaterialCommunityIcons name="account-settings" color={color} size={20} />
                    ),
                  }}
                  />
    </Tab.Navigator>
  );
}
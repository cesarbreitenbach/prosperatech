import 'react-native-gesture-handler';
import { ThemeProvider } from 'styled-components';

import theme from './src/styles/theme';


import FlashMessage from 'react-native-flash-message';
import { Routes } from './src/routes';
import { AuthProvider } from './src/hooks/auth';
import { NavigationContainer } from '@react-navigation/native';

export default function App() {

  return (
    <ThemeProvider theme={theme}> 
      <NavigationContainer>
        <AuthProvider>
          <Routes />
          <FlashMessage position="top" />
        </AuthProvider>
      </NavigationContainer>
    </ThemeProvider>
  );
}
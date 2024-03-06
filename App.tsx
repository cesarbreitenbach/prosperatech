import 'react-native-gesture-handler';
import { ThemeProvider } from 'styled-components';

import theme from './src/styles/theme';


import FlashMessage from 'react-native-flash-message';
import { Routes } from './src/routes';

export default function App() {

  return (
    <ThemeProvider theme={theme}> 
      <Routes />
      <FlashMessage position="top" />
    </ThemeProvider>
  );
}
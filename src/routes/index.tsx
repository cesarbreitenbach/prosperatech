import { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';

import { StackRoutes } from './app.routes';
import { AuthRoutes } from './auth.routes';
import { useAuthContext } from '../hooks/auth';
import { WalletProvider } from '../hooks/wallet';
import { SlotMachineProvider } from '../hooks/slotmachine';
import { SettingsProvider } from '../hooks/settings';
import { useAsyncStorage } from '@react-native-async-storage/async-storage';


export function Routes() {
  const AUTHKEY = '@prosperatech:logged';
  const { logged } = useAuthContext();
  const {setItem, getItem, removeItem} = useAsyncStorage(AUTHKEY);
  // const logged = true;
  useEffect(() => {

      console.log(`estou logado?? ${logged }`)
 
  }, [logged])

  return (
  
    <SettingsProvider>
        <WalletProvider>
          <SlotMachineProvider>
          { logged ? <StackRoutes /> : <AuthRoutes /> }
          </SlotMachineProvider>
        </WalletProvider>
    </SettingsProvider>
 
    
  );
}

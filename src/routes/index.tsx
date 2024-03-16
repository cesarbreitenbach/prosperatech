import { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';

import { StackRoutes } from './app.routes';
import { AuthRoutes } from './auth.routes';
import { useAuthContext } from '../hooks/auth';
import { WalletProvider } from '../hooks/wallet';
import { SlotMachineProvider } from '../hooks/slotmachine';


export function Routes() {
  const { logged } = useAuthContext();
  // const logged = true;
  useEffect(() => {
    console.log(`estou logado?? ${logged}`)
  }, [logged])

  return (
  
      <WalletProvider>
        <SlotMachineProvider>
        { logged ? <StackRoutes /> : <AuthRoutes /> }
        </SlotMachineProvider>
      </WalletProvider>
 
    
  );
}

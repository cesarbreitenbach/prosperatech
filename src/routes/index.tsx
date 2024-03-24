import { useEffect } from 'react';
import { StackRoutes } from './app.routes';
import { AuthRoutes } from './auth.routes';
import { useAuthContext } from '../hooks/auth';
import { WalletProvider } from '../hooks/wallet';
import { SlotMachineProvider } from '../hooks/slotmachine';
import { SettingsProvider } from '../hooks/settings';
import { PlaySoundProvider } from '../hooks/usePlaySound';


export function Routes() {
  const { logged } = useAuthContext();

  useEffect(() => {

      console.log(`estou logado?? ${logged }`)
 
  }, [logged])

  return (
  
    <SettingsProvider>
        <WalletProvider>
          <SlotMachineProvider>
            <PlaySoundProvider>
              { logged ? <StackRoutes /> : <AuthRoutes /> }
            </PlaySoundProvider>
          </SlotMachineProvider>
        </WalletProvider>
    </SettingsProvider>
 
    
  );
}

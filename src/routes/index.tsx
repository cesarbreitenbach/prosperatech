import { useEffect } from 'react';
import { StackRoutes } from './app.routes';
import { AuthRoutes } from './auth.routes';
import { useAuthContext } from '../hooks/auth';
import { WalletProvider } from '../hooks/wallet';
import { SlotMachineProvider } from '../hooks/slotmachine';
import { SettingsProvider } from '../hooks/settings';
import { PlaySoundProvider } from '../hooks/usePlaySound';
import { BillingProvider } from '../hooks/billing';
import { withIAPContext } from 'react-native-iap';


function Routes() {
  const { logged } = useAuthContext();

  useEffect(() => {

      console.log(`estou logado?? ${logged }`)
 
  }, [logged])

  return (
  
    <SettingsProvider>
        <WalletProvider>
          <SlotMachineProvider>
            <PlaySoundProvider>
              <BillingProvider>
                 { logged ? <StackRoutes /> : <AuthRoutes /> }
              </BillingProvider>
            </PlaySoundProvider>
          </SlotMachineProvider>
        </WalletProvider>
    </SettingsProvider>
 
    
  );
}

export default withIAPContext(Routes);
import { useEffect, useState } from 'react';
import { StackRoutes } from './app.routes';
import { AuthRoutes } from './auth.routes';
import { useAuthContext } from '../hooks/auth';
import { WalletProvider } from '../hooks/wallet';
import { SlotMachineProvider } from '../hooks/slotmachine';
import { useSettingsContext } from '../hooks/settings';
import { PlaySoundProvider } from '../hooks/usePlaySound';
import { BillingProvider } from '../hooks/billing';
import { withIAPContext } from 'react-native-iap';
import Closed from '../components/Closed';
import WrongVersion from '../components/WrongVersion';
import DeviceInfo from 'react-native-device-info';


function Routes() {
  const { logged } = useAuthContext();
  const { serverStatus, appVersion, liberateVersions } = useSettingsContext();
  const [userVersion, setUserVersion] = useState('');

  useEffect(() => {
      const userVersion = DeviceInfo.getVersion();
      setUserVersion(userVersion);
      console.log(`estou logado?? ${logged }`);
      console.log(`Server Status: ${serverStatus}`)
      console.log(`Versão do APP: ${appVersion}`)
      console.log(`Versão do Usuario: ${userVersion}`)

      
 
  }, [logged, serverStatus])


  return (
  
        <WalletProvider>
          <SlotMachineProvider>
            <PlaySoundProvider>
              <BillingProvider> 
              {!serverStatus ? (
                  <Closed />
                ) : liberateVersions ? (
                  logged ? <StackRoutes /> : <AuthRoutes />
                ) : (
                  appVersion !== userVersion ? <WrongVersion /> : logged ? <StackRoutes /> : <AuthRoutes />
                )}
              </BillingProvider>
            </PlaySoundProvider>
          </SlotMachineProvider>
        </WalletProvider>
  );
}

export default withIAPContext(Routes);
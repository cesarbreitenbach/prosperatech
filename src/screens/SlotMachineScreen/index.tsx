import { useTheme } from 'styled-components';
import { Container, Label } from './styled';
import SlotMachineRunner from '../../components/SlotMachineRunner';
import { useWalletContext } from '../../hooks/wallet';
import { useEffect } from 'react';
import { useAuthContext } from '../../hooks/auth';
import symbols from '../../assets/symbols/game';
import Header from '../../components/Header';
import backgroundImage from '../../assets/images/headerSlot.png';
import { useSettingsContext } from '../../hooks/settings';
import { useNavigation } from '@react-navigation/native';


export default function SlotMachineScreen() {
  const theme = useTheme();
  const {getSaldo} = useWalletContext();
  const {serverStatus, loading, userVersion, appVersion, liberateVersions} = useSettingsContext();
  const navigation = useNavigation<any>();

  useEffect(() => {
    
    if(!serverStatus && loading){
        console.log(`fechando servidor....`);
        navigation.navigate('closed');
        return;
    }
    if(liberateVersions) return;
    if(userVersion !== appVersion){
      console.log(`Versão invalida....`);
      navigation.navigate('wrongVersion')
    }
}, [serverStatus, appVersion]);

  useEffect(() => {
    getSaldo();
  }, [])

  return (
    <Container>
      <Header backgroundImage={backgroundImage} width={600} height={90} />
      <SlotMachineRunner symbols={symbols} />
    </Container>
  );
}

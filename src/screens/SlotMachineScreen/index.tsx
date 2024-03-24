import { useTheme } from 'styled-components';
import { Container, Label } from './styled';
import SlotMachineRunner from '../../components/SlotMachineRunner';
import { useWalletContext } from '../../hooks/wallet';
import { useEffect } from 'react';
import { useAuthContext } from '../../hooks/auth';
import symbols from '../../assets/symbols/game';
import Header from '../../components/Header';
import backgroundImage from '../../assets/images/headerSlot.png';


export default function SlotMachineScreen() {
  const theme = useTheme();
  const {getSaldo} = useWalletContext();

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

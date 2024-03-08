// import { useNavigation } from '@react-navigation/native';
import { useTheme } from 'styled-components';
import { Container, Header, Label } from './styled';
import SlotMachineRunner from '../../components/SlotMachineRunner';
import { useWalletContext } from '../../hooks/wallet';
import { useEffect } from 'react';
import { useAuthContext } from '../../hooks/auth';

export default function Home() {
  const theme = useTheme();
  const {getSaldo} = useWalletContext();
  const {user} = useAuthContext();

  useEffect(() => {
    getSaldo(user.id);
  }, [])

  return (
    <Container>
      <SlotMachineRunner />
    </Container>
  );
}

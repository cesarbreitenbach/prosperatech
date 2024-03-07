// import { useNavigation } from '@react-navigation/native';
import { useTheme } from 'styled-components';
import { Container, Header, Label } from './styled';
import SlotMachine from '../../components/SlotMachine';
import SlotMachineRunner from '../../components/SlotMachineRunner';

export default function Home() {
  const theme = useTheme();

  return (
    <Container>
      <Header>
          <Label>SlotMachine!!!!</Label>
      </Header>
      <SlotMachineRunner />
    </Container>
  );
}

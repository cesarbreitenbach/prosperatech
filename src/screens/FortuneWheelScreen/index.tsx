import { useTheme } from 'styled-components';
import { Container, Label } from './styled';
import { useWalletContext } from '../../hooks/wallet';
import { useEffect } from 'react';
import WheelOfFortune from "react-native-wheel-of-fortune";
import Header from '../../components/Header';
import backgroundImage from '../../assets/images/headerSlot.png';
import { Button } from 'react-native';


export default function FortuneWheelScreen() {
  const theme = useTheme();
  const {getSaldo} = useWalletContext();

  const participants = [
    '%10',
    '%20',
    '%30',
    '%40',
    '%50',
    '%60',
    '%70',
    '%90',
    'FREE',
  ];
  const wheelOptions = {
        rewards: participants,
        knobSize: 50,
        borderWidth: 5,
        borderColor: '#000',
        innerRadius: 50,
        duration: 4000,
        backgroundColor: 'transparent',
        textAngle: 'horizontal',
        knobSource: require('./assets/images/knob.png'),
        getWinner: (value, index) => {
          this.setState({winnerValue: value, winnerIndex: index});
        },
        onRef: (ref) => {
          this.child = ref;
        }
      };


  useEffect(() => {
    getSaldo();
  }, [])



  return (
    <Container>
      <Header backgroundImage={backgroundImage} width={600} height={90} />
      <WheelOfFortune
          options={wheelOptions}
      />
      <Button title="Press me" onPress={ () => { this.child._onPress() } } />
    </Container>
  );
}

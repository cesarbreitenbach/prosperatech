import React from 'react';

import { ButtonArea, Coin, Title } from './styles';
import { useWalletContext } from '../../hooks/wallet';
import { showMessage } from 'react-native-flash-message';


interface BetButtonProps {
    setBetValue: (value: any) => void;
    setLasValue: (value: number) => void;
    id?: number,
    value: number,
    label: string,
    img: any,
    selectedBetCoin: string;
}

const BetButton = ({label, img, value, setBetValue, selectedBetCoin, setLasValue} : BetButtonProps) => {
  const handleBet = (value: number) => {
    setBetValue((old: number) => old + value);
    setLasValue(value);
  }

  return <ButtonArea onPress={() => handleBet(value)}>
            <Coin source={img}/>
            <Title>{label}</Title>
         </ButtonArea>
            }

export default BetButton;
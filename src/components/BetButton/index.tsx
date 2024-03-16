import React from 'react';

import { ButtonArea, Coin, Title } from './styles';


interface BetButtonProps {
    setBetValue: (value: any) => void;
    id?: number,
    value: number,
    label: string,
    img: any
}

const BetButton = ({label, img, value, setBetValue}: BetButtonProps) => {

  const handleBet = (value: number) => {
    setBetValue((old: number) => old + value);
  }

  return <ButtonArea onPress={() => handleBet(value)}>
            <Coin source={img}/>
            <Title>{label}</Title>
         </ButtonArea>
            }

export default BetButton;
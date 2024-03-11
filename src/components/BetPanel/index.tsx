import React, { useEffect, useState } from 'react';
import { Container, Input, InputArea, Title } from './styles';
import { useTheme } from 'styled-components';
import fichaCem from '../../assets/images/fichaBonus.png'
import fichaGold from '../../assets/images/fichaGold.png'
import { Image, Platform } from 'react-native';

interface BetPanelProps{
    setBetValue: (value: string) => void;
    betValue: string;
}

const BetPanel: React.FC<BetPanelProps> = ({setBetValue, betValue}) => {

  const theme = useTheme();
  return <Container > 
        
                
                <InputArea>
                    <Title>Valor da aposta:</Title>
                    <Input value={betValue} onChangeText={setBetValue} keyboardType='number-pad'/>
                </InputArea>
                
   
            
         </Container>
}

export default BetPanel;
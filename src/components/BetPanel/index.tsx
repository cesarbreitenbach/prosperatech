import React, { useEffect, useState } from 'react';
import { Container, Header, Input, InputArea, Title } from './styles';
import { useTheme } from 'styled-components';
import fichaCem from '../../assets/images/fichaBonus.png'
import fichaGold from '../../assets/images/fichaGold.png'
import { Image, Platform } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { betValues } from './betsValue';
import BetButton from '../BetButton';

interface BetPanelProps{
    setBetValue: (value: number) => void;
    betValue: number;
}

const BetPanel: React.FC<BetPanelProps> = ({setBetValue, betValue}) => {

  const theme = useTheme();

  const formatBetValue = (value: number) => {
    return value.toFixed(2); // Fixa o número de casas decimais em 2
  };
  
  const handleInputChange = (text: string) => {
    // Aqui você pode converter o texto em número, se necessário
    // Por exemplo, você pode usar parseInt ou parseFloat
    const newValue: number = parseInt(text, 10); // Convertendo para número inteiro

    // Atualize o estado com o novo valor
    setBetValue(isNaN(newValue) ? 0 : newValue);
};
  return <Container > 
        
                
                <InputArea>
                    <Header>
                      <Title>Valor da aposta:</Title>
                      <Input value={formatBetValue(betValue)} onChangeText={handleInputChange} keyboardType='number-pad'/>
                    </Header>

                    <FlatList 
                       data={betValues}
                       horizontal
                       contentContainerStyle={{
                        padding: 12
                       }}
                       renderItem={({item}) => { 
                         return (
                          <BetButton label={item.label} img={item.img} setBetValue={setBetValue} value={item.value}/>
                         )
                        }}
                    
                    />
                    
                </InputArea>
                
   
            
         </Container>
}

export default BetPanel;
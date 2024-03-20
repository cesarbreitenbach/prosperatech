import React, { useEffect, useState } from 'react';
import { ButtonClearArea, Container, Header, Input, InputArea, Title } from './styles';
import { useTheme } from 'styled-components';
import { FlatList } from 'react-native-gesture-handler';
import { betValues } from './betsValue';
import BetButton from '../BetButton';

interface BetPanelProps{
    title: string;
    setBetValue: (value: number) => void;
    betValue: number;
    selectedBetCoin: string;
}

const BetPanel: React.FC<BetPanelProps> = ({setBetValue, betValue, title, selectedBetCoin}) => {

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

  const handleClear = () => {
    setBetValue(0)
  }

  return <Container > 
        
                
                <InputArea>
                    <Header>
                      <Title>{title}</Title>
                      <ButtonClearArea onPress={handleClear}>
                         <Title>Zerar</Title>
                      </ButtonClearArea>
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
                          <BetButton selectedBetCoin={selectedBetCoin} label={item.label} img={item.img} setBetValue={setBetValue} value={item.value}/>
                         )
                        }}
                    
                    />
                    
                </InputArea>
                
   
            
         </Container>
}

export default BetPanel;
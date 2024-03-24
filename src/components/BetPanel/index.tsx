import React, { useEffect, useState } from 'react';
import { ButtonArea, ButtonClearArea, Container, Header, Input, InputArea, Title } from './styles';
import { useTheme } from 'styled-components';
import { FlatList } from 'react-native-gesture-handler';
import { betValues } from './betsValue';
import BetButton from '../BetButton';
import { useWalletContext } from '../../hooks/wallet';
import { formatarMoeda } from '../../services/formatService';

interface BetPanelProps{
    title: string;
    setBetValue: (value: any) => void;
    betValue: number;
    selectedBetCoin: string;
}

const BetPanel: React.FC<BetPanelProps> = ({setBetValue, betValue, title, selectedBetCoin}) => {

  const {amount} = useWalletContext()
 
  const theme = useTheme();

  const [lastValue, setLasValue] = useState(0); // Valor da ultima ficha clicada

  const [filteredBetValues, setFilteredBetValues] = useState(betValues)

  useEffect(() => {
    if (selectedBetCoin === 'ficha') {
      if(Number(amount.amountReal) > 20000) {
        const newFilteredList = betValues.filter(item => item.value > 10)
        setFilteredBetValues(newFilteredList);
      } else {
        const newFilteredList = betValues.filter(item => item.value <= 100)
        setFilteredBetValues(newFilteredList);
      }
    } else {
      if(Number(amount.amountBonus) > 20000) {
        const newFilteredList = betValues.filter(item => item.value >= 10)
        setFilteredBetValues(newFilteredList);
      } else {
        const newFilteredList = betValues.filter(item => item.value <= 100)
        setFilteredBetValues(newFilteredList);
      }
    }
  }, [amount])

  const handleClear = () => {
    setBetValue(0)
  }
  const handleAllIn = () => {
    if (selectedBetCoin === 'ficha') {
      setBetValue(Number(amount.amountReal));
    } else {
      setBetValue(Number(amount.amountBonus));
    }
  }

  const handleDiscount = () => {
    if(betValue<=0) return;
    setBetValue((old: number) => old - Number(lastValue))
  }

  return <Container > 
        
                
                <InputArea>
                    <FlatList 
                          data={filteredBetValues}
                          horizontal
                          contentContainerStyle={{
                            padding: 12
                          }}
                          renderItem={({item}) => { 
                            return (
                              <BetButton setLasValue={setLasValue} selectedBetCoin={selectedBetCoin} label={item.label} img={item.img} setBetValue={setBetValue} value={item.value}/>
                            )
                            }}
                        
                        />
                    <Header>
                      <Title>{title}</Title>
                      <Input>{formatarMoeda(betValue.toString())}</Input>
                      <ButtonArea>
                        <ButtonClearArea color={theme.colors.success} onPress={handleAllIn}>
                          <Title>All In</Title>
                        </ButtonClearArea>
                        <ButtonClearArea color={theme.colors.borgonha_intenso} onPress={handleDiscount}>
                          <Title>Descontar</Title>
                        </ButtonClearArea>
                        <ButtonClearArea color={theme.colors.azulFck} onPress={handleClear}>
                          <Title>Zerar</Title>
                        </ButtonClearArea>
                      </ButtonArea>
                      
                    </Header>

                   
                    
                </InputArea>
                
   
            
         </Container>
}

export default BetPanel;
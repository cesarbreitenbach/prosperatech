import React, { useState } from 'react';
import { AmountArea, BankBalance,  Container, Item, Title } from './styles';
import { Image } from 'react-native';
import fichaCem from '../../assets/images/fichaBonus.png'
import fichaGold from '../../assets/images/fichaGold.png'


interface InfoUserProps {
    realAmount: string;
    bonusAmount: string;
    selectedCoin: string;
    setSelectedCoin: (value: string) => void;
}

const InfoUser: React.FC<InfoUserProps> = ({realAmount, bonusAmount, selectedCoin, setSelectedCoin}) => {

  return <Container> 
            <Item active={selectedCoin === 'ficha'} onPress={() => setSelectedCoin('ficha')}>
                <Title>Fichas</Title>
                <AmountArea>
                    <Image source={fichaGold} style={{width: 40, height: 40}}  /> 
                    <BankBalance>{realAmount}</BankBalance>
                </AmountArea>
            </Item>
            <Item active={selectedCoin === 'bonus'} onPress={() => setSelectedCoin('bonus')}>
                <Title>Bônus</Title>
                <AmountArea>
                    <Image source={fichaCem} style={{width: 40, height: 40}}  /> 
                    <BankBalance>{bonusAmount}</BankBalance>
                </AmountArea>
            </Item>
            
         </Container>
}

export default InfoUser;

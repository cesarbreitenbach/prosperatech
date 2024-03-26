import React from 'react';

import { ContentArea, ImageArea, Saldo, SaldoArea, Title } from './styles';
import { Image } from 'react-native';

import fichaGold from '../../assets/images/fichaGold.png';
import fichaBonus from '../../assets/images/fichaBonus.png';

interface SaldoPanelProps {
    amountReal: string;
    amountBonus: string;
    width: number;
    height: number;
}

const SaldoPanel = ({amountBonus, amountReal, width, height}: SaldoPanelProps) => {
  return <ContentArea>
            <SaldoArea>
                <Title>Ficha Gold</Title>
                <Saldo>$ {amountReal}</Saldo>
                <ImageArea>
                    <Image source={fichaGold} style={{width: width, height: height}}/> 
                </ImageArea>
            </SaldoArea>
            <SaldoArea>
                <Title>Bônus</Title>
                <Saldo>$ {amountBonus}</Saldo>
                <ImageArea>
                    <Image  source={fichaBonus} style={{width: width, height: height}} /> 
                </ImageArea>
            </SaldoArea>
            </ContentArea>
}

export default SaldoPanel;
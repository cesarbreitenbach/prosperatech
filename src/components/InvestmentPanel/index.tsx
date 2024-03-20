import React from 'react';

import { AmountAway, ImageInvestArea, InvestMentArea, InvestMentTitle, InvestmentTax, Item, TextArea, Title, TypeArea, TypeText } from './styled';
import { Image, ImageSourcePropType } from 'react-native';

interface IvestmentPanelProps {
    onPress: () => void;
    resourceImage: ImageSourcePropType;
    coinTypeImage: ImageSourcePropType;
    earnedAmount: string; 
    tax: string;
    name: string;
    finalizaEm: string;
}

const InvestmentPanel = ({resourceImage, coinTypeImage, earnedAmount, tax, name, finalizaEm, onPress}: IvestmentPanelProps) => {
  return <InvestMentArea onPress={onPress}>
            <ImageInvestArea>
                <Image source={resourceImage} style={{width: 70, height: 70}}/> 
                <InvestMentTitle>{name}</InvestMentTitle> 
            </ImageInvestArea>
            <TextArea>
                <Item>
                    <Title>Mineração base:</Title>
                    <InvestmentTax>{tax} %</InvestmentTax>
                </Item>
                <Item>
                    <Title>Saldo Retido:</Title>
                    <AmountAway>$ {earnedAmount}</AmountAway>
                </Item>
            </TextArea>
            <TypeArea>
                <Item>
                    <TypeText>Tipo:</TypeText>
                    <Image  source={coinTypeImage} style={{width: 20, height: 20}} />
                </Item>
                <Item>
                    <TypeText>Finaliza em:</TypeText>
                    <AmountAway>{finalizaEm} dias</AmountAway>
                </Item>
            </TypeArea>
            
        </InvestMentArea>  
}

export default InvestmentPanel;
import React from 'react';

import { AmountAway, ImageInvestArea, InvestMentArea, InvestMentTitle, InvestmentTax, Item, TextArea, Title, TypeArea, TypeText } from './styled';
import { Image, ImageSourcePropType } from 'react-native';
import { formatarMoeda } from '../../services/formatService';

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
                    <Title>Saldo Retido:</Title>
                    <AmountAway>$ {formatarMoeda(earnedAmount)}</AmountAway>
                </Item>
            </TextArea>
            <TypeArea>
                <Item>
                    <TypeText>Recurso:</TypeText>
                    <Image  source={coinTypeImage} style={{width: 30, height: 30, alignSelf: 'center'}} />
                </Item>
                <Item>
                    <TypeText>Finaliza em:</TypeText>
                    <AmountAway>{finalizaEm} dias</AmountAway>
                </Item>
            </TypeArea>
            
        </InvestMentArea>  
}

export default InvestmentPanel;
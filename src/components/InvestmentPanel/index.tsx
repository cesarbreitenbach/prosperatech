import React from 'react';

import { AmountAway, ImageInvestArea, InvestMentArea, InvestMentTitle, InvestmentTax, Item, TextArea, Title, TypeArea, TypeText } from './styled';
import { Image, ImageSourcePropType } from 'react-native';

interface IvestmentPanelProps {
    resourceImage: ImageSourcePropType;
    coinTypeImage: ImageSourcePropType;
    earnedAmount: string; 
    tax: string;
    name: string;
}

const InvestmentPanel = ({resourceImage, coinTypeImage, earnedAmount, tax, name}: IvestmentPanelProps) => {
  return <InvestMentArea>
            <ImageInvestArea>
                <Image source={resourceImage} style={{width: 70, height: 70}}/> 
                <InvestMentTitle>{name}</InvestMentTitle> 
            </ImageInvestArea>
            <TextArea>
                <Item>
                    <Title>Pagando Roys:</Title>
                    <InvestmentTax>{tax} %</InvestmentTax>
                </Item>
                <Item>
                    <Title>Saldo Retido:</Title>
                    <AmountAway>$ {earnedAmount}</AmountAway>
                </Item>
                <TypeArea>
                    <Item>
                        <TypeText>Tipo:</TypeText>
                        <Image  source={coinTypeImage} style={{width: 20, height: 20}} />
                    </Item>
                </TypeArea>
            </TextArea>
            
        </InvestMentArea>  
}

export default InvestmentPanel;
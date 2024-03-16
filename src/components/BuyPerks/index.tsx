import React from 'react';

import { Container, Content, Cost, Description, ImageArea, Item, Label, Tax, Text, TypeCoin } from './styled';
import { Image, ImageSourcePropType } from 'react-native';

interface BuyPerksProps {
    description: string;
    name: string;
    cost: string;
    type: string;
    tax: string;
    image: ImageSourcePropType;
    setActivePerk: (value: string) => void;
    activePerk: string;
}

const BuyPerks = ({description, cost, type, tax, image, name, setActivePerk, activePerk}: BuyPerksProps) => {
  const handlePress = () => {
    setActivePerk(name);
  }
  
  return <Container active={activePerk === name} onPress={handlePress}> 
           <Content>
                <ImageArea>
                    <Image source={image} style={{width: 30, height: 30}}/>
                </ImageArea>
                <Description>{name}</Description>
                <Item>
                    <Label>Custo:</Label>
                    <Cost>$ {cost}</Cost>
                </Item>
                <Item>
                    <Label>Moeda:</Label>
                    <TypeCoin>{type}</TypeCoin>
                </Item>
                <Item>
                    <Label>Taxa Lucratividade:</Label>
                    <Tax>{tax} %</Tax>
                </Item>
                
           </Content>
           <Text>{description}</Text>
         </Container>
}

export default BuyPerks;
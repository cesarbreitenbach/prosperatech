import React from 'react';

import { AreaMore, Container, Content, Cost, Description, ImageArea, Item, Label, Tax, Text, TypeCoin } from './styled';
import { Image, ImageSourcePropType } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'
import theme from '../../styles/theme';
import { IActivePerk } from '../../@types/wallet';

import fichaBonus from '../../assets/images/fichaBonus.png'
import fichaGold from '../../assets/images/fichaGold.png'




interface BuyPerksProps {
    id: number;
    hasMore: boolean;
    description: string;
    name: string;
    cost: string;
    type: string;
    tax: string;
    image: ImageSourcePropType;
    setActivePerk: (value: IActivePerk) => void;
    activePerk: IActivePerk;
}

const BuyPerks = ({id, description, hasMore, cost, type, tax, image, name, setActivePerk, activePerk}: BuyPerksProps) => {
  const handlePress = () => {
    setActivePerk({name, cost, id});
  }

  const formatType = (value: string) => {
    return value === 'ficha' ? <Image source={fichaGold} style={{width: 30, height: 30}} /> : <Image source={fichaBonus} style={{width: 30, height: 30}} />
  }
  
  return <Container active={activePerk.name === name} onPress={handlePress}> 
           <Content>
                <ImageArea>
                    <Image source={image} style={{width: 40, height: 40}}/>
                </ImageArea>
                <Description>{name}</Description>
                <Item>
                    <Label color={theme.colors.borgonha_intenso}>Custo:</Label>
                    <Cost>$ {cost}</Cost>
                </Item>
                <Item>
                    <Label color={theme.colors.azulFck}>Compra com:</Label>
                    <TypeCoin>{formatType(type)}</TypeCoin>
                    
                </Item>
                <Item>
                    <Label color={theme.colors.success}>+ Taxa Mineração:</Label>
                    <Tax>{tax} %</Tax>
                </Item>
                
           </Content>
           <Text>{description}</Text>
           {hasMore && <AreaMore>
              <Icon name='arrow-forward-ios' size={32} color={theme.colors.white}/>
           </AreaMore>}
         </Container>
}

export default BuyPerks;
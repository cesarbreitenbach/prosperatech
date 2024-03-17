import React from 'react';

import Icon from 'react-native-vector-icons/MaterialIcons'
import { View } from 'react-native';
import { ButtonArea, BuyInfoArea, ConfirmArea, Cost, CostsArea, Item, Label, Title } from './styled';
import theme from '../../styles/theme';

interface BuyInfoPanelProps {
    cost: string;
    name: string;
    qtdItems: number;
    onAdd: () => void;
    onDel: () => void;
    onBuy: () => void;
}

const BuyInfoPanel = ({cost, name, qtdItems, onAdd, onBuy, onDel}: BuyInfoPanelProps) => {
    const totalCost = !isNaN(Number(cost)) ? Number(cost) * qtdItems : 0;
  return  <BuyInfoArea>
            <CostsArea>
                <Title>{name}</Title>
                <View style={{flexDirection: 'row',  alignItems:'center'}}>
                    <Label>Custo total:</Label>
                    <Cost>$ {totalCost}</Cost>
                </View>
                <Label>Itens:</Label>
                <Cost>{qtdItems} Itens</Cost>
            </CostsArea>
            <ButtonArea>
                <Item width={30} height={30}  onPress={onAdd}>
                    <Icon name='add' size={25} color={theme.colors.white}/>
                </Item>
                <Item width={30} height={30}  onPress={onDel}>
                    <Icon name='remove' size={25} color={theme.colors.white}/>
                </Item>
            </ButtonArea>
            <ConfirmArea>
                <Item width={80} height={60} onPress={onBuy}>
                    <Icon name='currency-exchange' size={45} color={theme.colors.white}/>
                </Item>
                <Label>Confirma</Label>
            </ConfirmArea>
        </BuyInfoArea>
}

export default BuyInfoPanel;
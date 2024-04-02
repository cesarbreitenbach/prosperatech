import React from 'react';

import { ButtonArea, ContentArea, Title } from './styled';
import { ProductItemProps } from '../../@types/billing';
import { Image } from 'react-native';
import monteFicha from '../../assets/images/monteFicha.png';
import theme from '../../styles/theme';

interface BuyGoldItemProps {
  item: ProductItemProps,
  setSelectedProduct: (value: ProductItemProps) => void;
  selectedProduct: ProductItemProps
}

const BuyGoldItem = ({item, setSelectedProduct, selectedProduct}: BuyGoldItemProps) => {

  const handleSelected = () => {
    setSelectedProduct({
      productId: item.productId,
      name: item.name,
      description: item.description,
      price: item.price,
    })
  }

  return <ButtonArea  selected={item.productId === selectedProduct.productId} onPress={handleSelected}>
            <ContentArea>
              <Title size={14} color={theme.colors.dark_gold}>{item.name}</Title>
              <Title size={16} color={theme.colors.success}>{item.price}</Title>
            </ContentArea>
            <Image source={monteFicha} style={{width: 40, height: 40}}/>
         </ButtonArea>
}

export default BuyGoldItem;
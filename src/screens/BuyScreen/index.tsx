import React, { useEffect, useState } from 'react';

import { ButtonArea, BuyText, Container, Title } from './styled';
import { useIAP } from 'react-native-iap';
import { FlatList } from 'react-native-gesture-handler';
import { ProductItemProps } from '../../@types/billing';
import BuyGoldItem from '../../components/BuyGoldItem';
import { useBillingContext } from '../../hooks/billing';
import { showMessage } from 'react-native-flash-message';

const BuyScreen: React.FC = () => {
  const {productList, getAllProducts, buyProduct} = useBillingContext();
  const [selectedPurchase, setSelectedPurchase] = useState<ProductItemProps>({} as ProductItemProps);

  useEffect(() => {
    getAllProducts();
  }, [])

  const handleBuy = () => {
    if (!selectedPurchase.productId) {
      showMessage({
        message: 'Selecione um produto!',
        type: 'danger'
      })
      return
    };
    buyProduct(selectedPurchase.productId)
  }

  return <Container> 
            <Title>Compre aqui suas</Title>
            <Title>Fichas Gold!</Title>
            <FlatList 
               contentContainerStyle={{padding: 12}}
               data={productList}
               renderItem={({item}) => <BuyGoldItem 
                                                    item={item}
                                                    selectedProduct={selectedPurchase!}
                                                    setSelectedProduct={setSelectedPurchase}
                                                    />}
            />

            <ButtonArea onPress={handleBuy}>
              <BuyText>Comprar agora!</BuyText>
            </ButtonArea>
         </Container>
}

export default BuyScreen;
import React, { useEffect, useState } from 'react';

import { ButtonArea, BuyText, Container, Title } from './styled';
import headerImage from '../../assets/images/banner5.png'
import { FlatList } from 'react-native-gesture-handler';
import { ProductItemProps } from '../../@types/billing';
import BuyGoldItem from '../../components/BuyGoldItem';
import { useBillingContext } from '../../hooks/billing';
import { showMessage } from 'react-native-flash-message';
import Header from '../../components/Header';

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
            <Header hasGoBack backgroundImage={headerImage} height={140}/>
            <Title>Compre suas Fichas Gold</Title>
            <Title>jogue, invista e saque!</Title>
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
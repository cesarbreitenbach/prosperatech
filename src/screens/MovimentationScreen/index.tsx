import React, { useEffect } from 'react';

import { Container, Title } from './styled';
import { FlatList } from 'react-native-gesture-handler';
import { useWalletContext } from '../../hooks/wallet';
import backgroundImage from '../../assets/images/movimentacao.png'
import ItemMovimentation from '../../components/ItemMovimentation';
import Header from '../../components/Header';

const MovimentationScreen: React.FC = () => {
  const {getMovimentation, userMovimentation} = useWalletContext();

  useEffect(() => {
    getMovimentation();
  }, [])

  useEffect(() => {
    console.log(`user movimentation ${JSON.stringify(userMovimentation)}`)
  }, [userMovimentation])

  return <Container> 
            <Header hasGoBack backgroundImage={backgroundImage} height={140}/>
            <FlatList 
               contentContainerStyle={{paddingBottom: 30}}
               data={userMovimentation}
               renderItem={({item}) => <ItemMovimentation createdAt={item.createdAt} amountBonus={item.amountBonus} tipo={item.tipo} amountReal={item.amountReal} />}
            />
         </Container>
}

export default MovimentationScreen;
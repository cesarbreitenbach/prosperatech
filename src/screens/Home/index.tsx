import { useTheme } from 'styled-components';
import {  ButtonArea, Container, ContentArea, EnderecoWallet, EnderecoWalletArea, ImageArea, Item, LastPayment, MinningTitle, NextPayment, PaymentArea, Saldo, SaldoArea, Title } from './styled';
import { useWalletContext } from '../../hooks/wallet';
import { useEffect } from 'react';
import { useAuthContext } from '../../hooks/auth';
import { Image } from 'react-native';
import Header from '../../components/Header';
import backgroundImage from '../../assets/images/monteMoedas.png'

import { MinningArea  } from './styled'

import fichaCem from '../../assets/images/fichaBonus.png'
import fichaGold from '../../assets/images/fichaGold.png'
import mine from '../../assets/images/mine.png'

import picareta from '../../assets/images/picaretaFerro.png'
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import InvestmentPanel from '../../components/InvestmentPanel';
import PerksPanel from '../../components/PerksPanel';
import Button from '../../components/Button';
import BuyPerks from '../../components/BuyPerks';
import { useNavigation } from '@react-navigation/native';
import SaldoPanel from '../../components/SaldoPanel';

export default function Home() {
  const theme = useTheme();
  const {getSaldo, amount, getInvestiments, investments, perkList } = useWalletContext();

  const navigation = useNavigation<any>();

  useEffect(() => {
    getSaldo();
    getInvestiments();
  }, [])

  return (
    <Container>
      <ScrollView>
          <Header backgroundImage={backgroundImage} height={140}/>
        
        <SaldoArea>
            <Title>Saldo:</Title>
            <Saldo>$ {amount.saldo}</Saldo>
        </SaldoArea>
        <EnderecoWalletArea>
            <Title>Endereço Wallet</Title>
            <EnderecoWallet numberOfLines={2} >{amount.endereco}</EnderecoWallet>
        </EnderecoWalletArea>

      <SaldoPanel amountBonus={amount.amountBonus} amountReal={amount.amountReal} width={40} height={40} />

      <MinningArea>
        <MinningTitle>Rendimentos e Ganhos </MinningTitle>
        
        <PaymentArea>
          <Item>
            <Title>Ultimo pagamento:</Title>
            <LastPayment> 12:00 01/01/2024</LastPayment>
          </Item>
          <Item>
            <Title>Proximo pagamento:</Title>
            <NextPayment> 12:00 01/01/2024</NextPayment>
          </Item>
        </PaymentArea>
        

        <FlatList 
           horizontal
           data={investments}
           contentContainerStyle={{backgroundColor: theme.colors.primary ,width: '100%', padding: 12, borderRadius: 12}}
           renderItem={({item}) => <InvestmentPanel 
                                       coinTypeImage={item.type === 'bonus' ? fichaCem : fichaGold } 
                                       earnedAmount={item.valorInvestido}
                                       name={item.descricao}
                                       resourceImage={mine}
                                       tax={item.taxaBase}
                                       />}
        />

       

        {/* <BuyPkerks /> */}

        <ButtonArea>
            <Button title='Adicionar Perk' onPress={() => navigation.navigate('investment')} color={theme.colors.dark_gold} />
        </ButtonArea>
        
      </MinningArea>

      </ScrollView>
     

      
    </Container>
  );
}

import { useTheme } from 'styled-components';
import {  BetArea,  Container, InvestmentTitle, Item, LastPayment, MinningTitle, NewMineArea, NextPayment, PaymentArea, Saldo, SaldoArea, Title, TitleNewMine, TitleSaldo, TitleTax } from './styled';
import { useWalletContext } from '../../hooks/wallet';
import { useEffect, useState } from 'react';
import Header from '../../components/Header';
import backgroundImage from '../../assets/images/monteMoedas.png'

import { MinningArea  } from './styled'

import fichaCem from '../../assets/images/fichaBonus.png'
import fichaGold from '../../assets/images/fichaGold.png'
import mine from '../../assets/images/mine.png'

import { FlatList, ScrollView } from 'react-native-gesture-handler';
import InvestmentPanel from '../../components/InvestmentPanel';
import Button from '../../components/Button';
import { useNavigation } from '@react-navigation/native';
import NewMine from '../../components/NewMine';
import BetPanel from '../../components/BetPanel';
import InfoUser from '../../components/InfoUser';
import { showMessage } from 'react-native-flash-message';
import BannerSlider from '../../components/BannerSlider';
import PlayNow from '../../components/PlayNow';

export default function Home() {
  const theme = useTheme();
  const {getSaldo, amount, getInvestiments, investments, buyCriptoMine, perkList, getLastCalculated, lastCalculated } = useWalletContext();

  const [investmentValue, setInvestmentValue] = useState(0);
  const [selectedCoin, setSelectedCoin] = useState("bonus");
  const [mineTaxes, setMineTaxes] = useState(0)

  const navigation = useNavigation<any>();

  useEffect(() => {
    getSaldo();
    getInvestiments();
    getLastCalculated();
  }, [])

  useEffect(() => {
    calculateMineHate();
  }, [perkList])

  const calculateMineHate = () => {
    const sumTaxPerk = perkList.reduce((acc, obj) => {
      const taxPerk = parseFloat(obj.taxPerk);
      return acc + taxPerk;
    }, 0);

    setMineTaxes(sumTaxPerk)
  }

  const handleBuyMine = () => {

    if(investmentValue === 0 || selectedCoin === '') {
      showMessage({
        message: "Parametros da compra invalidos, verifique moeda selecionada e valor investido!",
        type: "danger",
        duration: 3000
      });
      return;
    }

  
    if(selectedCoin === 'bonus' ) {
      if(investmentValue > Number(amount.amountBonus)) {
        showMessage({
          message: "Você não tem saldo suficiente!",
          type: "danger",
          duration: 3000
      });
      return;
      }
    } else {
      if(investmentValue > Number(amount.amountReal)) {
        showMessage({
          message: "Você não tem saldo suficiente!",
          type: "danger",
          duration: 3000
      });
      return;
      }
    }



    buyCriptoMine({
      amount: investmentValue,
      type: selectedCoin,
      idEarnType: 1 // por enquanto nao temos outros investimentos
    })

    setInvestmentValue(0);


  }

  const handleGoToInvestment = () => {
    navigation.navigate('investment')
  }

  const handlePlaynow = () => {
    navigation.navigate('Machine')
  }

  return (
    <Container>
      <ScrollView contentContainerStyle={{paddingBottom: 30}}>
          <Header backgroundImage={backgroundImage} height={140}/>

          <BannerSlider />
        
      <SaldoArea>
          <TitleSaldo>Saldo Total:</TitleSaldo>
          <Saldo>$ {amount.saldo}</Saldo>
      </SaldoArea>

      
      
      <InfoUser size={20} bonusAmount={amount.amountBonus} realAmount={amount.amountReal} selectedCoin={selectedCoin} setSelectedCoin={setSelectedCoin}/>
      <MinningArea>
          {/* <MinningTitle>Rendimentos e Ganhos </MinningTitle> */}
          <NewMineArea onPress={handlePlaynow}>
              <PlayNow />
              <TitleNewMine>Jogue Agora!</TitleNewMine>
          </NewMineArea>
          <PaymentArea>
            <Item>
              <Title>Ultimo pagamento:</Title>
              <LastPayment>{lastCalculated.lastTimeCalculated}</LastPayment>
            </Item>
            <Item>
              <Title>Proximo pagamento:</Title>
              <NextPayment>{lastCalculated.nextTimeToCalculate}</NextPayment>
            </Item>
          </PaymentArea>
          {investments?.length >= 0 && <NewMineArea onPress={handleBuyMine}>
              <NewMine />
              <TitleNewMine>Toque para Adicionar</TitleNewMine>
          </NewMineArea>}
          

          {investments?.length > 0 && <>
              <InvestmentTitle>Investimento em Cryptomina:</InvestmentTitle>
              <TitleTax>Poder de mineração em {mineTaxes} %</TitleTax>
          </>}
          <FlatList 
            horizontal
            data={investments}
            contentContainerStyle={{backgroundColor: theme.colors.dark_gold, borderRadius: 8, marginTop: 8,}}
            renderItem={({item}) => <InvestmentPanel 
                                        onPress={handleGoToInvestment}
                                        coinTypeImage={item.type === 'bonus' ? fichaCem : fichaGold } 
                                        earnedAmount={item.valorInvestido}
                                        name={item.descricao}
                                        resourceImage={mine}
                                        tax={item.taxaBase}
                                        finalizaEm={item.finalizaEm}
                                        />}
          />

          
          <BetArea>
              <BetPanel selectedBetCoin={selectedCoin} title="Valor à aplicar" setBetValue={setInvestmentValue} betValue={investmentValue} />
              {/* {investments?.length > 0 && <Button height={55} title='Investir na CryptoMina' onPress={handleBuyMine} color={theme.colors.dark_gold} />} */}
          </BetArea>
        
      </MinningArea>

      </ScrollView>
     

      
    </Container>
  );
}

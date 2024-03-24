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
import { formatToPostgresDecimal, formatarMoeda } from '../../services/formatService';
import Popup from '../../components/Popup';

export default function Home() {
  const theme = useTheme();
  const {getSaldo, amount, getInvestiments, investments, buyCriptoMine, perkList, getLastCalculated, lastCalculated } = useWalletContext();

  const [investmentValue, setInvestmentValue] = useState(0);
  const [selectedCoin, setSelectedCoin] = useState("bonus");
  const [mineTaxes, setMineTaxes] = useState(0)

  const [saldo, setSaldo] = useState(amount.saldo);
  const [fichaBonus, setFichaBonus] = useState(amount.amountBonus);
  const [gold, setGold] = useState(amount.amountReal);
  const [calculateTimes, setCalculateTimes] = useState({
    nextCalc: lastCalculated.nextTimeToCalculate,
    lastCalc: lastCalculated.lastTimeCalculated
  })
 
  const navigation = useNavigation<any>();
  const [showPopup, setShowPopup] = useState(false);
  const [popupTitle, setPopupTitle] = useState("");
  const [popupMessage, setPopupMessage] = useState("");

  useEffect(() => {
    getSaldo();
    getInvestiments();
    getLastCalculated();
  }, [])

  useEffect(() => {
    setSaldo(amount.saldo)
    setFichaBonus(amount.amountBonus)
    setGold(amount.amountReal)
    setCalculateTimes({lastCalc: lastCalculated.lastTimeCalculated, nextCalc: lastCalculated.nextTimeToCalculate})
  }, [amount, lastCalculated])

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
        message: "Você precisa selecionar um valor maior que zero para aplicar!!",
        type: "danger",
        duration: 3000
      });
      return;
    }

  
    let availableAmount;
    if (selectedCoin === 'bonus') {
      availableAmount = Number(amount.amountBonus);
    } else {
      availableAmount = Number(amount.amountReal);
    }

    if (investmentValue > availableAmount) {
      setShowPopup(true);
      setPopupTitle("Você não tem saldo!");
      setPopupMessage("Compre mais fichas ou aguarde o bônus de sua CryptoMine!");
      return;
    }

    console.log(`vou comprar as criptomines ${investmentValue.toString()}`)

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
      <ScrollView contentContainerStyle={{paddingBottom: 30}} showsVerticalScrollIndicator={false}>
          <Header backgroundImage={backgroundImage} height={120}/>

          <BannerSlider />
        
      <SaldoArea>
          <TitleSaldo>Saldo Total:</TitleSaldo>
          <Saldo>$ {formatarMoeda(saldo)}</Saldo>
      </SaldoArea>

      
      
      <InfoUser size={20} bonusAmount={fichaBonus} realAmount={gold} selectedCoin={selectedCoin} setSelectedCoin={setSelectedCoin}/>
      <MinningArea>
          {/* <MinningTitle>Rendimentos e Ganhos </MinningTitle> */}
          <NewMineArea onPress={handlePlaynow}>
              <PlayNow />
              <TitleNewMine>Jogue aqui e ganhe</TitleNewMine>
              <TitleNewMine>de 3x mais fichas!</TitleNewMine>
          </NewMineArea>
          <InvestmentTitle>Compre Cryptomines:</InvestmentTitle>
          <BetArea>
              <BetPanel selectedBetCoin={selectedCoin} title="Valor à aplicar" setBetValue={setInvestmentValue} betValue={investmentValue} />
          </BetArea>
          <NewMineArea onPress={handleBuyMine}>
              <NewMine />
              <TitleNewMine>Começe a minerar!</TitleNewMine>
          </NewMineArea>
          <PaymentArea>
            <Item>
              <Title>Ultima coleta recursos:</Title>
              <LastPayment>{lastCalculated.lastTimeCalculated}</LastPayment>
            </Item>
            <Item>
              <Title>Proxima coleta recursos:</Title>
              <NextPayment>{lastCalculated.nextTimeToCalculate}</NextPayment>
            </Item>
          </PaymentArea>
         
          

          {investments?.length > 0 && <>
              <InvestmentTitle>Suas Cryptomines:</InvestmentTitle>
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

          
          
        
      </MinningArea>

      </ScrollView>
     
      <Popup 
            setVisible={setShowPopup}
            onPress={() => console.log(`comprei`)}
            hasBuyButton
            visible={showPopup} 
            title={popupTitle} 
            message={popupMessage}
            nextCalc={lastCalculated.nextTimeToCalculate}/>
      
    </Container>
  );
}

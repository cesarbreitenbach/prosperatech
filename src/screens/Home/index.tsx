import { useTheme } from 'styled-components';
import {  Advertise, BetArea,  ClaimArea,  Container, InfoArea, InvestmentTitle, Item, LastPayment, NewMineArea, NextPayment, PaymentArea, Saldo, SaldoArea, SubTitle, Title, TitleNewMine, TitleSaldo, TitleTax, VirtuaArea, VirtuaText } from './styled';
import { useWalletContext } from '../../hooks/wallet';
import { useEffect, useState } from 'react';
import Header from '../../components/Header';
import backgroundImage from '../../assets/images/monteMoedas.png'

import { MinningArea  } from './styled'

import fichaCem from '../../assets/images/fichaBonus.png'
import fichaGold from '../../assets/images/fichaGold.png'
import mine from '../../assets/images/mine.png'

import { FlatList, ScrollView, RefreshControl, Text, Image } from 'react-native';
import InvestmentPanel from '../../components/InvestmentPanel';
import { useNavigation } from '@react-navigation/native';
import NewMine from '../../components/NewMine';
import BetPanel from '../../components/BetPanel';
import InfoUser from '../../components/InfoUser';
import { showMessage } from 'react-native-flash-message';
import BannerSlider from '../../components/BannerSlider';
import PlayNow from '../../components/PlayNow';
import {formatarMoeda } from '../../services/formatService';
import Popup from '../../components/Popup';
import ClaimButton from '../../components/ClaimButton';
import { useBillingContext } from '../../hooks/billing';

export default function Home() {
  const theme = useTheme();
  const {getSaldo, 
         amount, 
         getInvestiments, 
         investments, 
         buyCriptoMine, 
         perkList, 
         getLastCalculated,
         lastCalculated,
         getDailyBonusStatus, 
         claimDailyBonus } = useWalletContext();

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
  const [disabeDailyButton, setDisableDailyButton] = useState(false);
  const [timeToEnable, setTimeToEnable] = useState('');

  const [refreshing, setRefreshing] = useState(false);
  useEffect(() => {
    getSaldo();
    getInvestiments();
    getLastCalculated();
    verifyDailyBonus();
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

  const onRefresh = async () => {
    setRefreshing(true);
    await getLastCalculated();
    await getSaldo();
    await verifyDailyBonus();
    setRefreshing(false);
  };

  const handleScroll = (event: any) => {
    const { contentOffset } = event.nativeEvent;
    if (contentOffset.y <= -40) {
      onRefresh();
    }
  };

  const calculateMineHate = () => {
    const sumTaxPerk = perkList.reduce((acc, obj) => {
      const taxPerk = parseFloat(obj.taxPerk);
      return acc + taxPerk;
    }, 0);

    const numOfInvestments = investments.length > 0 ? investments.length : 0;

    const baseTax = 0.01 * numOfInvestments;

    setMineTaxes(sumTaxPerk + baseTax)
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
      setPopupMessage("Compre fichas gold ou aguarde o bônus de sua VirtuaMine!");
      return;
    }

    buyCriptoMine({
      amount: investmentValue,
      type: selectedCoin,
      idEarnType: 1 // por enquanto nao temos outros investimentos
    })

    setInvestmentValue(0);


  }

  const handleMovimentation = () => {
    navigation.navigate('movimentation')
  }

  const handlePlaynow = () => {
    navigation.navigate('Machine')
  }

  const handleDailyBonus = async () => {
    await claimDailyBonus()
    await verifyDailyBonus()
  }

  const verifyDailyBonus = async () => {
    const {dailybonus, nextBonus} = await getDailyBonusStatus();
    if(dailybonus!=='ok'){
      setDisableDailyButton(true);
      setTimeToEnable(nextBonus)
    } else {
      setDisableDailyButton(false);  
      setTimeToEnable("")
    }
  }

  const handleBuyGold = () => {
    navigation.navigate("buycoins")
  }

  return (
    <Container>
      <ScrollView 
                  onScroll={handleScroll}
                  scrollEventThrottle={150}
                  refreshControl={
                    <RefreshControl
                      refreshing={refreshing}
                      onRefresh={onRefresh}
                    />}
                  contentContainerStyle={{paddingBottom: 30}} 
                  showsVerticalScrollIndicator={false}>
          <Header backgroundImage={backgroundImage} height={110}/>

      <BannerSlider />

      <ClaimArea>
          <ClaimButton disabeDailyButton={disabeDailyButton} handleDailyBonus={handleDailyBonus} timeToEnable={timeToEnable} />
          <SaldoArea>
              <TitleSaldo>Saldo Total:</TitleSaldo>
              <Saldo>$ {formatarMoeda(saldo)}</Saldo>
          </SaldoArea>
      </ClaimArea>
        

      
      <InfoArea>
         <InfoUser size={20} bonusAmount={fichaBonus} realAmount={gold} selectedCoin={selectedCoin} setSelectedCoin={setSelectedCoin}/>
      </InfoArea>
      <MinningArea>
          <NewMineArea onPress={handlePlaynow} activeOpacity={0.7}>
              <PlayNow />
              <TitleNewMine>Jogue aqui e ganhe</TitleNewMine>
              <TitleNewMine>mais fichas!</TitleNewMine>
          </NewMineArea>
          <InvestmentTitle>Descubra VirtuaMine!</InvestmentTitle>
          <VirtuaArea>
            <Title>Com a VirtuaMine, você deposita recursos em uma mina virtual exclusiva que impulsionará seu ganho extra. Aproveite os benefícios imediatos e acelere sua progressão com este recurso único. Cada VirtuaMine tem um bônus base de mineraçao de 0.01%</Title>
            <SubTitle>Receba o recurso depositado de volta em 30 dias!</SubTitle>
            <VirtuaText>Recursos minerados a cada hora vão direto para o saldo do recurso depositado!</VirtuaText> 
          </VirtuaArea>
          
          <BetArea>
              <BetPanel mininumValue={50} selectedBetCoin={selectedCoin} title="Recurso a minerar:" setBetValue={setInvestmentValue} betValue={investmentValue} />
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
              <InvestmentTitle>* Suas Minerações:</InvestmentTitle>
              <TitleTax>Poder de mineração em {mineTaxes.toFixed(2)} %</TitleTax>
          </>}
          <FlatList 
            horizontal
            data={investments}
            contentContainerStyle={{backgroundColor: theme.colors.dark_gold, borderRadius: 8, marginTop: 8,}}
            renderItem={({item}) => <InvestmentPanel 
                                        onPress={handleMovimentation}
                                        coinTypeImage={item.type === 'bonus' ? fichaCem : fichaGold } 
                                        earnedAmount={item.valorInvestido}
                                        name={item.descricao}
                                        resourceImage={mine}
                                        tax={item.taxaBase}
                                        finalizaEm={item.finalizaEm}
                                        />}
          />

          <Advertise>* Aviso: A "VirtuaMine" é um recurso fictício usado para impulsionar a economia dentro do jogo. Não utilizamos seu dispositivo para realizar qualquer tipo de mineração de criptomoedas.</Advertise>
          
        
      </MinningArea>

      </ScrollView>
     
      <Popup 
            setVisible={setShowPopup}
            onPress={handleBuyGold}
            hasBuyButton
            visible={showPopup} 
            title={popupTitle} 
            message={popupMessage}
            nextCalc={lastCalculated.nextTimeToCalculate}/>
      
    </Container>
  );
}

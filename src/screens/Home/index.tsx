import { useTheme } from 'styled-components';
import { ClaimArea,  Container, InfoArea,  InvestmentTitle,  NewMineArea,  Saldo, SaldoArea, SubTitle, TitleNewMine, TitleSaldo, TitleTax, VirtuaArea, VirtuaText } from './styled';
import { useWalletContext } from '../../hooks/wallet';
import { useEffect, useState } from 'react';
import Header from '../../components/Header';
import backgroundImage from '../../assets/images/monteMoedas.png'

import { MinningArea  } from './styled'
import MinaBack from '../../assets/images/mineButton.png'
import {  ScrollView, RefreshControl, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import InfoUser from '../../components/InfoUser';
import { showMessage } from 'react-native-flash-message';
import BannerSlider from '../../components/BannerSlider';
import PlayNow from '../../components/PlayNow';
import {formatarMoeda } from '../../services/formatService';
import Popup from '../../components/Popup';
import ClaimButton from '../../components/ClaimButton';
import { useSettingsContext } from '../../hooks/settings';
import { RFValue } from 'react-native-responsive-fontsize';
import MineInvestPanel from '../../components/MineInvestPanel';
import MinerationList from '../../components/MinerationList';
import PaymentsSchedule from '../../components/PaymentsSchedule';
import MiningRatesPanel from '../../components/MiningRatesPanel';

export default function Home() {
  const theme = useTheme();
  const {getSaldo, 
         amount, 
         getInvestiments, 
         investments, 
         buyCriptoMine, 
         perkList, 
         getLastCalculated,
         calculateMineHate,
         mineTaxes,
         lastCalculated,
         getDailyBonusStatus, 
         claimDailyBonus } = useWalletContext();

  const {serverStatus, loading, getSettings, userVersion, appVersion, calculateTime, calculateUnit} = useSettingsContext();

  const [investmentValue, setInvestmentValue] = useState(0);
  const [selectedCoin, setSelectedCoin] = useState("bonus");

  const [saldo, setSaldo] = useState(String(Number(amount.amountBonus) + Number(amount.amountReal)));
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
    getSettings();
  }, [])

  useEffect(() => {
    setSaldo(String(Number(amount.amountBonus) + Number(amount.amountReal)))
    setFichaBonus(amount.amountBonus)
    setGold(amount.amountReal)
    setCalculateTimes({lastCalc: lastCalculated.lastTimeCalculated, nextCalc: lastCalculated.nextTimeToCalculate})
  }, [amount, lastCalculated])

  useEffect(() => {
    calculateMineHate();
  }, [perkList])

  useEffect(() => {
    
      if(!serverStatus && loading){
          console.log(`fechando servidor....`);
          navigation.navigate('closed');
          return;
      }

      if(userVersion !== appVersion){
        console.log(`Versão invalida....`);
        navigation.navigate('wrongVersion')
      }
  }, [serverStatus, appVersion]);

  const onRefresh = async () => {
    setRefreshing(true);
    await getLastCalculated();
    await getSaldo();
    await verifyDailyBonus();
    await getSettings();
    setRefreshing(false);
  };

  const handleScroll = (event: any) => {
    const { contentOffset } = event.nativeEvent;
    if (contentOffset.y <= -40) {
      onRefresh();
    }
  };

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
      setPopupMessage("Compre fichas gold ou aguarde o bônus de sua DigitalMine!");
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

  const handleDigitalMines = () => {
    navigation.navigate('aboutDigitalMines')
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
    setShowPopup(false);
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
          <Header backgroundImage={backgroundImage} height={RFValue(110)}/>

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
              <TitleNewMine>Aqui Rode e Ganhe!</TitleNewMine>
              <TitleNewMine>Acumule muitas fichas</TitleNewMine>
          </NewMineArea>
          <NewMineArea backColor={theme.colors.verde_esmeralda} onPress={handleDigitalMines} activeOpacity={0.7}>
            <Image source={MinaBack} style={{width: 150, height: 150}} />
            <InvestmentTitle>Comece sua mina agora mesmo!</InvestmentTitle>
          </NewMineArea>
          
          <VirtuaArea>
            <SubTitle>Recursos depositados em DigitalMine são liberados em 30 dias</SubTitle>
            <VirtuaText>Recursos são extraidos a cada {calculateTime} {calculateUnit === 'M' ? 'minuto(s)' : 'hora(s)'} vão direto para o seu saldo disponivel!</VirtuaText> 
          </VirtuaArea>
          
          <MineInvestPanel handleBuyMine={handleBuyMine} investmentValue={investmentValue} selectedCoin={selectedCoin} setInvestmentValue={setInvestmentValue} />
          
          <PaymentsSchedule lastCalculated={lastCalculated} />      

          {investments?.length > 0 && <>
              <MiningRatesPanel mineTaxes={mineTaxes} />
          </>}

          <MinerationList handleMovimentation={handleMovimentation} investments={investments}/>
        
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

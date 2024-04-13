import React, { useState } from 'react';

import { ButtonSimular, Container, HowToArea, ImageArea, InfoArea, Input, InputArea, InputText, Item, RuleArea, Rules, SimulatorArea, Text, TextArea, Title, UpgradeImageArea, WhatIsArea, WhyArea, WhyItemArea } from './styled';
import Header from '../../components/Header';
import HeaderImage from '../../assets/images/banner2.png'
import MinePng from '../../assets/images/mine.png';
import PicaretaOuro from '../../assets/images/picaretaOuro.png';
import PicaretaFerro from '../../assets/images/picaretaFerro.png';
import Upgrade from '../../assets/images/upgradeMina.png';
import { Image } from 'react-native';
import { ScrollView } from 'react-native';
import { useSettingsContext } from '../../hooks/settings';
import theme from '../../styles/theme';
import BetPanel from '../../components/BetPanel';
import MineInvestPanel from '../../components/MineInvestPanel';
import { showMessage } from 'react-native-flash-message';
import { useWalletContext } from '../../hooks/wallet';
import Popup from '../../components/Popup';
import { useNavigation } from '@react-navigation/native';
import InfoUser from '../../components/InfoUser';
import MinerationList from '../../components/MinerationList';
import MiningRatesPanel from '../../components/MiningRatesPanel';

const AboutDigitalMines: React.FC = () => {
    const navigation = useNavigation<any>()
    const { amount, lastCalculated, buyCriptoMine, investments, mineTaxes } = useWalletContext();
    const { divisorEar, calculateTime, calculateUnit } = useSettingsContext();
    const [fichaBonus, setFichaBonus] = useState(amount.amountBonus);
    const [gold, setGold] = useState(amount.amountReal);
    const [simulatePrice, setSimulatePrice] = useState('')
    const [miningPower, setMiningPower] = useState('')
    const [investmentValue, setInvestmentValue] = useState(0);
    const [selectedCoin, setSelectedCoin] = useState("bonus");
    const [showPopup, setShowPopup] = useState(false);
    const [popupTitle, setPopupTitle] = useState("");
    const [popupMessage, setPopupMessage] = useState("");

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

    const handleBuyGold = () => {
        navigation.navigate("buycoins")
        setShowPopup(false);
    }

    const handleMovimentation = () => {
        navigation.navigate('movimentation')
      }

  return <Container> 
            <Header backgroundImage={HeaderImage} height={120} width={400} hasGoBack/>
            <ScrollView contentContainerStyle={{paddingBottom: 16}}>
                <Title>O Que São as Digital Mines?</Title>
                <WhatIsArea>
                    <TextArea>
                        <Text>As DigitalMines são uma inovação dentro do universo de Ceasars Place. </Text>
                        <Text>Imagine-se fazendo renda extra com a Digital Mine, explorando um mundo digital repleto de oportunidades ilimitadas.</Text>
                    </TextArea>
                <ImageArea>
                    <Image source={MinePng} style={{width: 150, height: 100}}/>
                </ImageArea>
                </WhatIsArea>
                <SimulatorArea>
                    <Title align='center'>Simule agora</Title>
                    <InputArea>
                       <InputText size={12}>Valor para minerar</InputText>
                       <Input value={simulatePrice} onChangeText={setSimulatePrice} textAlign='right' keyboardType='numeric'/>
                    </InputArea>
                    <InputArea>
                       <InputText size={12}>% Poder de mineração</InputText>
                       <Input value={miningPower} onChangeText={setMiningPower} textAlign='right' keyboardType='numeric'/>
                    </InputArea>
                    <InputText size={14}>Extração a cada {calculateTime} {calculateUnit === 'M' ? 'minuto(s)' : 'hora(s)' }:</InputText>
                    <InputText size={16} color={theme.colors.borgonha_intenso}>Recursos coletados: {(Number(simulatePrice) * Number(miningPower) / divisorEar).toFixed(2) }</InputText>
                </SimulatorArea>
                <HowToArea>
                    <Title>Como funciona?</Title>
                    <RuleArea>
                        <Rules>1 - Deposite Fichas: Você pode adicionar suas fichas gold ou fichas bonus nas minas e assistir ao seu investimento crescer. O recurso minerado vai ser com base no tipo de ficha depositada.</Rules>
                        <Rules>2 - Poder de Mineração: Cada mina tem um valor base de 0.01% de poder de mineração. Quanto mais minas você tem, maior é o seu poder de mineração! Lembre-se de que cada mina requer um investimento mínimo para começar a minerar os recursos digitais.</Rules>
                        <Rules>3 - Bônus de Mineração: Para impulsionar sua jornada, oferecemos uma variedade de bônus de mineração. Desde a Picareta Básica até o poderoso Boost de Mineração Avançado, há algo para todos os tipos de jogadores.</Rules>
                        <Rules>4 - Recompensas Diárias: Não se esqueça do nosso bônus diário de 300 fichas! É uma ótima maneira de manter seu impulso de mineração.</Rules>
                        <Rules>5 - Deposito é liberado em 30 dias para seu saldo disponivel.</Rules>
                    </RuleArea>
                </HowToArea>
                <WhyArea>
                    <WhyItemArea>
                        <Title>Por que Investir em DigitalMines?</Title>
                        <Item>- Lucros Potenciais: Com um investimento inicial inteligente e estratégico, você pode desbloquear um fluxo constante de recompensas. </Item>
                        <Item>- Já se imaginou vivendo de renda com minas digitais na internet? </Item>
                        <Item>- Comunidade Vibrante: Junte-se a outros jogadores que também estão mudando de vida com as Digital Mines!</Item>
                        <Item>- Indique e ganhe um pack de fichas bônus e 5% de todas as fichas gold que seu indicado comprar. Obtenha uma renda passiva, indique já!</Item>
                    </WhyItemArea>
                    <UpgradeImageArea>
                       <Image source={PicaretaFerro} style={{width: 90, height: 90, marginBottom: 24}}/>
                       <Image source={PicaretaOuro} style={{width: 90, height: 90, marginBottom: 24}}/>
                       <Image source={Upgrade} style={{width: 90, height: 90}}/>
                    </UpgradeImageArea>
                </WhyArea>
                <InfoArea>
                    <InfoUser size={20} bonusAmount={fichaBonus} realAmount={gold} selectedCoin={selectedCoin} setSelectedCoin={setSelectedCoin}/>
                </InfoArea>
                <MineInvestPanel handleBuyMine={handleBuyMine} investmentValue={investmentValue} selectedCoin={selectedCoin} setInvestmentValue={setInvestmentValue} />
                <MiningRatesPanel mineTaxes={mineTaxes} />
                <MinerationList handleMovimentation={handleMovimentation} investments={investments}/>
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
}

export default AboutDigitalMines;
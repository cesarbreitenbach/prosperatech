import {useState, useEffect, useRef, useId} from 'react';
import { Image, Platform, Text, View, Appearance } from 'react-native';
import SlotMachine from '../SlotMachine';
import { Amount, AreaGain, AreaWinner, ButtonArea, ButtonText, Chicken, Container, Header, InfoArea, SlotArea, Title } from './styles';
import { RFValue } from 'react-native-responsive-fontsize';
import BlinkedPanel from '../BlinkedPanel';
import winner from '../../assets/images/winner.png'
import trevo from '../../assets/images/trevo.png'
import theme from '../../styles/theme';
import machineService from '../../services/slotmachineServices'
import InfoUser from '../InfoUser';

import BetPanel from '../BetPanel';
import { useWalletContext } from '../../hooks/wallet';
import { ISlotMachine } from '../../@types/machine';
import { useSlotMachineContext } from '../../hooks/slotmachine';
import { showMessage } from 'react-native-flash-message';
import { useAuthContext } from '../../hooks/auth';
import { ScrollView } from 'react-native-gesture-handler';
import { useSettingsContext } from '../../hooks/settings';
import { formatarMoeda } from '../../services/formatService';



let lastGeneratedNumber = '000';

export default function SlotMachineRunner ({symbols}:ISlotMachine) {

    const {amount, getSaldo} = useWalletContext();
    const {roll, syncSaldo} = useSlotMachineContext();
    const {difficult} = useSettingsContext();
    const {user} = useAuthContext();
    
    const [slotSettings, setSlotSettings] = useState({duration: 800, slot1: '000'});
    const [counter, setCounter] = useState(0)
    const slotRef: any = useRef(null);
    const [lock, setLock] = useState(false);
    const [isWinner, setIsWinner] = useState(false);
    const [randomico, setRandomico] = useState("")
    const [isShowWinner, setIsShowWinner] = useState(false);
    const useRandom = machineService();
    const [selectedCoin, setSelectedCoin] = useState("bonus");
    const [betValue, setBetValue] = useState(0);
    const [premio, setPremio] = useState("")

  
    
    const handlePlay = async () => {

        if (betValue <= 0) {
            showMessage({
                message: "Sua apósta tem que ser maior que zero!",
                type: "danger",
                duration: 5000
            });
            return;
        }

        
        if (selectedCoin === 'bonus' && betValue > Number(amount?.amountBonus)) {
            showMessage({
                message: "Não possui saldo! Compre fichas ou aguarde por bônus.",
                type: "info",
                duration: 5000
            });
            setBetValue(0);
            return;
        } 
        
        if (selectedCoin !== 'bonus' && betValue > Number(amount?.amountReal)) {
            showMessage({
                message: "Não possui saldo! Compre fichas ou aguarde por bônus.",
                type: "info",
                duration: 5000
            });
            setBetValue(0);
            return;
        }
        
        if(lock || isWinner){
            return
        }
        setLock(true);
        let randomNum = await useRandom.generateRandomNumber(3, 9, lastGeneratedNumber, counter, difficult);
        lastGeneratedNumber = randomNum;
        setRandomico(randomNum)
        await roll({bet: betValue, randomNumber: randomNum, type: selectedCoin})
        setTimeout(() => {
            setSlotSettings({duration: 800, slot1: randomNum})
            setCounter(old => old + 1);
           // syncSaldo({bet: betValue});
            
          }, 
        500);
        setTimeout(() => {
            syncSaldo({bet: betValue});
          }, 
        800);

        setTimeout(() => {
            getSaldo();
        }, 2000)

        if(useRandom.verifyWinniner(randomNum, betValue, setPremio)){
            setLock(true);
            setTimeout(() => {
              setLock(false);
              setIsWinner(false);
            }, 4000);

            setTimeout(() => setIsWinner(true), 1700)
        }

        if(!isWinner) {
            setTimeout(() => setLock(false), 3000)
        } 
        
    }

    return (
        <Container behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
               style={{flex:1}}>
            <ScrollView>
               
                <Header>
                    {!isWinner && <InfoUser bonusAmount={amount.amountBonus} realAmount={amount.amountReal} selectedCoin={selectedCoin} setSelectedCoin={setSelectedCoin}/>}
                    {isWinner &&  
                    <AreaWinner>
                        <Chicken source={winner} style={{width: 230, height: 130, alignSelf: 'center'}}/>
                        <AreaGain>
                           <Amount>PRÊMIO</Amount>
                           <Amount>$ {formatarMoeda(premio)}</Amount>
                        </AreaGain>
                    </AreaWinner>
                    
                    
                    }
                </Header>
                {/* <BlinkedPanel blinking={isWinner} invertedBlink={false} > */}
                <SlotArea>
                    <SlotMachine 
                        padding={3}
                        width={120}
                        height={130}
                        text={slotSettings.slot1} 
                        range="0123456789" 
                        renderContent={(c: any) => <Text style={{fontSize: RFValue(35)}}>{symbols[c]}</Text>} 
                        duration={slotSettings.duration} />
                </SlotArea>
                    
                    
                {/* </BlinkedPanel> */}
                <BetPanel selectedBetCoin={selectedCoin} title="Valor da aposta:" setBetValue={setBetValue} betValue={betValue} />
                <ButtonArea 
                        onPress={handlePlay}
                        activeOpacity={0.5}
                        disable={lock}
                        winner={isWinner}
                    > 
                    <View style={{flexDirection: 'row',  alignItems: 'center'}}>
                        <Image source={trevo} style={{width: 60, height: 60}}/>
                        <ButtonText>!! RODAR !!</ButtonText>
                        <Image source={trevo} style={{width: 60, height: 60}}/>
                    </View>
                </ButtonArea>  
            </ScrollView>
            
        </Container>
    );
}
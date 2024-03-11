import {useState, useEffect, useRef} from 'react';
import { Image, Platform, Text, View } from 'react-native';
import SlotMachine from '../SlotMachine';
import { ButtonArea, ButtonText, Chicken, Container, Header, HeaderImageArea, ImageHeader, InfoArea, Title } from './styles';
import { RFValue } from 'react-native-responsive-fontsize';
import BlinkedPanel from '../BlinkedPanel';
import winner from '../../assets/images/winner.png'
import theme from '../../styles/theme';
import machineService from '../../services/slotmachineServices'
import InfoUser from '../InfoUser';
import machine from '../../assets/images/machina.png'
import BetPanel from '../BetPanel';



interface ISlotMachine {
   symbols: any[]
}


let lastGeneratedNumber = '000';



export default function SlotMachineRunner ({symbols}:ISlotMachine) {
    const [slotSettings, setSlotSettings] = useState({duration: 100, slot1: '000'});
    const [counter, setCounter] = useState(0)
    const slotRef: any = useRef(null);
    const [lock, setLock] = useState(false);
    const [isWinner, setIsWinner] = useState(false);
    const [randomico, setRandomico] = useState("")
    const [isShowWinner, setIsShowWinner] = useState(false);
    const useRandom = machineService();
    const [selectedCoin, setSelectedCoin] = useState("bonus");
    const [betValue, setBetValue] = useState("");

    const handlePlay = () => {
        if(lock || isWinner){
            return
        }
        setLock(true);
        let randomNum = useRandom.generateRandomNumber(3, 9, lastGeneratedNumber, counter);
        lastGeneratedNumber = randomNum;
        setRandomico(randomNum)
        setTimeout(() => {
            setSlotSettings({duration: 800, slot1: randomNum})
            setCounter(old => old + 1);
          }, 
        100);

        if(useRandom.verifyWinniner(randomNum)){
            
            setLock(true);
            setTimeout(() => {
              setLock(false);
              setIsWinner(false);
            }, 6000);

            setTimeout(() => setIsWinner(true), 1200)

            updateWallet();
        }

        if(!isWinner) {
            setTimeout(() => setLock(false), 2000)
        } 
        
    }

   const updateWallet = () => {
   }

    return (
        <Container behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
               style={{flex:1}}>
            <HeaderImageArea>
               <ImageHeader source={machine}/>
            </HeaderImageArea>
            <InfoArea>
                <Title cor={theme.colors.roxo_real}>Numero da sorte: {randomico}</Title>
                <Title cor={theme.colors.dark_gold}>Vezes Jogadas: {counter}</Title>
            </InfoArea>
            <Header>
                {!isWinner && <InfoUser bonusAmount='2000' realAmount='100' selectedCoin={selectedCoin} setSelectedCoin={setSelectedCoin}/>}
                {isWinner &&  <Chicken source={winner} style={{width: 230, height: 130, alignSelf: 'center'}}/>}
            </Header>
            <BlinkedPanel blinking={isWinner} invertedBlink={false} >
                <SlotMachine 
                    padding={3}
                    width={120}
                    height={170}
                    text={slotSettings.slot1} 
                    range="0123456789" 
                    renderContent={(c: any) => <Text style={{fontSize: RFValue(35)}}>{symbols[c]}</Text>} 
                    duration={slotSettings.duration} />
                
            </BlinkedPanel>
            <BetPanel setBetValue={setBetValue} betValue={betValue} />
            <ButtonArea 
                    onPress={handlePlay}
                    activeOpacity={0.5}
                    disable={lock}
                    winner={isWinner}
                > 
                    <ButtonText>Toque para multiplicar fichas</ButtonText>
            </ButtonArea>  
        </Container>
    );
}
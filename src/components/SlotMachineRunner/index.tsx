import {useState, useEffect, useRef} from 'react';
import { Image, Text, View } from 'react-native';
import SlotMachine from '../SlotMachine';
import { ButtonArea, ButtonText, Container, Header, Title } from './styles';
import { RFValue } from 'react-native-responsive-fontsize';
import BlinkedPanel from '../BlinkedPanel';
import winner from '../../assets/images/winner.png'
import theme from '../../styles/theme';
import machineService from '../../services/slotmachineServices'


let lastGeneratedNumber = '000';

export default function SlotMachineRunner () {
    const [slotSettings, setSlotSettings] = useState({duration: 100, slot1: '000'});
    const [counter, setCounter] = useState(0)
    const slotRef: any = useRef(null);
    const [lock, setLock] = useState(false);
    const [isWinner, setIsWinner] = useState(false);
    const [randomico, setRandomico] = useState("")
    const [isShowWinner, setIsShowWinner] = useState(false);
    const useRandom = machineService();

    useEffect(() => {
        console.log(`eu mudei lock ${lock}`)
    }, [lock])

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

        if(verifyWinniner(randomNum)){
            
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

   const verifyWinniner = (randomNumber: string) => {

            const char1 = randomNumber[0];
            const char2 = randomNumber[1];
            const char3 = randomNumber[2];
            
            if (char1 === char2 && char2 === char3) {
            return true;
            }
            return false;
   }

    // const symbols = ['🍏', '🍎', '🍐', '🍊', '🍋', '🍌', '🌟', '🍐', '🌟', '🍎', '🍇', '🍉', '🍓', '🍒']
    const symbols = ['🍇', '🎰', '💰', '🍎', '🎟️', '🎫', '🎲', '🃏', '🍒', '🌟' ];
    return (
        <Container>
            <ButtonText cor={theme.colors.white}>Numero randomico: {randomico}</ButtonText>
            <ButtonText cor={theme.colors.white}>Counter: {counter}</ButtonText>
            <Header>
                {!isWinner && <Title cor={theme.colors.white}>Bem vindo à sua maquina da sorte!!</Title>}
                {isWinner && 
                <Image source={winner} style={{width: 230, height: 180}} />}
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
            <ButtonArea 
                    onPress={handlePlay}
                    activeOpacity={0.5}
                > 
                    <ButtonText>Toque para multiplicar fichas</ButtonText>
                </ButtonArea>  
        </Container>
    );
}
import {useState, useEffect, useRef} from 'react';
import { Image, Text, View } from 'react-native';
import SlotMachine from '../SlotMachine';
import { ButtonArea, ButtonText, Container, Header, Title } from './styles';
import { RFValue } from 'react-native-responsive-fontsize';
import BlinkedPanel from '../BlinkedPanel';
import winner from '../../assets/images/winner.png'
import theme from '../../styles/theme';


let lastGeneratedNumber = '000';

export default function SlotMachineRunner () {
    const [slotSettings, setSlotSettings] = useState({duration: 100, slot1: '000'});
    const [counter, setCounter] = useState(0)
    const slotRef: any = useRef(null);
    const [lock, setLock] = useState(false);
    const [isWinner, setIsWinner] = useState(false);
    const [randomico, setRandomico] = useState("")
    const [isShowWinner, setIsShowWinner] = useState(false);

    useEffect(() => {
        console.log(`eu mudei lock ${lock}`)
    }, [lock])

    const handlePlay = () => {
        if(lock || isWinner){
            return
        }
        setLock(true);
        let randomNum = generateRandomNumber(3, 9);
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

    function generateRandomNumber(numDigits: number, possibilities: number) {
   
        let digits = Array.from({ length: possibilities }, (_, i) => i);

        let randomNumber = '';
    
        // Verifica se todos os dígitos devem ser iguais
        const allEqual = Math.random() < 0.8;
    
        if (allEqual) {
            // Escolhe um dígito aleatório
            const digit = Math.floor(Math.random() * possibilities);
            // Preenche o número aleatório com o mesmo dígito repetido
            randomNumber = digit.toString().repeat(numDigits);
        } else {
            for (let i = 0; i < numDigits; i++) {
                // Se houver dígitos disponíveis para escolher
                if (digits.length > 0) {
                    // Escolhe um dígito aleatório entre os disponíveis
                    let randomIndex = Math.floor(Math.random() * digits.length);
                    let digit = digits[randomIndex];
    
                    // Remove o dígito escolhido do array de dígitos disponíveis
                    digits.splice(randomIndex, 1);
    
                    // Verifica se o dígito escolhido é igual ao dígito correspondente no último número gerado
                    if (lastGeneratedNumber.length > 0 && lastGeneratedNumber[i] === digit.toString()) {
                        // Se for igual, escolhe um novo dígito até que seja diferente
                        while (lastGeneratedNumber[i] === digit.toString()) {
                            randomIndex = Math.floor(Math.random() * digits.length);
                            digit = digits[randomIndex];
                        }
                    }
    
                    // Adiciona o dígito ao número aleatório
                    randomNumber += digit.toString();
                } else {
                    // Se não houver mais dígitos disponíveis, apenas adiciona dígitos aleatórios
                    randomNumber += Math.floor(Math.random() * possibilities).toString();
                }
            }
        }
    
        // Atualiza o último número gerado
        lastGeneratedNumber = randomNumber;

        if (counter === 100 || counter === 1000) {
            randomNumber = '888';
        }

        return randomNumber;
    }

   const updateWallet = () => {

   }

   const verifyWinniner = (randomNumber: string) => {

            const char1 = randomNumber[0];
            const char2 = randomNumber[1];
            const char3 = randomNumber[2];
            
            // Verifica se todos os caracteres são iguais
            if (char1 === char2 && char2 === char3) {
            return true;
            }
            
            // // Verifica se os caracteres são '2' ou '7'
            // if ((char1 === '2' || char1 === '7') && (char2 === '2' || char2 === '7') && (char3 === '2' || char3 === '7')) {
            // return true;
            // }
            
            // // Verifica se os caracteres são '6' ou '8'
            // if ((char1 === '6' || char1 === '8') && (char2 === '6' || char2 === '8') && (char3 === '6' || char3 === '8')) {
            // return true;
            // }
            
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
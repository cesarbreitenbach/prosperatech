import {useState, useEffect, useRef} from 'react';
import { Text, View } from 'react-native';
import SlotMachine from '../SlotMachine';
import Button from '../Button';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { ButtonArea, ButtonText, Container } from './styles';
import { RFValue } from 'react-native-responsive-fontsize';
import BlinkedPanel from '../BlinkedPanel';


export default function SlotMachineRunner () {
    const [slotSettings, setSlotSettings] = useState({duration: 100, slot1: '000'});
    const [counter, setCounter] = useState(0)
    const slotRef: any = useRef(null);
    const [lock, setLock] = useState(false);

    const handlePlay = () => {
        if(lock){
            return
        }
        setLock(true);
        let randomNum = generateRandomNumber(3, 9);
        setTimeout(() => {
            setSlotSettings({duration: 1000, slot1: randomNum})
            setCounter(old => old + 1);
            setLock(false);
          }, 
        200);
        
    }

    function shuffleArray(array:  number[]) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }
    
    function generateRandomNumber(numDigits: number, possibilities: number) {
        // Criar um array com as possibilidades de dígitos (de 0 a possibilities - 1)
        let digits = Array.from({length: possibilities}, (_, i) => i);
        
        // Embaralhar o array de dígitos (exceto o primeiro)
        digits = shuffleArray(digits.slice(1));
    
        let randomNumber = '';
        // Adicionar o primeiro dígito (entre 1 e 9)
        randomNumber += (Math.floor(Math.random() * 9) + 1).toString();
    
        for (let i = 1; i < numDigits; i++) {
            // Gera um dígito aleatório
            let digit = digits[i - 1];
            
            randomNumber += digit.toString();
        }

        if (counter === 4) {
            return '888'
        }

        if (counter === 9) {
            return '888'
        }

        if (counter === 14) {
            return '999'
        }

        return randomNumber;
    }

    const symbols = ['🍏', '🍎', '🍐', '🍊', '🍋', '🍌', '😊', '❤️', '🌟', '🌈']; 
    return (
        <Container>
            <BlinkedPanel blinking={false} invertedBlink={false}>
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
                    <ButtonText>Rode e multiplique!</ButtonText>
                </ButtonArea>  
        </Container>
    );
}
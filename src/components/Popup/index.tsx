import React, { useEffect, useState } from 'react';

import { Image, Modal } from 'react-native';

import { ButtonArea, Container, Content, Message, TextFuck, Title } from './styled';

import image from '../../assets/images/monteFicha.png'
import ClaimButton from '../ClaimButton';
import { useWalletContext } from '../../hooks/wallet';

interface PopupProps {
    visible: boolean;
    title: string;
    message: string;
    nextCalc: string;
    hasBuyButton?: boolean;
    onPress: () => void;
    setVisible: (value: boolean) => void;
}

const Popup = ({setVisible, visible, title, message, hasBuyButton=false, nextCalc, onPress}: PopupProps) => {

    const {claimDailyBonus, getDailyBonusStatus } = useWalletContext();

    const [disabeDailyButton, setDisableDailyButton] = useState(false);

    const [timeToEnable, setTimeToEnable] = useState('');

    useEffect(() => {
        const getStatus = async () => {
            await verifyDailyBonus();
        }
        getStatus()
    }, [])

    const handleDailyBonus = async () => {
        await claimDailyBonus()
        await verifyDailyBonus()
        setVisible(false);
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
  
    const handleClose = () => {
        setVisible(false);
    }

    return (
        <Modal visible={visible} transparent animationType='fade'>
            <Container onPress={handleClose} > 
                <Content>
                    <Title>{title}</Title>
                    <Message>{message}</Message>
                    {hasBuyButton && <>
                        <ClaimButton disabeDailyButton={disabeDailyButton} handleDailyBonus={handleDailyBonus} timeToEnable={timeToEnable} />
                        <ButtonArea onPress={onPress} activeOpacity={0.7}>
                            <TextFuck>Compre já</TextFuck>
                            <Image source={image} style={{width: 35, height: 35}}/>
                        </ButtonArea>
                    </>}
                </Content>
            </Container>
        </Modal>)
}

export default Popup;
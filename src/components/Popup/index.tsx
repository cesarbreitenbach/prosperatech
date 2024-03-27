import React from 'react';

import { Image, Modal } from 'react-native';

import { ButtonArea, Container, Content, Message, NextBonus, Title } from './styled';

import image from '../../assets/images/monteFicha.png'
import { Text } from '../BuyPerks/styled';

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
                        <NextBonus>Proximo Bônus em: {nextCalc}</NextBonus>
                        <ButtonArea onPress={onPress} activeOpacity={0.7}>
                            <Text>comprar</Text>
                            <Image source={image} style={{width: 60, height: 60}}/>
                        </ButtonArea>
                    </>}
                </Content>
            </Container>
        </Modal>)
}

export default Popup;
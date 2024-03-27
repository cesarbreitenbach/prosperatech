import React from 'react';

import { Container, Content, Create, Item, Title, Total, TypeText, Win } from './styled';
import { IUserMovimentation } from '../../@types/wallet';
import { Image } from 'react-native';
import fichaBonus from '../../assets/images/fichaBonus.png'
import fichaGold from '../../assets/images/fichaGold.png'
import { formatarMoeda } from '../../services/formatService';

const ItemMovimentation = ({amountBonus, amountReal, tipo, createdAt}: IUserMovimentation) => {
    const formattedDate = new Date(createdAt).toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit"
      });
  return <Container> 
            <Create>{formattedDate}</Create>
            <Title>{tipo}</Title>
            <Content>
                <Total>Total:</Total>
                <Win>{amountBonus !== '0' ? formatarMoeda(amountBonus) : formatarMoeda(amountReal)}</Win>
                <Item>
                    <TypeText>Recurso Ganho:</TypeText>
                    <Image source={amountBonus !== '0' ? fichaBonus : fichaGold} style={{width: 30, height: 30, alignSelf: 'center'}} />
                </Item>
            </Content>
           
            
            
         </Container>
}

export default ItemMovimentation;
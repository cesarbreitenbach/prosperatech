import React from 'react';
import logo from '../../assets/images/ceasarsLogo2.png';
import { ButtonArea, Container, Logo, LogoArea, Title } from './styled';
import theme from '../../styles/theme';
import Button from '../../components/Button';
import { useAuthContext } from '../../hooks/auth';

const ActivateUserScreen: React.FC = () => {
  const {logout, user} = useAuthContext();
  return <Container> 
            
            <LogoArea>
                <Logo source={logo}/>
            </LogoArea>
            <Title size={26} color={theme.colors.gold}>Olá {user.name}!</Title>
            <Title size={18} color={theme.colors.white}>Bem vindo ao Ceasars Place!</Title>
            <Title color={theme.colors.gold}>Ative sua conta clicando no link que foi enviado para: {user.email}</Title>
            <ButtonArea>
                <Button title='sair' onPress={() => logout()} color={theme.colors.dark_gold}/>
            </ButtonArea>
         </Container>
}

export default ActivateUserScreen;
import React from 'react';
import logo from '../../assets/images/ceasarsLogo2.png';
import { ButtonArea, Container, Logo, LogoArea, Title } from './styled';
import theme from '../../styles/theme';
import Button from '../../components/Button';
import { useNavigation } from '@react-navigation/native';

const RecoveryScreen: React.FC = () => {
  const navigation = useNavigation<any>()
  return <Container> 
            
            <LogoArea>
                <Logo source={logo}/>
            </LogoArea>
            <Title size={26} color={theme.colors.gold}>Bem vindo ao </Title>
            <Title size={26} color={theme.colors.white}>Ceasars Place!</Title>
            <Title size={18} color={theme.colors.white}>Um link de recuperação foi enviado para seu email!</Title>
            <ButtonArea>
                <Button title='Login' onPress={() => navigation.navigate('Signin')} color={theme.colors.dark_gold}/>
            </ButtonArea>
         </Container>
}

export default RecoveryScreen;
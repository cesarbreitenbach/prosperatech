
import { useEffect, useState } from 'react';

import logo from '../../assets/images/ceasarsLogo2.png';

import { showMessage } from 'react-native-flash-message';
import { useTheme } from 'styled-components';
import Button from '../../components/Button';
// import { useAuthContext } from '../../hooks/auth';
import { Container, ContentArea, Footer, Input, Logo, LogoArea, Title } from './styles';
import PasswordInput from '../../components/PasswordInput';
import { useAuthContext } from '../../hooks/auth';


export default function LoginScreen(){
    const theme = useTheme();
    // const {verifyUser, loading, getUserPasswordOnStorage, login} = useAuthContext();
    const {login} = useAuthContext();
    const [email, setEmail] = useState<string>("cesar@teste.com")
    const [password, setPassword] = useState<string>("123456")
    const [visibleEye, setVisibleEye] = useState<boolean>(true);

    function handleClick(){
        console.log(`fazer login`)
        login({email, password})
    }

return (
   <Container> 
        <LogoArea>
            <Logo source={logo} style={{height: 400}} />
        </LogoArea>
        <ContentArea>
            <Title>Email:</Title>
            <Input 
            placeholder='seu@email.com'
            placeholderTextColor={theme.colors.gold}
            value={email}
            onChangeText={setEmail}
            keyboardType='email-address'
            autoCorrect={false}
            autoCapitalize='none'
            />
            <Title>Senha:</Title>
            <PasswordInput 
               setValue={setPassword}
               value={password}
               setVisible={setVisibleEye}
               visible={visibleEye}
            />
            <Footer>
               <Button loading={false} title='Login' color={theme.colors.gold} onPress={handleClick} light={false}/>
            </Footer>
        </ContentArea>
   </Container> 
);}
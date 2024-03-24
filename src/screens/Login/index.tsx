
import { useState } from 'react';

import logo from '../../assets/images/ceasarsLogo2.png';


import { useTheme } from 'styled-components';
import Button from '../../components/Button';
import { Container, ContentArea, Footer, ForgetArea, ForgetText, Input, Logo, LogoArea, Separator, Title } from './styles';
import PasswordInput from '../../components/PasswordInput';
import { useAuthContext } from '../../hooks/auth';
import { ScrollView } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { showMessage } from 'react-native-flash-message';
import { GoogleSigninButton } from '@react-native-google-signin/google-signin';
import { Image } from 'react-native';
import GoogleButton from '../../components/GoogleButton';

export default function LoginScreen(){
    const theme = useTheme();
    const navigation = useNavigation<any>();
    const {login, recoveryPassword, handleGoogleLogin} = useAuthContext();
    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [visibleEye, setVisibleEye] = useState<boolean>(true);

    function handleSignIn(){
        console.log(`fazer login`)
        login({email, password})
    }
    function handleSignUp(){
        navigation.navigate('Signup')
    }
    function forgetPassword(){
        if (email === "") {
            showMessage({
                message: "Digite um email valido!",
                type: "warning",
              });
              return;
        }
        recoveryPassword(email)
        navigation.navigate('recovery')
    }

return (
   <Container> 
        <ScrollView contentContainerStyle={{paddingBottom: 30}}>
            <LogoArea>
                <Logo source={logo}/>
            </LogoArea>
            <ContentArea>
                <Title>Email:</Title>
                <Input 
                placeholder='seu@email.com'
                placeholderTextColor={theme.colors.text}
                value={email}
                onChangeText={setEmail}
                keyboardType='email-address'
                autoCorrect={false}
                autoCapitalize='none'
                autoComplete="off"
                />
                <Title>Senha:</Title>
                <PasswordInput 
                height={60}
                setValue={setPassword}
                value={password}
                setVisible={setVisibleEye}
                visible={visibleEye}
                />
                <ForgetArea onPress={forgetPassword}>
                    <ForgetText>Esqueceu a senha?</ForgetText>
                </ForgetArea>
                <Footer>
                    <Button loading={false} title='Login' color={theme.colors.gold} onPress={handleSignIn} light={false}/>
                    <Button loading={false} title='Cadastre-se' color={theme.colors.gold} onPress={handleSignUp} light={false}/>
                </Footer>
                <Footer>
                    <GoogleButton title='Login Google' onPress={() => handleGoogleLogin(false)} />
                </Footer>
            </ContentArea>
        </ScrollView>
   </Container> 
);}
import React, { useState } from 'react';

import { Container, ContentArea, Footer, Input, Logo, LogoArea, Title } from './styled';
import logo from '../../assets/images/ceasarsLogo2.png';
import { useTheme } from 'styled-components';
import { useAuthContext } from '../../hooks/auth';
import PasswordInput from '../../components/PasswordInput';
import Button from '../../components/Button';
import { ScrollView } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { GoogleSigninButton } from '@react-native-google-signin/google-signin';
import GoogleButton from '../../components/GoogleButton';

const CreateUser: React.FC = () => {
    const theme = useTheme();
    const navigation = useNavigation<any>();
    const {signup, handleGoogleLogin} = useAuthContext();
    const [name, setName] = useState<string>("")
    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [confirmPassword, setConfirmPassword] = useState<string>("")
    const [visibleEye, setVisibleEye] = useState<boolean>(true);

    const handleSignUn = () => {
        signup({
            email,
            name,
            password,
            confirmPassword
        })
    }


    
  return   <Container> 
            <ScrollView contentContainerStyle={{paddingBottom: 30}}>
                <LogoArea>
                    <Logo source={logo} />
                </LogoArea>
                <ContentArea>
                    <Title>Nome:</Title>
                    <Input 
                    placeholder='Seu nome'
                    placeholderTextColor={theme.colors.text}
                    value={name}
                    onChangeText={setName}
                    autoCorrect={false}
                    />
                    <Title>Email:</Title>
                    <Input 
                    placeholder='seu@email.com'
                    placeholderTextColor={theme.colors.text}
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
                    <Title>Confirme a senha:</Title>
                    <PasswordInput 
                        setValue={setConfirmPassword}
                        value={confirmPassword}
                        setVisible={setVisibleEye}
                        visible={visibleEye}
                    />
                   
                    <Footer>
                        <Button loading={false} title='Cadastrar' color={theme.colors.gold} onPress={handleSignUn} light={false}/>
                        <Button loading={false} title='Voltar' color={theme.colors.gold} onPress={() => navigation.navigate('Signin')} light={false}/>
                        <GoogleButton title="Cadastro Google" onPress={() => handleGoogleLogin(true)} />
                    </Footer>
                </ContentArea>
            </ScrollView>
                
                </Container> 
}

export default CreateUser;
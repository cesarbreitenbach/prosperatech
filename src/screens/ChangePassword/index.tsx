import React, { useState } from 'react';

import { Container, ContentArea, Footer, Input, Logo, LogoArea, Title } from './styled';
import { ScrollView } from 'react-native-gesture-handler';
import PasswordInput from '../../components/PasswordInput';
import logo from '../../assets/images/ceasarsLogo2.png';
import theme from '../../styles/theme';
import Button from '../../components/Button';
import { useNavigation } from '@react-navigation/native';
import { useAuthContext } from '../../hooks/auth';
import { showMessage } from 'react-native-flash-message';

const ChangePassword: React.FC = () => {
    
    const navigation = useNavigation<any>();
    const {user, changePassword} = useAuthContext()

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [visibleEye, setVisibleEye] = useState<boolean>(true);

    const handleChangePassword = () => {
        if (password !== confirmPassword) {
            showMessage({
                message: "Senhas não conferem!",
                type: "warning",
              });
              return;
        }
        changePassword({
            password,
            confirmPassword
        })

    }


  return <Container> 
             <ScrollView contentContainerStyle={{paddingBottom: 30}}>
                <LogoArea>
                    <Logo source={logo} />
                </LogoArea>
                <ContentArea>
                    <Title>Nome:</Title>
                    <Input 
                    placeholderTextColor={theme.colors.text}
                    value={user.name}
                    onChangeText={setName}
                    autoCorrect={false}
                    editable={false}
                    />
                    <Title>Email:</Title>
                    <Input 
                    placeholderTextColor={theme.colors.text}
                    value={user.email}
                    onChangeText={setEmail}
                    keyboardType='email-address'
                    autoCorrect={false}
                    autoCapitalize='none'
                    editable={false}
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
                        <Button loading={false} title='Alterar Senha' color={theme.colors.gold} onPress={handleChangePassword} light={false}/>
                        <Button loading={false} title='Login' color={theme.colors.gold} onPress={() => navigation.navigate('Signin')} light={false}/>
                    </Footer>
                </ContentArea>
            </ScrollView>
         </Container>
}

export default ChangePassword;
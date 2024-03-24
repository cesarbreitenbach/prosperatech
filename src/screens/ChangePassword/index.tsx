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
import { ChangePasswordProps } from '../../@types/auth';


const ChangePassword = () => {
    
    const navigation = useNavigation<any>();
    const {user, changePassword} = useAuthContext()

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [oldPassword, setOldPassword] = useState("");
    const [visibleEye, setVisibleEye] = useState<boolean>(true);

    const handleChangePassword = () => {
        if (password !== confirmPassword) {
            showMessage({
                message: "Senhas não conferem!",
                type: "warning",
              });
              return;
        }

        let objToChange = {} as ChangePasswordProps;
        if(user.resetPassword){
            objToChange = {
                password,
                confirmPassword
            }
        } else {
            objToChange = {
                oldpassword: oldPassword,
                password,
                confirmPassword
            }
        }
        console.log(`vou usar o obj ${JSON.stringify(objToChange)}`)
        changePassword(objToChange)
    }



    const handleBack = () => {
        navigation.goBack();
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
                    {!user.resetPassword && 
                    <>
                        <Title>Senha Antiga:</Title>
                        <PasswordInput 
                            height={60}
                            setValue={setOldPassword}
                            value={oldPassword}
                            setVisible={setVisibleEye}
                            visible={visibleEye}
                        />
                    </>}
                    <Title>Senha:</Title>
                    <PasswordInput 
                        height={60}
                        setValue={setPassword}
                        value={password}
                        setVisible={setVisibleEye}
                        visible={visibleEye}
                    />
                    <Title>Confirme a senha:</Title>
                    <PasswordInput 
                        height={60}
                        setValue={setConfirmPassword}
                        value={confirmPassword}
                        setVisible={setVisibleEye}
                        visible={visibleEye}
                    />
                   
                    <Footer>
                        <Button loading={false} title='Alterar Senha' color={theme.colors.gold} onPress={handleChangePassword} light={false}/>
                        {!user.resetPassword && <Button loading={false} title='Volta' color={theme.colors.gold} onPress={handleBack} light={false}/>}
                    </Footer>
                </ContentArea>
            </ScrollView>
         </Container>
}

export default ChangePassword;
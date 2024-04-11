import React from 'react';

import { Container } from './styled';
import Button from '../../components/Button';
import { useAuthContext } from '../../hooks/auth';
import theme from '../../styles/theme';
import { useNavigation } from '@react-navigation/native';

const SettingsScreen: React.FC = () => {
  const {logout} = useAuthContext()
  const {navigate} = useNavigation<any>()

  const handleLogout = () => {
    logout();
  }

  const handleBuyFichas = () => {
    navigate('buycoins')
  }
  const handleAlterarSenha = () => {
    navigate('changePassword')
  }
  const handleWithdraw = () => {
    navigate('withdraw')
  }

  return <Container> 
            <Button title='Saque suas fichas' onPress={handleWithdraw} color={theme.colors.dark_gold}/>
            <Button title='Comprar fichas' onPress={handleBuyFichas} color={theme.colors.dark_gold}/>
            <Button title='Alterar Senha' onPress={handleAlterarSenha} color={theme.colors.dark_gold}/>
            <Button title='Sair' onPress={handleLogout} color={theme.colors.dark_gold}/>
         </Container>
}

export default SettingsScreen;
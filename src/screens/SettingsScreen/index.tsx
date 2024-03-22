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
    console.log(`aqui compra ficha`)
  }
  const handleAlterarSenha = () => {
    navigate('changePassword')
  }

  return <Container> 
            <Button title='Alterar Senha' onPress={handleAlterarSenha} color={theme.colors.dark_gold}/>
            <Button title='Sair' onPress={handleLogout} color={theme.colors.dark_gold}/>
         </Container>
}

export default SettingsScreen;
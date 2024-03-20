import React from 'react';

import { Container } from './styled';
import Button from '../../components/Button';
import { useAuthContext } from '../../hooks/auth';
import theme from '../../styles/theme';

const SettingsScreen: React.FC = () => {
  const {logout} = useAuthContext()

  const handleLogout = () => {
    logout();
  }

  const handleBuyFichas = () => {
    console.log(`aqui compra ficha`)
  }

  return <Container> 
            <Button title='Comprar Fichas' onPress={handleBuyFichas} color={theme.colors.dark_gold}/>
            <Button title='Logout' onPress={handleLogout} color={theme.colors.dark_gold}/>
         </Container>
}

export default SettingsScreen;
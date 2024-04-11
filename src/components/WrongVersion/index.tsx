import React from 'react';
import logo from '../../assets/images/ceasarsLogo2.png'
import { Container, Title } from './styled';
import { ActivityIndicator, Image } from 'react-native';
import { useSettingsContext } from '../../hooks/settings';

const WrongVersion: React.FC = () => {
    const {loading} = useSettingsContext();
  
    
    return <Container> 
            {loading && <ActivityIndicator size={30} color="white" />}
            {!loading && <>
              <Image source={logo} style={{width: 200, height: 200}} />
              <Title align='center'>Versão invalida! Atualize o APP</Title>
            </>}
            
           </Container>
}

export default WrongVersion;
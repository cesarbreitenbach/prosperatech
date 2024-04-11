import React, { useEffect } from 'react';

import { Container, Title } from './styled';
import { ActivityIndicator, Image } from 'react-native';
import logo from '../../assets/images/ceasarsLogo2.png'
import { useSettingsContext } from '../../hooks/settings';
import { useNavigation } from '@react-navigation/native';

const Closed: React.FC = () => {
  const {serverStatus, loading} = useSettingsContext();
  const navigation = useNavigation<any>()

  
  return <Container> 
          {loading && <ActivityIndicator size={30} color="white" />}
          {!loading && <>
            <Image source={logo} style={{width: 200, height: 200}} />
            <Title align='center'>Caro usuário,</Title>
            <Title align='left'>     Pedimos desculpas pelo inconveniente, mas o servidor está temporariamente fora do ar devido a manutenção programada. Estamos trabalhando diligentemente para melhorar a experiência de jogo e garantir um ambiente estável e seguro para todos os nossos jogadores.</Title>
            <Title align='left'>     Durante esse período, o acesso ao servidor está temporariamente bloqueado. Por favor, aguarde pacientemente enquanto concluímos as atualizações necessárias. Esperamos restaurar o serviço o mais rápido possível e voltar à diversão.</Title>

            <Title align='center'>Agradecemos sua compreensão e apoio contínuo.</Title>    

            <Title align='left'>Atenciosamente,</Title> 
            <Title align='left'>[Equipe Ceasars Place]</Title> 
          </>}
          
         </Container>
}

export default Closed;
import React from 'react';

import imageArte from '../../assets/images/machina2.png'

import { Container } from './styled';
import { Image } from 'react-native';

const PlayNow: React.FC = () => {
  return <Container> 
            <Image source={imageArte} width={400} height={400}/>
         </Container>
}

export default PlayNow;
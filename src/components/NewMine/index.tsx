import React from 'react';

import newMine from '../../assets/images/newMine.png'

import { Container } from './styled';
import { Image } from 'react-native';

const NewMine: React.FC = () => {
  return <Container> 
            <Image source={newMine} width={400} height={400}/>
         </Container>
}

export default NewMine;
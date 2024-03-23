import React from 'react';

import { GoogleButtonArea, TitleGoogle } from './styled';
import { Image } from 'react-native';
import google from '../../assets/images/google.png';

interface GoogleButtonProps {
    title: string;
    onPress: () => void;
}

const GoogleButton = ({onPress, title}: GoogleButtonProps) => {
  
    const handlePress = () => {
    onPress();
  }

  return (<GoogleButtonArea onPress={handlePress}>
            <Image source={google} style={{width: 30, height: 30}} />
            <TitleGoogle>{title}</TitleGoogle>
        </GoogleButtonArea>)
}

export default GoogleButton;
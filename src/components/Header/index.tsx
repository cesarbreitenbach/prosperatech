import React from 'react';


import { BackButton, HeaderImageArea, ImageHeader } from './styled';
import Icon from 'react-native-vector-icons/MaterialIcons'
import theme from '../../styles/theme';
import { useNavigation } from '@react-navigation/native';

interface HeaderProps {
    hasGoBack?: boolean;
    backgroundImage: any;
    height?: number;
    width?: number
}

const Header = ({backgroundImage, height, width, hasGoBack}: HeaderProps) => {

  const navigation = useNavigation();

  const goBack = () => {
    navigation.goBack();
  }

  return   <HeaderImageArea>
              {hasGoBack && <BackButton onPress={goBack}>
                 <Icon name='arrow-back' color={theme.colors.gold} size={40}/>
              </BackButton>}
              <ImageHeader source={backgroundImage} style={{width, height}}/>
           </HeaderImageArea>
            }

export default Header;

import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background-color: ${({theme}) => theme.colors.background_secondary};
  justify-content: center;
  align-items: center;
`

export const ButtonText = styled.Text`
    font-family: ${({theme}) => theme.fonts.SemiBold };
    font-size: ${RFValue(14)}px;
    color: ${({theme}) => theme.colors.black};
`

export const ButtonArea = styled.TouchableOpacity` 
   padding: 12px ;
   height: ${RFValue(60)}px;
   background-color: ${({theme}) => theme.colors.dark_gold};
   justify-content: center;
   align-items: center;
   margin-top: ${RFValue(60)}px;
   border-radius: 10px;
`
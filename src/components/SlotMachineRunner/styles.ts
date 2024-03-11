
import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Container = styled.KeyboardAvoidingView`
  flex: 1;
  background-color: ${({theme}) => theme.colors.background_secondary};
  
  align-items: center;
`

export const ButtonText = styled.Text<{cor?: string}>`
    font-family: ${({theme}) => theme.fonts.SemiBold };
    font-size: ${RFValue(14)}px;
    color: ${({theme, cor}) => cor ? cor : theme.colors.black};
`

export const ButtonArea = styled.TouchableOpacity<{disable: boolean, winner: boolean}>` 
   padding: 12px ;
   height: ${RFValue(60)}px;
   background-color: ${({theme, disable, winner}) => winner ? theme.colors.verde_esmeralda :  disable ?  theme.colors.borgonha_intenso : theme.colors.dark_gold};
   justify-content: center;
   align-items: center;
   margin-top: ${RFValue(60)}px;
   border-radius: 10px;
`

export const Header = styled.View`
   width: 400px;
   height: ${RFValue(120)}px;
`

export const InfoArea = styled.View`
   justify-content: flex-end;
   align-items: flex-end;
   align-self: flex-end;
`


export const Title = styled.Text<{cor?: string}>`
    font-family: ${({theme}) => theme.fonts.SemiBold };
    font-size: ${RFValue(12)}px;
    color: ${({theme, cor}) => cor ? cor : theme.colors.black};
`

export const Chicken = styled.Image``

export const HeaderImageArea = styled.View`
 
`

export const ImageHeader = styled.Image`
   height: 150px;
`







import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Container = styled.KeyboardAvoidingView`
  flex: 1;
  background-color: ${({theme}) => theme.colors.background_secondary};
  
`

export const ButtonText = styled.Text<{cor?: string}>`
    font-family: ${({theme}) => theme.fonts.SemiBold };
    font-size: ${RFValue(14)}px;
    color: ${({theme, cor}) => cor ? cor : theme.colors.black};
    margin-left: 12px;
    margin-right: 12px;
`

export const ButtonArea = styled.TouchableOpacity<{disable: boolean, winner: boolean}>` 
   background-color: ${({theme, disable, winner}) => winner ? theme.colors.verde_esmeralda :  disable ?  theme.colors.borgonha_intenso : theme.colors.dark_gold};
   margin-top: ${RFValue(30)}px;
   border-radius: 8px;
   justify-content: center;
   align-items: center;
   height: ${RFValue(70)}px;
   width: 70%;
   align-self: center;
`

export const Header = styled.View`
   width: 100%;
   height: ${RFValue(80)}px;
`

export const InfoArea = styled.View`
   justify-content: flex-end;
   align-items: flex-end;
   align-self: flex-end;
`


export const Title = styled.Text<{cor?: string}>`
    font-family: ${({theme}) => theme.fonts.SemiBold };
    font-size: ${RFValue(8)}px;
    color: ${({theme, cor}) => cor ? cor : theme.colors.black};
`

export const Chicken = styled.Image``










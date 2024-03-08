
import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background-color: ${({theme}) => theme.colors.background_secondary};
  
  align-items: center;
`

export const ButtonText = styled.Text<{cor?: string}>`
    font-family: ${({theme}) => theme.fonts.SemiBold };
    font-size: ${RFValue(14)}px;
    color: ${({theme, cor}) => cor ? cor : theme.colors.black};
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

export const Header = styled.View`
   justify-content: center;
   align-items: center;
   height: ${RFValue(150)}px;
   width: 100%;
`

export const Title = styled.Text<{cor?: string}>`
    font-family: ${({theme}) => theme.fonts.SemiBold };
    font-size: ${RFValue(16)}px;
    color: ${({theme, cor}) => cor ? cor : theme.colors.black};
`



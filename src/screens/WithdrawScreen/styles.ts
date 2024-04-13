import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Footer = styled.View` 
   margin-top: ${RFValue(12)}px;
`

export const Container = styled.SafeAreaView`
    flex: 1;
    background-color: ${({theme}) => theme.colors.background_secondary};
    padding: 30px 6px;
`;

export const Text = styled.Text<{color?: string, size?: number}>`
    font-family: ${({theme}) => theme.fonts.medium };
    font-size: ${({size}) => size ? RFValue(size) : RFValue(12)}px;
    color: ${({color, theme}) => color ?  color : theme.colors.gold};

`
export const InfoArea = styled.View`

`

export const InputAmountValue = styled.TextInput`
    width: 35%;
    height: ${RFValue(40)}px;
    border-color: ${({theme}) => theme.colors.white};
    border-width: 1px;
    border-radius: 7px;
    padding: 0  ${RFValue(12)}px;

`

export const ExchangeArea = styled.View`
    flex-direction: row;
    margin-top:  ${RFValue(12)}px;
`


export const InputArea = styled.View`
    align-items: center;
    flex-direction: row;
    justify-content: space-between;
`

export const AmountArea = styled.View`
    align-items: center;
    flex-direction: row;
    justify-content: space-between;
        
`

export const AmountArea2 = styled.View`    
   justify-content: center;
   align-items: center;
   padding: 6px;
`
export const AmountArea3 = styled.View`    
   flex-direction: row;
   justify-content: space-between;
   align-items: center;
   margin-top: 12px;
`

export const RightArea = styled.View`
   width: 50%;
   justify-content: center;
   align-items: center;
`

export const LeftArea = styled.View`
   width: 50%;   
   justify-content: center;
`

export const ButtonArea = styled.View` 
   height: ${RFValue(100)}px;
  justify-content: center;
  align-items: center;
`

export const InputCode = styled.TextInput`
    width: 90%;
    height: ${RFValue(30)}px;
    border-color: ${({theme}) => theme.colors.white};
    border-width: 1px;
    border-radius: 7px;

`

export const ConfirmArea = styled.View`
    flex-direction: row;
    margin-bottom: 12px;
`

export const ConfirmLeft = styled.View`
  flex: 1;
`
export const ConfirmRight = styled.View`
   justify-content: center;
   align-items: center;
`
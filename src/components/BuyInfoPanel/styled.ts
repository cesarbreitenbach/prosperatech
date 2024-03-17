import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const BuyInfoArea = styled.View`
   flex-direction: row;
   margin-top: 8px;
`

export const ButtonArea = styled.View`
   flex: 1;
   justify-content: center;
   align-items: center;
`

export const Item = styled.TouchableHighlight<{width: number; height: number}>`
   flex-direction: row;
   justify-content: center;
   align-items: center;
   width: ${({width}) => width}px;
   height:  ${({height}) => height}px;
   background-color:  ${({theme}) => theme.colors.success};
   margin-bottom: 4px;
   border-radius: 8px;
`;

export const ButtonText = styled.Text`
font-family: ${({theme}) => theme.fonts.SemiBold};
font-size: ${RFValue(10)}px;
color: ${({theme}) => theme.colors.borgonha_intenso};
margin-left: 8px;
`;

export const CostsArea = styled.View`
 
   justify-content: center;
   align-items: center;
`

export const Label = styled.Text`
font-family: ${({theme}) => theme.fonts.SemiBold};
font-size: ${RFValue(9)}px;
color: ${({theme}) => theme.colors.borgonha_intenso};
margin-right: 8px;
`;

export const Cost = styled.Text`
font-family: ${({theme}) => theme.fonts.SemiBold};
font-size: ${RFValue(12)}px;
color: ${({theme}) => theme.colors.gold};
`;

export const Title = styled.Text`
font-family: ${({theme}) => theme.fonts.SemiBold};
font-size: ${RFValue(8)}px;
color: ${({theme}) => theme.colors.gold};
min-width: 200px;
text-align: center;
`;


export const ConfirmArea = styled.View`
   justify-content: center;
   align-items: center;
`
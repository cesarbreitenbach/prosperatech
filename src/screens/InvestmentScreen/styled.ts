import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
  flex: 1;
  background-color:  ${({theme}) => theme.colors.black};
  padding: 0 ${RFValue(12)}px;
`;

export const Title = styled.Text`
    text-align: center;
    font-family: ${({theme}) => theme.fonts.SemiBold};
    font-size: ${RFValue(16)}px;
    color: ${({theme}) => theme.colors.selected};
`;



export const TitlePerkList = styled.Text`
font-family: ${({theme}) => theme.fonts.SemiBold};
font-size: ${RFValue(12)}px;
color: ${({theme}) => theme.colors.floatButton};
margin-top: 12px;
margin-bottom: 12px;
`;

export const TitlePerksBuy = styled.Text`
font-family: ${({theme}) => theme.fonts.regular};
font-size: ${RFValue(14)}px;
color: ${({theme}) => theme.colors.gold};
margin-top: 10px;
text-align: center;
`;

export const BuyInfoArea = styled.View`
   flex-direction: row;
   margin-top: 12px;
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
   background-color:  ${({theme}) => theme.colors.borgonha_intenso};
   margin-bottom: 4px;
`;

export const ButtonText = styled.Text`
font-family: ${({theme}) => theme.fonts.SemiBold};
font-size: ${RFValue(12)}px;
color: ${({theme}) => theme.colors.borgonha_intenso};
margin-left: 12px;
`;

export const CostsArea = styled.View`
   flex: 1;
   justify-content: center;
   align-items: center;
`

export const Label = styled.Text`
font-family: ${({theme}) => theme.fonts.SemiBold};
font-size: ${RFValue(10)}px;
color: ${({theme}) => theme.colors.borgonha_intenso};
margin-right: ${RFValue(12)}px;
`;

export const Cost = styled.Text`
font-family: ${({theme}) => theme.fonts.SemiBold};
font-size: ${RFValue(12)}px;
color: ${({theme}) => theme.colors.gold};
`;


export const ConfirmArea = styled.View`
   justify-content: center;
   align-items: center;
   flex: 1;
`

export const MineTaxes = styled.Text`
font-family: ${({theme}) => theme.fonts.SemiBold};
font-size: ${RFValue(26)}px;
color: ${({theme}) => theme.colors.success};
margin-right: 12px;
`;

export const MineTaxesTitle = styled.Text`
font-family: ${({theme}) => theme.fonts.medium};
font-size: ${RFValue(10)}px;
color: ${({theme}) => theme.colors.gold};
margin-right: 12px;
`;
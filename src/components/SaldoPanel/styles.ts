import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Title = styled.Text`
font-family: ${({theme}) => theme.fonts.medium};
font-size: ${RFValue(8)}px;
color: ${({theme}) => theme.colors.borgonha_intenso};
`;

export const ImageArea = styled.View`
   justify-content: center;
   align-items: center;
`;

export const ContentArea = styled.View`
   flex-direction: row;
   margin-left: ${RFValue(14)}px;;
  
`
export const Saldo = styled.Text`
font-family: ${({theme}) => theme.fonts.medium};
font-size: ${RFValue(14)}px;
color: ${({theme}) => theme.colors.gold};
`;

export const SaldoArea = styled.View`
   margin-right: ${RFValue(16)}px;
`
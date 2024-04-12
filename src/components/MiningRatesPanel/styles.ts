import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Container = styled.View`
  
`;
export const InvestmentTitle = styled.Text`
text-align: center;
font-family: ${({theme}) => theme.fonts.SemiBold};
font-size: ${RFValue(12)}px;
color: ${({theme}) => theme.colors.gold};
max-width: 200px;
margin-top: ${RFValue(6)}px;
`;

export const TitleTax = styled.Text`
text-align: center;
font-family: ${({theme}) => theme.fonts.regular};
font-size: ${RFValue(12)}px;
color: ${({theme}) => theme.colors.verde_esmeralda};
`;
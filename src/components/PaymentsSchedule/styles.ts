import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const PaymentArea = styled.View`
  flex-direction: row;
  justify-content: space-around;
`;
export const Item = styled.View`
 
`
export const LastPayment = styled.Text`
font-family: ${({theme}) => theme.fonts.medium};
font-size: ${RFValue(12)}px;
color: ${({theme}) => theme.colors.selected};
`;

export const NextPayment = styled.Text`
font-family: ${({theme}) => theme.fonts.medium};
font-size: ${RFValue(12)}px;
color: ${({theme}) => theme.colors.selected};
`;

export const Title = styled.Text`
font-family: ${({theme}) => theme.fonts.medium};
font-size: ${RFValue(10)}px;
color: ${({theme}) => theme.colors.white};
`;
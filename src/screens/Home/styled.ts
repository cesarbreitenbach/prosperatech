import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";

export const Container = styled.SafeAreaView`
   flex: 1;
   background-color: ${({theme}) => theme.colors.background_secondary};
   padding: ${RFValue(30)}px ${RFValue(12)}px;

`

export const ContentArea = styled.View`
   margin-top: ${RFValue(15)}px;
   justify-content: space-around;
   align-items: center;
   flex-direction: row;
  
`

export const SaldoArea = styled.View`

  
`

export const EnderecoWalletArea = styled.View`
 
  
`

export const Saldo = styled.Text`
font-family: ${({theme}) => theme.fonts.medium};
font-size: ${RFValue(16)}px;
color: ${({theme}) => theme.colors.gold};
`;

export const EnderecoWallet = styled.Text`
font-family: ${({theme}) => theme.fonts.regular};
font-size: ${RFValue(9)}px;
color: ${({theme}) => theme.colors.borgonha_intenso};
max-width: 300px;
`;

export const Title = styled.Text`
font-family: ${({theme}) => theme.fonts.medium};
font-size: ${RFValue(8)}px;
color: ${({theme}) => theme.colors.borgonha_intenso};
`;

export const ImageArea = styled.View`
   justify-content: center;
   align-items: center;
`;

export const MinningArea = styled.View`
`;

export const MinningTitle = styled.Text`
font-family: ${({theme}) => theme.fonts.medium};
font-size: ${RFValue(12)}px;
color: ${({theme}) => theme.colors.dark_gold};
text-align: center;
margin-top: ${RFValue(12)}px;
margin-bottom: ${RFValue(6)}px;;
`;

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


export const PaymentArea = styled.View`
  flex-direction: row;
  justify-content: space-around;
`;
export const Item = styled.View`

  
`

export const ButtonArea = styled.View`
   flex: 1;
   justify-content: center;
   align-items: center;
   margin-top: ${RFValue(12)}px;
`
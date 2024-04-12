import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";

export const Container = styled.SafeAreaView`
   flex: 1;
   background-color: ${({theme}) => theme.colors.background_secondary};
   padding: 6px 6px;

`

export const ContentArea = styled.View`
   margin-top: ${RFValue(15)}px;
   justify-content: space-around;
   align-items: center;
   flex-direction: row;
  
`


export const InfoArea = styled.View`
   flex: 1;
   margin-bottom: ${RFValue(8)}px;  
`


export const SaldoArea = styled.View`
   padding: ${RFValue(4)}px;
   align-items: flex-end;
`

export const Saldo = styled.Text`
font-family: ${({theme}) => theme.fonts.medium};
font-size: ${RFValue(18)}px;
color: ${({theme}) => theme.colors.gold};
`;

export const TitleTax = styled.Text`
text-align: center;
font-family: ${({theme}) => theme.fonts.regular};
font-size: ${RFValue(12)}px;
color: ${({theme}) => theme.colors.verde_esmeralda};
`;

export const TitleSaldo = styled.Text`
font-family: ${({theme}) => theme.fonts.medium};
font-size: ${RFValue(14)}px;
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

export const BetArea = styled.View`
   flex: 1;
   justify-content: center;
   align-items: center;
   margin-top: ${RFValue(12)}px;
`


export const InvestmentTitle = styled.Text`
text-align: center;
font-family: ${({theme}) => theme.fonts.SemiBold};
font-size: ${RFValue(12)}px;
color: ${({theme}) => theme.colors.gold};
max-width: 200px;
margin-top: ${RFValue(6)}px;
`;

export const NewMineArea = styled.TouchableOpacity<{backColor?: string}>`
   background-color: ${({theme, backColor}) => backColor ? backColor : theme.colors.dark_gold};
   justify-content: center;
   align-items: center;
   padding: ${RFValue(6)}px;
   margin-top: ${RFValue(6)}px;
   margin-bottom: ${RFValue(6)}px;
   border-radius: 8px;
`

export const TitleNewMine = styled.Text`
font-family: ${({theme}) => theme.fonts.SemiBold};
font-size: ${RFValue(11)}px;
color: ${({theme}) => theme.colors.borgonha_intenso};
`;

export const Advertise = styled.Text`
font-family: ${({theme}) => theme.fonts.medium};
font-size: ${RFValue(8)}px;
color: ${({theme}) => theme.colors.attention};
margin-top: ${RFValue(12)}px;
text-align: center;
`;

export const SubTitle = styled.Text`
font-family: ${({theme}) => theme.fonts.SemiBold};
font-size: ${RFValue(16)}px;
color: ${({theme}) => theme.colors.borgonha_intenso};
text-align: center;
`;

export const VirtuaArea = styled.View`
   flex: 1;
   align-items: center;
   padding: 0 ${RFValue(12)}px;
`

export const VirtuaText = styled.Text`
font-family: ${({theme}) => theme.fonts.SemiBold};
font-size: ${RFValue(12)}px;
color: ${({theme}) => theme.colors.azulFck};
text-align: center;
`;


export const ClaimArea = styled.View`
  flex-direction: row;
  padding: ${RFValue(1)}px;
  justify-content: space-around;
  `

import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const InvestMentArea = styled.TouchableOpacity`
margin: 5px;
background-color: ${({theme}) => theme.colors.black};
padding: ${RFValue(8)}px;
border-radius: 8px;
`;

export const InvestMentTitle = styled.Text`
font-family: ${({theme}) => theme.fonts.medium};
font-size: ${RFValue(12)}px;
color: ${({theme}) => theme.colors.dark_gold};
`;

export const InvestmentTax = styled.Text`
font-family: ${({theme}) => theme.fonts.medium};
font-size: ${RFValue(14)}px;
color: ${({theme}) => theme.colors.text_detail};
`;

export const AmountAway = styled.Text`
font-family: ${({theme}) => theme.fonts.medium};
font-size: ${RFValue(14)}px;
color: ${({theme}) => theme.colors.selected};
`;

export const TypeArea = styled.View`
   flex-direction: row;
   justify-content: space-between;
`;

export const TypeText = styled.Text`
font-family: ${({theme}) => theme.fonts.medium};
font-size: ${RFValue(12)}px;
color: ${({theme}) => theme.colors.dark_gold};
`;

export const ImageInvestArea = styled.View`
   justify-content: center;
   align-items: center;
  
`
export const TextArea = styled.View`
   flex-direction: row;
   justify-content: space-between;
`
export const Item = styled.View`

  
`

export const Title = styled.Text`
font-family: ${({theme}) => theme.fonts.medium};
font-size: ${RFValue(8)}px;
color: ${({theme}) => theme.colors.white};
`;

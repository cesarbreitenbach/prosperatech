import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Container = styled.TouchableOpacity<{active: boolean}>`
  background-color: ${({theme}) => theme.colors.black};
  margin: 5px;
  border-radius: 8px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border-color: ${({theme, active}) => active ? theme.colors.borgonha_intenso : theme.colors.white};
  border-width: 1px;
  padding-right: 2px;
`;

export const Description = styled.Text`
font-family: ${({theme}) => theme.fonts.medium};
font-size: ${RFValue(10)}px;
color: ${({theme}) => theme.colors.dark_gold};
text-align: center;
`;

export const Cost = styled.Text`
font-family: ${({theme}) => theme.fonts.medium};
font-size: ${RFValue(10)}px;
color: ${({theme}) => theme.colors.dark_gold};

`;

export const TypeCoin = styled.View`
   width: 50px;
   height: 50px;
   justify-content: center;
   

`;

export const Tax = styled.Text`
font-family: ${({theme}) => theme.fonts.medium};
font-size: ${RFValue(12)}px;
color: ${({theme}) => theme.colors.success};

`;

export const ImageArea = styled.View`
   justify-content: center;
   align-items: center;
`;

export const Content = styled.View`
  justify-content: flex-start;
  padding:  ${RFValue(8)}px;
  margin-right: ${RFValue(8)}px;
`;

export const Text = styled.Text`
font-family: ${({theme}) => theme.fonts.medium};
font-size: ${RFValue(10)}px;
color: ${({theme}) => theme.colors.dark_gold};
max-width: 220px;
`;

export const Item = styled.View`
   flex-direction: row;
   justify-content: space-between;
   align-items: center;
   margin-top: ${RFValue(8)}px;
`

export const Label = styled.Text<{color: string}>`
font-family: ${({theme}) => theme.fonts.medium};
font-size: ${RFValue(10)}px;
color: ${({theme, color}) => color ? color : theme.colors.borgonha_intenso};
max-width: 200px;
margin-right: 6px;
`;

export const AreaMore = styled.View`
`
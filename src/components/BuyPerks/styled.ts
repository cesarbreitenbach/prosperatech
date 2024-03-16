import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Container = styled.TouchableOpacity<{active: boolean}>`
  padding: 12px;
  background-color: white;
  margin: 10px;
  border-radius: 8px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border-color: ${({theme, active}) => active ? theme.colors.borgonha_intenso : theme.colors.white};
  border-width: 2px;
`;

export const Description = styled.Text`
font-family: ${({theme}) => theme.fonts.medium};
font-size: ${RFValue(10)}px;
color: ${({theme}) => theme.colors.dark_gold};
max-width: 80px;
`;

export const Cost = styled.Text`
font-family: ${({theme}) => theme.fonts.medium};
font-size: ${RFValue(10)}px;
color: ${({theme}) => theme.colors.dark_gold};
max-width: 80px;
`;

export const TypeCoin = styled.Text`
font-family: ${({theme}) => theme.fonts.medium};
font-size: ${RFValue(10)}px;
color: ${({theme}) => theme.colors.dark_gold};
max-width: 80px;
`;

export const Tax = styled.Text`
font-family: ${({theme}) => theme.fonts.medium};
font-size: ${RFValue(10)}px;
color: ${({theme}) => theme.colors.dark_gold};
max-width: 80px;
`;

export const ImageArea = styled.View`
  
`;

export const Content = styled.View`
  justify-content: flex-start;
  margin-right: 18px;
`;

export const Text = styled.Text`
font-family: ${({theme}) => theme.fonts.medium};
font-size: ${RFValue(10)}px;
color: ${({theme}) => theme.colors.dark_gold};
max-width: 200px;
`;

export const Item = styled.View`
   flex-direction: row;
  
`

export const Label = styled.Text`
font-family: ${({theme}) => theme.fonts.medium};
font-size: ${RFValue(10)}px;
color: ${({theme}) => theme.colors.borgonha_intenso};
max-width: 200px;
margin-right: 6px;
`;
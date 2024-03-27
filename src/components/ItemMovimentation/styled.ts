import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Container = styled.View`
  padding: ${RFValue(12)}px;
  border-color: ${({theme}) => theme.colors.gold};
  border-width: 1px;
  border-radius: 8px;
  margin: 8px 12px;
`;

export const Title = styled.Text`
text-align: center;
font-family: ${({theme}) => theme.fonts.SemiBold};
font-size: ${RFValue(14)}px;
color: ${({theme}) => theme.colors.white};
`;

export const Total = styled.Text`
font-family: ${({theme}) => theme.fonts.SemiBold};
font-size: ${RFValue(12)}px;
color: ${({theme}) => theme.colors.gold};
`;

export const Win = styled.Text`
font-family: ${({theme}) => theme.fonts.SemiBold};
font-size: ${RFValue(16)}px;
color: ${({theme}) => theme.colors.success};
`;

export const Create = styled.Text`
font-family: ${({theme}) => theme.fonts.SemiBold};
font-size: ${RFValue(12)}px;
color: ${({theme}) => theme.colors.azulFck};
text-align: right;
`;

export const Item = styled.View`
  flex-direction: row;
  padding: ${RFValue(12)}px;
  align-items: center;
`

export const TypeText = styled.Text`
font-family: ${({theme}) => theme.fonts.medium};
font-size: ${RFValue(12)}px;
color: ${({theme}) => theme.colors.dark_gold};
margin-right: ${RFValue(12)}px;
`;

export const Content = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
`
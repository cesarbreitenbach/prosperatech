import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Container = styled.TouchableOpacity`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: ${RFValue(12)}px;

`;

export const Title = styled.Text`
font-family: ${({theme}) => theme.fonts.SemiBold};
font-size: ${RFValue(20)}px;
color: ${({theme}) => theme.colors.attention};
text-align: center;
`;

export const Message = styled.Text`
font-family: ${({theme}) => theme.fonts.SemiBold};
font-size: ${RFValue(15)}px;
text-align: center;
color: ${({theme}) => theme.colors.gold};
`;

export const ButtonArea = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
  border-radius: ${RFValue(6)}px;
  background-color: ${({theme}) => theme.colors.borgonha_intenso};
  flex-direction: row;
  padding: ${RFValue(7)}px ${RFValue(12)}px;
`;

export const Content = styled.View`
  justify-content: center;
  align-items: center;
  padding: ${RFValue(12)}px;
  background-color: ${({theme}) => theme.colors.black};
  border-radius: 8px;
  border-color: ${({theme}) => theme.colors.gold};
  border-width: 2px;
`;

export const TextFuck = styled.Text`
font-family: ${({theme}) => theme.fonts.SemiBold};
font-size: ${RFValue(12)}px;
color: ${({theme}) => theme.colors.white};
text-align: center;
margin-right: ${RFValue(10)}px;
`;
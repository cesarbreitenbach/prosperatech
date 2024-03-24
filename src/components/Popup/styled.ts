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
  width: ${RFValue(80)}px;
  height: ${RFValue(80)}px;
  margin-top: ${RFValue(12)}px;
`;

export const Content = styled.View`
  justify-content: center;
  align-items: center;
  padding: ${RFValue(12)}px;
  background-color: ${({theme}) => theme.colors.black};
  border-radius: 6px;
  border-color: ${({theme}) => theme.colors.gold};
  border-width: 2px;
`;

export const NextBonus = styled.Text`
font-family: ${({theme}) => theme.fonts.SemiBold};
font-size: ${RFValue(12)}px;
text-align: center;
color: ${({theme}) => theme.colors.white};
`;
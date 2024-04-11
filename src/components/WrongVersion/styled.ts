import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background-color: ${({theme}) => theme.colors.black};
  justify-content: center;
  align-items: center;
  padding: ${RFValue(12)}px;
`;

export const Title = styled.Text<{align: string}>`
font-family: ${({theme}) => theme.fonts.medium};
font-size: ${RFValue(14)}px;
color: ${({theme}) => theme.colors.gold};
text-align: ${({align}) => align ? align : 'center'};
margin: 4px;
margin-top: ${RFValue(14)}px;
`;
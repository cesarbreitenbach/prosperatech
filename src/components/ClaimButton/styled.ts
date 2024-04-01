import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const ClaimButtonArea = styled.TouchableOpacity<{active: boolean}>`
background-color: ${({theme, active}) => active ? theme.colors.text : theme.colors.attention};
justify-content: center;
align-items: center;
padding: 0 ${RFValue(4)}px;
margin-top: ${RFValue(6)}px;
margin-bottom: ${RFValue(4)}px;
border-radius: 8px;
flex-direction: row;
`
export const ClaimText = styled.Text`
font-family: ${({theme}) => theme.fonts.SemiBold};
font-size: ${RFValue(12)}px;
color: ${({theme}) => theme.colors.white};
text-align: center;
`;

export const ClaimText2 = styled.Text`
font-family: ${({theme}) => theme.fonts.SemiBold};
font-size: ${RFValue(9)}px;
color: ${({theme}) => theme.colors.white};
text-align: center;
`;

export const ClaimContent = styled.View`
  padding: ${RFValue(12)}px;
  `
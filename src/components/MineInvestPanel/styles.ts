import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const BetArea = styled.View`
   flex: 1;
   justify-content: center;
   align-items: center;
   margin-top: ${RFValue(12)}px;
`
export const NewMineArea = styled.TouchableOpacity`
   background-color: ${({theme}) => theme.colors.dark_gold};
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
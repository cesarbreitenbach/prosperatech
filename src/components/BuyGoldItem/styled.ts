import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const ButtonArea = styled.TouchableOpacity<{selected: boolean}>`
   background-color: ${({theme, selected}) => selected ? theme.colors.borgonha_intenso : theme.colors.white };
   margin-bottom: ${RFValue(12)}px;
   padding: ${RFValue(12)}px;
   border-radius: ${RFValue(8)}px;
   flex-direction: row;
   justify-content: space-evenly;
`;

export const Title = styled.Text<{size: number, color: string}>`
font-family: ${({theme}) => theme.fonts.medium};
font-size: ${RFValue(12)}px;
color: ${({theme, color}) => color ? color : theme.colors.black};
`;

export const ContentArea = styled.View`
   justify-content: center;
   align-items: center;
   
`
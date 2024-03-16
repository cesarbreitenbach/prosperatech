import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const ButtonArea = styled.TouchableOpacity`
   width: ${RFValue(70)}px;
   height: ${RFValue(90)}px;
   background-color: ${({theme}) => theme.colors.gold};
   margin-left: 12px;
   border-radius: 8px;
   justify-content: center;
   align-items: center;
`;

export const Title = styled.Text`
   margin-top: -6px;
   font-family: ${({theme}) => theme.fonts.SemiBold};
   color: ${({theme}) => theme.colors.title};
   font-size: ${RFValue(10)}px;
`;
export const Coin = styled.Image`   
   width: 100px;
   height: 100px;
`
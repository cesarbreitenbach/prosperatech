import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Container = styled.View`
   flex: 1;
   background-color: ${({theme}) => theme.colors.background_secondary};
   padding: 12px;
   padding-top: 30px;
`;

export const Title = styled.Text`
font-family: ${({theme}) => theme.fonts.SemiBold};
font-size: ${RFValue(18)}px;
color: ${({theme}) => theme.colors.gold};
text-align: center;
`;

export const ButtonArea = styled.TouchableOpacity`
   background-color: ${({theme}) => theme.colors.success };
   margin-bottom: ${RFValue(12)}px;
   padding: ${RFValue(12)}px;
   border-radius: ${RFValue(8)}px;
   flex-direction: row;
   justify-content: space-evenly;
`;

export const BuyText = styled.Text`
font-family: ${({theme}) => theme.fonts.SemiBold};
font-size: ${RFValue(16)}px;
color: ${({theme}) => theme.colors.gold};
text-align: center;
`;

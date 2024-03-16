import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background-color:  ${({theme}) => theme.colors.black};
`;

export const Title = styled.Text`
    text-align: center;
    font-family: ${({theme}) => theme.fonts.SemiBold};
    font-size: ${RFValue(16)}px;
    color: ${({theme}) => theme.colors.selected};
`;

export const ButtonArea = styled.View`
   flex: 1;
   justify-content: center;
   align-items: center;
`

export const TitlePerkList = styled.Text`
font-family: ${({theme}) => theme.fonts.SemiBold};
font-size: ${RFValue(12)}px;
color: ${({theme}) => theme.colors.floatButton};
margin-top: 12px;
margin-bottom: 12px;
`;
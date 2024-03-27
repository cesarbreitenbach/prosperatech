import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Container = styled.View`
    flex: 1; 
    background-color: ${({theme}) => theme.colors.background_secondary};
    padding-top: ${RFValue(20)}px;
`;



export const Title = styled.Text`
    font-family: ${({theme}) => theme.fonts.medium };
    font-size: ${RFValue(12)}px;
    color: ${({theme}) => theme.colors.gold};
`
import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const PerkArea = styled.View`
    justify-content: center;
    align-items: center;
    margin-right: 3px;
    border-color: ${({theme}) => theme.colors.primary};
    border-width: 1px;
    padding: 12px;
    border-radius: 6px;
`;

export const PerkName = styled.Text`
font-family: ${({theme}) => theme.fonts.medium};
font-size: ${RFValue(12)}px;
color: ${({theme}) => theme.colors.dark_gold};
`;

export const MinningTax = styled.Text`
font-family: ${({theme}) => theme.fonts.medium};
font-size: ${RFValue(9)}px;
color: ${({theme}) => theme.colors.success};
`;

export const ValidUntil = styled.Text`
font-family: ${({theme}) => theme.fonts.SemiBold};
font-size: ${RFValue(9)}px;
color: ${({theme}) => theme.colors.borgonha_intenso};
`;
export const QtdItems = styled.Text`
font-family: ${({theme}) => theme.fonts.SemiBold};
font-size: ${RFValue(11)}px;
color: ${({theme}) => theme.colors.azulFck};
margin-left: ${RFValue(8)}px;
`;

export const Header = styled.View`
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin-bottom: ${RFValue(8)}px;
`;
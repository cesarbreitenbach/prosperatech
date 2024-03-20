import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Container = styled.View`
    flex: 1;
    background-color: ${({theme}) => theme.colors.background_secondary};
    padding: 0 ${RFValue(12)}px;
    justify-content: center;
    align-items: center;
`;

export const Title = styled.Text<{color?: string, size?: number}>`
    font-family: ${({theme}) => theme.fonts.medium };
    font-size: ${({size}) => size ? RFValue(size) : RFValue(12)}px;
    color: ${({color, theme}) => color ?  color : theme.colors.gold};
    margin-top: ${RFValue(14)}px;

`


export const LogoArea = styled.View`
   width: 100%;
   justify-content: center;
   align-items: center;
`

export const Logo = styled.Image`
    width: ${RFValue(300)}px;
    height: ${RFValue(200)}px;
`;

export const ButtonArea = styled.View`
    width: 100%;
    margin-top: ${RFValue(16)}px;
    justify-content: center;
    align-items: center;
`
import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const GoogleButtonArea = styled.TouchableOpacity`
    flex-direction: row;
    width: 70%;
    background-color: ${({theme}) => theme.colors.white};
    justify-content: center;
    align-items: center;
    border-radius: 6px;
    padding: ${RFValue(12)}px;
`
export const TitleGoogle = styled.Text`
    font-family: ${({theme}) => theme.fonts.medium };
    font-size: ${RFValue(14)}px;
    color: ${({theme}) => theme.colors.black};
    margin-left: ${RFValue(12)}px;
`
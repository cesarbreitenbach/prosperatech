import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Container = styled.View`
    width: 100%;
`;


export const Title = styled.Text`
   font-family: ${({theme}) => theme.fonts.regular};
   color: ${({theme}) => theme.colors.white};
`

export const Input = styled.TextInput`
    width: 80px;
    background-color: ${({theme}) => theme.colors.gold};
    border-radius: 8px;
    text-align: center;
    padding: 12px;
    color: ${({theme}) => theme.colors.black};
`

export const InputArea = styled.View`
    flex-direction: column;
    justify-content: space-around;
`;


export const Header = styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    
`;

export const ButtonClearArea = styled.TouchableOpacity`
   background-color:  ${({theme}) => theme.colors.borgonha_intenso};
   width: ${RFValue(80)}px;
   padding: ${RFValue(4)}px;
   justify-content: center;
   align-items: center;
   border-radius: 6px;
`

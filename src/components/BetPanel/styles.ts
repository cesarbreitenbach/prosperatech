import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Container = styled.View`
    width: 100%;
    padding: 0 12px;
`;


export const Title = styled.Text`
   font-family: ${({theme}) => theme.fonts.SemiBold};
   color: ${({theme}) => theme.colors.white};
   font-size: ${RFValue(12)}px;
`

export const Input = styled.Text`
    background-color: ${({theme}) => theme.colors.white};
    border-radius: 8px;
    min-width: 100px;
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

export const ButtonClearArea = styled.TouchableOpacity<{color?: string}>`
   background-color:  ${({theme, color}) => color ? color : theme.colors.borgonha_intenso};
   width: ${RFValue(80)}px;
   padding: ${RFValue(4)}px;
   justify-content: center;
   align-items: center;
   border-radius: 6px;
   margin-bottom: ${RFValue(8)}px;
`
export const ButtonArea = styled.View`
    flex-direction: column;
    
  
`;

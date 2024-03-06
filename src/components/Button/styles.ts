import { RectButton } from 'react-native-gesture-handler';
import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

interface ButtonProps {
    color?: string;
}

interface TextButtonProps {
    light: boolean;
    fontFamily: string|undefined;
}


export const Container = styled(RectButton)<ButtonProps>`
    width: 70%;
    padding: 19px;
    justify-content: center;
    align-items: center;
    background-color: ${({color }) => color}; 
    margin-bottom: 8px;
    border-radius: 15px;
    flex-direction: row;
`;

export const Title = styled.Text<TextButtonProps>`
   font-family: ${({theme, fontFamily}) => fontFamily ? fontFamily : theme.fonts.regular} ;
   font-size: ${RFValue(15)}px;
   color: ${({theme, light}) => light ? theme.colors.main_light : theme.colors.black};
   margin-right: ${RFValue(15)}px;
`

  
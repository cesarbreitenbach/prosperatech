// import { RectButton } from 'react-native-gesture-handler';
import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

interface ButtonProps {
    color?: string;
    width?: number;
    height?: number;
    radius?: number;
}

interface TextButtonProps {
    light: boolean;
    fontFamily: string|undefined;
    
}


export const Container = styled.TouchableHighlight<ButtonProps>`
    width: ${({ width }) => width ? `${width}px` : `70%` };
    height: ${({ height }) => height ? `${height}px` : `60px` };
    padding: ${({ width }) => width ? `0` : `16px` };
    justify-content: center;
    align-items: center;
    background-color: ${({color }) => color}; 
    margin-bottom: 8px;
    border-radius: ${({ radius }) => radius ? `${radius}px` : `10px` };
    flex-direction: row;
`;

export const Title = styled.Text<TextButtonProps>`
   font-family: ${({theme, fontFamily}) => fontFamily ? fontFamily : theme.fonts.SemiBold} ;
   font-size: ${RFValue(15)}px;
   color: ${({theme, light}) => light ? theme.colors.white : theme.colors.black};
   margin-right: ${RFValue(15)}px;
`

  
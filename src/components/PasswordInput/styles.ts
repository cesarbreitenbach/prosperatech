import { RFValue } from 'react-native-responsive-fontsize';
import Icon from 'react-native-vector-icons/FontAwesome';
import styled from 'styled-components/native';


interface IconProps {
    name: string;
    size: number;
    color: string;
}


export const Container = styled.View`
    flex-direction: row;
    border-width: 1px;
    border-radius: 5px;
    border-color: ${({theme}) => theme.colors.text_detail};
    margin-top: ${RFValue(12)}px; 
    width: 100%;
    height: ${RFValue(60)}px;
    align-items: center;
    justify-content: space-between;
    padding: 14px 20px;
    
`;


export const TextInput = styled.TextInput`
    width: 90%;
    color: ${({theme}) => theme.colors.gold};
    font-family: ${({theme}) => theme.fonts.regular };
    font-size: ${RFValue(14)}px;
    height: ${RFValue(60)}px;
  
`

export const IconContainer = styled.TouchableOpacity`
  width: 30px;
  height: 30px;
`

export const IconRight = styled(Icon)<IconProps>`
`
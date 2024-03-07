import { useTheme } from 'styled-components';

import { ActivityIndicator } from 'react-native';
import { Container, Title } from './styles';

export interface Props {
    title: string;
    loading?: boolean;
    color?: string;
    textColor?: string;
    fontFamily?: string;
    onPress: () => void;
    light?: boolean;
}

export default function Button({
    title, 
    loading,
    color,
    textColor,
    fontFamily,
    onPress,
    light=false,
}: Props){
    const theme = useTheme();

return (
   <Container color={color ? color : theme.colors.primary } onPress={loading ? () => {} : onPress}> 
      {loading ? <ActivityIndicator size='small' color="#fff"/> :  <Title light={light} fontFamily={fontFamily}>{title}</Title>} 
   </Container> 
);}
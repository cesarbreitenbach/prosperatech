import { useTheme } from 'styled-components';

import { Container, IconContainer, TextInput } from './styles';

import Icon from 'react-native-vector-icons/FontAwesome';


export interface Props {
    value: string;
    setValue: (v: string) => void;
    visible: boolean;
    setVisible: (v: boolean) => void;
    height: number;
}

export default function PasswordInput({
    value, 
    setValue,
    visible,
    setVisible,
    height
}: Props){
    const theme = useTheme();

return (
   <Container height={height}> 
      <TextInput
        placeholder='Digite a senha'
        placeholderTextColor={theme.colors.text}
        value={value}
        onChangeText={setValue}
        autoCorrect={false}
        secureTextEntry={visible}
        autoComplete="off"
      />
      <IconContainer onPress={() => setVisible(!visible)}>
         <Icon name={visible ? "eye" : "eye-slash"} size={25} color={theme.colors.gold} />
      </IconContainer>
   </Container> 
);}
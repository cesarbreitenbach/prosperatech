import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const ActiveSolicitationArea = styled.View` 
 flex-direction: row;
 background-color: ${({theme}) => theme.colors.verde_esmeralda};
 border-radius: 7px;
`

export const IdOrder = styled.Text`
    font-family: ${({theme}) => theme.fonts.medium };
    font-size: ${RFValue(12)}px;
    color: ${({theme}) => theme.colors.gold};

`

export const AmountOrder = styled.Text`
    font-family: ${({theme}) => theme.fonts.medium };
    font-size: ${RFValue(12)}px;
    color: ${({theme}) => theme.colors.gold};

`

export const Cotation = styled.Text`
    font-family: ${({theme}) => theme.fonts.medium };
    font-size: ${RFValue(12)}px;
    color: ${({theme}) => theme.colors.gold};

`

export const TypeOrder = styled.Text`
    font-family: ${({theme}) => theme.fonts.medium };
    font-size: ${RFValue(12)}px;
    color: ${({theme}) => theme.colors.gold};

`

export const StatusOrder = styled.Text`
    font-family: ${({theme}) => theme.fonts.medium };
    font-size: ${RFValue(12)}px;
    color: ${({theme}) => theme.colors.gold};

`

export const Text = styled.Text<{color?: string, size?: number}>`
    font-family: ${({theme}) => theme.fonts.medium };
    font-size: ${({size}) => size ? RFValue(size) : RFValue(12)}px;
    color: ${({color, theme}) => color ?  color : theme.colors.gold};

`

export const OrderCreation = styled.Text`
    font-family: ${({theme}) => theme.fonts.medium };
    font-size: ${RFValue(12)}px;
    color: ${({theme}) => theme.colors.gold};
`

export const DeleteText = styled.Text`
    font-family: ${({theme}) => theme.fonts.medium };
    font-size: ${RFValue(12)}px;
    color: ${({theme}) => theme.colors.gold};
`

export const DeleteArea = styled.View`
  padding: ${RFValue(12)}px;
  justify-content: center;
  align-items: center;
`
export const ButtonDelete = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
  background-color: ${({theme}) => theme.colors.borgonha_intenso };
  padding: ${RFValue(12)}px;
  border-radius: 7px;
`

export const OrderInfoArea = styled.View`
    flex: 1;
    padding: 12px;
    flex-direction: row;
`

export const Item = styled.View`
   padding: 12px;    
`
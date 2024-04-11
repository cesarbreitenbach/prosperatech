import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Container = styled.View`
   flex-direction: row;
    justify-content: space-around;
    align-items: center;
`;

export const AmountArea = styled.View`
    flex-direction: row;
    align-items: center;
`;

export const Title = styled.Text`
   font-family: ${({theme}) => theme.fonts.SemiBold };
   font-size: ${RFValue(9)}px;
   color: ${({theme}) => theme.colors.white};
`

export const BankBalance = styled.Text`
   font-family: ${({theme}) => theme.fonts.SemiBold };
   font-size: ${RFValue(14)}px;
   color: ${({theme}) => theme.colors.gold};
   margin:  ${RFValue(12)}px;
`

export const Item = styled.TouchableOpacity <{active: boolean}>`
    border-color: ${({theme, active}) => active ? theme.colors.gold : theme.colors.black};
    border-width: 2px;
    width: 50%;
    border-radius: 7px;
    padding: ${RFValue(1)}px 0;
    justify-content: center;
    align-items: center;
`;

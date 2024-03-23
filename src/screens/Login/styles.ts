import styled from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';

export const Container = styled.SafeAreaView`
  flex: 1; 
  background-color: ${({theme}) => theme.colors.background_secondary};
  padding-top: ${RFValue(20)}px;;
  `

export const ContentArea = styled.View`
   flex: 1;
   margin-left: 12px;
   margin-right: 12px;
`

export const LogoArea = styled.View`
   width: 100%;
   justify-content: center;
   align-items: center;
`

export const Logo = styled.Image`
    width: ${RFValue(300)}px;
    height: ${RFValue(200)}px;
`;

export const Title = styled.Text`
    font-family: ${({theme}) => theme.fonts.medium };
    font-size: ${RFValue(14)}px;
    color: ${({theme}) => theme.colors.text};
    margin-top: ${RFValue(14)}px;

`

export const Input = styled.TextInput`
    width: 100%;
    padding: 14px 20px;
    font-family: ${({theme}) => theme.fonts.regular };
    color: ${({theme}) => theme.colors.gold};
    font-size: ${RFValue(14)}px;
    border-width: 1px;
    border-radius: 5px;
    border-color: ${({theme}) => theme.colors.text_detail};
    margin-top: ${RFValue(12)}px;
`

export const Footer = styled.View`
   flex: 1;
   width: 100%;
   justify-content: center;
   align-items: center;
   margin-top: ${RFValue(30)}px;
`

export const ForgetArea = styled.TouchableOpacity`
   justify-content: center;
   align-items: flex-end;
`

export const ForgetText = styled.Text`
    font-family: ${({theme}) => theme.fonts.medium };
    font-size: ${RFValue(12)}px;
    color: ${({theme}) => theme.colors.gold};
`


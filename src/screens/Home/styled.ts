import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";

export const Container = styled.SafeAreaView`
   flex: 1;
   justify-content: center;
   align-items: center;
   background-color: #ddd;
`

export const Header = styled.View`
   margin-top: 40px;
   justify-content: center;
   align-items: center;
  
`

export const Label = styled.Text`
font-family: ${({theme}) => theme.fonts.medium};
font-size: ${RFValue(20)}px;
margin-bottom: ${RFValue(16)}px;
`
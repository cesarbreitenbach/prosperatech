import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";

export const Container = styled.SafeAreaView`
   flex: 1;
   background-color: ${({theme}) => theme.colors.background_secondary};
`

export const Label = styled.Text`
font-family: ${({theme}) => theme.fonts.medium};
font-size: ${RFValue(20)}px;
margin-bottom: ${RFValue(16)}px;
`

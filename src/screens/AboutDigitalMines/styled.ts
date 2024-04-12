import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
   flex: 1;
   background-color: ${({theme}) => theme.colors.background_secondary};
   padding: ${RFValue(10)}px ${RFValue(4)}px;

`;

export const Title = styled.Text<{align?: string}>`
font-family: ${({theme}) => theme.fonts.SemiBold};
font-size: ${RFValue(16)}px;
color: ${({theme}) => theme.colors.white};
text-align: ${({align}) => align ? align : 'left'};
`;


export const Text = styled.Text`
font-family: ${({theme}) => theme.fonts.SemiBold};
font-size: ${RFValue(12)}px;
color: ${({theme}) => theme.colors.gold};
text-align: center;
margin-top: ${RFValue(2)}px;
`;

export const WhatIsArea = styled.View`
  flex-direction: row;
`

export const ImageArea = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`

export const TextArea = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`

export const RuleArea = styled.View`
  align-items: flex-start;

`

export const HowToArea = styled.View`
  margin-top: ${RFValue(12)}px;
`

export const Rules = styled.Text`
font-family: ${({theme}) => theme.fonts.SemiBold};
font-size: ${RFValue(10)}px;
color: ${({theme}) => theme.colors.dark_gold};
margin-bottom: 4px;
`;

export const WhyArea = styled.View`
  flex-direction: row;
`
export const WhyItemArea = styled.View`
  width: 70%;
  justify-content: center;
`

export const Item = styled.Text`
font-family: ${({theme}) => theme.fonts.regular};
font-size: ${RFValue(12)}px;
color: ${({theme}) => theme.colors.success};
margin-bottom: 4px;
`;

export const UpgradeImageArea = styled.View`
  justify-content: center;
  align-items: center;
  flex: 1;
`

export const SimulatorArea = styled.View`
   padding: ${RFValue(10)}px;
   border-color: white;
   border-width: 1px;
   border-radius: 7px;
   margin-top: 12px;
   background-color: ${({theme}) => theme.colors.verde_esmeralda};
`

export const Input = styled.TextInput`
  border-color: white;
  border-width: 1px;
  width: 100px;
  border-radius: 8px;
  padding: 8px;
`

export const ButtonSimular = styled.TouchableOpacity``

export const InputText = styled.Text<{color?: string, size?: number}>`
font-family: ${({theme}) => theme.fonts.regular};
font-size: ${({size}) => size ? RFValue(size) : RFValue(12)}px;
color: ${({theme, color}) => color ? color : theme.colors.gold};
text-align: center;
`;

export const InputArea = styled.View`
 justify-content: space-between;
 padding: 12px;
 align-items: center;
 flex-direction: row;
`

export const InfoArea = styled.View`
   flex: 1;
   margin-bottom: ${RFValue(8)}px;  
`

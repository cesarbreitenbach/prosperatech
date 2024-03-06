import Animated from 'react-native-reanimated';
import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1; 
  justify-content: center; 
  align-items: center; 
  background-color: ${({theme}) => theme.colors.background_secondary};
`

export const Brand = styled(Animated.Text)`
  font-size: ${RFValue(12)}px;
  font-family: ${({theme}) => theme.fonts.regular };
  text-align: center;
  color: ${({theme}) => theme.colors.white}
`;

export const LogoPng = styled(Animated.Image)`
  height: ${RFValue(150)}px;
  width: ${RFValue(150)}px;
`;
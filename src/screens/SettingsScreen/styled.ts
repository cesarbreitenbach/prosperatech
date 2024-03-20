import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
   flex: 1;
   justify-content: center;
   align-items: center;
   background-color: ${({theme}) => theme.colors.background_secondary};
   padding: ${RFValue(30)}px ${RFValue(12)}px;

`
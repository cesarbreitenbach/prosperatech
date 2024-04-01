import React from 'react';

import { ClaimButtonArea, ClaimContent, ClaimText, ClaimText2,  } from './styled';
import fichaBonus from '../../assets/images/fichaBonus.png'
import { Image } from 'react-native';

interface ClaimButtonProps {
    handleDailyBonus: () => void;
    disabeDailyButton: boolean;
    timeToEnable: string;
}

const ClaimButton = ({handleDailyBonus, disabeDailyButton, timeToEnable}:ClaimButtonProps) => {
  return  <ClaimButtonArea onPress={handleDailyBonus} activeOpacity={0.7} active={disabeDailyButton} disabled={disabeDailyButton}>
                <ClaimContent>
                    {timeToEnable && <ClaimText2>Proximo Bônus</ClaimText2>}
                    <ClaimText>{timeToEnable ? `${timeToEnable}` : `Bônus Diário`}</ClaimText>
                </ClaimContent>
                <Image source={fichaBonus} style={{width: 30, height: 30}} />
           </ClaimButtonArea>
}

export default ClaimButton;
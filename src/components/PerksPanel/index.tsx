import React from 'react';

import { MinningTax, PerkArea, PerkName, ValidUntil } from './styled';
import { Image, ImageSourcePropType } from 'react-native';
import { mapPerkImages } from '../../services/perkImages';



interface PerksPanelProps{
    perkImage: ImageSourcePropType;
    descricao: string;
    tax: string;
    finalizaEm: string;
}

const PerksPanel = ({perkImage, descricao, tax, finalizaEm}: PerksPanelProps) => {

  return  <PerkArea>
            <Image source={perkImage} style={{width: 35, height: 35}}/>
            <PerkName numberOfLines={2}>{descricao}</PerkName>
            <MinningTax>Adiciona {tax} % à mineração</MinningTax>
            <ValidUntil>Finaliza em {finalizaEm} dias</ValidUntil>
          </PerkArea>
            }

export default PerksPanel;
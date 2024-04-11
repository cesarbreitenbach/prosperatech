import React from 'react';

import { Header, MinningTax, PerkArea, PerkName, QtdItems, ValidUntil } from './styled';
import { Image, ImageSourcePropType } from 'react-native';



interface PerksPanelProps{
    perkImage: ImageSourcePropType;
    descricao: string;
    tax: string;
    finalizaEm: string;
    count: number;
}

const PerksPanel = ({perkImage, descricao, tax, finalizaEm, count}: PerksPanelProps) => {

  return  <PerkArea>
            <Header>
               <Image source={perkImage} style={{width: 35, height: 35}}/>
               <QtdItems>Total {count}</QtdItems>
            </Header>
            <PerkName numberOfLines={2}>{descricao}</PerkName>
            <MinningTax>Adiciona {tax} % à mineração</MinningTax>
            <ValidUntil>Finaliza em {finalizaEm} dias</ValidUntil>
          </PerkArea>
            }

export default React.memo(PerksPanel);
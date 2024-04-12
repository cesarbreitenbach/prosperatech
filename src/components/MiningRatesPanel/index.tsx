import React from 'react';

import { Container, InvestmentTitle, TitleTax } from './styles';
interface MiningRatesPanelProps {
    mineTaxes: number;
}
const MiningRatesPanel = ({mineTaxes}: MiningRatesPanelProps) => {
  return <Container>
            <InvestmentTitle>* Suas Minerações:</InvestmentTitle>
            <TitleTax>Poder de mineração em {mineTaxes.toFixed(2)} %</TitleTax>
        </Container>
}

export default MiningRatesPanel;
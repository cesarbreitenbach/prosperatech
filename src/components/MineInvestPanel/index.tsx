import React from 'react';

import { BetArea, NewMineArea, TitleNewMine } from './styles';
import BetPanel from '../BetPanel';
import NewMine from '../NewMine';

interface MineInvestPanelProps {
    handleBuyMine: () => void;
    selectedCoin: string;
    setInvestmentValue: (value: number) => void;
    investmentValue: number;
}

const MineInvestPanel = ({handleBuyMine, selectedCoin, setInvestmentValue, investmentValue}: MineInvestPanelProps) => {
  return    <>
                <BetArea>
                    <BetPanel mininumValue={50} selectedBetCoin={selectedCoin} title="Recurso a minerar:" setBetValue={setInvestmentValue} betValue={investmentValue} />
                </BetArea>
                <NewMineArea onPress={handleBuyMine}>
                    <NewMine />
                    <TitleNewMine>Começe a minerar!</TitleNewMine>
                </NewMineArea>
            </>
}

export default MineInvestPanel;
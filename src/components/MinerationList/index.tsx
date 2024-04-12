import React from 'react';

import fichaCem from '../../assets/images/fichaBonus.png'
import fichaGold from '../../assets/images/fichaGold.png'
import mine from '../../assets/images/mine.png'
import { FlatList } from 'react-native';
import InvestmentPanel from '../InvestmentPanel';
import theme from '../../styles/theme';
import { IInvestments } from '../../@types/wallet';
interface MinerationListProps {
    investments: IInvestments[];
    handleMovimentation: () => void;
}
const MinerationList = ({investments, handleMovimentation}: MinerationListProps) => {
  return <FlatList 
            horizontal
            data={investments}
            contentContainerStyle={{backgroundColor: theme.colors.dark_gold, borderRadius: 8, marginTop: 8,}}
            renderItem={({item}) => <InvestmentPanel 
                                        onPress={handleMovimentation}
                                        coinTypeImage={item.type === 'bonus' ? fichaCem : fichaGold } 
                                        earnedAmount={item.valorInvestido}
                                        name={item.descricao}
                                        resourceImage={mine}
                                        tax={item.taxaBase}
                                        finalizaEm={item.finalizaEm}
                                        />}
            />
}

export default MinerationList;
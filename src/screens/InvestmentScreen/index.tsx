import React, { useEffect, useState } from 'react';


import { ButtonArea, ButtonText, BuyInfoArea, ConfirmArea, Container, Cost, CostsArea, Item, Label, MineTaxes, MineTaxesTitle, Title, TitlePerkList, TitlePerksBuy } from './styled';
import { useWalletContext } from '../../hooks/wallet';
import BuyPerks from '../../components/BuyPerks';

import SaldoPanel from '../../components/SaldoPanel';
import theme from '../../styles/theme';
import { FlatList, View } from 'react-native';
import PerksPanel from '../../components/PerksPanel';
import Header from '../../components/Header';
import backgroundImage from '../../assets/images/mineHeader.png'
import { ScrollView } from 'react-native-gesture-handler';
import { mapPerkImages } from '../../services/perkImages';
import BuyInfoPanel from '../../components/BuyInfoPanel';
import { IActivePerk, IPerks } from '../../@types/wallet';
import { showMessage } from 'react-native-flash-message';

interface PerkListItem {
    idPerk: number;
    namePerk: string;
    finalizaEm: number;
    taxPerk: string;
    efficiency_level: number;
}

interface GroupedData {
    [key: string]: {
        idPerk: number;
        namePerk: string;
        finalizaEm: number;
        taxPerk: string;
        efficiency_level: number;
        count: number;
    };
}

const InvestmentScreen: React.FC = () => {
    const {getPerkTypes, perkTypes, amount, perkList, buyUserPerks, getInvestiments} = useWalletContext();
    const [selectedPerk, setSelectedPerk] = useState<IActivePerk>({} as IActivePerk);
    const [qtdSelectedItems, SetQtdSelectedItems] = useState(0)
    const [grupedPerkList, setGrupedPerkList] = useState<IPerks[]>([]);
    const [mineTaxes, setMineTaxes] = useState(0)
    
   

    useEffect(() => {
        SetQtdSelectedItems(0)
    }, [selectedPerk])


    useEffect(() => {
        getPerkTypes();
        const groupedArray: IPerks[] = Object.values(perkList.reduce((acc: any, obj: any) => {
            const key = `${obj.idPerk}_${obj.namePerk}_${obj.finalizaEm}`;
            
            if (!acc[key]) {
                acc[key] = {
                    idPerk: obj.idPerk,
                    namePerk: obj.namePerk,
                    finalizaEm: obj.finalizaEm,
                    taxPerk: obj.taxPerk,
                    efficiency_level: obj.efficiency_level,
                    count: 0
                };
            }
            
            acc[key].count++;
            
            return acc;
        }, {})).map((item: any) => {
            return {
                ...item,
                count: item.count
            };
        });

        const sumTaxPerk = perkList.reduce((acc, obj) => {
            const taxPerk = parseFloat(obj.taxPerk);
            return acc + taxPerk;
        }, 0);

        setMineTaxes(sumTaxPerk)
    
        setGrupedPerkList(groupedArray);
    }, [perkList]);

    const handleBuy = async () => {
        if(qtdSelectedItems <= 0) {
            showMessage({
                message: "Selecione ao menos 1 item.",
                type: "danger",
                duration: 3000
            });
            return;
        };
        const resp = await buyUserPerks({idPerk: selectedPerk.id, totalItems: qtdSelectedItems})
        if (resp) {
            SetQtdSelectedItems(0)
            setSelectedPerk({} as IActivePerk)
            getInvestiments()
        }
        

    }
    const handleAdd = () => {
        if (Object.keys(selectedPerk).length === 0) return;
        SetQtdSelectedItems(old => old + 1)
    }
    const handleDel = () => {
        if(qtdSelectedItems <= 0) return;
        SetQtdSelectedItems(old => old - 1)
    }

    

  return <Container> 
           <Header hasGoBack backgroundImage={backgroundImage} height={140}/>
           <ScrollView style={{padding: 12}}>
                <Title>Gerêncie sua mina e updates!</Title>
                
                <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                    <View style={{padding: 12}}>
                        <MineTaxesTitle>Taxas de ganho:</MineTaxesTitle>
                        <MineTaxes>{mineTaxes} %</MineTaxes>
                    </View>
                    <SaldoPanel amountBonus={amount.amountBonus} amountReal={amount.amountReal} width={20} height={20} />
                </View>
                <TitlePerkList>Ativos - bônus de mineração:</TitlePerkList>
                <FlatList 
                    horizontal
                    data={grupedPerkList}
                    renderItem={({item}) => <PerksPanel 
                                                count={item.count}
                                                finalizaEm={item.finalizaEm}
                                                descricao={item.namePerk}
                                                perkImage={mapPerkImages[item.idPerk]}
                                                tax={item.taxPerk}
                                                />}
                    />
                <TitlePerksBuy>Perks Disponíveis para Investimento</TitlePerksBuy>
                <FlatList 
                    horizontal
                    data={perkTypes}
                    renderItem={({item, index}) => <BuyPerks 
                                                id={item.id}
                                                hasMore={perkTypes.length > index + 1}
                                                activePerk={selectedPerk}
                                                setActivePerk={setSelectedPerk}
                                                cost={item.cost} 
                                                description={item.description} 
                                                tax={item.mining_rate}
                                                type={item.allowCoin} 
                                                image={mapPerkImages[item.id]} 
                                                name={item.name} 
                                            />}
                    />
                <BuyInfoPanel 
                    name={selectedPerk.name}
                    cost={selectedPerk.cost}
                    qtdItems={qtdSelectedItems}
                    onBuy={handleBuy}
                    onAdd={handleAdd}
                    onDel={handleDel}
                />
               
           </ScrollView>
           
         </Container>
}

export default InvestmentScreen;
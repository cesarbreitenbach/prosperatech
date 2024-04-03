import React, { useEffect, useState } from 'react';


import {  Advertise, Container, MineTaxes, MineTaxesTitle, Title, TitlePerkList, TitlePerksBuy } from './styled';
import { useWalletContext } from '../../hooks/wallet';
import BuyPerks from '../../components/BuyPerks';

import SaldoPanel from '../../components/SaldoPanel';
import { FlatList, View } from 'react-native';
import PerksPanel from '../../components/PerksPanel';
import Header from '../../components/Header';
import backgroundImage from '../../assets/images/mineHeader.png'
import { ScrollView } from 'react-native-gesture-handler';
import { mapPerkImages } from '../../services/perkImages';
import BuyInfoPanel from '../../components/BuyInfoPanel';
import { IActivePerk, IPerks } from '../../@types/wallet';
import { showMessage } from 'react-native-flash-message';
import Popup from '../../components/Popup';
import { useNavigation } from '@react-navigation/native';

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
    const navigation = useNavigation<any>()
    const {getPerkTypes, perkTypes, amount, perkList, buyUserPerks, getInvestiments, getSaldo, lastCalculated} = useWalletContext();
    const [selectedPerk, setSelectedPerk] = useState<IActivePerk>({} as IActivePerk);
    const [qtdSelectedItems, SetQtdSelectedItems] = useState(0)
    const [grupedPerkList, setGrupedPerkList] = useState<IPerks[]>([]);
    const [mineTaxes, setMineTaxes] = useState(0);
    const [showPopup, setShowPopup] = useState(false);
    const [popupTitle, setPopupTitle] = useState("");
    const [popupMessage, setPopupMessage] = useState("");
    
   

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
        let bonus =  Number(amount?.amountBonus);
        let gold = Number(amount?.amountReal);
        let totlaCost = Number(selectedPerk.cost) * qtdSelectedItems;

        if (totlaCost > bonus && totlaCost > gold) {
            setShowPopup(true);
            setPopupTitle("Você não tem saldo!");
            setPopupMessage("Compre mais fichas ou aguarde o bônus de sua VirtuaMine!");
            return;
        }
        const resp = await buyUserPerks({idPerk: selectedPerk.id, totalItems: qtdSelectedItems})
        if (resp) {
            SetQtdSelectedItems(0)
            setSelectedPerk({} as IActivePerk)
            getInvestiments()
            getSaldo()
        } 
    }
    const handleAdd = () => {
        if (Object.keys(selectedPerk).length === 0) {
            showMessage({
                message: "Selecione um tipo de perk para adicionar!",
                type: "warning",
              });
              return;
        };
        SetQtdSelectedItems(old => old + 1)
    }
    const handleDel = () => {
        if(qtdSelectedItems <= 0) return;
        SetQtdSelectedItems(old => old - 1)
    }

    const handleBuyGold = () => {
        navigation.navigate('buycoins');
        setShowPopup(false);
    }

  return <Container> 
           <Header hasGoBack backgroundImage={backgroundImage} height={140}/>
           <ScrollView style={{padding: 12}} contentContainerStyle={{paddingBottom: 30}}>
                <Title>Gerêncie o bonus de equipamentos!</Title>
                
                <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                    <View style={{marginLeft: 12}}>
                        <MineTaxesTitle>Total de bônus</MineTaxesTitle>
                        <MineTaxes>{mineTaxes.toFixed(2)} %</MineTaxes>
                    </View>
                    <SaldoPanel amountBonus={amount.amountBonus} amountReal={amount.amountReal} width={20} height={20} />
                </View>
                {grupedPerkList?.length > 0 && <TitlePerkList>Perk's ativos nas suas VirtuaMines:</TitlePerkList>}
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
                <TitlePerksBuy>Selecione equipamento para comprar:</TitlePerksBuy>
                <FlatList 
                    horizontal
                    data={perkTypes.sort((a, b) => a.id - b.id)}
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

<Advertise>* Aviso: A "VirtuaMine" é um recurso usado para impulsionar a economia in-game. A mineração é sobre o recurso depositado, o recurso extraido é disponiblizado no saldo do usuário a cada calculo. Recurso depositado fica travado por 30 dias</Advertise>
               
           </ScrollView>
           <Popup 
                    setVisible={setShowPopup}
                    onPress={handleBuyGold}
                    hasBuyButton
                    visible={showPopup} 
                    title={popupTitle} 
                    message={popupMessage}
                    nextCalc={lastCalculated.nextTimeToCalculate}/>
           
         </Container>
}

export default InvestmentScreen;
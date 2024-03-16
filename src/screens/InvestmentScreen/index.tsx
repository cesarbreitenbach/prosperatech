import React, { useEffect, useState } from 'react';

import { ButtonArea, Container, Title, TitlePerkList } from './styled';
import { useWalletContext } from '../../hooks/wallet';
import BuyPerks from '../../components/BuyPerks';

import picareta from '../../assets/images/picaretaFerro.png'
import SaldoPanel from '../../components/SaldoPanel';
import Button from '../../components/Button';
import { useNavigation } from '@react-navigation/native';
import theme from '../../styles/theme';
import { FlatList, View } from 'react-native';
import PerksPanel from '../../components/PerksPanel';
import Header from '../../components/Header';
import backgroundImage from '../../assets/images/mineHeader.png'
import { ScrollView } from 'react-native-gesture-handler';
import { mapPerkImages } from '../../services/perkImages';

const InvestmentScreen: React.FC = () => {
    const {getPerkTypes, perkTypes, amount, perkList} = useWalletContext();
    const [selectedPerk, setSelectedPerk] = useState("");
    
    useEffect(() => {
        getPerkTypes()
    }, [])

    

  return <Container> 
           <Header hasGoBack backgroundImage={backgroundImage} height={140}/>
           <ScrollView style={{padding: 12}}>
            <Title>Gerêncie sua mina e updates!</Title>
            <View style={{width: 200, alignSelf: 'flex-end'}}>
                <SaldoPanel amountBonus={amount.amountBonus} amountReal={amount.amountReal} width={30} height={30} />
            </View>
            <TitlePerkList>Ativos - bônus de mineração:</TitlePerkList>
            <FlatList 
                    horizontal
                    data={perkList}
                    renderItem={({item}) => <PerksPanel 
                                                finalizaEm={item.finalizaEm}
                                                descricao={item.namePerk}
                                                perkImage={mapPerkImages[item.idPerk]}
                                                tax={item.taxPerk}
                                                />}
                    />
                <TitlePerkList>Perks para compra:</TitlePerkList>
                <FlatList 
                    horizontal
                    data={perkTypes}
                    renderItem={({item}) => <BuyPerks 
                                                activePerk={selectedPerk}
                                                setActivePerk={setSelectedPerk}
                                                cost={item.cost} 
                                                description={item.description} 
                                                tax={item.mining_rate}
                                                type={item.allowCoin} 
                                                image={picareta} 
                                                name={item.name} 
                                            />}
                    />
                <ButtonArea>
                    <Button title='Adicionar Perk' onPress={() => console.log(`faz a compra...`)} color={theme.colors.dark_gold} />
                </ButtonArea>
           </ScrollView>
           
         </Container>
}

export default InvestmentScreen;
import React, { useEffect, useState } from 'react';

import { AmountArea, AmountArea2, AmountArea3, ButtonArea, Container, ExchangeArea, Footer, InfoArea, InputAmountValue, LeftArea, RightArea, Text } from './styles';
import { useWalletContext } from '../../hooks/wallet';
import InfoUser from '../../components/InfoUser';
import Header from '../../components/Header';
import saque from '../../assets/images/saque.png'
import { ActivityIndicator, Image } from 'react-native';
import fakeMoney from '../../assets/images/fichaBonus.png'
import fichaGold from '../../assets/images/fichaGold.png'
import real from '../../assets/images/real.png'
import { format, parse } from 'date-fns';
import theme from '../../styles/theme';
import { ScrollView } from 'react-native';
import { formatarMoeda } from '../../services/formatService';
import { showMessage } from 'react-native-flash-message';
import MaskInput, { Masks } from 'react-native-mask-input';
import { validarCNPJ, validarCPF } from '../../services/functions';
import Button from '../../components/Button';
import { useBillingContext } from '../../hooks/billing';
import WithDrawnSolicitation from '../../components/WithDrawnSolicitation';
import { useSettingsContext } from '../../hooks/settings';


const WithdrawScreen: React.FC = () => {
    const {requestWithdraw, loading, withDrawn, getWithdraw} = useBillingContext();
    const {goldCotation, bonusCotation, minimumWithdraw} = useSettingsContext();
    const {amount} = useWalletContext();
    const [selectedCoin, setSelectedCoin] = useState("ficha");
    const [fichaBonus, setFichaBonus] = useState(amount.amountBonus);
    const [gold, setGold] = useState(amount.amountReal);
    const [exchangeAmount, setExchangeAmount] = useState("");
    const [convertedAmount, setConvertedAmount] = useState("0");
    const [document, setDocument] = useState('')
    const [error, setError] = useState(false);

    useEffect(() => {
        setExchangeAmount("");
        setConvertedAmount("0");

    }, [selectedCoin])

    useEffect(() => {
        setFichaBonus(amount.amountBonus);
        setGold(amount.amountReal);
        getWithdraw();
    }, [amount])

    const handleChange = (e: string) => {
        let saldoAtual;

        if (selectedCoin === 'ficha') {
            saldoAtual = amount.amountReal;
        } else {
            saldoAtual = amount.amountBonus;
        }

        if (Number(saldoAtual) < Number(e)) {
            showMessage({
                message: 'Você não possui esse saldo!',
                type: 'warning'
            });
            setExchangeAmount("0");
            return;
        }
        setExchangeAmount(e);
        const cotacion = selectedCoin === 'ficha' ? Number(goldCotation) : Number(bonusCotation);
    
        const value = Number(e) * cotacion;

        setConvertedAmount(String(value));
    }
    
    const handleBlurDocument = () => {
        setError(false);
        const doc = document.replace(/[^\d]+/g,'');
        
        let validacao;
        let mensagem;
        
        if (doc.length > 11) {
            validacao = validarCNPJ(doc);
            mensagem = 'CNPJ';
        } else {
            validacao = validarCPF(doc);
            mensagem = 'CPF';
        }
        
        if (!validacao) {
            setError(true);
            showMessage({
                message: `${mensagem} inválido!`,
                type: 'danger'
            });
        }
    }

    const handleWithdraw = async () => {
        if(error) return;
        if(Number(convertedAmount) < Number(minimumWithdraw)){
            showMessage({
                message: `Limite minimo para saque é de R$ ${minimumWithdraw}`,
                type: 'danger',
                duration: 5000
            });
            return;
        }
        await requestWithdraw({
            amount: convertedAmount,
            document,
            type: selectedCoin === 'bonus' ? 'bonus' : 'gold'
        })
    }

  return <Container> 
            <Header backgroundImage={saque} height={100} width={400} hasGoBack/>
            <ScrollView contentContainerStyle={{paddingBottom: 16}}>
                <InfoArea>
                    <InfoUser size={20} bonusAmount={fichaBonus} realAmount={gold} selectedCoin={selectedCoin} setSelectedCoin={setSelectedCoin}/>
                </InfoArea>    
                <ExchangeArea>
                    <RightArea>
                        <Text>Quantas fichas trocar?</Text>
                        <AmountArea>
                            <InputAmountValue value={exchangeAmount} onChangeText={handleChange} textAlign='right' keyboardType='number-pad'/>
                            <Image source={selectedCoin === 'bonus' ? fakeMoney : fichaGold } style={{width: 40, height: 40, marginLeft: 12}} />
                        </AmountArea>
                    </RightArea>
                    <LeftArea>
                        <AmountArea2>
                            <Text color={theme.colors.white} size={10}>Em {format(new Date(), 'dd/MM/yyyy')}</Text>
                            <Text color={theme.colors.gold} size={10}>Cotaçaão Ficha {selectedCoin === 'bonus' ? 'Bônus' : 'Gold' }</Text>
                            <Text color={theme.colors.success}size={14}>R$ {selectedCoin === 'bonus' ? bonusCotation : formatarMoeda(String(goldCotation)) }</Text>
                        </AmountArea2>
                        
                    </LeftArea>  
                    
                </ExchangeArea>
                <AmountArea3>
                    <Text color={theme.colors.white} size={10}>Total a ser trocado:</Text>
                    <InputAmountValue value={formatarMoeda(convertedAmount)} textAlign='right' editable={false} style={{color: theme.colors.success}}/>
                </AmountArea3> 
                <AmountArea3>
                    <Text color={theme.colors.white} size={10}>CPF/CNPJ (chave pix): </Text>
                    <MaskInput 
                          keyboardType='number-pad' 
                          value={document} 
                          onChangeText={setDocument} 
                          style={{color: theme.colors.gold}} 
                          mask={Masks.BRL_CPF_CNPJ}
                          onBlur={handleBlurDocument}
                          />
                </AmountArea3> 
                <Footer>
                    {loading ? <ActivityIndicator size="large" color={theme.colors.white}/> :
                    <>
                        {!withDrawn && <ButtonArea>
                            <Button 
                                  title='Solicitar Saque' 
                                  onPress={handleWithdraw} 
                                  color={theme.colors.gold} 
                                  loading={loading} 
                                  disabled={error}/>
                        </ButtonArea>}
                        {withDrawn && <WithDrawnSolicitation 
                            amount={withDrawn?.amount!}
                            cotation={withDrawn?.cotation!}
                            created={withDrawn?.createdAt!}
                            id={withDrawn?.id!}
                            status={withDrawn?.status!}
                            document={withDrawn?.document!}
                        />}
                    </>}
                       
                </Footer>
                
               
            </ScrollView>
            
         </Container>
}

export default WithdrawScreen;
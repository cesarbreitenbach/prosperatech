import { useNavigation } from '@react-navigation/native';
import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { showMessage } from 'react-native-flash-message';
import useAxios from  '../services/axios'
import { decode } from "base-64";
import { AmountProps, IInvestments, IPerks, IPerksTypes } from '../@types/wallet';

global.atob = decode;

interface WalletProviderProps {
    children: ReactNode;
}

interface IWalletContextData {
    amount: AmountProps;
    getSaldo: () => void;
    getInvestiments: () => void;
    getPerkTypes: () => void;
    investments: IInvestments[];
    perkList: IPerks[];
    perkTypes: IPerksTypes[];
}

// const valueInCents: number = Math.round(valueFromDatabase * 100);

const WalletContext = createContext({} as IWalletContextData);

const WALLETKEY = '@prosperatech:wallet';

function WalletProvider({children}: WalletProviderProps) {
    const { navigate } = useNavigation<any>();
    const [amount, setAmount] = useState<AmountProps>({} as AmountProps);

    const [investments, setInvestments] = useState<IInvestments[]>([])
    const [perkList, setPerkList] = useState<IPerks[]>([])

    const [perkTypes, setPerkTypes] = useState<IPerksTypes[]>([]);

    const { axiosClient: client } = useAxios();


    async function getSaldo() {
        try {
            const res = await client.get(`/wallet`);
          
            const {endereco, amountBonus, amountReal, saldo, taxaGanho } = res.data;

            const fixedBonus = Number(amountBonus).toFixed(3);
            const fixedAmountReal = Number(amountReal).toFixed(3);

            setAmount({
                endereco,
                amountBonus: fixedBonus,
                amountReal: fixedAmountReal,
                saldo,
                taxaGanho,
            })

           
        } catch (e) {
            console.log(`deu pau ao pegar saldo ${JSON.stringify(e)}`)
        }
    }

    async function syncSaldo() {

    }

    async function getInvestiments() {
        try {
            const res = await client.get(`/earns`);
          
            const {result, itemsPerks } = res.data;

            // const fixedBonus = Number(amountBonus).toFixed(3);
            // const fixedAmountReal = Number(amountReal).toFixed(3);

            setInvestments(result);
            setPerkList(itemsPerks);
           
        } catch (e) {
            console.log(`deu pau ao pegar investimentos ${JSON.stringify(e)}`)
        }
    }

    async function getPerkTypes() {
        try {
            const res = await client.get(`/minningAssets`);
          
            const { data } = res;

            // const fixedBonus = Number(amountBonus).toFixed(3);
            // const fixedAmountReal = Number(amountReal).toFixed(3);
            
            setPerkTypes(data);
           
        } catch (e) {
            console.log(`deu pau ao pegar perks ${JSON.stringify(e)}`)
        }
    }


    return (
        <WalletContext.Provider value={{  
                                       getSaldo,
                                       getInvestiments,
                                       getPerkTypes,
                                       amount,
                                       investments,
                                       perkList,
                                       perkTypes
                                    }}> 
            {children}
        </WalletContext.Provider> 
    );
}

function useWalletContext() {
   const context = useContext(WalletContext);

   return context;
}

export { WalletProvider, useWalletContext };


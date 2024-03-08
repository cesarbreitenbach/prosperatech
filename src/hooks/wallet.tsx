import { useNavigation } from '@react-navigation/native';
import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { showMessage } from 'react-native-flash-message';
import useAxios from  '../services/axios'
import { decode } from "base-64";

global.atob = decode;

interface WalletProviderProps {
    children: ReactNode;
}


interface IWalletContextData {
    amountReal: number;
    amountBonus: number;
    getSaldo: (id: number) => void;
}

// const valueInCents: number = Math.round(valueFromDatabase * 100);

const WalletContext = createContext({} as IWalletContextData);

const WALLETKEY = '@prosperatech:wallet';

function WalletProvider({children}: WalletProviderProps) {
    const { navigate } = useNavigation<any>();
    const [amountReal, setAmountReal] = useState(0);
    const [amountBonus, setAmountBonus] = useState(0);

    const { axiosClient: client } = useAxios();


    async function getSaldo(id: number) {
        console.log(`pegando o saldo do ID: ${id}`)
    }


    return (
        <WalletContext.Provider value={{  
                                       getSaldo,
                                       amountReal,
                                       amountBonus
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


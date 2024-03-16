import { useNavigation } from '@react-navigation/native';
import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { showMessage } from 'react-native-flash-message';
import useAxios from  '../services/axios'
import { decode } from "base-64";
import { useWalletContext } from './wallet';
import { RollProps, SyncProps } from '../@types/machine';

global.atob = decode;

interface SlotMachineProviderProps {
    children: ReactNode;
}




interface ISlotMachineContextData {
    roll: ({bet, randomNumber, type}:RollProps) => void;
    syncSaldo: ({bet}:SyncProps) => void;
}

const SlotMachineContext = createContext({} as ISlotMachineContextData);

const SlotMachineKEY = '@prosperatech:SlotMachine';

function SlotMachineProvider({children}: SlotMachineProviderProps) {
    const { navigate } = useNavigation<any>();
   
    const { axiosClient: client } = useAxios();

    async function roll({bet, randomNumber, type}: RollProps) {

        try {
            const res = await client.post(`/machine/roll`, {
                betValue: bet,
                type, 
                randomNumber
            });
            console.log(`peguei ${JSON.stringify(res.data)}`)
        } catch (e) {
            console.log(`deu pau ao pegar saldo ${JSON.stringify(e)}`)
        }
    }

    async function syncSaldo({bet}: SyncProps) {
        try {
            const res = await client.post(`/user/klan`, {
                value: bet,
            });
            console.log(`peguei ${JSON.stringify(res.data)}`)
        } catch (e) {
            console.log(`deu pau ao pegar saldo ${JSON.stringify(e)}`)
        }
    }


    return (
        <SlotMachineContext.Provider value={{  
                                     roll,
                                     syncSaldo
                                    }}> 
            {children}
        </SlotMachineContext.Provider> 
    );
}

function useSlotMachineContext() {
   const context = useContext(SlotMachineContext);

   return context;
}

export { SlotMachineProvider, useSlotMachineContext };


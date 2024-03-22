import { useNavigation } from '@react-navigation/native';
import { createContext, ReactNode, useContext } from 'react';
import useAxios from  '../services/axios'
import { decode } from "base-64";
import { RollProps, SyncProps } from '../@types/machine';
import { formatToPostgresDecimal } from '../services/formatService';

global.atob = decode;

interface SlotMachineProviderProps {
    children: ReactNode;
}

interface ISlotMachineContextData {
    roll: ({bet, randomNumber, type}:RollProps) => Promise<void>;
    syncSaldo: ({bet}:SyncProps) => void;
}

const SlotMachineContext = createContext({} as ISlotMachineContextData);

const SlotMachineKEY = '@prosperatech:SlotMachine';

function SlotMachineProvider({children}: SlotMachineProviderProps) {
    const { navigate } = useNavigation<any>();
   
    const { axiosClient: client } = useAxios();

    async function roll({bet, randomNumber, type}: RollProps): Promise<void> {
        console.log(`vou jogar ${bet}`)

        try {
            const res = await client.post(`/machine/roll`, {
                betValue: bet,
                type, 
                randomNumber
            });
            console.log(`joguei ${bet}`)
        } catch (e: any) {
            console.log(`deu pau ao roll ${JSON.stringify(e.response.data)}`)
        }
    }

    async function syncSaldo({bet}: SyncProps) {
        try {
            const res = await client.post(`/user/klan`, {
                value: bet,
            });
            console.log(`sincroinzei o valor ${bet}`)
        } catch (e) {
            console.log(`deu pau ao klan ${JSON.stringify(e)}`)
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


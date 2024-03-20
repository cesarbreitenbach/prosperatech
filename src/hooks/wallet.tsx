import { useNavigation } from '@react-navigation/native';
import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { showMessage } from 'react-native-flash-message';
import useAxios from  '../services/axios'
import { decode } from "base-64";
import { AmountProps, IBuyUserPercs, IInvestments, ILastCalculate, IPerks, IPerksTypes } from '../@types/wallet';
import { addMinutes, format } from 'date-fns';
import { useSettingsContext } from './settings';
import { useAuthContext } from './auth';

global.atob = decode;

interface IPostEarns {
    idEarnType: Number;
    amount: Number;
    type: string;
}

interface WalletProviderProps {
    children: ReactNode;
}

interface IWalletContextData {
    amount: AmountProps;
    getSaldo: () => void;
    getLastCalculated: () => void;
    getInvestiments: () => void;
    getPerkTypes: () => void;
    buyUserPerks: ({idPerk, totalItems}: IBuyUserPercs) => Promise<Boolean> ;
    buyCriptoMine: (body: IPostEarns) => void;
    investments: IInvestments[];
    perkList: IPerks[];
    perkTypes: IPerksTypes[];
    lastCalculated: ILastCalculate;
}

// const valueInCents: number = Math.round(valueFromDatabase * 100);

const WalletContext = createContext({} as IWalletContextData);

const WALLETKEY = '@prosperatech:wallet';

function WalletProvider({children}: WalletProviderProps) {
    const { navigate } = useNavigation<any>();

    const {user} = useAuthContext();

    const {calculateTime} = useSettingsContext();

    const [amount, setAmount] = useState<AmountProps>({} as AmountProps);

    const [investments, setInvestments] = useState<IInvestments[]>([])
    const [perkList, setPerkList] = useState<IPerks[]>([])

    const [perkTypes, setPerkTypes] = useState<IPerksTypes[]>([]);

    const [lastCalculated, setLastCalculated] = useState<ILastCalculate>({} as ILastCalculate)

    const { axiosClient: client } = useAxios();

    useEffect(() => {
        // Função que será chamada a cada 15 minutos
        const fetchData = async () => {
            await getSaldo();
            await getLastCalculated();
            console.log(`atualizando saldos`)
        };

        // Chama a função fetchData assim que o componente for montado
        fetchData();

        // Configura o setInterval para chamar a função fetchData a cada 15 minutos
        const interval = setInterval(fetchData, 1 * 60 * 1000);

        // Retorna uma função de limpeza que limpará o intervalo quando o componente for desmontado
        return () => clearInterval(interval);
    }, []); // A dependência vazia [] garante que o useEffect só será executado uma vez, quando o componente for montado



    async function getSaldo() {
        try {

            if(!user.token) {
                return;
            }

            const res = await client.get(`/wallet`);
          
            const {endereco, amountBonus, amountReal, saldo, taxaGanho } = res.data;

            const fixedBonus = Number(amountBonus).toFixed(2);
            const fixedAmountReal = Number(amountReal).toFixed(2);
            const fixedAmountSaldo = Number(saldo).toFixed(2);

            setAmount({
                endereco,
                amountBonus: fixedBonus,
                amountReal: fixedAmountReal,
                saldo: fixedAmountSaldo,
                taxaGanho,
            })

           
        } catch (e) {
            console.log(`deu pau ao pegar saldo ${JSON.stringify(e)}`)
        }
    }

    async function syncSaldo() {

    }

    async function getLastCalculated() {
        try {
            if(!user.token) {
                return;
            }
            const res = await client.get(`/calculatedlog`);
          
            const {createdAt} = res.data;

            console.log(`calculateTime: ${calculateTime}`)

            const nextCalc = addMinutes(new Date(createdAt), calculateTime);

            const parsedLast = format(new Date(createdAt), 'dd/MM/yyyy HH:mm');
            const parsedNext = format(nextCalc, 'dd/MM/yyyy HH:mm');

            setLastCalculated({
                lastTimeCalculated: parsedLast,
                nextTimeToCalculate: parsedNext
            })
        } catch (e) {
            console.log(`deu pau ao pegar ultimo calculo ${JSON.stringify(e)}`)
        }
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

    async function buyCriptoMine(body:IPostEarns) {
        try {
            const res = await client.post(`/earns`, body);
            getSaldo();
            getInvestiments();
        } catch (e) {
            console.log(`deu pau ao comprar criptomines ${JSON.stringify(e)}`)
        }
    }

    async function buyUserPerks({idPerk, totalItems}: IBuyUserPercs): Promise<Boolean> {
        try {
            const res = await client.post(`/userminning/${idPerk}`, {totalItems});
          
            const { data } = res;
            
            if(res.status === 200) {
                showMessage({
                    message: "Compra efetuada com sucesso!",
                    type: "success",
                    duration: 3000
                });
                return true
            } else {
                console.log(`erro: ${data?.error}`)
                showMessage({
                    message: "Erro ao comprar perk!",
                    type: "danger",
                    duration: 3000
                });
                return false
            }
            
            
           
        } catch (e) {
            console.log(`deu pau ao pegar perks ${JSON.stringify(e)}`)
            return false
        }
    }


    return (
        <WalletContext.Provider value={{  
                                       buyUserPerks,    
                                       getSaldo,
                                       getInvestiments,
                                       getPerkTypes,
                                       buyCriptoMine,
                                       getLastCalculated,
                                       lastCalculated,
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


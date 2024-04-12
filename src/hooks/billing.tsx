import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { Purchase, useIAP } from 'react-native-iap';
import { showMessage } from 'react-native-flash-message';
import useAxios from  '../services/axios'
import { ProductItemProps } from '../@types/billing';
import { useWalletContext } from './wallet';
import { useAuthContext } from './auth';

interface WithdrawProps {
    amount: string;
    type: string;
    document: string;
}

interface WithDrawnProps {
        id: number
        idUser: number
        document: string
        amount: string
        cotation: string
        type: string
        status: string
        createdAt: string
        updatedAt: string
}
interface BillingProviderProps {
    children: ReactNode;
}

interface IBillingContextData {
    loading: boolean;
    getAllProducts: () => void; 
    buyProduct: (sku: string) => void;
    getWithdraw: () => Promise<void>;
    confirm: (currentPurchase: Purchase) => Promise<void>;
    cancelWithdraw: () => Promise<void>;
    withDrawn: WithDrawnProps | undefined;
    requestWithdraw: ({amount, document, type}: WithdrawProps) => Promise<void>;
    productList: ProductItemProps[];
}

const BillingContext = createContext({} as IBillingContextData);

function BillingProvider({children}: BillingProviderProps) {

    const {  getProducts, 
             connected, 
             products, 
             currentPurchaseError, 
             currentPurchase, 
             requestPurchase, 
             finishTransaction} = useIAP();

    const {getSaldo} = useWalletContext()
    const {user} = useAuthContext();

    const [productList, setProductList] = useState<ProductItemProps[]>([]);
    const [sku, setSku] = useState('');
    const [loading, setLoading] = useState(false);
    const [withDrawn, setWithDrawn] = useState<WithDrawnProps>();

    const [buyError, setBuyError] = useState(false);

    const { axiosClient: client } = useAxios();

    useEffect(() => {
        if(!products) return;
        setProductList(products)
    }, [products])

    async function confirm(currentPurchase: Purchase): Promise<void>{
        await confirmBuy()
        finishTransaction({purchase: currentPurchase, isConsumable: true})
        console.log(`Finalizando compra de fichas!`)
        showMessage({
            message: 'Sucesso ao efetuar a compra!',
            type: 'success',
            duration: 5000
        })
    }

    async function getAllProducts() {
        if(connected){
            await getProducts({skus: ["1", "2"]})
        }
    }

    async function buyProduct(sku: string) {
        if(connected){
            setBuyError(false);
            setSku(sku)
            try {
                await requestPurchase({sku, skus: [sku]});
            } catch(e) {
                console.log(`Erro ao comprar: ${JSON.stringify(e)}`)
            }
        }
    }

    async function confirmBuy(): Promise<void>{
        const amount = sku === '1' ? 100 : 50;
        try{
            await client.post(`/wallet/depositReal`, {
                idUser: user.id,
                amount,
                token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6IkNlc2FyIiwiZW1haWwiOiJhZG1pbkBwcm9zcGVyYXRlY2gub25saW5lIiwiYWRtaW4iOnRydWUsIndhbGxldEFkZHJlcyI6IjExMjMxMjMxMzEzMTIzMTIzIiwiaWF0IjoxNzEwMTY0OTg3fQ.vYO8QsEBeUm3lr7pyxGf_gyzmEygQW6m3vBbJRWrhQA"
            });
            await getSaldo();
        }catch(e){
            console.log(`erro ao confirmar compra`, e)
            showMessage({
                message: 'Erro ao efetuar compra, efetuando estorno!',
                type: 'danger'
            })
        }
    }
  
    async function requestWithdraw({amount, document, type}: WithdrawProps): Promise<void>{
        setLoading(true)
        try{
            await client.post(`/withdraw`, {
                amount,
                document,
                type
            });
            await getSaldo();
            showMessage({
                message: 'Você receberá seu dinheiro em ate 48hrs! Obrigado por usar Ceasars Place',
                type: 'success',
                duration: 6000
            })
        }catch(e: any){
            showMessage({
                message: e?.response?.data?.error || 'Erro ao efetuar solicitação de saque!',
                type: 'danger'
            })
        }finally{
            setLoading(false);
        }
    }

    async function getWithdraw(): Promise<void>{
        setLoading(true)
        try{
            const res = await client.get(`/withdraw`);
            setWithDrawn(res.data)
        }catch(e: any){
            setWithDrawn(undefined)
        }finally{
            setLoading(false);
        }
    }

    async function cancelWithdraw(): Promise<void>{
        setLoading(true)
        try{
            await client.delete(`/withdraw`);
            await getSaldo();
            setWithDrawn(undefined)
            showMessage({
                message: 'Sua solicitação foi cancelada com sucesso, saldo devolvido para carteira.',
                type: 'success',
                duration: 6000
            })
        }catch(e: any){
            showMessage({
                message: e?.response?.data?.error || 'Erro ao efetuar solicitação de saque!',
                type: 'danger'
            })
        }finally{
            setLoading(false);
        }
    }

    return (
        <BillingContext.Provider value={{  
                                          getAllProducts,
                                          buyProduct,
                                          getWithdraw,
                                          requestWithdraw,
                                          cancelWithdraw,
                                          confirm,
                                          withDrawn,
                                          productList,
                                          loading  
                                        }}> 
            {children}
        </BillingContext.Provider> 
    );
}

function useBillingContext() {
   const context = useContext(BillingContext);

   return context;
}

export { BillingProvider, useBillingContext };


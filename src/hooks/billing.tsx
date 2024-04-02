import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { useIAP } from 'react-native-iap';
import { showMessage } from 'react-native-flash-message';
import useAxios from  '../services/axios'
import { ProductItemProps } from '../@types/billing';
import { useWalletContext } from './wallet';
import { useAuthContext } from './auth';


interface BillingProviderProps {
    children: ReactNode;
}

interface IBillingContextData {
    getAllProducts: () => void; 
    buyProduct: (sku: string) => void;
    productList: ProductItemProps[];
}

const BillingContext = createContext({} as IBillingContextData);

function BillingProvider({children}: BillingProviderProps) {

    const {getProducts, connected, products, currentPurchaseError, currentPurchase, requestPurchase} = useIAP();
    const {getSaldo} = useWalletContext()
    const {user} = useAuthContext();

    const [productList, setProductList] = useState<ProductItemProps[]>([]);
    const [sku, setSku] = useState('');

    const { axiosClient: client } = useAxios();

    useEffect(() => {
        if(!products) return;
        setProductList(products)
    }, [products])


      useEffect(() => {
        console.log(`deu pau??? currentPurchaseError ${JSON.stringify(currentPurchaseError)}`)
        showMessage({
            message: 'Erro ao efetuar compra, valor não debitado!',
            type: 'danger'
        })
      }, [currentPurchaseError]);
    
      useEffect(() => {
        if(!currentPurchase?.productId){
            return;
        }
        confirmBuy()
      }, [currentPurchase]);

   
    async function getAllProducts() {
        if(connected){
            await getProducts({skus: ["1", "2"]})
        }
    }

    async function buyProduct(sku: string) {
        if(connected){
            console.log(`entrei aqui com sku ${sku}`)
            setSku(sku)
            await requestPurchase({sku, skus: [sku]});
        }
    }

    async function confirmBuy(){
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
  
    return (
        <BillingContext.Provider value={{  
                                          getAllProducts,
                                          buyProduct,
                                          productList  
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


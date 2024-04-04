import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { Purchase, useIAP } from 'react-native-iap';
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

    const [buyError, setBuyError] = useState(false);

    const { axiosClient: client } = useAxios();

    useEffect(() => {
        if(!products) return;
        setProductList(products)
    }, [products])


      useEffect(() => {
            if(!currentPurchaseError) return;

            if (currentPurchaseError.code === "E_USER_CANCELLED") {
                showMessage({
                    message: 'Compra não concluida.',
                    type: 'warning'
                })
                return;
            }
  
            if (currentPurchaseError.code === "E_SERVICE_ERROR") {
                showMessage({
                    message: 'Erro na compra, serviço indisponivel.',
                    type: 'danger'
                })
                return;
            }
 
            console.log(`deu pau??? currentPurchaseError ${JSON.stringify(currentPurchaseError)}`)
            
            showMessage({
                message: 'Aguarde... processando compra.',
                type: 'info'
            })
      }, [currentPurchaseError]);
    
      useEffect(() => {
        const confirm = async (currentPurchase: Purchase) => {
            await confirmBuy()
            finishTransaction({purchase: currentPurchase, isConsumable: true})
            console.log(`Finalizando compra de fichas!`)
        }
        if(!currentPurchase?.transactionId){
            return;
        }

        confirm(currentPurchase)
        showMessage({
            message: 'Item comprado com sucesso!',
            type: 'success'
        })

      }, [currentPurchase]);

   
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



import React, { useEffect } from 'react';
import { useBillingContext } from './billing';
import { Purchase, useIAP } from 'react-native-iap';
import { showMessage } from 'react-native-flash-message';

const PurchaseListener = () => {
  const { currentPurchase, currentPurchaseError } = useIAP();
  const { confirm } = useBillingContext();

  useEffect(() => {
    console.log(`estou com currentPurchaseError ${JSON.stringify(currentPurchaseError)} .... monitorando...`)

    if(!currentPurchaseError) return;

    if (currentPurchaseError.code === "E_USER_CANCELLED") {
        showMessage({
            message: 'Cancelado pelo usuário.',
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
        message: 'Ocorreu um erro sua compra foi estornada.',
        type: 'warning'
    })
}, [currentPurchaseError]);

  useEffect(() => {
    console.log(`estou com purchase ${JSON.stringify(currentPurchase)} .... monitorando...`)

    if (!currentPurchase) {
      return;
  }

    if (!currentPurchase?.transactionId) {
      showMessage({
          message: 'Sua compra está sendo processada aguarde!',
          type: 'info',
          duration: 5000
      })
      return;
    }

    confirmPurchase(currentPurchase);

  }, [currentPurchase]);

  const confirmPurchase = async (purchase: Purchase) => {
    await confirm(purchase);
    console.log(`Finalizando compra de fichas!`);
};

  return null; 
};

export default PurchaseListener;
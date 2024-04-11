import React from 'react';

import { ActiveSolicitationArea, AmountOrder, ButtonDelete, Cotation, DeleteArea, DeleteText, IdOrder, Item, OrderCreation, OrderInfoArea, StatusOrder, Text, TypeOrder } from './styled';
import Icon  from 'react-native-vector-icons/FontAwesome5';
import theme from '../../styles/theme';
import { format } from 'date-fns';
import { useBillingContext } from '../../hooks/billing';

interface WithDrawnProps {
    id: number;
    amount: string;
    cotation: string;
    document: string;
    status: string;
    created: string;
}

const WithDrawnSolicitation = ({id, amount, cotation, created, status, document}: WithDrawnProps) => {
    const {cancelWithdraw} = useBillingContext();
    const handleCancelOrder = () => {
        cancelWithdraw();
    }
  return <ActiveSolicitationArea>
            <OrderInfoArea>
                <Item>
                    <Text color={theme.colors.white} size={10}>Solicitação:</Text>
                    <IdOrder># {id}</IdOrder>
                    <Text color={theme.colors.white} size={10}>Valor sacado:</Text>
                    <AmountOrder>R$ {amount}</AmountOrder>
                    <Text color={theme.colors.white} size={10}>Cotação:</Text>
                    <Cotation>R$ {cotation}</Cotation>
                </Item>
                <Item>
                    <Text color={theme.colors.white} size={10}>Chave Pix:</Text>
                    <TypeOrder>{document}</TypeOrder>
                    <Text color={theme.colors.white} size={10}>Status Operação:</Text>
                    <StatusOrder>{status}</StatusOrder>
                    <Text color={theme.colors.white} size={10}>Solicitado em:</Text>
                    <OrderCreation>{format(created, 'dd/MM/yyyy HH:mm')}</OrderCreation>
                </Item>
                
            </OrderInfoArea>
            <DeleteArea>
                <ButtonDelete onPress={handleCancelOrder}> 
                    <Icon name='trash-alt' size={30} color={theme.colors.gold}/>
                    <DeleteText>Cancelar</DeleteText>
                </ButtonDelete>
            </DeleteArea>
            </ActiveSolicitationArea>
}
export default WithDrawnSolicitation;
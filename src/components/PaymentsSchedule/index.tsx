import React from 'react';

import { Item, LastPayment, NextPayment, PaymentArea, Title } from './styles';
import { ILastCalculate } from '../../@types/wallet';
interface PaymentsScheduleProps{
    lastCalculated: ILastCalculate;
}
const PaymentsSchedule = ({lastCalculated}: PaymentsScheduleProps) => {
  return    <PaymentArea>
                <Item>
                    <Title>Ultima coleta recursos:</Title>
                    <LastPayment>{lastCalculated.lastTimeCalculated}</LastPayment>
                </Item>
                <Item>
                    <Title>Proxima coleta recursos:</Title>
                    <NextPayment>{lastCalculated.nextTimeToCalculate}</NextPayment>
                </Item>
            </PaymentArea>
}

export default PaymentsSchedule;
import React, { useEffect, useRef, useState } from 'react';
import { View, Platform } from 'react-native';
import { WebView } from 'react-native-webview';
import { API_ANDROID, API_URL, WEB_PORT, ENV, API_DEV } from '@env';

interface IParams {
  token: string;
}

const SlotMachine = () => {
  console.log(`tenho ENV: ${ENV} e ${API_ANDROID} e ${WEB_PORT}`)
  const params: IParams = {
    token: 'aldfkjalkdfjalkdfakldjfakldf'
  };
  
  const siteUrl = ENV === 'dev' ? Platform.OS === 'android' ? `${API_ANDROID}:${WEB_PORT}` : `${API_DEV}:${WEB_PORT}` : `${API_URL}`;

  console.log(`peguei siteUrl: ${siteUrl}`)
  
  const fullUrl = `${siteUrl}?${Object.entries(params).map(([key, value]) => `${key}=${value}`).join('&')}`;

  return (
   <View style={{backgroundColor: 'blue', width: '100%', height: `100%`}}>
      <WebView source={{ uri: fullUrl }}
               style={{ flex: 1 }} >

  </WebView>
   </View>
  );
};

export default SlotMachine;
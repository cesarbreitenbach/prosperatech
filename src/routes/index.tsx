import { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';

import { StackRoutes } from './app.routes';
import { AuthRoutes } from './auth.routes';
import { AuthProvider, useAuthContext } from '../hooks/auth';


export function Routes() {
  const { logged } = useAuthContext();
  useEffect(() => {
    console.log(`estou logado?? ${logged}`)
  }, [logged])
  return (
  
      <NavigationContainer>
         <AuthProvider>
            { logged ? <StackRoutes /> : <AuthRoutes /> }
         </AuthProvider>
      </NavigationContainer>
 
    
  );
}

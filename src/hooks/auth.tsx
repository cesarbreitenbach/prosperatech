import { useNavigation } from '@react-navigation/native';
//import {useAsyncStorage} from '@react-native-async-storage/async-storage';
import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { showMessage } from 'react-native-flash-message';
import useAxios from  '../services/axios'
import { jwtDecode } from "jwt-decode";
import { decode } from "base-64";
import { ITokenProps, IUser, LoginProps } from '../@types/auth';

global.atob = decode;

interface AuthProviderProps {
    children: ReactNode;
}

interface IAuthContextData {
    logged: boolean;
    loading: boolean;
    user: IUser;
    login: (value: LoginProps) => void;
    logout: () => void;
}

const AuthContext = createContext({} as IAuthContextData);

const AUTHKEY = '@prosperatech:userPassword';

function AuthProvider({children}: AuthProviderProps) {
    const { navigate } = useNavigation<any>();
    const [logged, setLogged] = useState(false);
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState({} as IUser)

    const { axiosClient: client } = useAxios();

    async function login(value: LoginProps) {
        setLoading(true);
        try{
            
           const resp = await client.post('/sessions', value)

           const {token} = resp.data;
         //  const decoded = jwtDecode(token);
         
         const decodedToken = decodeToken(token)

         if (!decodedToken) {
            showMessage({
              message: "Erro ao pegar token!",
              type: "danger",
            });
            return;
         }

         setUser({
          id: decodedToken.id,
          name: decodedToken.name,
          walletAddress: decodedToken.walletAddress,
          admin: decodedToken.admin,
          email: decodedToken.email
         })
         
         console.log(`Logado com sucesso: ${JSON.stringify(decodedToken)}`)
         setLogged(true)

        }catch(e) {
            console.log(`erro ${JSON.stringify(e)}`)
            showMessage({
                message: "Credenciais invalidas",
                type: "danger",
              });
            return;
        }finally{
            setLoading(false);
            
        }
    }

    async function logout() {
      setLogged(false);  
    }

    function decodeToken(token: string): ITokenProps | null {
        try {
          const decodedToken: ITokenProps = jwtDecode(token);
          return decodedToken;
        } catch (error) {
          console.error('Erro ao decodificar o token:', error);
          return null;
        }
      }

    return (
        <AuthContext.Provider value={{  
                                       user,
                                       loading,
                                       logged, 
                                       login,
                                       logout
                                        }}> 
            {children}
        </AuthContext.Provider> 
    );
}

function useAuthContext() {
   const context = useContext(AuthContext);

   return context;
}

export { AuthProvider, useAuthContext };


import { useNavigation } from '@react-navigation/native';
//import {useAsyncStorage} from '@react-native-async-storage/async-storage';
import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { showMessage } from 'react-native-flash-message';
import useAxios from  '../services/axios'
import { jwtDecode } from "jwt-decode";
import { decode } from "base-64";

global.atob = decode;

interface AuthProviderProps {
    children: ReactNode;
}

interface LoginProps {
    email: string;
    password: string;
}

interface IAuthContextData {
    logged: boolean;
    loading: boolean;
    login: (value: LoginProps) => void;
    logout: () => void;
}

interface ITokenProps {
    id: number; 
    ame: string;
    email: string;
    admin: boolean; 
    walletAddres: string;
    iat:number
}

const AuthContext = createContext({} as IAuthContextData);

const AUTHKEY = '@prosperatech:userPassword';

function AuthProvider({children}: AuthProviderProps) {
    const { navigate } = useNavigation<any>();
    const [logged, setLogged] = useState(false);
    const [loading, setLoading] = useState(false);

    const { axiosClient: client } = useAxios();

    useEffect(() => {
      console.log(`mudei logged para ${logged}`)
    }, [logged])

    async function login(value: LoginProps) {
        setLoading(true);
        console.log(`peguei ${JSON.stringify(value)}`)
        try{
            
           const resp = await client.post('/sessions', value)

           const {token} = resp.data;
         //  const decoded = jwtDecode(token);
         
         const decodedToken = decodeToken(token)
         
         console.log(`peguei o resp ${JSON.stringify(decodedToken)}`)
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


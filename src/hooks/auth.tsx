import { useNavigation } from '@react-navigation/native';
//import {useAsyncStorage} from '@react-native-async-storage/async-storage';
import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { showMessage } from 'react-native-flash-message';
import useAxios from  '../services/axios'
import { jwtDecode } from "jwt-decode";
import { decode } from "base-64";
import { ChangePasswordProps, ITokenProps, IUser, LoginProps, SignupProps } from '../@types/auth';

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
    signup: (body: SignupProps) => void;
    changePassword: (body: ChangePasswordProps) => void;
    recoveryPassword: (email: string) => void;
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
              email: decodedToken.email,
              token,
              active: decodedToken.active,
              resetPassword: decodedToken.resetPassword
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
      setUser({} as IUser);
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

    async function signup(body: SignupProps){
      setLoading(true)
      try{
            
        const resp = await client.post('/usuarios', body)
      
        const {id, name, token, endereco} = resp.data;
        setUser({
          id,
          name,
          admin: false,
          email: body.email,
          token: token,
          walletAddress: endereco,
          active: false,
          resetPassword: false
        })

        setLogged(true)

     }catch(e: any) {
        const {error} = e.response.data ?  e.response.data : 'Erro desconhecido';
        showMessage({
          message: error,
          type: "danger",
        });
    return;
     }finally{
         setLoading(false);
         
     }
    }

    async function changePassword(body: ChangePasswordProps) {
      setLoading(true)
      try{
        const resp = await client.patch('/usuarios/', body, {headers: { Auth: `Bearer ${user.token}`} })
        showMessage({
          message: "Senha alterada com sucesso!",
          type: "success",
        });
        navigate('home');
      }catch (e: any){
        console.log(`fucking error`, e.response.headers)
        showMessage({
          message: "Erro ao atualizar senha!",
          type: "danger",
        });
        return;
      } finally {
        setLoading(false)
      }
    }

    async function recoveryPassword(email: string) {
      setLoading(true)
      try{
        await client.get(`/recovery/${email}`)
      }catch(e){
        showMessage({
          message: "Erro ao recuperar senha!",
          type: "danger",
        });
      }finally{
        setLoading(false)
      }
    }

    return (
        <AuthContext.Provider value={{  
                                       user: user!,
                                       loading,
                                       logged, 
                                       login,
                                       logout, 
                                       signup,
                                       changePassword,
                                       recoveryPassword
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


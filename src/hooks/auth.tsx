import { useNavigation } from '@react-navigation/native';
import {useAsyncStorage} from '@react-native-async-storage/async-storage';
import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { showMessage } from 'react-native-flash-message';
import useAxios from  '../services/axios'
import { jwtDecode } from "jwt-decode";
import { decode } from "base-64";
import { ChangePasswordProps, ITokenProps, IUser, LoginProps, SignupProps } from '../@types/auth';

global.atob = decode;

import { GoogleSignin } from '@react-native-google-signin/google-signin';
import {
	GOOGLE_WEB_CLIENT_ID,
	GOOGLE_ANDROID_CLIENT_ID,
	GOOGLE_IOS_CLIENT_ID
} from '@env';

// GoogleSignin.configure({
// 	webClientId: GOOGLE_WEB_CLIENT_ID,
// 	androidClientId: GOOGLE_ANDROID_CLIENT_ID,
// 	iosClientId: GOOGLE_IOS_CLIENT_ID,
// 	scopes: ['profile', 'email'],
// });


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
    handleGoogleLogin: (isSignup: boolean) => void;
}

interface ISaveUser {
  decodedToken: ITokenProps;
  token: string;
}

const AuthContext = createContext({} as IAuthContextData);

const AUTHKEY = '@prosperatech:logged';

function AuthProvider({children}: AuthProviderProps) {
    const { navigate } = useNavigation<any>();
    const [logged, setLogged] = useState(false);
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState({} as IUser)

    const { axiosClient: client } = useAxios();
    const {setItem, getItem, removeItem} = useAsyncStorage(AUTHKEY);

    useEffect(() => {
      getUserIsLogged();
      GoogleSignin.configure({
      	webClientId: '833481448293-k36irqhfassbdjd0utrt7l9qlqd05n95.apps.googleusercontent.com',
        iosClientId: '833481448293-60q4rupk0t9kosq6vugnln32qi9962lp.apps.googleusercontent.com',
      	scopes: ['profile', 'email'],
      });
    }, [])

  const getUserIsLogged = async () => {
    const user = await getUserPasswordOnStorage();
    const isConnected = Object.keys(user).length > 0;
    if(isConnected){
      setUser(user);
      setLogged(true);
    }
  }

    async function getUserPasswordOnStorage(): Promise<IUser>{
      const storageUser = await getItem();
      return storageUser ? JSON.parse(storageUser) : {} as IUser;
  }

    async function saveUserPasswordOnStorage({decodedToken, token}: ISaveUser){
      const userToSave: IUser = {
          id: decodedToken!.id,
          name: decodedToken!.name,
          walletAddress: decodedToken!.walletAddress,
          admin: decodedToken!.admin,
          email: decodedToken!.email,
          token,
          active: decodedToken!.active,
          resetPassword: decodedToken!.resetPassword
      };
      await setItem(JSON.stringify(userToSave));
  }

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

            await saveUserPasswordOnStorage({decodedToken, token})
            
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
      setItem(JSON.stringify({} as IUser))
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
        setUser({...user, resetPassword: false})
        removeItem();
      }catch (e: any){
        console.log(`fucking error`, e.response.data)
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

    const GoogleLogin = async () => {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      return userInfo;
    };

    async function handleGoogleLogin(isSignup: boolean) {
      setLoading(true);
      try {
        const response = await GoogleLogin();
        const { idToken, user } = response;
        if (isSignup) {
          await signup({
            email: user.email,
            name: user.givenName!,
            password: user.id,
            confirmPassword: user.id
          }) 
        } else {
          await login({
            email: user.email,
            password: user.id
          })
        }
      } catch (apiError: any) {
        console.log(
          `pau do kct ${apiError}`
        );
      } finally {
        setLoading(false);
      }
    };

    async function verifyAPI() {
      //TODO: CRIAR UMA FUNÇAO PARA VALIDAR SE A API ESTÁ ONLINE, ABERTA OU FECHADA... TRATAR O ENDPOINT DE PING
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
                                       recoveryPassword,
                                       handleGoogleLogin
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


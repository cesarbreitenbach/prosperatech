import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { showMessage } from 'react-native-flash-message';
import useAxios from  '../services/axios'


interface SettingsProviderProps {
    children: ReactNode;
}

interface ISettingsContextData {
    difficult: number;
    calculateTime: number;
}

const SettingsContext = createContext({} as ISettingsContextData);

function SettingsProvider({children}: SettingsProviderProps) {

    const [difficult, setDifficult] = useState(0.5);
    const [calculateTime, setCalculateTime] = useState(1);

    const { axiosClient: client } = useAxios();

    useEffect(() => {
   
        const fetchData = async () => {
            await getSettings();
            
            console.log(`atualizando settings`)
        };

        fetchData();

        const interval = setInterval(fetchData, 5 * 60 * 1000);


        return () => clearInterval(interval);
    }, []); 

    useEffect(() => {
        getSettings()
    }, [])

    async function getSettings() {
        try {
            const res = await client.get('/settings')
            const {machineDifficult, calculateTime} = res.data.settings;
            setDifficult(machineDifficult)
            setCalculateTime(calculateTime)
        }catch(e: any) {
            console.log(`erro: `, e.response.data)
            showMessage({
                message: "Erro ao pegar settings",
                type: "danger",
              });
            return;
        }
    }
  
    return (
        <SettingsContext.Provider value={{  calculateTime,
                                            difficult    
                                        }}> 
            {children}
        </SettingsContext.Provider> 
    );
}

function useSettingsContext() {
   const context = useContext(SettingsContext);

   return context;
}

export { SettingsProvider, useSettingsContext };


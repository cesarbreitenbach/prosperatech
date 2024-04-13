import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { showMessage } from 'react-native-flash-message';
import useAxios from  '../services/axios'
import { useNavigation } from '@react-navigation/native';
import {getVersion} from 'react-native-device-info';


interface SettingsProviderProps {
    children: ReactNode;
}

interface ISettingsContextData {
    difficult: number;
    divisorEar: number;
    calculateTime: string;
    calculateUnit: string;
    serverStatus: boolean;
    loading: boolean;
    appVersion: string;
    userVersion: string;
    goldCotation: number;
    bonusCotation: number;
    minimumWithdraw: number;
    liberateVersions: boolean;
    getSettings: () => void;
}

const SettingsContext = createContext({} as ISettingsContextData);

function SettingsProvider({children}: SettingsProviderProps) {

    const [difficult, setDifficult] = useState(0.5);
    const [calculateTime, setCalculateTime] = useState("");
    const [calculateUnit, setCalculateUnit] = useState("");
    const [serverStatus, setServerStatus] = useState(false);
    const [loading, setLoading] = useState(true);
    const [appVersion, setAppVersion] = useState('');
    const [userVersion, setUserVersion] = useState('');
    const [goldCotation, setGoldCotation] = useState(0);
    const [bonusCotation, setBonusCotation] = useState(0);
    const [minimumWithdraw, setMinimumWithdraw] = useState(1000);
    const [divisorEar, setDivisorEarn] = useState(0);
    const [liberateVersions, setLiberateVersions] = useState(false);

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
        const userVersion = getVersion();
        setUserVersion(userVersion);
        getSettings();
    }, [])

    async function getSettings() {
        setLoading(true);
        try {
            const res = await client.get('/settings')
            const {machineDifficult, calculateTime, serverStatus, appVersion, bonusCotation, goldCotation, minimumWithdraw, divisorEarn, liberateVersions} = res.data.settings;
            const [timeValue, timeUnit] = calculateTime.split(':');
            setDifficult(machineDifficult)
            setCalculateTime(timeValue)
            setCalculateUnit(timeUnit)
            setServerStatus(serverStatus)
            setAppVersion(appVersion)
            setBonusCotation(bonusCotation)
            setGoldCotation(goldCotation)
            setMinimumWithdraw(minimumWithdraw);
            setDivisorEarn(divisorEarn);
            setLiberateVersions(liberateVersions)
        }catch(e: any) {
            console.log(`erro: `, e.response.data)
            showMessage({
                message: "Erro ao pegar settings",
                type: "danger",
              });
            return;
        } finally {
            setLoading(false);
        }
    }
  
    return (
        <SettingsContext.Provider value={{  calculateTime,
                                            calculateUnit,
                                            difficult,
                                            serverStatus,
                                            loading,
                                            appVersion,
                                            userVersion,
                                            minimumWithdraw,
                                            bonusCotation,
                                            goldCotation,
                                            divisorEar,
                                            liberateVersions,
                                            getSettings   
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


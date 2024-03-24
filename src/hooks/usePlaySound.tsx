import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import SoundPlayer from 'react-native-sound-player'

interface PlaySoundProviderProps {
    children: ReactNode;
}

interface SoundPlayerProps {
    type: 'lost' | 'winMin' | 'winMed' | 'roll'
}

const soundList = {
    lost: 'lost_sound.wav',
    winMin: 'win_minimum.wav',
    winMed: 'win_medium.wav',
    roll: 'spin_wheal.wav'
}

interface IPlaySoundContextData {
    soundPlayer: (soundType: SoundPlayerProps) => void;
}

const PlaySoundContext = createContext({} as IPlaySoundContextData);

function PlaySoundProvider({children}: PlaySoundProviderProps) {
    
    async function soundPlayer({type = 'lost'}: SoundPlayerProps) {
        try {
            const sound = soundList[type].split('.');
            const file = sound[0];
            const extention = sound[1];
            // play the file tone.mp3
            SoundPlayer.playSoundFile(file, extention)

        } catch (e) {
            console.log(`cannot play the sound file`, e)
        }
    }



    return (
        <PlaySoundContext.Provider value={{  
                                        soundPlayer,
                                        }}> 
            {children}
        </PlaySoundContext.Provider> 
    );
}

function usePlaySoundContext() {
   const context = useContext(PlaySoundContext);

   return context;
}

export { PlaySoundProvider, usePlaySoundContext };


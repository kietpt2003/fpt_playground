import React, { createContext, useState } from 'react';
import { Audio } from 'expo-av';
import { NPCContextProps, NPCProviderProps } from './types/npcContextType';

const NonPlayerCharacterContext = createContext<NPCContextProps | undefined>(undefined);
const playlist = [
    require('../../assets/audios/npc-girl-hi.mp3'),
    require('../../assets/audios/npc-typing.mp3'),
    require('../../assets/audios/npc-girl-giggle.mp3'),
    require('../../assets/audios/npc-boy-hey.mp3'),
    require('../../assets/audios/npc-boy-huh.mp3'),
]

function NonPlayerCharacterProvider({ children }: NPCProviderProps) {
    const [sound, setSound] = useState<Audio.Sound | null>(null);
    const [soundTyping, setSoundTyping] = useState<Audio.Sound | null>(null);

    const increaseSpeedRate = async (rate: number) => {
        await sound?.setRateAsync(rate, false);
    }

    const loadSound = async (soundIndex: number = 0) => {
        if (sound) {
            await sound.unloadAsync(); // Dừng bài hát hiện tại
        }

        const { sound: soundAudio } = await Audio.Sound.createAsync(playlist[soundIndex], {
            shouldPlay: true,
            volume: 1,
        });
        setSound(soundAudio);
    };

    const loadTypingSound = async () => {
        if (soundTyping) {
            await soundTyping.unloadAsync(); // Dừng bài hát hiện tại
        }

        const { sound: soundAudio } = await Audio.Sound.createAsync(playlist[1], {
            shouldPlay: true,
            volume: 0.5,
            isLooping: true
        });
        setSoundTyping(soundAudio);
    };

    const stopTypingSound = async () => {
        if (soundTyping) {
            await soundTyping.stopAsync(); // Phát lại âm thanh
        }
    };

    return (
        <NonPlayerCharacterContext.Provider value={{
            loadSound,
            increaseSpeedRate,
            stopTypingSound,
            loadTypingSound
        }}>
            {children}
        </NonPlayerCharacterContext.Provider>
    );
};

export { NonPlayerCharacterContext, NonPlayerCharacterProvider };

import React, { createContext, useState } from 'react';
import { Audio } from 'expo-av';
import { AudioContextProps, AudioProviderProps } from './types/audioContextType';
import songs from '../constants/songs ';

const AudioContext = createContext<AudioContextProps | undefined>(undefined);

function AudioProvider({ children }: AudioProviderProps) {
    const [sound, setSound] = useState<Audio.Sound | null>(null);
    const [currentSongIndex, setCurrentSongIndex] = useState(0); // Chỉ số bài hát hiện tại
    const [isPlaying, setIsPlaying] = useState<boolean>(false);
    const [volume, setVolume] = useState<number>(0.5);

    // Phát bài hát đã chọn
    const playSong = async (index: number) => {
        if (sound) {
            await sound.unloadAsync(); // Dừng bài hát hiện tại
        }

        const { sound: newSound } = await Audio.Sound.createAsync(songs[index].file, {
            shouldPlay: true,
            volume: volume,
            isLooping: true,
        });

        setSound(newSound);
        await newSound.playAsync();
        setIsPlaying(true);
    };

    // Xử lý chuyển bài hát
    const handleForward = async () => {
        const newIndex = (currentSongIndex + 1) % songs.length; // Nếu vượt qua bài cuối, quay lại bài đầu
        setCurrentSongIndex(newIndex);
        await playSong(newIndex);
    };

    const handleBackward = async () => {
        const newIndex =
            (currentSongIndex - 1 + songs.length) % songs.length; // Nếu lùi qua bài đầu, quay lại bài cuối
        setCurrentSongIndex(newIndex);
        await playSong(newIndex);
    };

    const pauseSong = async () => {
        if (sound && isPlaying) {
            await sound.pauseAsync();
            setIsPlaying(false);
        }
    };

    const resumeSong = async () => {
        if (sound && !isPlaying) {
            await sound.playAsync();
            setIsPlaying(true);
        }
    };

    return (
        <AudioContext.Provider value={{
            sound,
            setSound,
            volume,
            setVolume,
            currentSongIndex,
            setCurrentSongIndex,
            isPlaying,
            playSong,
            pauseSong,
            resumeSong,
            handleForward,
            handleBackward
        }}>
            {children}
        </AudioContext.Provider>
    );
};

export { AudioContext, AudioProvider };

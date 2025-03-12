import React, { useEffect, useRef } from 'react';
import { View, TouchableOpacity, Animated } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import songs from '../constants/songs ';
import useAudio from '../hooks/useAudio';
import { colors } from '../constants/colors';
import { LinearGradient } from 'expo-linear-gradient';
import audioPlayerStyleSheet from './styles/audioPlayerStyleSheet';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import useClick from '../hooks/useClick';

export default function AudioPlayer() {
    const theme = useSelector((state: RootState) => state.theme.theme); // Lấy theme từ store

    const { sound, currentSongIndex, playSong, handleBackward, handleForward } = useAudio();
    const animatedValue = useRef(new Animated.Value(0)).current; // Giá trị hoạt ảnh

    const { playSound } = useClick();

    // Phát bài hát đầu tiên khi vào màn hình
    useEffect(() => {
        playSong(currentSongIndex);

        return () => {
            if (sound) {
                sound.unloadAsync();
            }
        };
    }, []);

    // Hiệu ứng chạy chữ
    useEffect(() => {
        const animate = () => {
            animatedValue.setValue(110); // Đặt lại vị trí bắt đầu (bên phải màn hình)

            Animated.timing(animatedValue, {
                toValue: -190, // Di chuyển sang trái
                duration: 9000, // Thời gian chạy hoạt ảnh
                useNativeDriver: true,
            }).start(() => {
                animate(); // Gọi lại để lặp
            });
        };

        animate(); // Bắt đầu hoạt ảnh

        return () => {
            animatedValue.stopAnimation(); // Dừng hoạt ảnh khi unmount
        };
    }, []);

    return (
        <View style={audioPlayerStyleSheet.container}>
            {/* Backward */}
            <TouchableOpacity
                style={audioPlayerStyleSheet.iconContainer}
                onPress={() => {
                    playSound();
                    handleBackward();
                }}
                touchSoundDisabled={true}
            >
                <LinearGradient
                    colors={theme === "dark" ? [colors.darkBlue, colors.lightBlue] : [colors.darkOrange, colors.lightOrange]} // Hiệu ứng chuyển màu
                    style={audioPlayerStyleSheet.icon}
                />
                <FontAwesome
                    name="backward"
                    size={20}
                    color={colors.white}
                />
            </TouchableOpacity>

            {/* Hiển thị bài hát hiện tại */}
            <View style={audioPlayerStyleSheet.songContainer}>
                <Animated.Text
                    style={[
                        audioPlayerStyleSheet.songTitle,
                        { transform: [{ translateX: animatedValue }] },
                    ]}
                    numberOfLines={1} // Hiển thị trên một dòng
                >
                    {currentSongIndex + 1}. {songs[currentSongIndex].name}
                </Animated.Text>
            </View>

            {/* Forward */}
            <TouchableOpacity
                style={audioPlayerStyleSheet.iconContainer}
                onPress={() => {
                    playSound();
                    handleForward();
                }}
                touchSoundDisabled={true}
            >
                <LinearGradient
                    colors={theme === "dark" ? [colors.darkBlue, colors.lightBlue] : [colors.darkOrange, colors.lightOrange]} // Hiệu ứng chuyển màu
                    style={audioPlayerStyleSheet.icon}
                />
                <FontAwesome
                    name="forward"
                    size={20}
                    color={colors.white}
                />
            </TouchableOpacity>
        </View>
    );
}

import { View, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types/types';
import Video from 'react-native-video';
import { StatusBar } from 'expo-status-bar';
import { Feather } from '@expo/vector-icons';
import { LinearGradient } from "expo-linear-gradient";
import introStyleSheet from './styles/introStyleSheet';
import { colors } from '../constants/colors';
import useClick from '../hooks/useClick';

type IntroScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Intro'>;

export default function IntroScreen() {
    const navigation = useNavigation<IntroScreenNavigationProp>();
    const [isSkipped, setIsSkipped] = useState<boolean>(false);
    const [showButton, setShowButton] = useState<boolean>(false);

    const { playSound } = useClick();

    const handleSkip = () => {
        setIsSkipped(true);
        navigation.replace('Signin'); // Điều hướng tới màn hình Signin
    };

    const handleVideoEnd = () => {
        if (!isSkipped) {
            navigation.replace('Signin'); // Tự động chuyển sau khi video kết thúc
        }
    };

    useEffect(() => {
        // Bắt đầu đếm thời gian 10 giây
        const timer = setTimeout(() => {
            setShowButton(true); // Hiển thị nút sau 10 giây
        }, 5000);

        // Dọn dẹp timer nếu component bị hủy
        return () => clearTimeout(timer);
    }, []);

    return (
        <View style={introStyleSheet.introContainer}>
            <StatusBar hidden />
            <Video
                source={require('../../assets/videos/fpt-playground-intro.mp4')} // Thay bằng URL video của bạn
                style={introStyleSheet.introVideo}
                resizeMode="cover"
                onEnd={() => handleVideoEnd()}
                paused={isSkipped}
            />
            {showButton && (
                <TouchableOpacity
                    style={introStyleSheet.skipBtnContainer}
                    onPress={() => {
                        playSound();
                        handleSkip();
                    }}
                    touchSoundDisabled={true}
                >
                    <LinearGradient
                        colors={[colors.darkOrange, colors.lightOrange]} // Hiệu ứng chuyển màu
                        style={introStyleSheet.skipLinear}
                    />
                    <Feather name="skip-forward" size={25} color={colors.milkyWhite} />
                </TouchableOpacity>
            )}
        </View>
    )
}

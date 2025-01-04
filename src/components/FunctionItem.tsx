import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import functionItemStyleSheet from './styles/functionItemStyleSheet'
import { LinearGradient } from 'expo-linear-gradient'
import LottieView from 'lottie-react-native'
import { FunctionItemProps } from './types/functionItemTypes'
import { colors } from '../constants/colors'
import { useSelector } from 'react-redux'
import { RootState } from '../store/store'

export default function FunctionItem({
    linearColors,
    lottieSrc,
    contentTxt,
    onPress,
    isGuideline
}: FunctionItemProps) {
    const theme = useSelector((state: RootState) => state.theme.theme);

    return (
        <TouchableOpacity
            style={functionItemStyleSheet.container}
            onPress={onPress}
            disabled={isGuideline}
            touchSoundDisabled={true}
        >
            <View style={functionItemStyleSheet.imageContainer}>
                <LinearGradient
                    colors={linearColors} // Hiệu ứng chuyển màu
                    style={functionItemStyleSheet.lottieBookFlyingLinear}
                />
                <LottieView
                    source={lottieSrc}
                    style={functionItemStyleSheet.lottieBookFlying}
                    autoPlay
                    loop
                    speed={0.8}
                />
            </View>
            <Text
                style={[
                    functionItemStyleSheet.txt,
                    {
                        color: theme === "dark" ? colors.white : colors.black
                    }
                ]}
                numberOfLines={2}
                ellipsizeMode="tail"
            >
                {contentTxt}
            </Text>
        </TouchableOpacity>
    )
}
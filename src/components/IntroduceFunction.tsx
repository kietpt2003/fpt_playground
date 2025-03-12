import { View, Text, Image } from 'react-native'
import React from 'react'
import introduceFunctionScreenStyleSheet from './styles/introduceFunctionStyleSheet'
import { LinearGradient } from 'expo-linear-gradient'
import { IntroduceFunctionProps } from './types/introduceFunctionTypes'

export default function IntroduceFunction({ backgroundImgSrc, contentImageSrc, contentTxt, linearColors }: IntroduceFunctionProps) {
    return (
        <View style={introduceFunctionScreenStyleSheet.container}>
            <LinearGradient
                colors={linearColors} // Hiệu ứng chuyển màu
                style={introduceFunctionScreenStyleSheet.containerLinear}
            />
            <Image
                style={introduceFunctionScreenStyleSheet.containerImageBlur}
                source={backgroundImgSrc}
            />

            <View style={introduceFunctionScreenStyleSheet.topImageContainer}>
                <Image
                    style={introduceFunctionScreenStyleSheet.image}
                    source={contentImageSrc}
                />
            </View>
            <View style={introduceFunctionScreenStyleSheet.textContainer}>
                <Text
                    style={introduceFunctionScreenStyleSheet.text}
                    numberOfLines={3}
                    ellipsizeMode="tail"
                >
                    {contentTxt}
                </Text>
            </View>
        </View>
    )
}
import { View } from 'react-native'
import React, { useState } from 'react'
import npcGuidelineStyleSheet from './styles/npcGuidelineStyleSheet';
import { Image } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { colors } from '../constants/colors';

export default function NPCGuideline() {
    const [isChangeImage, setIsChangeImage] = useState<boolean>(true);

    const theme = useSelector((state: RootState) => state.theme.theme);

    const changeImage = () => setIsChangeImage(!isChangeImage);

    return (
        <View style={npcGuidelineStyleSheet.container}>

            <View style={[
                npcGuidelineStyleSheet.npcBlurContainer,
                {
                    borderColor: theme === "dark" ? colors.darkBlue : colors.darkOrange
                }
            ]}>
                <Image
                    source={require("../../assets/images/non-player-character1.png")}
                    style={npcGuidelineStyleSheet.npcImage}
                />
            </View>
        </View>
    )
}
import { Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { GoogleSigninButtonProps } from './types/googleButtonTypes'
import googleButtonStyleSheet from './styles/googleButtonStyleSheet'
import { LinearGradient } from 'expo-linear-gradient'
import { useSelector } from 'react-redux'
import { RootState } from '../store/store'
import { colors } from '../constants/colors'
import { useTranslation } from 'react-i18next'

export default function GoogleSignInButton({ onPress, isFetching }: GoogleSigninButtonProps) {
    const theme = useSelector((state: RootState) => state.theme.theme);
    const { t } = useTranslation();

    return (
        <TouchableOpacity
            style={googleButtonStyleSheet.button}
            onPress={onPress}
            touchSoundDisabled={true}
            disabled={isFetching}
        >
            <LinearGradient
                colors={theme === "dark" ? [colors.black, colors.grey] : [colors.milkyWhite, colors.white]} // Hiệu ứng chuyển màu
                style={googleButtonStyleSheet.signinBtnLinear}
            />
            <Image
                style={{
                    width: 24,
                    height: 24,
                }}
                source={require("../../assets/images/googleLogo.png")}
            />
            <Text style={[
                googleButtonStyleSheet.buttonText,
                {
                    color: theme === "dark" ? colors.white : colors.black
                }
            ]}>
                {t("signin-google")}
            </Text>
        </TouchableOpacity>
    )
}
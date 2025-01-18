import {
    View,
    Text,
    TouchableOpacity,
} from "react-native";
import React from "react";
import LottieView from "lottie-react-native";
import Modal from "react-native-modal";
import { errorModalProps } from "./types/errorModalTypes";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import errorModalStyleSheet from "./styles/errorModalStyleSheet";
import { LinearGradient } from "expo-linear-gradient";
import { colors } from "../constants/colors";
import useClick from "../hooks/useClick";
import { FontAwesome } from '@expo/vector-icons';
import { ScreenHeight } from "@rneui/base";

export default function ErrorModal({ stringErr, isError, setIsError }: errorModalProps) {
    const theme = useSelector((state: RootState) => state.theme.theme);
    const { playSound } = useClick();

    return (
        <Modal
            isVisible={isError}
            onBackdropPress={() => setIsError(false)}
            style={errorModalStyleSheet.modalContainer}
        >
            <View
                style={errorModalStyleSheet.container}
            >
                <TouchableOpacity
                    style={errorModalStyleSheet.closeBtnContainer}
                    onPress={() => {
                        playSound();
                        setIsError(false);
                    }}
                    touchSoundDisabled={true}
                >
                    <LinearGradient
                        colors={theme === "dark" ? [colors.darkBlue, colors.lightBlue] : [colors.darkOrange, colors.lightOrange]} // Hiệu ứng chuyển màu
                        style={errorModalStyleSheet.closeBtnLinear}
                    />
                    <FontAwesome name="close" size={24} color={colors.white} />
                </TouchableOpacity>
                <View
                    style={[
                        errorModalStyleSheet.imageContainer,
                        {
                            marginTop: theme === "dark" ? (-ScreenHeight / 10) : 0
                        }
                    ]}
                >
                    <LottieView
                        source={theme === "dark" ? require("../../assets/animations/sleepyPanda.json") : require("../../assets/animations/catEating.json")}
                        style={theme === "dark" ? errorModalStyleSheet.lottieImageDark : errorModalStyleSheet.lottieImageLight}
                        autoPlay
                        loop
                        speed={0.8}
                    />
                    <LinearGradient
                        colors={[colors.white, colors.icyWhite]} // Hiệu ứng chuyển màu
                        style={[
                            errorModalStyleSheet.txtBackground,
                            {
                                marginTop: theme === "dark" ? -50 : 15
                            }
                        ]}
                    >
                        <Text
                            style={errorModalStyleSheet.errorTxt}
                        >
                            {stringErr}
                        </Text>
                    </LinearGradient>
                </View>
            </View>
        </Modal >
    );
};

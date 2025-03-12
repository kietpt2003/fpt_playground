import {
    Pressable,
    Text,
    View,
} from "react-native";
import "core-js/stable/atob";
import Modal from "react-native-modal";
import i18next from "../services/i18next";
import languagesList from '../services/languagesList.json';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useState } from "react";
import { LanguageModalProps } from "./types/languageTypes";
import { LinearGradient } from "expo-linear-gradient";
import { colors } from "../constants/colors";
import languageStyleSheet from "./styles/languageStyleSheet";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function LanguageModal({ openChooseLanguage, setOpenChooseLanguage }: LanguageModalProps) {
    const [languageChoose, setLanguageChoose] = useState(i18next.language);

    const reduxTheme = useSelector((state: RootState) => state.theme.theme);

    const changeLng = async (lng: string): Promise<void> => {
        await AsyncStorage.setItem("language", lng);
        i18next.changeLanguage(lng);
    };

    return (
        <Modal
            isVisible={openChooseLanguage}
            onBackdropPress={() => setOpenChooseLanguage(false)}
            onSwipeComplete={() => setOpenChooseLanguage(false)}
            useNativeDriverForBackdrop
            swipeDirection={"down"}
            propagateSwipe={true}
            style={languageStyleSheet.container}
        >
            <View style={languageStyleSheet.modalContent}>
                {/* Thanh cam trên cùng */}
                <LinearGradient
                    colors={reduxTheme === "dark" ? [colors.darkBlue, colors.lightBlue] : [colors.darkOrange, colors.lightOrange]} // Hiệu ứng chuyển màu
                    style={languageStyleSheet.header}
                />

                {/* VI */}
                <Pressable
                    style={languageStyleSheet.modalOption}
                    onPress={() => {
                        changeLng("vi")
                        setLanguageChoose("vi")
                        setOpenChooseLanguage(false)
                    }}
                >
                    <Text style={languageStyleSheet.modalOptionText}>{languagesList["vi"].nativeName}</Text>
                    {languageChoose === "vi" ? (
                        <MaterialCommunityIcons name="check-circle" size={24} color={reduxTheme === "dark" ? colors.darkBlue : colors.darkOrange} />
                    ) : (
                        <MaterialCommunityIcons
                            name="checkbox-blank-circle-outline"
                            size={24}
                            color={reduxTheme === "dark" ? colors.darkBlue : colors.darkOrange}
                        />
                    )}
                </Pressable>

                {/* EN */}
                <Pressable
                    style={languageStyleSheet.modalOption}
                    onPress={() => {
                        changeLng("en")
                        setLanguageChoose("en")
                        setOpenChooseLanguage(false)
                    }}
                >
                    <Text style={languageStyleSheet.modalOptionText}>{languagesList["en"].nativeName}</Text>
                    {languageChoose === "en" ? (
                        <MaterialCommunityIcons name="check-circle" size={24} color={reduxTheme === "dark" ? colors.darkBlue : colors.darkOrange} />
                    ) : (
                        <MaterialCommunityIcons
                            name="checkbox-blank-circle-outline"
                            size={24}
                            color={reduxTheme === "dark" ? colors.darkBlue : colors.darkOrange}
                        />
                    )}
                </Pressable>
            </View>
        </Modal>
    )
}

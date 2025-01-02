import {
    Pressable,
    Text,
    View,
} from "react-native";
import "core-js/stable/atob";
import Modal from "react-native-modal";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { colors } from "../constants/colors";
import themeModalStyleSheet from "./styles/themeModalStyleSheet";
import { ThemeModalProps } from "./types/themeModalTypes";
import { useDispatch, useSelector } from "react-redux";
import { changeTheme } from "../store/reducers/themeReducer";
import { RootState } from "../store/store";
import { useTranslation } from "react-i18next";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function ThemeModal({ openChooseTheme, setOpenChooseTheme }: ThemeModalProps) {
    const reduxTheme = useSelector((state: RootState) => state.theme.theme);
    const [themeChoose, setThemeChoose] = useState(reduxTheme === "dark" ? "Dark" : "Light");
    const dispatch = useDispatch();

    const { t } = useTranslation();

    const changeThemeFunction = async (t: string): Promise<void> => {
        await AsyncStorage.setItem("theme", t === "Light" ? "light" : "dark");
        dispatch(changeTheme(t === "Light" ? "light" : "dark"));
    };

    return (
        <Modal
            isVisible={openChooseTheme}
            onBackdropPress={() => setOpenChooseTheme(false)}
            onSwipeComplete={() => setOpenChooseTheme(false)}
            useNativeDriverForBackdrop
            swipeDirection={"down"}
            propagateSwipe={true}
            style={themeModalStyleSheet.container}
        >
            <View style={themeModalStyleSheet.modalContent}>
                {/* Thanh cam trên cùng */}
                <LinearGradient
                    colors={reduxTheme === "dark" ? [colors.darkBlue, colors.lightBlue] : [colors.darkOrange, colors.lightOrange]} // Hiệu ứng chuyển màu
                    style={themeModalStyleSheet.header}
                />

                {/* Light */}
                <Pressable
                    style={themeModalStyleSheet.modalOption}
                    onPress={() => {
                        changeThemeFunction("Light")
                        setThemeChoose("Light")
                        setOpenChooseTheme(false)
                    }}
                >
                    <Text style={themeModalStyleSheet.modalOptionText}>{t("theme-light-txt")}</Text>
                    {themeChoose === "Light" ? (
                        <MaterialCommunityIcons name="check-circle" size={24} color={reduxTheme === "dark" ? colors.darkBlue : colors.darkOrange} />
                    ) : (
                        <MaterialCommunityIcons
                            name="checkbox-blank-circle-outline"
                            size={24}
                            color={reduxTheme === "dark" ? colors.darkBlue : colors.darkOrange}
                        />
                    )}
                </Pressable>

                {/* Dark */}
                <Pressable
                    style={themeModalStyleSheet.modalOption}
                    onPress={() => {
                        changeThemeFunction("Dark")
                        setThemeChoose("Dark")
                        setOpenChooseTheme(false)
                    }}
                >
                    <Text style={themeModalStyleSheet.modalOptionText}>{t("theme-dark-txt")}</Text>
                    {themeChoose === "Dark" ? (
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

import { ScreenHeight, ScreenWidth } from "@rneui/base";
import { StyleSheet } from "react-native";

export const slotItemStyleSheet = StyleSheet.create({
    container: {
        width: ScreenHeight / 11,
        height: ScreenHeight / 8,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 25,
        gap: 10,
    },
    image: {
        width: ScreenHeight / 14,
        height: ScreenHeight / 14,
        borderRadius: 50,
        borderWidth: 1
    }
})

export default slotItemStyleSheet;
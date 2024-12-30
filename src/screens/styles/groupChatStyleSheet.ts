import { ScreenHeight, ScreenWidth } from "@rneui/base";
import { StyleSheet } from "react-native";

export const groupChatStyleSheet = StyleSheet.create({
    container: {
        width: "100%",
        height: "100%",
        justifyContent: "center",
    },
    containerLinear: {
        position: "absolute",
        width: "100%",
        height: "100%",
    },
    slotContainer: {
        width: ScreenWidth / 1.2,
        height: ScreenHeight / 1.85,
        alignSelf: "center",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 35,
        borderWidth: 1,
    },
    slotContainerLinear: {
        position: "absolute",
        width: "100%",
        height: "100%",
        borderRadius: 35
    },
    subSlotContainer: {
        width: ScreenWidth / 1.2 - 30,
        height: ScreenHeight / 1.85 - 30,
        borderRadius: 30,
    }
})

export default groupChatStyleSheet;

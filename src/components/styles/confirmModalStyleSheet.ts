import { ScreenHeight, ScreenWidth } from "@rneui/base";
import { StyleSheet } from "react-native";
import { colors } from "../../constants/colors";

const confirmModalStyleSheet = StyleSheet.create({
    modalContainer: {
        alignItems: "center",
    },
    container: {
        width: ScreenWidth * 0.8,
        height: ScreenHeight / 5,
    },
    containerLinear: {
        width: "100%",
        height: "100%",
        position: "absolute",
        overflow: "hidden",
        alignItems: "center",
        borderRadius: 10 + 5,
        borderWidth: 1,
        paddingHorizontal: 10,
        paddingVertical: 20,
    },
    confirmTxt: {
        fontSize: 18,
        width: ScreenWidth / 1.5,
        fontFamily: "Roboto"
    },
    functionContainer: {
        position: "absolute",
        bottom: 10,
        right: 10,
        flexDirection: "row",
        gap: 10
    },
    closeBtnContainer: {
        width: ScreenHeight / 17,
        height: ScreenHeight / 27,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.3,
        shadowRadius: 15,
        elevation: 5,
    },
});

export default confirmModalStyleSheet;
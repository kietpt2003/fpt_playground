import { ScreenHeight, ScreenWidth } from "@rneui/base";
import { StyleSheet } from "react-native";
import { colors } from "../../constants/colors";

const errorModalStyleSheet = StyleSheet.create({
    modalContainer: {
        alignItems: "center",
    },
    container: {
        rowGap: 1,
        width: ScreenWidth * 0.8,
        padding: 20,
        borderRadius: 10,
        backgroundColor: colors.milkyWhite,
    },
    imageContainer: {
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
    },
    lottieImageDark: {
        width: ScreenHeight / 3,
        height: ScreenHeight / 3,
    },
    lottieImageLight: {
        width: ScreenHeight / 5,
        height: ScreenHeight / 5,
    },
    txtBackground: {
        width: ScreenWidth / 1.35,
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
        borderRadius: 10 + 5,
        borderWidth: 1,
        paddingHorizontal: 5,
        paddingVertical: 10,
        marginBottom: 20
    },
    errorTxt: {
        fontSize: 15,
        width: ScreenWidth / 1.5,
        fontFamily: "Roboto"
    },
    closeBtnContainer: {
        borderRadius: 30,
        width: ScreenHeight / 22,
        height: ScreenHeight / 22,
        alignItems: "center",
        justifyContent: "center",
        alignSelf: "flex-end",
        zIndex: 1
    },
    closeBtnLinear: {
        position: "absolute",
        width: "100%",
        height: "100%",
        borderRadius: 30,
    },
});

export default errorModalStyleSheet;
import { ScreenHeight } from "@rneui/base";
import { StyleSheet } from "react-native";

const functionItemStyleSheet = StyleSheet.create({
    container: {
        width: ScreenHeight / 11.4,
        height: ScreenHeight / 9,
        alignItems: "center",
    },
    imageContainer: {
        width: ScreenHeight / 18,
        height: ScreenHeight / 18,
        borderRadius: 20,
        justifyContent: "center",
        alignItems: "center"
    },
    lottieBookFlyingLinear: {
        position: "absolute",
        width: ScreenHeight / 18,
        height: ScreenHeight / 18,
        borderRadius: 20,
    },
    lottieBookFlying: {
        width: ScreenHeight / 20,
        height: ScreenHeight / 20,
    },
    txt: {
        textAlign: "center",
        fontFamily: "RobotoLight"
    }
});

export default functionItemStyleSheet;
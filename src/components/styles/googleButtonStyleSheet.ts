import { ScreenWidth } from "@rneui/base";
import { StyleSheet } from "react-native";

const googleButtonStyleSheet = StyleSheet.create({
    button: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: "row",
        gap: 10,
    },
    signinBtnLinear: {
        position: "absolute",
        width: "100%",
        height: "100%",
        borderRadius: 8,
    },
    buttonText: {
        fontSize: ScreenWidth > 350 ? 18 : 16,
        fontFamily: "RobotoMedium"
    },
});

export default googleButtonStyleSheet;
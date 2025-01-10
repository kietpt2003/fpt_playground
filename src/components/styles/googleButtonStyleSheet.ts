import { StyleSheet } from "react-native";

const googleButtonStyleSheet = StyleSheet.create({
    button: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: "row",
        gap: 10,
        marginTop: 20,
    },
    signinBtnLinear: {
        position: "absolute",
        width: "100%",
        height: "100%",
        borderRadius: 8,
    },
    buttonText: {
        fontSize: 18,
        fontWeight: 600,
        fontFamily: "Roboto"
    },
});

export default googleButtonStyleSheet;
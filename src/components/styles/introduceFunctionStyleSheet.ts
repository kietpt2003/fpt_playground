import { ScreenHeight, ScreenWidth } from "@rneui/base";
import { StyleSheet } from "react-native";

const introduceFunctionScreenStyleSheet = StyleSheet.create({
    container: {
        width: ScreenWidth / 2 - 25,
        height: "95%",
        borderRadius: 25,
        alignItems: "center",
    },
    containerLinear: {
        position: "absolute",
        width: "100%",
        height: "95%",
        borderRadius: 25,
    },
    containerImageBlur: {
        position: "absolute",
        width: "100%",
        height: "95%",
        borderRadius: 25,
        backgroundColor: "#E0E7CE",
        opacity: 0.2,
        resizeMode: "stretch",
    },
    topImageContainer: {
        width: ScreenHeight / 17,
        height: "40%",
        justifyContent: "center",
        alignSelf: "center",
        alignItems: "center",
    },
    image: {
        width: ScreenHeight / 17,
        height: ScreenHeight / 17,
        borderRadius: ScreenHeight / 10,
        resizeMode: "stretch",
        alignSelf: "center",
    },
    textContainer: {
        width: "90%",
        height: "60%",
        overflow: "hidden",
        alignItems: "center",
    },
    text: {
        textAlignVertical: "center",
        fontFamily: "RobotoMedium"
    }
});

export default introduceFunctionScreenStyleSheet;
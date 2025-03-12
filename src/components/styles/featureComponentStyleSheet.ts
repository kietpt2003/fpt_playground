import { ScreenHeight, ScreenWidth } from "@rneui/base";
import { StyleSheet } from "react-native";

const featureComponentStyleSheet = StyleSheet.create({
    functionContainer: {
        padding: 15,
        gap: 10
    },
    functionTitle: {
        fontSize: 18,
        fontFamily: "RobotoMedium"
    },
    functionContainerGroup: {
        height: ScreenHeight / 4.5,
        flexDirection: "row",
        justifyContent: "space-between",
        gap: 15,
    },
    advertiseContainer: {
        width: ScreenWidth / 2 - 25
    },
    scrollIndicatorContainer: {
        flexDirection: "row",
        position: "absolute",
        bottom: 30,
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
    },
    scrollIndicatorView: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: "#ffffff",
        marginHorizontal: 5,
    },
    functionContentContainer: {
        width: ScreenWidth / 2 - 25,
    }
});

export default featureComponentStyleSheet;
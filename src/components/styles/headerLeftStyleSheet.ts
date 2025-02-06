import { ScreenHeight } from "@rneui/base";
import { StyleSheet } from "react-native";
import { colors } from "../../constants/colors";

const headerLeftStyleSheet = StyleSheet.create({
    container: {
        position: "absolute",
        top: 20,
        paddingLeft: 10,
        paddingVertical: 10,
        justifyContent: "center",
        width: ScreenHeight / 4.7,
        height: ScreenHeight / 14,
        borderBottomRightRadius: 20,
        borderTopRightRadius: 20,
        borderColor: colors.white,
        borderBottomWidth: 2.8,
        borderTopWidth: 2.8,
        borderRightWidth: 2.8,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 10,
    },
    containerLinear: {
        position: "absolute",
        width: ScreenHeight / 4.7,
        height: ScreenHeight / 14,
        borderBottomRightRadius: 20,
        borderTopRightRadius: 20,
        borderColor: colors.white,
        borderBottomWidth: 1,
        borderTopWidth: 1,
        borderRightWidth: 2
    },
    topContentContainer: {
        flexDirection: "row",
        alignItems: "center",
        gap: 5
    },
    nameContainer: {
        width: ScreenHeight / 7
    },
    nameTxt: {
        color: colors.white,
        fontFamily: "RobotoMedium"
    },
    yearTxt: {
        fontSize: 12,
        color: colors.white,
        fontFamily: "Roboto"
    },
    levelContainer: {
        flexDirection: "row",
        gap: 5,
        paddingLeft: 5
    },
    levelTxt: {
        fontSize: 12,
        color: colors.white,
        fontFamily: "Roboto"
    }
});

export default headerLeftStyleSheet;

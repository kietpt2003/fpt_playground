import { ScreenHeight, ScreenWidth } from "@rneui/base";
import { StyleSheet } from "react-native";
import { colors } from "../../constants/colors";
import { statusBarHeight } from "../../constants/statusBarHeight";

const rankingStyleSheet = StyleSheet.create({
    container: {
        height: ScreenHeight + statusBarHeight
    },
    containerLinear: {
        position: "absolute",
        width: "100%",
        height: "100%",
    },
    headerContainer: {
        marginTop: statusBarHeight,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 10
    },
    headerButton: {
        paddingBottom: 5
    },
    headerText: {
        fontSize: 20,
        fontWeight: "600",
        color: colors.white
    },
    headerButtonUnderline: {
        width: "35%",
        height: 5,
        backgroundColor: colors.white,
        position: "absolute",
        bottom: 0,
        alignSelf: "center",
        borderRadius: 5
    },
    topThreeContainer: {
        width: ScreenWidth - 20,
        alignSelf: "center",
        marginTop: 50,
        flexDirection: "row",
        alignItems: "flex-end"
    },
    topThreeItemContainer: {
        width: (ScreenWidth - 20) / 3,
        borderTopWidth: 1.5,
        borderColor: colors.white,
    },
    topThreeItemLinear: {
        position: "absolute",
        width: "100%",
        height: "100%",
    },
    imageContainer: {
        width: ScreenWidth / 5.5,
        height: ScreenWidth / 5.5,
        position: "absolute",
        top: -45,
        alignSelf: "center",
        justifyContent: "center",
        alignItems: "center"
    },
    ribbonTop1: {
        position: "absolute",
        bottom: -5,
    },
    ribbonTextTop1: {
        fontWeight: "bold",
        color: "white",
        position: "absolute",
        bottom: 20,
        textAlign: "center",
        width: "100%"
    },
    ribbonTop2: {
        position: "absolute",
        bottom: 0,
    },
    ribbonTextTop2: {
        fontWeight: "bold",
        color: "white",
        position: "absolute",
        bottom: 18,
        textAlign: "center",
        width: "100%"
    },
    ribbonTop3: {
        position: "absolute",
        bottom: 3,
    },
    ribbonTextTop3: {
        fontWeight: "bold",
        color: "white",
        position: "absolute",
        bottom: 18,
        textAlign: "center",
        width: "100%"
    },
});

export default rankingStyleSheet;
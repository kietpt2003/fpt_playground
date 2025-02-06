import { ScreenHeight, ScreenWidth } from "@rneui/base";
import { StyleSheet } from "react-native";
import { colors } from "../../constants/colors";
import { statusBarHeight } from "../../constants/statusBarHeight";
import { featureComponentHeight } from "../../constants/scrollHeight";

const npcGuidelineStyleSheet = StyleSheet.create({
    container: {
        width: ScreenWidth,
        height: "100%",
        position: "absolute",
        top: statusBarHeight,
    },
    npcBlurContainer: {
        width: ScreenWidth - 10,
        height: ScreenHeight / 3.8,
        position: "absolute",
        bottom: 5,
        left: 5,
        backgroundColor: colors.grey,
        borderRadius: 10,
        borderWidth: 2,
        flexDirection: "row",
        gap: 5
    },
    npcImage: {
        width: ScreenHeight / 7.5,
        height: ScreenHeight / 4,
        resizeMode: "stretch"
    },
    textContent: {
        width: ScreenWidth / 1.8,
        color: colors.white,
        overflow: "hidden",
        marginTop: 25,
        fontFamily: "Roboto"
    },
    textCursor: {
        fontFamily: "RobotoBold"
    },
    nextButton: {
        position: "absolute",
        bottom: 5,
        right: 10,
    },
    topBlur: {
        width: ScreenWidth,
        height: ScreenHeight / 3.5,
        position: "absolute",
        top: 0,
        backgroundColor: colors.grey
    },
    bottomBlur: {
        width: ScreenWidth,
        position: "absolute",
        height: "100%",
        backgroundColor: colors.grey
    },
});

export default npcGuidelineStyleSheet;
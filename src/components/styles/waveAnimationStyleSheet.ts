import { ScreenHeight, ScreenWidth } from "@rneui/base";
import { StyleSheet } from "react-native";
import { colors } from "../../constants/colors";
import { statusBarHeight } from "../../constants/statusBarHeight";

const waveAnimationStyleSheet = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "none",
    },
    svg: {
        width: ScreenWidth,
        height: "100%",
        position: "absolute",
        bottom: 0,
        zIndex: 1
    },
});

export default waveAnimationStyleSheet;
import { ScreenWidth } from "@rneui/base";
import { StyleSheet } from "react-native";
import { colors } from "../../constants/colors";

const waveAnimationStyleSheet = StyleSheet.create({
    container: {
        height: "100%", // Phải dùng 100% thì nó mới tự lấy theo SaveAreaView được
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "none",
    },
    bgContainer: {
        height: "100%",
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
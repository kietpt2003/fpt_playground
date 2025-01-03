import { ScreenHeight, ScreenWidth } from "@rneui/base";
import { Platform, StatusBar, StyleSheet } from "react-native";
import { colors } from "../../constants/colors";

const statusBarHeight = (Platform.OS === 'android' && StatusBar.currentHeight) ? StatusBar.currentHeight : 0;


const npcGuidelineStyleSheet = StyleSheet.create({
    container: {
        width: ScreenWidth,
        height: ScreenHeight + statusBarHeight,
        position: "absolute",
        top: 0,
    },
    npcBlurContainer: {
        width: ScreenWidth - 10,
        height: ScreenHeight / 3,
        position: "absolute",
        bottom: 5,
        left: 5,
        backgroundColor: colors.grey,
        borderRadius: 10,
        borderWidth: 2,
    },
    npcImage: {
        width: ScreenHeight / 7.5,
        height: ScreenHeight / 4,
        resizeMode: "stretch"
    }
});

export default npcGuidelineStyleSheet;
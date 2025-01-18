import { ScreenHeight, ScreenWidth } from "@rneui/base";
import { StyleSheet } from "react-native";
import { colors } from "../../constants/colors";

const pictureEditorStyleSheet = StyleSheet.create({
    image: {
        width: "100%",
        height: ScreenHeight - 100
    },
    bottomControllsContainer: {
        width: ScreenWidth,
        height: 100,
        backgroundColor: colors.black,
        justifyContent: "space-around",
        alignItems: "center",
        flexDirection: "row",
    }
});

export default pictureEditorStyleSheet;

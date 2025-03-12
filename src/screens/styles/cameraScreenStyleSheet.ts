import { ScreenHeight, ScreenWidth } from "@rneui/base";
import { StyleSheet } from "react-native";
import { colors } from "../../constants/colors";

const cameraScreenStyleSheet = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.black
    },
    topControllsContainer: {
        width: ScreenWidth,
        height: 100,
        backgroundColor: colors.black,
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center"
    },
    camera: {
        flex: 1,
        width: "100%"
    },
    slideContainer: {
        position: "absolute",
        bottom: 120,
        left: 20,
        right: 20,
        backgroundColor: colors.black,
        flexDirection: "row"
    },
    slider: {
        flex: 1,
        marginHorizontal: 10
    },
    bottomControllsContainer: {
        width: ScreenWidth,
        height: 100,
        backgroundColor: colors.black,
        justifyContent: "center",
        alignItems: "center"
    }
});

export default cameraScreenStyleSheet;

import { StyleSheet } from "react-native";
import { colors } from "../../constants/colors";
import { ScreenWidth } from "@rneui/base";

const cameraZoomStyleSheet = StyleSheet.create({
    headerContainer: {
        height: 20,
        alignItems: "center",
        alignSelf: "center"
    },
    headerContentContainer: {
        position: "absolute",
        top: -50,
        width: 55,
        backgroundColor: colors.icyWhite,
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 10,
        alignItems: "center"
    },
    headerZoomValue: {
        fontFamily: "RobotoMedium",
        fontSize: 16.5
    },
    zoomSelectStick: {
        position: "absolute",
        bottom: -50,
        width: 5,
        height: 50,
        alignItems: "center",
        alignSelf: "center",
        zIndex: 1,
        borderRadius: 5
    },
    customSliderContainer: {
        width: ScreenWidth,
        height: 60,
        backgroundColor: colors.black
    },
    flatListStyle: {
        flexGrow: 0
    },
    zoomButtonsContainer: {
        position: "absolute",
        bottom: 0,
        left: ScreenWidth / 2 - ScreenWidth / 7,
        flexDirection: "row",
        width: ScreenWidth / 3.5,
        height: 40,
        backgroundColor: colors.icyWhite,
        alignItems: "center",
        justifyContent: "space-around",
        borderRadius: 30
    },
    zoomButton: {
        width: ScreenWidth / 12,
        height: ScreenWidth / 12,
        borderRadius: 30,
        justifyContent: "center",
        alignItems: "center"
    },
    zoomButtonTxt: {
        fontFamily: "RobotoMedium",
    }
});

export default cameraZoomStyleSheet;

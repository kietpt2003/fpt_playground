import { ScreenHeight, ScreenWidth } from "@rneui/base";
import { StyleSheet } from "react-native";
import { colors } from "../../constants/colors";

const volumeStyleSheet = StyleSheet.create({
    container: {
        justifyContent: 'flex-end',
        margin: 0,
    },
    header: {
        width: ScreenWidth / 7,
        height: ScreenHeight / 80,
        borderRadius: 30,
        alignSelf: "center",
        marginHorizontal: 12,
        marginTop: 12
    },
    modalContent: {
        backgroundColor: colors.milkyWhite,
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
    },
    slider: {
        height: 40,
    },
    sliderValueContainer: {
        position: 'absolute',
        top: 15
    },
    sliderValue: {
        fontSize: 15.5,
        fontFamily: "RobotoMedium"
    },
})

export default volumeStyleSheet;
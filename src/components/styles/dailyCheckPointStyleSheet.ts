import { ScreenHeight, ScreenWidth } from "@rneui/base";
import { StyleSheet } from "react-native";
import { colors } from "../../constants/colors";

const dailyCheckPointStyleSheet = StyleSheet.create({
    modalContainer: {
        alignItems: "center",
    },
    container: {
        position: "relative",
    },
    mainRectangle: {
        rowGap: 1,
        width: ScreenWidth * 0.8,
        height: ScreenHeight / 1.85 - 30,
        padding: 15,
        backgroundColor: colors.milkyWhite,
        borderStartWidth: 4,
        borderTopWidth: 5,
        borderEndWidth: 6,
        borderBottomWidth: 3,
        borderColor: colors.darkOrange,
        borderRadius: 10
    },
    cornerTopLeft: {
        position: "absolute",
        top: -8, // Đặt góc nhọn phía trên
        left: -8,
        width: ScreenWidth * 0.8 / 2,
        height: (ScreenHeight / 1.85 - 30) / 2,
        backgroundColor: colors.white, // Màu nền trắng
        borderBottomLeftRadius: 18,
        borderTopRightRadius: 18,
        borderTopLeftRadius: 18,
        borderStartWidth: 1,
        borderTopWidth: 1.5,
        borderEndWidth: 1.5,
        borderBottomWidth: 1,
        borderColor: colors.darkOrange, // Viền đen
    },
    cornerBottomRight: {
        position: "absolute",
        bottom: -8, // Đặt góc nhọn phía dưới
        right: -8,
        width: ScreenWidth * 0.8 / 2,
        height: (ScreenHeight / 1.85 - 30) / 2,
        backgroundColor: colors.white,
        borderBottomLeftRadius: 18,
        borderTopRightRadius: 18,
        borderBottomRightRadius: 18,
        borderStartWidth: 1,
        borderTopWidth: 1,
        borderEndWidth: 1.5,
        borderBottomWidth: 1.5,
        borderColor: colors.darkOrange,
    },
    closeBtnContainer: {
        borderRadius: 30,
        width: ScreenHeight / 22,
        height: ScreenHeight / 22,
        alignItems: "center",
        justifyContent: "center",
        alignSelf: "flex-end"
    },
    closeBtnLinear: {
        position: "absolute",
        width: "100%",
        height: "100%",
        borderRadius: 30,
    },
});

export default dailyCheckPointStyleSheet;
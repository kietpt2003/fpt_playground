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
        width: ScreenWidth * 0.9,
        height: ScreenHeight / 1.8 - 30,
        backgroundColor: colors.milkyWhite,
        borderStartWidth: 4,
        borderTopWidth: 5,
        borderEndWidth: 6,
        borderBottomWidth: 3,
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
    },
    closeBtnContainer: {
        borderRadius: 30,
        width: ScreenHeight / 22,
        height: ScreenHeight / 22,
        alignItems: "center",
        justifyContent: "center",
        alignSelf: "flex-end",
        marginTop: 10,
        marginRight: 10
    },
    closeBtnLinear: {
        position: "absolute",
        width: "100%",
        height: "100%",
        borderRadius: 30,
        marginTop: 10,
        marginRight: 10
    },
    flatListContainer: {
        width: ScreenWidth * 0.82,
        height: ScreenHeight / 3.3,
        alignSelf: "center",
    },
    dateItemTxt: {
        textAlign: "center",
        marginVertical: 2,
        fontSize: 11.5,
        fontFamily: "Roboto"
    },
    checkedContainer: {
        position: "absolute",
        width: ScreenWidth * 0.82,
        height: ScreenHeight / 7.5,
        borderWidth: 1,
        borderRadius: 20,
        justifyContent: "center",
        alignItems: "center",
        zIndex: 2,
        backgroundColor: colors.blurWhite,
    },
    checkedTxt: {
        color: colors.approve,
        transform: [{ rotate: "-45deg" }],
        textAlign: "center",
        fontSize: 20,
        fontFamily: "RobotoMedium"
    },
    valueTxt: {
        textAlign: "center",
        fontFamily: "Roboto"
    },
    checkPointFinalDateContainer: {
        width: ScreenWidth * 0.82,
        height: ScreenHeight / 7.5,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 20,
        alignSelf: "center",
    },
    checkPointFinalDateBgLinear: {
        position: "absolute",
        width: ScreenWidth * 0.82,
        height: ScreenHeight / 7.5,
        borderWidth: 1,
        borderRadius: 20,
    },
    finalDateCoinImage: {
        width: ScreenHeight / 6,
        height: ScreenHeight / 10.5,
        resizeMode: "stretch",
    },
    checkPointDayContainer: {
        width: ScreenWidth / 5,
        position: "absolute",
        top: 8,
        zIndex: 1,
        left: 10
    },
    checkPointDayContainerLinear: {
        position: "absolute",
        width: ScreenWidth / 5,
        height: "100%",
        borderRadius: 15,
        borderWidth: 1,
    },
    sundayLockContainer: {
        position: "absolute",
        width: ScreenWidth * 0.82,
        height: ScreenHeight / 7.5,
        borderWidth: 1,
        borderRadius: 20,
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1,
        backgroundColor: colors.blurBlack,
        borderColor: colors.grey
    }
});

export default dailyCheckPointStyleSheet;
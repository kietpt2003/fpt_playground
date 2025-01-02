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
        alignSelf: "flex-end"
    },
    closeBtnLinear: {
        position: "absolute",
        width: "100%",
        height: "100%",
        borderRadius: 30,
    },
    flatListContainer: {
        width: ScreenWidth * 0.7,
        height: ScreenHeight / 3,
    },
    checkPointItemContainer: {
        width: ScreenWidth / 5.3,
        height: ScreenWidth / 4.5,
        justifyContent: "center",
        alignItems: "center",
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        alignSelf: "center"
    },
    checkPointItemBgLinear: {
        position: "absolute",
        width: ScreenWidth / 5.3,
        height: ScreenWidth / 4.5,
        borderWidth: 1,
        borderTopWidth: 0,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
    },
    dateItemContainer: {
        width: ScreenWidth / 5,
        borderRadius: 5,
        borderWidth: 1,
    },
    dateItemContainerLinear: {
        position: "absolute",
        width: ScreenWidth / 5.1,
        height: "100%",
        borderRadius: 5,
        borderWidth: 1,
    },
    dateItemTxt: {
        textAlign: "center",
        marginVertical: 2
    },
    lockContainer: {
        position: "absolute",
        width: ScreenWidth / 5.3,
        height: ScreenWidth / 4.5,
        borderWidth: 1,
        borderTopWidth: 0,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1,
        backgroundColor: colors.blurBlack,
        borderColor: colors.grey
    },
    coinImage: {
        width: ScreenWidth * 0.08,
        height: ScreenWidth * 0.08,
        resizeMode: "stretch",
        borderRadius: 25,
        alignSelf: "center"
    },
    checkedContainer: {
        position: "absolute",
        width: ScreenWidth / 7,
        height: ScreenWidth / 7,
        borderRadius: 50,
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 3,
        borderColor: colors.approve,
        zIndex: 2,
        backgroundColor: colors.blurWhite
    },
    checkedTxt: {
        color: colors.approve,
        fontWeight: "bold",
        transform: [{ rotate: "-45deg" }],
    },
    notCheckedContainer: {
        position: "absolute",
        width: ScreenWidth / 7,
        height: ScreenWidth / 7,
        borderRadius: 50,
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 3,
        borderColor: colors.disapprove,
        zIndex: 2,
        backgroundColor: colors.blurWhite
    },
    notCheckedTxt: {
        color: colors.disapprove,
        fontWeight: "bold",
        transform: [{ rotate: "-45deg" }],
    },
    valueTxt: {
        textAlign: "center",
        fontWeight: "bold"
    }
});

export default dailyCheckPointStyleSheet;
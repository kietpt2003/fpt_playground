import { ScreenHeight, ScreenWidth } from "@rneui/base";
import { StyleSheet } from "react-native";
import { colors } from "../../constants/colors";

const itemWidth = (ScreenWidth - 40) / 7;
const itemHeight = ScreenHeight / 12;
const itemRadius = 10;

const checkPointItemStyleSheet = StyleSheet.create({
    checkPointItemContainer: {
        width: itemWidth,
        height: itemHeight,
        justifyContent: "flex-end",
        alignItems: "center",
        borderRadius: itemRadius,
        alignSelf: "center",
        paddingBottom: 5,
    },
    checkPointItemBgLinear: {
        position: "absolute",
        width: itemWidth,
        height: itemHeight,
        borderWidth: 1,
        borderRadius: itemRadius,
    },
    dateItemContainer: {
        paddingVertical: 3
    },
    dateItemTxt: {
        textAlign: "center",
        color: colors.grey,
        fontSize: 12,
        fontFamily: "RobotoLight",
    },
    lockContainer: {
        position: "absolute",
        width: itemWidth,
        height: itemHeight,
        borderWidth: 1,
        borderRadius: itemRadius,
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
        width: itemWidth,
        height: itemHeight,
        borderWidth: 1,
        borderRadius: itemRadius,
        justifyContent: "center",
        alignItems: "center",
        zIndex: 2,
        backgroundColor: colors.blurWhite,
    },
    checkedTxt: {
        color: colors.approve,
        transform: [{ rotate: "-60deg" }],
        textAlign: "center",
        fontSize: ScreenWidth > 350 ? 13 : 8,
        fontFamily: "RobotoMedium"
    },
    notCheckedContainer: {
        position: "absolute",
        width: itemWidth,
        height: itemHeight,
        borderWidth: 1,
        borderRadius: itemRadius,
        justifyContent: "center",
        alignItems: "center",
        zIndex: 2,
        backgroundColor: colors.blurWhite,
    },
    notCheckedTxt: {
        color: colors.disapprove,
        transform: [{ rotate: "-60deg" }],
        textAlign: "center",
        fontSize: ScreenWidth > 350 ? 13 : 8,
        fontFamily: "RobotoMedium"
    },
    valueTxt: {
        textAlign: "center",
        fontSize: 12,
        fontFamily: "Roboto"
    },
});

export default checkPointItemStyleSheet;
import { ScreenHeight, ScreenWidth } from "@rneui/base";
import { StyleSheet } from "react-native";
import { colors } from "../../constants/colors";

const dailyCheckPointItemStyleSheet = StyleSheet.create({
    checkPointItemContainer: {
        width: ScreenWidth / 3.9,
        height: ScreenHeight / 7.5,
        justifyContent: "flex-end",
        alignItems: "center",
        borderRadius: 20,
        alignSelf: "center",
        paddingBottom: 5,
    },
    checkPointItemBgLinear: {
        position: "absolute",
        width: ScreenWidth / 3.9,
        height: ScreenHeight / 7.5,
        borderWidth: 1,
        borderRadius: 20,
    },
    dateItemContainer: {
        width: ScreenWidth / 3.9 - 10,
        position: "absolute",
        top: 8,
        zIndex: 1,
        left: 5,
        right: 5
    },
    dateItemContainerLinear: {
        position: "absolute",
        width: ScreenWidth / 3.9 - 10,
        height: "100%",
        borderRadius: 25,
        borderWidth: 1,
    },
    dateItemTxt: {
        textAlign: "center",
        marginVertical: 2,
        fontSize: 11.5,
        fontFamily: "Roboto"
    },
    lockContainer: {
        position: "absolute",
        width: ScreenWidth / 3.9,
        height: ScreenHeight / 7.5,
        borderWidth: 1,
        borderRadius: 20,
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1,
        backgroundColor: colors.blurBlack,
        borderColor: colors.grey
    },
    coinImage: {
        width: ScreenWidth * 0.16,
        height: ScreenWidth * 0.16,
        resizeMode: "stretch",
        borderRadius: 25,
        alignSelf: "center"
    },
    checkedContainer: {
        position: "absolute",
        width: ScreenWidth / 3.9,
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
    notCheckedContainer: {
        position: "absolute",
        width: ScreenWidth / 3.9,
        height: ScreenHeight / 7.5,
        borderWidth: 1,
        borderRadius: 20,
        justifyContent: "center",
        alignItems: "center",
        zIndex: 2,
        backgroundColor: colors.blurWhite,
    },
    notCheckedTxt: {
        color: colors.disapprove,
        transform: [{ rotate: "-45deg" }],
        fontSize: 20,
        fontFamily: "RobotoMedium"
    },
    valueTxt: {
        textAlign: "center",
        fontFamily: "Roboto"
    },
});

export default dailyCheckPointItemStyleSheet;
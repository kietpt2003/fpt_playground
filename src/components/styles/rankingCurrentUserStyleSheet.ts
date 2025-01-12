import { ScreenHeight, ScreenWidth } from "@rneui/base";
import { StyleSheet } from "react-native";
import { colors } from "../../constants/colors";

export const rankingCurrentUserStyleSheet = StyleSheet.create({
    container: {
        flexDirection: "row",
        width: ScreenWidth - 20,
    },
    rankingIndex: {
        width: (ScreenWidth - 20) / 6,
        textAlign: "center",
        color: colors.white,
        fontSize: 19,
        textAlignVertical: "center",
        fontFamily: "RobotoMedium"
    },
    rankingUserContainer: {
        flex: 1,
        paddingLeft: 10,
        gap: 5,
    },
    rankingUserHeaderContainer: {
        flexDirection: "row",
        gap: 5,
        alignItems: "center"
    },
    userName: {
        fontSize: 18,
        color: colors.white,
        fontFamily: "Roboto"
    },
    rankingUserContentContainer: {
        flexDirection: "row",
        gap: 5,
    },
    likesContainer: {
        width: 45,
        height: 22,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: colors.white,
        borderRadius: 15,
        paddingHorizontal: 5
    },
    likeTxt: {
        fontSize: 15,
        color: colors.likesColor,
        fontFamily: "RobotoMedium"
    },
    specializedCodeContainer: {
        width: 38,
        height: 22,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: colors.white,
        borderRadius: 15,
        paddingHorizontal: 5
    },
    specializedCodeTxt: {
        fontSize: 15,
        color: colors.approve,
        fontFamily: "RobotoMedium"
    },
    rankingDiamondContainer: {
        width: (ScreenWidth - 20) / 3,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 5,
    },
    rankingDiamondTxt: {
        color: colors.white,
        fontSize: 17,
        fontFamily: "RobotoMedium"
    },
    diamondImage: {
        width: ScreenHeight / 45,
        height: ScreenHeight / 45,
    }
})

export default rankingCurrentUserStyleSheet;

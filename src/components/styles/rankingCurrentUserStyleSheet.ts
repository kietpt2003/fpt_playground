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
        fontWeight: "600",
        fontSize: 20,
        textAlignVertical: "center"
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
        fontWeight: "500",
        color: colors.white,
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
        fontWeight: "500"
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
        fontWeight: "500"
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
        fontWeight: "600",
        fontSize: 18,
    },
    diamondImage: {
        width: ScreenHeight / 45,
        height: ScreenHeight / 45,
    }
})

export default rankingCurrentUserStyleSheet;

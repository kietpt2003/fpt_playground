import { ScreenHeight, ScreenWidth } from "@rneui/base";
import { StyleSheet } from "react-native";
import { colors } from "../../constants/colors";

export const rankingUserItemStyleSheet = StyleSheet.create({
    container: {
        flexDirection: "row",
        width: ScreenWidth - 20,
        backgroundColor: colors.white,
        paddingVertical: 8
    },
    rankingIndex: {
        width: (ScreenWidth - 20) / 6,
        textAlign: "center",
        color: colors.grey,
        fontSize: 18,
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
        fontSize: 15,
        color: colors.black,
        opacity: 0.7,
        fontFamily: "Roboto"
    },
    rankingUserContentContainer: {
        flexDirection: "row",
        gap: 5,
    },
    likesContainer: {
        width: 45,
        height: 20,
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 1.5,
        borderColor: colors.likesColor,
        borderRadius: 15,
        paddingHorizontal: 5
    },
    likeTxt: {
        fontSize: 12,
        color: colors.likesColor,
        fontFamily: "RobotoMedium"
    },
    specializedCodeContainer: {
        width: 35,
        height: 20,
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 1.5,
        borderColor: colors.approve,
        borderRadius: 15,
        paddingHorizontal: 5
    },
    specializedCodeTxt: {
        fontSize: 12,
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
        color: colors.diamond,
        fontSize: 14,
        fontFamily: "RobotoMedium"
    },
    diamondImage: {
        width: ScreenHeight / 50,
        height: ScreenHeight / 50,
    }
})

export default rankingUserItemStyleSheet;

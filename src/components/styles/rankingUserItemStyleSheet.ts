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
        fontWeight: "600",
        fontSize: 18,
        textAlignVertical: "center",
        fontFamily: "Roboto"
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
        fontSize: 16,
        fontWeight: "500",
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
        borderWidth: 1,
        borderColor: colors.likesColor,
        borderRadius: 15,
        paddingHorizontal: 5
    },
    likeTxt: {
        fontSize: 13,
        color: colors.likesColor,
        fontWeight: "500",
        fontFamily: "Roboto"
    },
    specializedCodeContainer: {
        width: 35,
        height: 20,
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 1,
        borderColor: colors.approve,
        borderRadius: 15,
        paddingHorizontal: 5
    },
    specializedCodeTxt: {
        fontSize: 13,
        color: colors.approve,
        fontWeight: "500",
        fontFamily: "Roboto"
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
        fontWeight: "600",
        fontSize: 15,
        fontFamily: "Roboto"
    },
    diamondImage: {
        width: ScreenHeight / 50,
        height: ScreenHeight / 50,
    }
})

export default rankingUserItemStyleSheet;

import { ScreenHeight, ScreenWidth } from "@rneui/base";
import { StyleSheet } from "react-native";
import { colors } from "../../constants/colors";
import { statusBarHeight } from "../../constants/statusBarHeight";

const rankingRewardsStyleSheet = StyleSheet.create({
    container: {
        height: ScreenHeight + statusBarHeight
    },
    containerLinear: {
        position: "absolute",
        width: "100%",
        height: "100%",
    },
    backgroundImage: {
        width: ScreenWidth,
        height: ScreenHeight / 3.5,
    },
    headerContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        position: "absolute",
        top: 40,
        paddingHorizontal: 20,
        width: ScreenWidth
    },
    backIconContainer: {
        width: ScreenHeight / 22,
        height: ScreenHeight / 22,
        borderRadius: 30,
        justifyContent: "center",
        alignItems: "center",
        borderColor: colors.white,
        borderWidth: 2.8,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 10,
    },
    backIconContainerLinear: {
        position: "absolute",
        width: "100%",
        height: "100%",
        borderRadius: 30,
    },
    moneyContainer: {
        flexDirection: "row",
        gap: 10,
    },
    moneyItemContainer: {
        flexDirection: "row",
        alignItems: "center",
    },
    coinImage: {
        width: ScreenHeight / 25,
        height: ScreenHeight / 25,
        zIndex: 1,
        marginRight: -5
    },
    diamondImage: {
        width: ScreenHeight / 35,
        height: ScreenHeight / 35,
        zIndex: 1,
        marginRight: -5
    },
    moneyValueContainer: {
        width: ScreenWidth / 7.5,
        height: 20,
        marginLeft: -5,
    },
    moneyValueContainerLinear: {
        position: "absolute",
        width: "100%",
        height: "100%",
        borderTopRightRadius: 5,
        borderBottomRightRadius: 5,
    },
    moneyValueTxt: {
        textAlign: "right",
        textAlignVertical: "center",
        marginRight: 3,
        color: colors.white,
        fontSize: 13,
        fontFamily: "Roboto"
    },
    plusMoneyButton: {
        width: 18,
        height: 18,
        justifyContent: "center",
        alignItems: "center",
        marginLeft: 3,
        backgroundColor: colors.darkGreen,
        borderRadius: 5
    },
    rewardListContainer: {
        width: ScreenWidth * 0.95,
        height: ScreenHeight - ScreenHeight / 3.5 + statusBarHeight,
        alignSelf: "center",
        marginTop: 10
    },
    faltListFooterStyle: {
        height: 10,
    },
});

export default rankingRewardsStyleSheet;
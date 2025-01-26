import { ScreenHeight, ScreenWidth } from "@rneui/base";
import { StyleSheet } from "react-native";
import { colors } from "../../constants/colors";
import { statusBarHeight } from "../../constants/statusBarHeight";

const gameListStyleSheet = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: statusBarHeight
    },
    headerContainer: {
        width: ScreenWidth,
        height: ScreenHeight / 5.5,
        zIndex: 0,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-start",
    },
    headerTopContainer: {
        flexDirection: "row",
        justifyContent: 'flex-start',
        alignItems: "center",
        gap: 10,
    },
    headerContainerLinear: {
        position: "absolute",
        width: "100%",
        height: "100%",
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
        marginTop: 10,
        marginLeft: 10
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
        marginTop: 10,
        marginRight: 10
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
    gameContainerLinear: {
        position: "absolute",
        width: "100%",
        height: "100%",
    },
    imageContainer: {
        width: ScreenWidth / 3.4,
        height: ScreenWidth / 3.4,
        borderRadius: 20,
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        left: 30,
        top: -30,
        borderWidth: 3,
        borderColor: colors.white,
    },
    gameDescription: {
        position: "absolute",
        top: 10,
        left: ScreenWidth / 3.4 + 30 + 10,
    },
    gameName: {
        fontFamily: "RobotoBold",
        color: colors.white,
        fontSize: 26,
    },
    totalOnline: {
        fontFamily: "RobotoMedium",
        color: colors.white,
        fontSize: 22,
    },
    gameIcon: {
        position: "absolute",
        top: 15,
        right: 15,
    },
    flatListContainer: {
        width: ScreenWidth,
        height: ScreenHeight - ScreenHeight / 3.2 + statusBarHeight,
        zIndex: 2,
    },
    onlinePeopleContainer: {
        position: "absolute",
        bottom: 10,
        left: ScreenWidth / 3.4 + 30 + 10,
        flexDirection: "row",
        alignItems: "center"
    },
    activePeopleTxt: {
        fontFamily: "Roboto",
        color: colors.white,
        fontSize: 18
    },
    flatListStyle: {
        flexGrow: 0
    },
    flatListContentContainerStyle: {
        marginLeft: 10
    },
    userOnlineAva: {
        width: ScreenWidth / 14.5,
        height: ScreenWidth / 14.5,
        borderRadius: 20,
        borderWidth: 2
    },
    totalOnlineContainer: {
        width: ScreenWidth / 14.5,
        height: ScreenWidth / 14.5,
        borderRadius: 20,
        borderWidth: 2,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: colors.icyWhite
    },
    totalOnlineTxt: {
        fontFamily: "Roboto",
        fontSize: 13,
        color: colors.grey
    }
});

export default gameListStyleSheet;
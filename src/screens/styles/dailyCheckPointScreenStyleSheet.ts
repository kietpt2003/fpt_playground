import { ScreenHeight, ScreenWidth } from "@rneui/base";
import { StyleSheet } from "react-native";
import { colors } from "../../constants/colors";

const itemWidth = ScreenWidth * 0.875;
const itemHeight = ScreenHeight / 9;
const itemRadius = 10;

const dailyCheckpointScreenStyleSheet = StyleSheet.create({
    containerLinear: {
        position: "absolute",
        width: "100%",
        height: "100%",
    },
    backgroundImage: {
        width: ScreenWidth,
        height: ScreenHeight / 3.5,
    },
    backgroundImageBlur: {
        width: ScreenWidth,
        height: ScreenHeight / 3.5,
        backgroundColor: colors.blurBlack,
        position: "absolute"
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
        fontSize: 13
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
    coinContainer: {
        width: ScreenWidth - 40,
        height: ScreenHeight / 7,
        alignSelf: "center",
        marginTop: -ScreenHeight / 9.5,
        overflow: "hidden",
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "space-between"
    },
    coinContainerLinear: {
        position: "absolute",
        width: "100%",
        height: "100%",
        borderRadius: 10
    },
    coinStarContainerBg: {
        position: "absolute",
        bottom: -ScreenHeight / 20,
        left: ScreenWidth / 15,
        opacity: 0.2
    },
    myCoinContainer: {
        marginLeft: 20
    },
    myCoinTxt: {
        fontSize: 17,
        color: colors.grey,
        fontWeight: "500"
    },
    coinValueTxt: {
        fontSize: 35,
        fontWeight: "700"
    },
    coinButtonContainer: {
        flexDirection: "row",
        gap: 10,
        marginRight: 20
    },
    coinButtonItem: {
        width: ScreenWidth / 4.5,
        height: 42,
        justifyContent: "center"
    },
    coinButtonItemLinear: {
        position: "absolute",
        width: "100%",
        height: "100%",
        borderRadius: 20
    },
    coinButtonTxt: {
        color: colors.white,
        textAlign: "center",
        fontSize: 15,
        fontWeight: "500"
    },
    checkedContainer: {
        position: "absolute",
        width: ScreenWidth / 3.9,
        height: itemHeight,
        borderWidth: 1,
        borderRadius: 20,
        justifyContent: "center",
        alignItems: "center",
        zIndex: 2,
        backgroundColor: colors.blurWhite,
    },
    checkedTxt: {
        color: colors.approve,
        fontWeight: "bold",
        transform: [{ rotate: "-45deg" }],
        textAlign: "center",
        fontSize: 20
    },
    valueTxt: {
        textAlign: "center",
    },
    dateItemTxt: {
        textAlign: "center",
        marginVertical: 2,
        fontSize: 11.5
    },
    dailyCheckpointContainer: {
        width: ScreenWidth - 40,
        alignSelf: "center",
        overflow: "hidden",
        marginTop: 15,
    },
    dailyCheckpointLinear: {
        position: "absolute",
        width: "100%",
        height: "100%",
        borderRadius: 15
    },
    dailyCheckpointHeaderTxt: {
        fontSize: 20,
        paddingLeft: 10,
        marginTop: 5,
        fontWeight: "700"
    },
    dailyCheckpointSubHeaderTxt: {
        fontSize: 16,
        paddingLeft: 10,
        marginTop: 5,
        fontWeight: "500"
    },
    flatListContainer: {
        height: ScreenHeight / 9,
        marginBottom: 5,
        marginTop: 15
    },
    checkPointFinalDateContainer: {
        width: itemWidth,
        height: itemHeight,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: itemRadius,
        alignSelf: "center",
        marginBottom: 15
    },
    checkPointFinalDateBgLinear: {
        position: "absolute",
        width: itemWidth,
        height: itemHeight,
        borderWidth: 1,
        borderRadius: itemRadius,
    },
    finalDateImageContainer: {
        flexDirection: "row",
        alignItems: "flex-end",
        gap: 20
    },
    finalDateCoinImage: {
        width: ScreenHeight / 8,
        height: ScreenHeight / 12.5,
        resizeMode: "stretch",
    },
    finalDateDiamondImage: {
        width: ScreenHeight / 10,
        height: ScreenHeight / 15,
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
        borderRadius: itemRadius,
        borderWidth: 1,
    },
    sundayLockContainer: {
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
    missionReward: {
        marginLeft: 20,
        marginVertical: 10,
        fontSize: 18,
        fontWeight: "500"
    },
    functionContainer: {
        width: ScreenWidth - 40,
        height: ScreenHeight / 12,
        alignSelf: "center",
        marginVertical: 5,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    functionContainerLinear: {
        position: "absolute",
        width: "100%",
        height: "100%",
        borderRadius: 10
    },
    functionLeftContainer: {
        flexDirection: "row",
        alignItems: "center"
    },
    iconContainer: {
        width: ScreenHeight / 15,
        height: ScreenHeight / 15,
        justifyContent: "center",
        alignItems: "center",
        marginLeft: 20
    },
    iconContainerLinear: {
        position: "absolute",
        width: "100%",
        height: "100%",
        borderRadius: 30
    },
    functionContentContainer: {
        width: ScreenHeight / 4,
        height: ScreenHeight / 12,
        paddingTop: 10,
        marginLeft: 10,
    },
    functionTitle: {
        fontSize: 16,
        fontWeight: "600"
    },
    functionDescription: {
        fontSize: 14,
        color: colors.grey
    },
    functionRightIcon: {
        marginRight: 10,
        opacity: 0.5
    }
});

export default dailyCheckpointScreenStyleSheet;
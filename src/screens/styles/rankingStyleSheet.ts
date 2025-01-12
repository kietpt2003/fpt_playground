import { ScreenHeight, ScreenWidth } from "@rneui/base";
import { StyleSheet } from "react-native";
import { colors } from "../../constants/colors";
import { statusBarHeight } from "../../constants/statusBarHeight";

const rankingStyleSheet = StyleSheet.create({
    container: {
        height: ScreenHeight + statusBarHeight
    },
    containerLinear: {
        position: "absolute",
        width: "100%",
        height: "100%",
    },
    headerContainer: {
        marginTop: statusBarHeight,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 10
    },
    headerButton: {
        paddingBottom: 5
    },
    headerText: {
        fontSize: ScreenWidth > 350 ? 20 : 18,
        color: colors.white,
        fontFamily: "RobotoMedium"
    },
    headerButtonUnderline: {
        width: "35%",
        height: 5,
        backgroundColor: colors.white,
        position: "absolute",
        bottom: 0,
        alignSelf: "center",
        borderRadius: 5
    },
    topThreeContainer: {
        width: ScreenWidth - 20,
        alignSelf: "center",
        marginTop: 50,
        flexDirection: "row",
        alignItems: "flex-end",
    },
    topThreeItemContainer: {
        width: (ScreenWidth - 20) / 3,
    },
    top1BorderContainer: {
        width: (ScreenWidth - 20) / 3,
        height: ScreenHeight / 13,
        borderTopWidth: 1.5,
        borderColor: colors.blurWhite,
        borderLeftWidth: 1.5,
        borderRightWidth: 1.5,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        position: "absolute",
        top: 0,
        opacity: 0.7
    },
    top1BorderBlur: {
        width: (ScreenWidth - 20) / 3,
        height: "40%",
        borderColor: colors.white,
        position: "absolute",
        bottom: "-40%",
        borderRightWidth: 1.4,
        borderLeftWidth: 1.4,
        alignSelf: "center",
        opacity: 0.5,
    },
    top2BorderContainer: {
        width: (ScreenWidth - 20) / 3,
        height: ScreenHeight / 17,
        borderTopWidth: 1.5,
        borderColor: colors.blurWhite,
        borderLeftWidth: 1.5,
        borderTopLeftRadius: 10,
        position: "absolute",
        top: 0,
        opacity: 0.7
    },
    top2BorderBlur: {
        width: (ScreenWidth - 20) / 3,
        height: "40%",
        borderColor: colors.white,
        position: "absolute",
        bottom: "-40%",
        borderLeftWidth: 1.4,
        alignSelf: "center",
        opacity: 0.5,
    },
    top3BorderContainer: {
        width: (ScreenWidth - 20) / 3,
        height: ScreenHeight / 15,
        borderTopWidth: 1.5,
        borderColor: colors.blurWhite,
        borderRightWidth: 1.5,
        borderTopRightRadius: 10,
        position: "absolute",
        top: 0,
        opacity: 0.7
    },
    top3BorderBlur: {
        width: (ScreenWidth - 20) / 3,
        height: "40%",
        borderColor: colors.white,
        position: "absolute",
        bottom: "-40%",
        borderRightWidth: 1.4,
        alignSelf: "center",
        opacity: 0.5,
    },
    topThreeItemLinear: {
        position: "absolute",
        width: "100%",
        height: "100%",
    },
    imageContainer: {
        width: ScreenWidth / 5.5,
        height: ScreenWidth / 5.5,
        position: "absolute",
        top: -45,
        alignSelf: "center",
        justifyContent: "center",
        alignItems: "center"
    },
    ribbonTop1: {
        position: "absolute",
        bottom: -5,
    },
    ribbonTop2: {
        position: "absolute",
        bottom: 0,
    },
    ribbonTop3: {
        position: "absolute",
        bottom: 3,
    },
    rankingContentContainer: {
        width: ScreenWidth / 3.7,
        alignSelf: "center",
        position: "absolute",
        bottom: -60,
        alignItems: "center",
        gap: 10,
    },
    userName: {
        width: ScreenWidth / 3.7,
        fontSize: 18,
        color: colors.white,
        textAlign: "center",
        fontFamily: "RobotoMedium"
    },
    diamondDetailContainer: {
        flexDirection: "row",
        gap: 5,
        alignItems: "center",
    },
    diamondValue: {
        color: colors.white,
        fontSize: ScreenWidth > 350 ? 18 : 17,
        textShadowColor: "rgba(0, 0, 0, 0.3)", // Viền đen rõ
        textShadowOffset: { width: -1, height: -1 }, // Viền trái/trên
        textShadowRadius: 1,
        fontFamily: "RobotoBold"
    },
    rankingContentImage: {
        width: ScreenHeight / 39,
        height: ScreenHeight / 39
    },
    otherUsersContainer: {
        width: ScreenWidth - 20,
        height: ScreenHeight / 1.35,
        alignSelf: "center",
    },
    serverContainer: {
        width: ScreenWidth - 20,
        height: ScreenHeight / 17,
        alignSelf: "center",
        flexDirection: "row",
        alignItems: "flex-end"
    },
    serverSelectionBtn: {
        width: (ScreenWidth - 20) / 2,
        height: ScreenHeight / 20,
        justifyContent: "center"
    },
    serverSelectionBtnLinear: {
        position: "absolute",
        width: "100%",
        height: "100%",
    },
    serverSelectedBg: {
        width: (ScreenWidth - 20) / 2,
        height: ScreenHeight / 17,
        position: "absolute",
        justifyContent: "center"
    },
    serverSelectedBgLinear: {
        position: "absolute",
        width: "100%",
        height: "100%",
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
    },
    serverSelectName: {
        fontSize: 16,
        color: colors.white,
        textAlign: "center",
        fontFamily: "RobotoBold"
    },
    serverSelectedName: {
        fontSize: 18,
        color: colors.white,
        textAlign: "center",
        fontFamily: "RobotoBold"
    },
    faltListFooterStyle: {
        height: ScreenHeight / 9,
        backgroundColor: colors.white
    },
    currentUserRankingContainer: {
        width: ScreenWidth,
        height: ScreenHeight / 10,
        position: "absolute",
        bottom: 0,
        justifyContent: "center",
        alignItems: "center"
    },
    currentUserRankingLinear: {
        position: "absolute",
        width: "100%",
        height: "100%",
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
    },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: "space-between",
        paddingVertical: 6, // Giảm padding dọc
        backgroundColor: colors.milkyWhite,
        height: ScreenHeight / 8
    },
    menuItemTxt: {
        fontSize: 14.5,
        flex: 0.9,
        textAlign: 'left',
        flexWrap: "nowrap", // Ngăn xuống dòng
        overflow: "hidden", // Ngăn tràn nội dung
        fontFamily: "Roboto"
    },
});

export default rankingStyleSheet;
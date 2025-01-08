import { ScreenHeight, ScreenWidth } from "@rneui/base";
import { StyleSheet } from "react-native";
import { colors } from "../../constants/colors";

const rankingRulesModalStyleSheet = StyleSheet.create({
    modalContainer: {
        alignItems: "center",
    },
    container: {
        rowGap: 1,
        width: ScreenWidth * 0.9,
        height: ScreenHeight / 2,
        padding: 20,
        borderRadius: 10,
        backgroundColor: colors.milkyWhite,
    },
    headerContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 10
    },
    rankingRulesTitle: {
        fontSize: 24,
        fontWeight: "700",
    },
    closeBtnContainer: {
        borderRadius: 30,
        width: ScreenHeight / 25,
        height: ScreenHeight / 25,
        alignItems: "center",
        justifyContent: "center",
    },
    closeBtnLinear: {
        position: "absolute",
        width: "100%",
        height: "100%",
        borderRadius: 30,
    },
    indicatorContainer: {
        width: 10,
        backgroundColor: colors.blurWhite,
        position: 'absolute',
        right: 20,
        top: 20 + ScreenHeight / 25 + 10,
        bottom: 20,
        borderRadius: 5,
    },
    indicator: {
        width: 10,
        borderRadius: 5,
    },
    indicatorLinear: {
        flex: 1,
        borderRadius: 5,
    },
    rulesHeader: {
        fontSize: 18,
        fontWeight: "600",
    },
    rulesSubHeader: {
        fontSize: 16,
        fontWeight: "600",
        paddingLeft: 15
    },
    rulesContent: {
        fontSize: 16,
        fontWeight: "500",
        color: colors.lightBlue,
        paddingLeft: 30,
        marginRight: 15,
    }
});

export default rankingRulesModalStyleSheet;
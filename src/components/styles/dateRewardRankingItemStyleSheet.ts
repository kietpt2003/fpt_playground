import { ScreenHeight, ScreenWidth } from "@rneui/base";
import { StyleSheet } from "react-native";
import { colors } from "../../constants/colors";

const dateRewardRankingItemStyleSheet = StyleSheet.create({
    container: {
        width: ScreenWidth * 0.95,
        height: ScreenHeight * 0.125,
        borderRadius: 15,
        marginBottom: 10,
    },
    containerLinear: {
        position: "absolute",
        width: ScreenWidth * 0.95,
        height: ScreenHeight * 0.125,
        borderRadius: 15,
        borderWidth: 2
    },
    headerContainer: {
        width: ScreenWidth * 0.95,
        height: 35,
        position: "absolute",
        top: 0,
        justifyContent: "center",
    },
    headerContainerLinear: {
        position: "absolute",
        width: ScreenWidth * 0.95,
        height: 35,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        borderBottomWidth: 1
    },
    createdAtTxt: {
        paddingLeft: 10,
        fontSize: 15,
        color: colors.icyWhite,
        fontFamily: "RobotoMedium"
    },
    contentContainer: {
        position: "absolute",
        width: ScreenWidth * 0.95,
        height: ScreenHeight * 0.125 - 35,
        bottom: 0,
        justifyContent: "space-between",
        paddingHorizontal: 10,
        flexDirection: "row",
        alignItems: "center"
    },
    listValueContainer: {
        width: ScreenWidth * 0.58,
        height: ScreenHeight * 0.125 - 35,
        flexDirection: "row",
        alignItems: "flex-end",
        paddingBottom: 10
    },
    collectButton: {
        width: ScreenWidth * 0.93 - ScreenWidth * 0.7,
        height: 35,
        marginRight: 10,
        backgroundColor: colors.disabled,
        zIndex: 1,
        borderRadius: 30,
        justifyContent: "center",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 5,
    },
    collectButtonLinear: {
        position: "absolute",
        width: "100%",
        height: "100%",
        borderRadius: 30,
    },
    collectButtonTxt: {
        textAlign: "center",
        color: colors.white,
        fontFamily: "RobotoMedium"
    }
});

export default dateRewardRankingItemStyleSheet;
import { ScreenHeight, ScreenWidth } from "@rneui/base";
import { StyleSheet } from "react-native";
import { colors } from "../../constants/colors";
import { statusBarHeight } from "../../constants/statusBarHeight";

const chineseChessHomeStyleSheet = StyleSheet.create({
    backgroundImage: {
        width: ScreenWidth,
        height: ScreenHeight,
    },
    menuContainer: {
        width: ScreenWidth / 1.2,
        height: (ScreenHeight - statusBarHeight) / 2,
        alignSelf: "center",
        marginTop: (ScreenHeight - statusBarHeight) / 3,
        overflow: "hidden",
        gap: 10,
        alignItems: "center"
    },
    menuItemContainer: {
        width: ScreenWidth / 1.7,
        height: 55,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.3,
        shadowRadius: 15,
        elevation: 5,
        alignItems: "center",
        justifyContent: "center"
    },
    menuItemContainerLinear: {
        position: "absolute",
        width: "100%",
        height: "100%",
        borderWidth: 5,
        borderRadius: ScreenWidth / 3,
        borderColor: colors.grey
    },
    menuItemTxt: {
        fontFamily: "RobotoMedium",
        fontSize: 20,
        color: "white"
    },
    menuOptionContainer: {
        width: ScreenWidth > 350 ? ScreenHeight / 22 + 20 : (ScreenHeight / 18 + 20),
        position: "absolute",
        top: 50,
        right: 10,
        backgroundColor: colors.chatBox,
        alignItems: "center",
        borderRadius: 10,
        paddingTop: 5,
        gap: 5,
        overflow: "hidden",
        zIndex: 2
    },
    menuOptionItemContainer: {
        alignItems: "center"
    },
    menuOptionItemIconContainer: {
        width: ScreenWidth > 350 ? ScreenHeight / 22 : ScreenHeight / 18,
        height: ScreenWidth > 350 ? ScreenHeight / 22 : ScreenHeight / 18,
        borderRadius: 30,
        justifyContent: "center",
        alignItems: "center",
        borderColor: colors.grey,
        borderWidth: 5,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 10,
    },
    menuOptionItemIconLinear: {
        position: "absolute",
        width: "100%",
        height: "100%",
        borderRadius: 30,
    },
    menuOptionItemTxt: {
        fontFamily: "Roboto",
        fontSize: 12,
        textAlign: "center",
    },
    menuOptionExpand: {
        width: ScreenHeight / 22 + 20,
        height: 20,
        position: "absolute",
        bottom: 0
    },
    menuOptionExpandLinear: {
        position: "absolute",
        width: "100%",
        height: "100%",
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
    },
    menuOptionExpandTxt: {
        fontFamily: "Roboto",
        fontSize: 12,
        textAlign: "center",
        color: colors.white,
        textAlignVertical: "center"
    },
    loadingBackgroundImage: {
        position: "absolute",
        bottom: 0,
        width: ScreenWidth,
        height: ScreenHeight,
        zIndex: 3
    },
    loadingContainer: {
        position: "absolute",
        alignSelf: "center",
        width: ScreenWidth,
        bottom: ScreenHeight / 5.8,
        alignItems: "center"
    },
    loadingBarContainer: {
        height: 20,
        borderRadius: 20,
        backgroundColor: colors.chatBox,
        borderWidth: 2
    },
    loadingBarTxt: {
        width: "80%",
        textAlign: "left",
        fontFamily: "RobotoMedium",
        fontSize: 15
    },
    loadingBarProgress: {
        backgroundColor: colors.gameColorItem2
    },
    backButton: {
        position: "absolute",
        top: 30,
        left: 30,
        width: 45,
        height: 35,
        backgroundColor: colors.grey,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 5
    }
});

export default chineseChessHomeStyleSheet;
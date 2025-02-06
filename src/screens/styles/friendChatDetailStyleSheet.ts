import { color, ScreenHeight, ScreenWidth } from "@rneui/base";
import { StyleSheet } from "react-native";
import { colors } from "../../constants/colors";
import { statusBarHeight } from "../../constants/statusBarHeight";

const friendChatDetailStyleSheet = StyleSheet.create({
    chatHeaderContainer: {
        flexDirection: "row",
        width: ScreenWidth,
        height: "8%",
        alignItems: "center",
        paddingHorizontal: 10,
        borderBottomWidth: 1,
        borderColor: colors.blurBlack
    },
    backButton: {
        marginRight: 10
    },
    userInfoContainer: {
        marginLeft: 10,
        overflow: "hidden"
    },
    username: {
        fontFamily: "Roboto",
    },
    lastseen: {
        fontFamily: "RobotoLight",
        fontSize: 12
    },
    menuButton: {
        position: "absolute",
        right: 10,
        bottom: 10
    },
    chatContainer: {
        width: ScreenWidth,
        height: "92%",
    },
    bottomContentContainer: {
        position: "absolute",
        width: ScreenWidth,
        height: 50,
        flexDirection: "row",
        alignItems: "flex-end",
        paddingHorizontal: 10,
        gap: 20,
    },
    touchableButton: {
        height: "100%",
        justifyContent: "center"
    },
    chatInputContainer: {
        flex: 1,
        borderRadius: 20,
        backgroundColor: colors.chatBox,
        overflow: "hidden",
        alignItems: "center",
        flexDirection: "row",
        padding: 10,
        marginBottom: 5
    },
    chatInput: {
        fontFamily: "RobotoLight",
        textAlign: "left",
        width: "85%",
        height: "100%",
    },
    stickerFunctionButton: {
        position: "absolute",
        right: 10,
        bottom: 10
    }
});

export default friendChatDetailStyleSheet;
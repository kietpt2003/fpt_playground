import { ScreenHeight, ScreenWidth } from "@rneui/base";
import { StyleSheet } from "react-native";
import { colors } from "../../constants/colors";

export const groupChatStyleSheet = StyleSheet.create({
    container: {
        width: "100%",
        height: "100%",
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
    slotContainer: {
        width: ScreenWidth / 1.2,
        height: ScreenHeight / 1.85,
        alignSelf: "center",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 35,
        borderWidth: 1,
    },
    slotContainerLinear: {
        position: "absolute",
        width: "100%",
        height: "100%",
        borderRadius: 35
    },
    subSlotContainer: {
        width: ScreenWidth / 1.2 - 30,
        height: ScreenHeight / 1.85 - 30,
        borderRadius: 30,
    },
    paginationContainer: {
        width: ScreenWidth / 1.2 - 30,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingTop: 30
    },
    paginationTxt: {
        fontSize: ScreenWidth > 350 ? 24 : 18,
        fontFamily: "RobotoBold"
    },
    headerRightNoti: {
        position: "absolute",
        top: 30,
        right: 10,
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
    headerRightIconLinear: {
        position: "absolute",
        width: "100%",
        height: "100%",
        borderRadius: 30,
    },
})

export default groupChatStyleSheet;

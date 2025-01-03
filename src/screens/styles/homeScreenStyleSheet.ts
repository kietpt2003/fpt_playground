import { ScreenHeight, ScreenWidth } from "@rneui/base";
import { StyleSheet } from "react-native";
import { colors } from "../../constants/colors";

const homeScreenStyleSheet = StyleSheet.create({
    containerLinear: {
        position: "absolute",
        width: "100%",
        height: "100%",
    },
    backgroundImage: {
        width: ScreenWidth,
        height: ScreenHeight / 3.5,
    },
    headerRightContainer: {
        position: "absolute",
        top: 50,
        right: 0,
        paddingRight: 10,
        flexDirection: "row",
        gap: 10
    },
    headerRightNoti: {
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
    headerRightMenu: {
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
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: "space-between",
        paddingVertical: 6, // Giảm padding dọc
        backgroundColor: colors.milkyWhite,
        height: ScreenHeight / 8
    },
    menuItemTxt: {
        fontSize: 16,
        flex: 0.9,
        textAlign: 'left',
        flexWrap: "nowrap", // Ngăn xuống dòng
        overflow: "hidden", // Ngăn tràn nội dung
    },
    coinContainer: {
        borderWidth: 1.1,
        borderColor: "black",
        borderRadius: 30,
        width: ScreenHeight / 50,
        height: ScreenHeight / 50
    },
    coinTxt: {
        fontWeight: "500",
        fontSize: 12,
    },
    functionContainer: {
        padding: 15,
        gap: 10
    },
    functionTitle: {
        fontSize: 19,
        fontWeight: "bold"
    },
    functionContainerGroup: {
        height: ScreenHeight / 5.5,
        flexDirection: "row",
        justifyContent: "space-between",
        gap: 15,
    },
    advertiseContainer: {
        width: ScreenWidth / 2 - 25
    },
    scrollIndicatorContainer: {
        flexDirection: "row",
        position: "absolute",
        bottom: 10,
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
    },
    scrollIndicatorView: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: "#ffffff",
        marginHorizontal: 5,
    },
    functionContentContainer: {
        width: ScreenWidth / 2 - 25,
    },
    featureContainer: {
        padding: 15,
        gap: 10
    },
    featureHeaderContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    featureTilte: {
        fontSize: 19,
        fontWeight: "bold",
    },
    featureButton: {
        flexDirection: "row",
        gap: 5,
    },
    featureImage: {
        width: ScreenWidth - 30,
        height: ScreenHeight / 4.5,
        resizeMode: "stretch",
        borderRadius: 25
    }
});

export default homeScreenStyleSheet;
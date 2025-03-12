import { ScreenHeight, ScreenWidth } from "@rneui/base";
import { StyleSheet } from "react-native";
import { colors } from "../../constants/colors";
import { statusBarHeight } from "../../constants/statusBarHeight";

const friendsScreenStyleSheet = StyleSheet.create({
    container: {
        flex: 1,
    },
    bgContainer: {
        backgroundColor: colors.milkyWhite
    },
    headerContainer: {
        width: ScreenWidth,
        height: "20%",
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
        borderBottomLeftRadius: 20 + 10,
        borderBottomRightRadius: 30
    },
    imageContainer: {
        width: ScreenWidth / 9,
        height: ScreenWidth / 9,
        borderRadius: 30,
        marginLeft: 20,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 30
    },
    userImage: {
        width: ScreenWidth / 9,
        height: ScreenWidth / 9,
        borderRadius: 30,
    },
    notiDot: {
        width: 12,
        height: 12,
        backgroundColor: colors.disapprove,
        position: "absolute",
        top: 2,
        right: -2,
        borderRadius: 10
    },
    headerTitle: {
        fontSize: 20,
        fontFamily: "RobotoSemiBold",
        marginTop: 30
    },
    searhContainer: {
        width: ScreenWidth - 40,
        height: 40,
        position: "absolute",
        bottom: 10,
        left: 20,
        flexDirection: "row",
        alignItems: "center",
    },
    searhContainerLinear: {
        position: "absolute",
        width: "100%",
        height: "100%",
        borderRadius: 20
    },
    searchIcon: {
        marginHorizontal: 10
    },
    searchInput: {
        width: ScreenWidth - 40 - 20 - 22 - 10,
        fontFamily: "Roboto",
        fontSize: 16,
        overflow: "hidden",
        color: colors.black
    },
    flatListContainer: {
        width: ScreenWidth,
        height: "80%",
    },
    loadingContent: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    lottieAnimation: {
        width: ScreenWidth,
        height: ScreenWidth / 1.5,
    },
    loadingText: {
        fontSize: 18,
        width: ScreenWidth / 1.5,
        textAlign: "center",
    },
});

export default friendsScreenStyleSheet;
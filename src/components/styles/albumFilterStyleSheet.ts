import { color, ScreenHeight, ScreenWidth } from "@rneui/base";
import { StyleSheet } from "react-native";
import { colors } from "../../constants/colors";
import { statusBarHeight } from "../../constants/statusBarHeight";

const albumFilterStyleSheet = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        paddingHorizontal: 10,
        marginTop: 60
    },
    handleContainer: {
        alignItems: 'center',
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
    },
    contentContainer: {
        flex: 1,
        paddingHorizontal: 15,
        paddingTop: 5,
        paddingBottom: 15
    },
    selectedAlbumContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 10
    },
    noImage: {
        textAlign: "center",
        fontFamily: "RobotoMedium",
        fontSize: 18,
        color: colors.milkyWhite
    },
    itemContentContainer: {
        flexDirection: "row",
        gap: 10,
        marginBottom: 10
    },
    albumTitlteTxt: {
        fontSize: 15,
        fontFamily: "RobotoMedium",
        color: colors.milkyWhite
    },
    assetCountTxt: {
        fontFamily: "RobotoLight",
        color: colors.grey
    },
    albumFirstImage: {
        width: (ScreenWidth - 20) / 7,
        height: (ScreenWidth - 20) / 7,
    }
});

export default albumFilterStyleSheet;
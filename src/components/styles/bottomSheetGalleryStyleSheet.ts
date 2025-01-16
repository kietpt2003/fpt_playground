import { color, ScreenHeight, ScreenWidth } from "@rneui/base";
import { StyleSheet } from "react-native";
import { colors } from "../../constants/colors";
import { statusBarHeight } from "../../constants/statusBarHeight";

const bottomSheetGalleryStyleSheet = StyleSheet.create({
    handleContainer: {
        alignItems: 'center',
        paddingVertical: 10, // Tăng chiều cao của panning area
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        height: 60,
    },
    handleBar: {
        width: 40,
        height: 6,
        borderRadius: 3,
        backgroundColor: colors.milkyWhite,
        marginBottom: 8, // Thêm khoảng cách giữa thanh kéo và chữ
    },
    handleText: {
        fontSize: 16,
        color: colors.milkyWhite,
        fontFamily: "RobotoMedium"
    },
    contentContainer: {
        flex: 1,
        padding: 5,
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
    row: {
        justifyContent: 'space-between',
    },
    image: {
        width: (ScreenWidth - 20) / 3,
        height: (ScreenWidth - 20) / 3,
        borderRadius: 8,
        marginBottom: 5,
    },
});

export default bottomSheetGalleryStyleSheet;
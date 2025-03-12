import { ScreenHeight, ScreenWidth } from "@rneui/base";
import { StyleSheet } from "react-native";
import { colors } from "../../constants/colors";

const languageStyleSheet = StyleSheet.create({
    container: {
        justifyContent: 'flex-end',
        margin: 0,
    },
    header: {
        width: ScreenWidth / 7,
        height: ScreenHeight / 80,
        borderRadius: 30,
        alignSelf: "center",
        margin: 12
    },
    modalContent: {
        backgroundColor: colors.milkyWhite,
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
    },
    modalOption: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 16,
        paddingVertical: 12,
    },
    modalOptionText: {
        fontSize: 16,
        fontFamily: "Roboto"
    },
});

export default languageStyleSheet;
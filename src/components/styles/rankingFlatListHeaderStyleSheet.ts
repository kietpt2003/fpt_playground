import { ScreenHeight, ScreenWidth } from "@rneui/base";
import { StyleSheet } from "react-native";
import { colors } from "../../constants/colors";

export const rankingFlatListHeaderStyleSheet = StyleSheet.create({
    container: {
        flexDirection: "row",
        width: ScreenWidth - 20,
        alignSelf: "center",
        backgroundColor: colors.icyWhite,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        paddingVertical: 8
    },
    rankingIndex: {
        width: (ScreenWidth - 20) / 6,
        textAlign: "center",
        color: colors.grey,
        fontSize: 15,
        fontFamily: "RobotoMedium"
    },
    rankingUser: {
        flex: 1,
        paddingLeft: ScreenHeight / 20 + 10,
        color: colors.grey,
        fontSize: 15,
        fontFamily: "RobotoMedium"
    },
    rankingDiamond: {
        width: (ScreenWidth - 20) / 3,
        textAlign: "center",
        color: colors.grey,
        fontSize: 15,
        fontFamily: "RobotoMedium"
    }
})

export default rankingFlatListHeaderStyleSheet;

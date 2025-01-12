import { ScreenHeight, ScreenWidth } from "@rneui/base";
import { StyleSheet } from "react-native";
import { colors } from "../../constants/colors";

const rewardRankingItemStyleSheet = StyleSheet.create({
    container: {
        width: ScreenHeight * 0.05,
        height: ScreenHeight * 0.05,
        marginRight: 10,
        borderColor: colors.diamond2,
        borderWidth: 1,
        borderRadius: 5,
        overflow: "hidden",
    },
    svgBackground: {
        width: ScreenHeight * 0.05,
        height: ScreenHeight * 0.05,
        position: "absolute",
        borderRadius: 5,
    },
    diamondImage: {
        width: ScreenHeight * 0.03,
        height: ScreenHeight * 0.03,
        borderRadius: 6,
        position: "absolute",
        top: "50%", // Đẩy xuống 50% chiều cao của parent
        left: "50%", // Đẩy qua phải 50% chiều rộng của parent
        transform: [{ translateX: -(ScreenHeight * 0.03) / 2 }, { translateY: -(ScreenHeight * 0.03) / 2 }]
    },
    valueTxt: {
        position: "absolute",
        right: 5,
        bottom: 0,
        textAlign: "right",
        color: colors.milkyWhite,
        fontSize: 13,
        fontFamily: "RobotoMedium"
    },
    blurBg: {
        width: ScreenHeight * 0.05,
        height: ScreenHeight * 0.05,
        borderRadius: 5,
        position: "absolute",
        backgroundColor: colors.blurBlack,
        top: -1,
        left: -1
    }
});

export default rewardRankingItemStyleSheet;
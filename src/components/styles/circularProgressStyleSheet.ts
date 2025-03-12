import { StyleSheet } from "react-native";
import { colors } from "../../constants/colors";

const circularProgressStyleSheet = StyleSheet.create({
    container: {
        justifyContent: "center",
        alignItems: "center",
    },
    levelTxt: {
        position: "absolute",
        fontSize: 12,
        color: colors.white,
        fontFamily: "RobotoMedium"
    },
});

export default circularProgressStyleSheet;

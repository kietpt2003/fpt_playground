import { ScreenHeight } from "@rneui/base";
import { StyleSheet } from "react-native";
import { colors } from "../../constants/colors";

const introStyleSheet = StyleSheet.create({
    introContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.black
    },
    introVideo: {
        width: '100%',
        height: '100%',
    },
    skipBtnContainer: {
        position: "absolute",
        top: 30,
        right: 20,
        width: ScreenHeight / 22,
        height: ScreenHeight / 22,
        borderRadius: 30,
        justifyContent: "center",
        alignItems: "center",
        borderColor: colors.milkyWhite,
        borderWidth: 2.5,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 10,
    },
    skipLinear: {
        position: "absolute",
        width: "100%",
        height: "100%",
        borderRadius: 30,
    }
});

export default introStyleSheet;

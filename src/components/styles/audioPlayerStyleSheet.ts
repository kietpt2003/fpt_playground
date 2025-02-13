import { ScreenHeight, ScreenWidth } from "@rneui/base";
import { StyleSheet } from "react-native";
import { colors } from "../../constants/colors";

const audioPlayerStyleSheet = StyleSheet.create({
    container: {
        position: "absolute",
        top: 30,
        left: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '40%',
        alignItems: 'center',
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 10,
        backgroundColor: colors.milkyWhite,
        borderRadius: 30,
    },
    iconContainer: {
        justifyContent: "center",
        alignItems: "center",
        width: ScreenHeight / 22,
        height: ScreenHeight / 22,
        borderRadius: 30,
        borderColor: colors.white,
        borderWidth: 2.8,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 10,
    },
    icon: {
        position: "absolute",
        width: "100%",
        height: "100%",
        borderRadius: 30,
    },
    songContainer: {
        flex: 1,
        overflow: 'hidden', // Ẩn nội dung tràn ra ngoài
        marginHorizontal: 5,
    },
    songTitle: {
        color: "black",
        width: ScreenWidth,
        fontFamily: "Roboto",
        fontSize: ScreenWidth > 350 ? 16 : 14
    },
});

export default audioPlayerStyleSheet;
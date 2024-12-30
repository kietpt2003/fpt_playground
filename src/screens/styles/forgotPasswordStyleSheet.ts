import { ScreenHeight, ScreenWidth } from "@rneui/base";
import { StyleSheet } from "react-native";
import { colors } from "../../constants/colors";

const forgotPasswordStyleSheet = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover', // Đảm bảo hình nền che toàn bộ màn hình
        justifyContent: 'center'
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: colors.grey, // Lớp overlay để làm mờ hình nền
    },
    formContainer: {
        width: ScreenWidth / 1.1,
        height: ScreenHeight / 2.5,
        alignSelf: "center",
        backgroundColor: colors.milkyWhite,
        paddingHorizontal: 30,
        paddingVertical: 20,
        borderColor: "rgba(0, 0, 0, 0.3)",
        borderWidth: 0.5,
        borderRadius: 10 + 10,
        shadowColor: '#000', // Màu của bóng
        shadowOffset: { width: 0, height: 2 }, // Độ lệch bóng
        shadowOpacity: 0.25, // Độ mờ của bóng (0-1)
        shadowRadius: 3.84, // Bán kính mờ của bóng
        elevation: 5,
        marginTop: ScreenHeight / 30,
        gap: 20
    },
    header: {
        position: 'absolute',
        top: 50,
        right: 20,
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
    settingIcon: {
        position: "absolute",
        width: "100%",
        height: "100%",
        borderRadius: 30,
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
    formTitlte: {
        alignSelf: "center",
        fontWeight: "bold",
    },
    formGuide: {
        fontSize: 16,
    },
    mailInput: {
        backgroundColor: "white",
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 10,
        fontSize: 17,
        borderColor: "rgba(0, 0, 0, 0.3)",
        borderWidth: 0.5,
    },
    requestCodeBtnContainer: {
        width: '100%',
        alignItems: "center",
        paddingVertical: 13,
        borderRadius: 10,
        flexDirection: "row",
        justifyContent: "center",
        gap: 5
    },
    requestCodeBtnLinear: {
        position: "absolute",
        width: "100%",
        height: 50,
        backgroundColor: '#4CAF50',
        borderRadius: 8,
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "center",
        gap: 5
    },
    requestCodeTxt: {
        fontWeight: "bold",
        letterSpacing: 1,
        fontSize: 18,
        color: colors.white
    },
    backBtnContainer: {
        marginTop: -10
    },
    backBtnTxt: {
        alignSelf: "center",
        fontSize: 15,
        fontWeight: 500,
        letterSpacing: 1,
    },
    versionControl: {
        position: "absolute",
        bottom: 10,
        right: 10,
        color: colors.white
    }
});

export default forgotPasswordStyleSheet;
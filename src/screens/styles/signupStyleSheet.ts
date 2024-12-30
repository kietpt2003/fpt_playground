import { ScreenHeight } from "@rneui/base";
import { StyleSheet } from "react-native";
import { colors } from "../../constants/colors";

const signupStyleSheet = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover', // Đảm bảo hình nền che toàn bộ màn hình
        justifyContent: 'center',
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: colors.grey, // Lớp overlay để làm mờ hình nền
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
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        color: colors.white,
        marginBottom: 40,
    },
    input: {
        width: '100%',
        height: 50,
        backgroundColor: colors.white,
        borderRadius: 8,
        paddingHorizontal: 15,
        fontSize: 16,
        marginBottom: 20,
        borderWidth: 1,
        borderColor: "rgba(0,0,0.5)"
    },
    button: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    signinBtnLinear: {
        position: "absolute",
        width: "100%",
        height: "100%",
        borderRadius: 8,
    },
    buttonText: {
        fontSize: 18,
        color: colors.white,
        fontWeight: 'bold',
    },
    signinForgotPassBtn: {
        width: '50%',
        padding: 5
    },
    forgotPasswordTxt: {
        alignSelf: "flex-end",
        fontSize: 12,
        opacity: 0.9,
        letterSpacing: 1,
        fontWeight: "bold",
        color: colors.white
    },
    versionControl: {
        position: "absolute",
        bottom: 10,
        right: 10,
        color: colors.white
    },
    signinTxt: {
        alignSelf: "flex-start",
        fontSize: 12,
        opacity: 0.9,
        letterSpacing: 1,
        fontWeight: "bold",
        color: colors.white
    },
    signinForgotPassContainer: {
        flexDirection: "row",
        width: '100%',
    }
});

export default signupStyleSheet;
import { ScreenHeight, ScreenWidth } from "@rneui/base";
import { StyleSheet } from "react-native";
import { colors } from "../../constants/colors";

const signinStyleSheet = StyleSheet.create({
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
        fontFamily: "Roboto"
    },
    title: {
        fontSize: ScreenWidth > 350 ? 32 : 30,
        color: colors.white,
        marginBottom: 40,
        fontFamily: "RobotoMedium"
    },
    input: {
        width: '100%',
        height: 50,
        backgroundColor: colors.white,
        borderRadius: 8,
        paddingHorizontal: 15,
        fontSize: ScreenWidth > 350 ? 16 : 14,
        marginBottom: 20,
        borderWidth: 1,
        borderColor: "rgba(0,0,0.5)",
        fontFamily: "RobotoLight"
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
        fontSize: ScreenWidth > 350 ? 18 : 16,
        color: colors.white,
        fontFamily: "RobotoMedium"
    },
    signupForgotPassBtn: {
        width: '50%',
        padding: 5
    },
    forgotPasswordTxt: {
        alignSelf: "flex-end",
        fontSize: ScreenWidth > 350 ? 14 : 13,
        opacity: 0.9,
        letterSpacing: 1,
        color: colors.white,
        fontFamily: "RobotoMedium"
    },
    versionControl: {
        position: "absolute",
        bottom: 10,
        right: 10,
        color: colors.white,
        fontFamily: "Roboto"
    },
    signupTxt: {
        alignSelf: "flex-start",
        fontSize: ScreenWidth > 350 ? 14 : 13,
        opacity: 0.9,
        letterSpacing: 1,
        color: colors.white,
        fontFamily: "RobotoMedium"
    },
    signupForgotPassContainer: {
        flexDirection: "row",
        width: '100%',
    }
});

export default signinStyleSheet;

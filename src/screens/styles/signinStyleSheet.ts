import { ScreenHeight, ScreenWidth } from "@rneui/base";
import { StyleSheet } from "react-native";
import { colors } from "../../constants/colors";

const signinStyleSheet = StyleSheet.create({
    backgroundImage: {
        width: "100%",
        height: "100%",
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
        top: 30,
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
        // borderColor: "rgba(0,0,0.5)",
        fontFamily: "RobotoLight"
    },
    errorInput: {
        color: colors.darkRed,
        fontFamily: "RobotoMedium",
        height: 20,
        width: '100%',
        paddingHorizontal: 15,
    },
    passwordInputContainer: {
        width: '100%',
        height: 50,
        marginBottom: 20,
    },
    showHideButton: {
        position: "absolute",
        right: 15,
        height: 50,
        justifyContent: "center"
    },
    button: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
        gap: 10,
        flexDirection: "row"
    },
    serverButton: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
        flexDirection: "row",
        gap: 10,
        borderRadius: 8,
        borderWidth: 2,
    },
    serverButtonLinear: {
        position: "absolute",
        width: "100%",
        height: "100%",
        borderRadius: 8,
        borderColor: colors.black,
        borderWidth: 1,
        opacity: 0.85
    },
    serverStatus: {
        width: 15,
        height: 15,
        borderRadius: 30
    },
    signinBtnLinear: {
        position: "absolute",
        width: "100%",
        height: "100%",
        borderRadius: 8,
        borderColor: colors.milkyWhite,
        borderWidth: 2,
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
    },
    loggedInButtonContainer: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
    },
    loggedInText: {
        width: '70%',
        fontFamily: "RobotoMedium",
        fontSize: ScreenWidth > 350 ? 18 : 16,
        paddingLeft: 15,
        textAlign: "left",
        color: colors.white
    },
    loadingContainer: {
        position: "absolute",
        width: "100%",
        height: "100%",
        backgroundColor: colors.blurBlack,
        alignItems: "center",
        justifyContent: "center"
    }
});

export default signinStyleSheet;

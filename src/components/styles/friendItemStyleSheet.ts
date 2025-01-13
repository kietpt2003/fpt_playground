import { ScreenHeight, ScreenWidth } from "@rneui/base";
import { StyleSheet } from "react-native";
import { colors } from "../../constants/colors";

const friendItemStyleSheet = StyleSheet.create({
    container: {
        flexDirection: "row",
        marginBottom: 20,
        gap: 10
    },
    username: {
        width: ScreenWidth - 55 - 40,
        fontSize: 15,
        fontFamily: "Roboto",
    },
    contentContainer: {
        width: ScreenWidth - 55 - 40,
        height: 20,
        flexDirection: "row",
        gap: 5
    },
    contentTxt: {
        opacity: .7,
        fontSize: 13,
        flexShrink: 1, // Cho phép thu nhỏ nếu nội dung vượt quá giới hạn
        marginRight: 5, // Tạo khoảng cách giữa content và createdAt,
    },
    dateTxt: {
        opacity: .7,
        fontFamily: "RobotoLight",
        color: colors.grey,
        fontSize: 13,
        textAlignVertical: "center",
        flexShrink: 0 // Không cho phép thu nhỏ createdAt
    }
});

export default friendItemStyleSheet;
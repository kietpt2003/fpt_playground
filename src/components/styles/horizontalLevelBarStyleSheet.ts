import { ScreenHeight } from "@rneui/base";
import { StyleSheet } from "react-native";
import { colors } from "../../constants/colors";

const horizontalLevelBarStyleSheet = StyleSheet.create({
    container: {
        justifyContent: "center",
        marginTop: 3
    },
    loadingBackground: {
        width: ScreenHeight / 8, // Chiều rộng tổng thể thanh loading
        height: 8, // Chiều cao tổng thể
        backgroundColor: colors.lightBlue, // Màu nền
        borderRadius: 10, // Bo góc tổng thể
        overflow: "hidden", // Ẩn phần dư thừa
    },
    loadingBar: {
        height: "100%",
        backgroundColor: colors.white, // Màu thanh loading
        borderRadius: 10, // Bo góc thanh loading
    },
});

export default horizontalLevelBarStyleSheet;

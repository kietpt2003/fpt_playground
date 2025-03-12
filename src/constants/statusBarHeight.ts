import { Platform, StatusBar } from "react-native";

export const statusBarHeight = (Platform.OS == "android" && StatusBar.currentHeight) ? StatusBar.currentHeight : 0;

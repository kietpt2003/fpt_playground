import AsyncStorage from "@react-native-async-storage/async-storage";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { Dispatch, UnknownAction } from "@reduxjs/toolkit";
import { logout } from "../store/reducers/authReducer";
import { RootStackParamList } from "../navigation/types/types";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export async function handleLogout(dispatch: Dispatch<UnknownAction>, navigation: NativeStackNavigationProp<RootStackParamList, any> | null = null) {
    await AsyncStorage.multiRemove(["token", "refreshToken"], () => {
        dispatch(logout());
    });
    await GoogleSignin.signOut();
    if (navigation) {
        navigation.replace("Signin");
    }
}
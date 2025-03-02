import AsyncStorage from "@react-native-async-storage/async-storage";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { Dispatch, UnknownAction } from "@reduxjs/toolkit";
import { logout } from "../store/reducers/authReducer";

export async function handleLogout(dispatch: Dispatch<UnknownAction>) {
    await AsyncStorage.multiRemove(["token", "refreshToken"], () => {
        dispatch(logout());
    });
    await GoogleSignin.signOut();
}
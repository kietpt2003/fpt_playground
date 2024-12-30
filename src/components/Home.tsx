import { View, Text, Button } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { login, logout } from '../store/reducers/authReducer';

export default function Home() {
    const dispatch = useDispatch();
    const user = useSelector((state: RootState) => state.auth.user); // Lấy user từ store
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Text>Welcome, {user ? user.name : 'Guest'}</Text>
            <Button
                title="Login"
                onPress={() => dispatch(login({
                    name: "Kiet",
                    age: 10
                }))} // Dispatch logout khi bấm nút
            />
            <Button
                title="Logout"
                onPress={() => dispatch(logout())} // Dispatch logout khi bấm nút
            />
        </SafeAreaView>
    )
}
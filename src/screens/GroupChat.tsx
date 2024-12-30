import { View, Text, ImageBackground } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { colors } from '../constants/colors';
import { LinearGradient } from 'expo-linear-gradient';
import groupChatStyleSheet from './styles/groupChatStyleSheet';
import { FontAwesome } from '@expo/vector-icons';
import SlotList from '../components/SlotList';
import { ScreenWidth } from '@rneui/base';

export default function GroupChat() {
    const theme = useSelector((state: RootState) => state.theme.theme);

    return (
        <View
            style={groupChatStyleSheet.container}
        >
            <LinearGradient
                colors={theme === "dark" ? [colors.darkBlue, colors.lightBlue] : [colors.milkyWhite, colors.icyWhite]} // Hiệu ứng chuyển màu
                style={groupChatStyleSheet.containerLinear}
            />
            <View style={groupChatStyleSheet.slotContainer}>
                <LinearGradient
                    colors={[colors.icyWhite, colors.white]} // Hiệu ứng chuyển màu
                    style={groupChatStyleSheet.slotContainerLinear}
                />
                <View style={{
                    width: ScreenWidth / 1.2 - 30,
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    paddingTop: 30
                }}>
                    <FontAwesome
                        name="chevron-left"
                        size={30}
                        color={colors.darkBlue}
                    />
                    <Text style={{
                        fontSize: 18
                    }}>Trang 1</Text>

                    <FontAwesome
                        name="chevron-right"
                        size={30}
                        color={colors.darkBlue}
                    />
                </View>
                <View style={groupChatStyleSheet.subSlotContainer}>
                    <SlotList />
                </View>
            </View>
        </View>
    )
}
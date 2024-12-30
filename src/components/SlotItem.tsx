import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { FontAwesome } from '@expo/vector-icons';
import { colors } from '../constants/colors';
import { ScreenHeight, ScreenWidth } from '@rneui/base';

export default function SlotItem() {
    return (
        <TouchableOpacity style={{
            width: ScreenHeight / 11,
            height: ScreenHeight / 8,
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 25,
            gap: 10,
            backgroundColor: "green"
        }}>
            <FontAwesome
                name="plus"
                size={30}
                color={colors.darkBlue}
            />
            <Text>Trống</Text>
        </TouchableOpacity>
    )
}
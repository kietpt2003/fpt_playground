import { View, Text, ViewStyle, TextStyle } from 'react-native';
import React from 'react';
import coinStyleSheet from './styles/coinStyleSheet';
import { ScreenHeight } from '@rneui/base';

interface PTKCoinProps {
    style?: ViewStyle; // Style bổ sung cho View
    textStyle?: TextStyle; // Style bổ sung cho Text
}

export default function PTKCoin({ style, textStyle }: PTKCoinProps) {
    return (
        <View
            style={[
                coinStyleSheet.container,
                style, // Style tùy chỉnh từ props
            ]}
        >
            <Text style={textStyle}>
                K
            </Text>
        </View>
    );
}

import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { GroupChatFilterItemProps } from './types/groupChatFilterItemTypes';
import groupChatFilterItemStyleSheet from './styles/groupChatFilterItemStyleSheet';

export default function GroupChatFilterItem({ onPress, viewStyle, textColor, item }: GroupChatFilterItemProps) {
    return (
        <TouchableOpacity
            onPress={onPress}
            touchSoundDisabled={true}
        >
            <View
                style={[
                    groupChatFilterItemStyleSheet.viewContainer,
                    viewStyle,
                ]}
            >
                <Text style={[
                    groupChatFilterItemStyleSheet.txt,
                    {
                        color: textColor,
                    }
                ]}>
                    {item}
                </Text>
            </View>
        </TouchableOpacity>
    )
}
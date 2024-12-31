import { Image, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { FontAwesome } from '@expo/vector-icons';
import { colors } from '../constants/colors';
import slotItemStyleSheet from './styles/slotItemStyleSheet';
import { SlotItemProps } from './types/slotItemTypes';

export default function SlotItem({ item }: SlotItemProps) {
    return (
        <TouchableOpacity style={slotItemStyleSheet.container}>
            {
                item.id ?
                    <>
                        <Image
                            source={{
                                uri: item.imageUrl
                            }}
                            style={slotItemStyleSheet.image}
                        />
                        <Text>
                            {item.groupName}
                        </Text>
                    </>
                    :
                    <FontAwesome
                        name="plus"
                        size={30}
                        color={colors.darkBlue}
                    />
            }
        </TouchableOpacity>
    )
}
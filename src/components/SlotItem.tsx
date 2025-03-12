import { Image, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { FontAwesome } from '@expo/vector-icons';
import { colors } from '../constants/colors';
import slotItemStyleSheet from './styles/slotItemStyleSheet';
import { SlotItemProps } from './types/slotItemTypes';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';

export default function SlotItem({ item }: SlotItemProps) {
    const theme = useSelector((state: RootState) => state.theme.theme);

    return (
        <TouchableOpacity
            style={slotItemStyleSheet.container}
            touchSoundDisabled={true}
        >
            {
                item.id ?
                    <>
                        <Image
                            source={{
                                uri: item.imageUrl
                            }}
                            style={slotItemStyleSheet.image}
                        />
                        <Text style={slotItemStyleSheet.groupName}>
                            {item.groupName}
                        </Text>
                    </>
                    :
                    <>
                        <View style={slotItemStyleSheet.plusIcon}>
                            <FontAwesome
                                name="plus"
                                size={30}
                                color={theme === "dark" ? colors.darkBlue : colors.darkOrange}
                            />
                        </View>
                        <Text style={slotItemStyleSheet.emptyTxt}>Trống</Text>
                    </>
            }
        </TouchableOpacity>
    )
}
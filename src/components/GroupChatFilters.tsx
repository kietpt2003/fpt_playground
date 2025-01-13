import { View, Text, FlatList, TouchableOpacity } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { colors } from '../constants/colors';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { GroupChatFilterProps } from './types/groupChatFilterTypes';
import groupChatFiltersStyleSheet from './styles/groupChatFiltersStyleSheet';
import GroupChatFilterItem from './GroupChatFilterItem';

const _spacing = 10;

export default function GroupChatFilters({ firstFilter }: GroupChatFilterProps) {
    const theme = useSelector((state: RootState) => state.theme.theme);

    const [index, setIndex] = useState<number>(0);

    const ref = useRef<FlatList>(null);

    const data = firstFilter == 0 ? [
        "Hội học tập",
        "Hội hóng hớt",
        "Hội giao lưu",
        "Hội kiếm ny",
    ] : firstFilter == 1 ? [
        "Hội hóng hớt",
        "Hội học tập",
        "Hội giao lưu",
        "Hội kiếm ny",
    ] : firstFilter == 2 ? [
        "Hội giao lưu",
        "Hội học tập",
        "Hội hóng hớt",
        "Hội kiếm ny",
    ] : [
        "Hội kiếm ny",
        "Hội học tập",
        "Hội hóng hớt",
        "Hội giao lưu",
    ]

    useEffect(() => {
        ref.current?.scrollToIndex({
            index,
            animated: true,
            viewOffset: _spacing,
            viewPosition: 0
        })
    }, [index])

    return (
        <FlatList<string>
            ref={ref}
            initialScrollIndex={index}
            style={groupChatFiltersStyleSheet.flatListStyle}
            data={data}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            horizontal={true}
            renderItem={({ item, index: fIndex }) => (
                <GroupChatFilterItem
                    item={item}
                    textColor={fIndex === index ? colors.white :
                        theme === "light" ? colors.darkOrange : colors.darkBlue}
                    viewStyle={
                        {
                            marginRight: _spacing,
                            padding: _spacing,
                            borderColor: theme === "dark" ? colors.darkBlue : colors.darkOrange,
                            backgroundColor: (theme === "dark" && fIndex === index) ? colors.darkBlue :
                                (theme === "light" && fIndex === index) ? colors.darkOrange : colors.icyWhite,
                            opacity: fIndex === index ? 1 : 0.6
                        }
                    }
                    onPress={() => {
                        setIndex(fIndex);
                    }}
                />
            )}
            keyExtractor={(item, index) => index.toString()}
            contentContainerStyle={[
                groupChatFiltersStyleSheet.flatListContentContainerStyle,
                {
                    paddingLeft: _spacing,
                    marginTop: _spacing,
                }
            ]}
            onScrollToIndexFailed={(info) => {
                // Cuộn đến mục gần nhất
                ref.current?.scrollToIndex({
                    index: info.highestMeasuredFrameIndex,
                    animated: true,
                    viewOffset: _spacing,
                    viewPosition: 0
                });
            }}
        />
    )
}

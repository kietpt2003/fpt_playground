import { View, Text, FlatList, TouchableOpacity } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { colors } from '../constants/colors';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { GroupChatFilterProps } from './types/groupChatFilterTypes';

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
        <FlatList
            ref={ref}
            initialScrollIndex={index}
            style={{ flexGrow: 0 }}
            data={data}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            horizontal={true}
            renderItem={({ item, index: fIndex }) => (
                <TouchableOpacity
                    onPress={() => {
                        setIndex(fIndex);
                    }}
                    touchSoundDisabled={true}
                >
                    <View
                        style={{
                            marginRight: _spacing,
                            padding: _spacing,
                            borderWidth: 2,
                            borderColor: theme === "dark" ? colors.darkBlue : colors.darkOrange,
                            borderRadius: 12,
                            backgroundColor: (theme === "dark" && fIndex === index) ? colors.darkBlue :
                                (theme === "light" && fIndex === index) ? colors.darkOrange : colors.icyWhite,
                            opacity: fIndex === index ? 1 : 0.6
                        }}
                    >
                        <Text style={{
                            color: fIndex === index ? colors.white :
                                theme === "light" ? colors.darkOrange : colors.darkBlue,
                            fontWeight: "700",
                            fontFamily: "Roboto"
                        }}>
                            {item}
                        </Text>
                    </View>
                </TouchableOpacity>
            )}
            keyExtractor={(item, index) => index.toString()}
            contentContainerStyle={{
                paddingLeft: _spacing,
                marginTop: _spacing,
                marginBottom: 20
            }}
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
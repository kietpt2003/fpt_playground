import { View, Text, FlatList } from 'react-native'
import React from 'react'
import SlotItem from './SlotItem'
import { ScreenWidth } from '@rneui/base'

const slotItems = [
    "Test1",
    "Test2",
    "Test3",
    "Test4",
    "Test5",
    "Test6",
    "Test7",
    "Test8",
    "Test9",
]
export default function SlotList() {
    return (
        <FlatList
            data={slotItems}
            scrollEnabled={false}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
                <SlotItem
                />
            )}
            keyExtractor={(item, index) => index.toString()}
            numColumns={3} // Hiển thị 2 cột
            columnWrapperStyle={{
                justifyContent: "space-between", // Giãn đều giữa các cột
            }}
            contentContainerStyle={{
                flexGrow: 1,
                justifyContent: "space-evenly", // Giãn đều theo trục dọc
            }}
        />
    )
}
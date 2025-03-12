import { FlatList } from 'react-native'
import React from 'react'
import { SlotItemType, SlotListProps } from './types/slotItemTypes'
import SlotItem from './SlotItem';

export default function SlotList({ data }: SlotListProps) {
    return (
        <FlatList<SlotItemType>
            data={data}
            scrollEnabled={false}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
                <SlotItem item={item} />
            )}
            keyExtractor={(item, index) => index.toString()}
            numColumns={3} // Hiển thị 3 cột
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
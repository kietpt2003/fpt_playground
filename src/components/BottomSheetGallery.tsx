import React, { useCallback, useMemo, useRef } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { ScreenHeight } from '@rneui/base';
interface BottomSheetGalleryProps {
    isVisible: boolean;
    photos: { id: string; uri: string }[];
}

export default function BottomSheetGallery({
    isVisible,
    photos,
}: BottomSheetGalleryProps) {
    const bottomSheetRef = useRef<BottomSheet>(null);

    // Snap points (kích thước của Bottom Sheet)
    const snapPoints = useMemo(() => [ScreenHeight / 3], []);

    const handleSheetChanges = useCallback((index: number) => {
        console.log(index);
    }, []);

    if (!isVisible) return null;

    return (
        <BottomSheet
            ref={bottomSheetRef}
            snapPoints={snapPoints}
            onChange={handleSheetChanges}
        >
            <BottomSheetView style={styles.container}>
                <Text style={styles.title}>Photo Gallery</Text>
                <FlatList
                    data={photos}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <Image source={{ uri: item.uri }} style={styles.image} />
                    )}
                    numColumns={3}
                    columnWrapperStyle={styles.row}
                />
            </BottomSheetView>
        </BottomSheet>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 16,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    row: {
        justifyContent: 'space-between',
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 8,
        marginBottom: 16,
    },
});

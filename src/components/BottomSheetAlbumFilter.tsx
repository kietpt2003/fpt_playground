import React, { forwardRef, useCallback, useMemo } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import BottomSheet, { BottomSheetFlatList, BottomSheetView } from '@gorhom/bottom-sheet';
import { ScreenWidth } from '@rneui/base';
import { colors } from '../constants/colors';
import bottomSheetAlbumFilterStyleSheet from './styles/bottomSheetAlbumFilterStyleSheet';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { BottomSheetMethods } from '@gorhom/bottom-sheet/lib/typescript/types';
import usePhoto from '../hooks/usePhoto';
import { useTranslation } from 'react-i18next';
import { BottomSheetAlbumFilterProps } from './types/bottomSheetAlbumFilterTypes';

export const BottomSheetAlbumFilter = forwardRef<BottomSheetMethods, BottomSheetAlbumFilterProps>((
    {
        bottomSheetAlbumFilterHeight,
        setSelectedAlbum,
        handleCloseAlbumBottomSheetFilter,
        showAlbumsList,
        setShowAlbumsList,
    },
    ref
) => {
    const theme = useSelector((state: RootState) => state.theme.theme);
    const { t } = useTranslation();

    const {
        albums,
        photos,
        fullPhotos,
        totalImages
    } = usePhoto();

    // Snap points (kích thước của Bottom Sheet)
    const snapPoints = useMemo(() => [bottomSheetAlbumFilterHeight], []);

    const handleSheetChanges = useCallback((index: number) => {
        const newHeight = snapPoints[index]; // Update height based on snap point
    }, [snapPoints]);

    return (
        <BottomSheet
            ref={ref}
            index={-1}
            snapPoints={snapPoints}
            onChange={handleSheetChanges}
            maxDynamicContentSize={bottomSheetAlbumFilterHeight}
            enableContentPanningGesture={false} //Tắt scroll bottom từ content để scroll FlatList
            enableHandlePanningGesture={false}
            handleComponent={() => (
                <View style={[
                    bottomSheetAlbumFilterStyleSheet.handleContainer,
                    {
                        backgroundColor: theme === "dark" ? colors.lighterBlue : colors.lighterOrange
                    }
                ]} />
            )}
        >
            <BottomSheetView style={[
                bottomSheetAlbumFilterStyleSheet.contentContainer,
                {
                    backgroundColor: theme === "dark" ? colors.lighterBlue : colors.lighterOrange
                }
            ]}>
                {(albums.length === 0 || fullPhotos.length === 0 || totalImages === 0) ? (
                    <Text style={bottomSheetAlbumFilterStyleSheet.noImage}>{t("no-image")}</Text>
                ) : (
                    <View style={{
                        height: bottomSheetAlbumFilterHeight, // Adjust height dynamically
                        paddingBottom: 50
                    }}>
                        <BottomSheetFlatList
                            data={albums}
                            keyExtractor={(item) => item.id}
                            showsVerticalScrollIndicator={false}
                            renderItem={({ item }) => (
                                <TouchableOpacity
                                    style={bottomSheetAlbumFilterStyleSheet.itemContentContainer}
                                    onPress={() => {
                                        handleCloseAlbumBottomSheetFilter();
                                        setShowAlbumsList(!showAlbumsList);
                                        setSelectedAlbum(item);
                                    }}
                                >
                                    <Image source={{ uri: photos[item.id]?.length ? photos[item.id][0].uri : undefined }} style={bottomSheetAlbumFilterStyleSheet.albumFirstImage} />
                                    <View>
                                        <Text style={bottomSheetAlbumFilterStyleSheet.albumTitlteTxt}>{item.title}</Text>
                                        <Text style={bottomSheetAlbumFilterStyleSheet.assetCountTxt}>{item.assetCount}</Text>
                                    </View>
                                </TouchableOpacity>
                            )}
                            ListHeaderComponent={<TouchableOpacity
                                style={bottomSheetAlbumFilterStyleSheet.itemContentContainer}
                                onPress={() => {
                                    handleCloseAlbumBottomSheetFilter();
                                    setShowAlbumsList(!showAlbumsList);
                                    setSelectedAlbum(null);
                                }}
                            >
                                <Image source={{ uri: fullPhotos.at(0)?.uri }} style={bottomSheetAlbumFilterStyleSheet.albumFirstImage} />
                                <View>
                                    <Text style={bottomSheetAlbumFilterStyleSheet.albumTitlteTxt}>{t("all-images")}</Text>
                                    <Text style={bottomSheetAlbumFilterStyleSheet.assetCountTxt}>{totalImages}</Text>
                                </View>
                            </TouchableOpacity>}
                        />
                    </View>
                )}
            </BottomSheetView>
        </BottomSheet>
    );
})

const styles = StyleSheet.create({
    row: {
        justifyContent: 'space-between',
    },
    image: {
        width: (ScreenWidth - 20) / 3,
        height: (ScreenWidth - 20) / 3,
        borderRadius: 8,
        marginBottom: 5,
    },
});

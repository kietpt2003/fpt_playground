import React, { forwardRef, useCallback, useMemo, useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import BottomSheet, { BottomSheetFlatList, BottomSheetView } from '@gorhom/bottom-sheet';
import { ScreenHeight, ScreenWidth } from '@rneui/base';
import { colors } from '../constants/colors';
import bottomSheetGalleryStyleSheet from './styles/bottomSheetGalleryStyleSheet';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { BottomSheetGalleryProps } from './types/bottomSheetGaleryTypes';
import { BottomSheetMethods } from '@gorhom/bottom-sheet/lib/typescript/types';
import usePhoto from '../hooks/usePhoto';
import { useTranslation } from 'react-i18next';
import { AntDesign } from '@expo/vector-icons';

export const BottomSheetGallery = forwardRef<BottomSheetMethods, BottomSheetGalleryProps>((
    {
        selectedAlbum,
        handleOpenAlbumBottomSheetFilter,
        handleCloseAlbumBottomSheetFilter,
        bottomSheetHeight,
        setBottomSheetHeight,
        showAlbumsList,
        setShowAlbumsList,
    },
    ref
) => {
    const theme = useSelector((state: RootState) => state.theme.theme);
    const { t } = useTranslation();

    const {
        albums,
        fullPhotos,
        fullPhotoPagination,
        loadPhotosSortByCreationTime,
        totalImages
    } = usePhoto();

    // Snap points (kích thước của Bottom Sheet)
    const snapPoints = useMemo(() => [ScreenHeight / 3, ScreenHeight], []);

    const handleSheetChanges = useCallback((index: number) => {
        const newHeight = snapPoints[index]; // Update height based on snap point
        setBottomSheetHeight(newHeight);
    }, [snapPoints]);

    return (
        <BottomSheet
            ref={ref}
            index={-1}
            snapPoints={snapPoints}
            onChange={handleSheetChanges}
            maxDynamicContentSize={ScreenHeight}
            enableContentPanningGesture={false} //Tắt scroll bottom từ content để scroll FlatList
            handleComponent={() => (
                <View style={[
                    bottomSheetGalleryStyleSheet.handleContainer,
                    {
                        backgroundColor: theme === "dark" ? colors.lighterBlue : colors.lighterOrange
                    }
                ]}>
                    <View style={bottomSheetGalleryStyleSheet.handleBar} />
                    <TouchableOpacity
                        style={bottomSheetGalleryStyleSheet.selectedAlbumContainer}
                        onPress={() => {
                            if (!showAlbumsList) {
                                handleOpenAlbumBottomSheetFilter();
                            } else {
                                handleCloseAlbumBottomSheetFilter();
                            }
                            setShowAlbumsList(!showAlbumsList)
                        }}
                        disabled={albums.length === 0 || fullPhotos.length === 0 || totalImages == 0}
                    >
                        <Text style={bottomSheetGalleryStyleSheet.handleText}>{selectedAlbum == null ? t("all-images") : selectedAlbum.title}</Text>
                        <AntDesign name={!showAlbumsList ? "down" : "up"} size={15} color={colors.milkyWhite} />
                    </TouchableOpacity>
                </View>
            )}
        >
            <BottomSheetView style={[
                bottomSheetGalleryStyleSheet.contentContainer,
                {
                    backgroundColor: theme === "dark" ? colors.lighterBlue : colors.lighterOrange
                }
            ]}>
                {(albums.length === 0 || fullPhotos.length === 0 || totalImages == 0) ? (
                    <Text style={bottomSheetGalleryStyleSheet.noImage}>{t("no-image")}</Text>
                ) : (
                    // <BottomSheetFlatList
                    //     data={photos[albums[0]?.id]}
                    //     keyExtractor={(item) => item?.id}
                    //     renderItem={({ item }) => (
                    //         <Image source={{ uri: item.uri }} style={styles.image} />
                    //     )}
                    //     numColumns={3}
                    //     columnWrapperStyle={styles.row}
                    //     onEndReached={() => {
                    //         //Load more photos
                    //     }}
                    //     onEndReachedThreshold={0.5}
                    // />
                    <View style={{
                        height: bottomSheetHeight - 70, // Adjust height dynamically
                    }}>
                        <BottomSheetFlatList
                            data={fullPhotos}
                            keyExtractor={(item) => item?.id}
                            renderItem={({ item }) => (
                                <Image
                                    source={{ uri: item.uri }}
                                    style={styles.image}
                                />
                            )}
                            numColumns={3}
                            columnWrapperStyle={styles.row}
                            onEndReached={() => {
                                //Load more photos
                                loadPhotosSortByCreationTime(10, fullPhotoPagination?.endCursor);
                            }}
                            onEndReachedThreshold={0.5}
                            initialNumToRender={9}
                            showsVerticalScrollIndicator={false}
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

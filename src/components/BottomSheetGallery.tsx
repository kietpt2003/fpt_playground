import React, { forwardRef, useCallback, useMemo, useRef, useState } from 'react';
import { View, Text, Image, TouchableOpacity, Pressable, GestureResponderEvent } from 'react-native';
import BottomSheet, { BottomSheetFlatList, BottomSheetView } from '@gorhom/bottom-sheet';
import { ScreenHeight } from '@rneui/base';
import { colors } from '../constants/colors';
import bottomSheetGalleryStyleSheet from './styles/bottomSheetGalleryStyleSheet';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { BottomSheetGalleryProps } from './types/bottomSheetGaleryTypes';
import { BottomSheetMethods } from '@gorhom/bottom-sheet/lib/typescript/types';
import usePhoto from '../hooks/usePhoto';
import { useTranslation } from 'react-i18next';
import { AntDesign } from '@expo/vector-icons';
import { AlbumFilter } from './AlbumFilter';

export const BottomSheetGallery = forwardRef<BottomSheetMethods, BottomSheetGalleryProps>((
    {
        selectedAlbum,
        bottomSheetHeight,
        setBottomSheetHeight,
        showAlbumsList,
        translateY,
        setSelectedAlbum,
        handleOpenAlbumFilter,
        handleCloseAlbumFilter,
        snapPointIndex,
        setSnapPointIndex,
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
        totalImages,
        photos,
        loadPhotos,
        pagination,
    } = usePhoto();

    // Snap points (kích thước của Bottom Sheet)
    const snapPoints = useMemo(() => [ScreenHeight / 3, ScreenHeight], []);

    const handleSheetChanges = useCallback((index: number) => {
        const newHeight = snapPoints[index]; // Update height based on snap point
        setBottomSheetHeight(newHeight);
        setSnapPointIndex(index);
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
                <Pressable
                    style={[
                        bottomSheetGalleryStyleSheet.handleContainer,
                        {
                            backgroundColor: theme === "dark" ? colors.lighterBlue : colors.lighterOrange
                        }
                    ]}
                    onPressIn={(event) => {
                        const touch = event.nativeEvent;
                        console.log("in", touch.pageY);
                        setBottomSheetHeight(ScreenHeight);
                    }}
                    onTouchEnd={() => {
                        if (snapPointIndex == 1) {
                            setBottomSheetHeight(ScreenHeight);
                        } else {
                            setBottomSheetHeight(ScreenHeight / 3);
                        }
                    }}
                    android_disableSound={true}
                >
                    <View style={bottomSheetGalleryStyleSheet.handleBar} />
                    <TouchableOpacity
                        style={bottomSheetGalleryStyleSheet.selectedAlbumContainer}
                        onPress={() => {
                            if (!showAlbumsList) {
                                // handleChangeAlbumBottomSheetFilter(bottomSheetHeight - 50);
                                handleOpenAlbumFilter();
                            } else {
                                // handleCloseAlbumBottomSheetFilter();
                                handleCloseAlbumFilter();
                            }
                        }}
                        disabled={albums.length === 0 || fullPhotos.length === 0 || totalImages == 0}
                        touchSoundDisabled={true}
                    >
                        <Text style={bottomSheetGalleryStyleSheet.handleText}>{selectedAlbum == null ? t("all-images") : selectedAlbum.title}</Text>
                        <AntDesign name={!showAlbumsList ? "down" : "up"} size={15} color={colors.milkyWhite} />
                    </TouchableOpacity>
                </Pressable>
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
                    <View style={{
                        height: bottomSheetHeight - 70, // Adjust height dynamically
                    }}>
                        <BottomSheetFlatList
                            data={selectedAlbum == null ? fullPhotos : photos[selectedAlbum.id]}
                            keyExtractor={(item) => item?.id}
                            renderItem={({ item }) => (
                                <Image
                                    source={{ uri: item.uri }}
                                    style={bottomSheetGalleryStyleSheet.image}
                                />
                            )}
                            numColumns={3}
                            columnWrapperStyle={bottomSheetGalleryStyleSheet.row}
                            onEndReached={() => {
                                //Load more photos
                                if (selectedAlbum == null) {
                                    loadPhotosSortByCreationTime(10, fullPhotoPagination?.endCursor);
                                } else {
                                    loadPhotos(selectedAlbum, 10, pagination[selectedAlbum.id].endCursor);
                                }
                            }}
                            onEndReachedThreshold={0.5}
                            initialNumToRender={9}
                            showsVerticalScrollIndicator={false}
                        />
                        <AlbumFilter
                            translateY={translateY}
                            albumFilterHeight={bottomSheetHeight - 70}
                            handleCloseAlbumFilter={handleCloseAlbumFilter}
                            setSelectedAlbum={setSelectedAlbum}
                        />
                    </View>
                )}
            </BottomSheetView>
        </BottomSheet>
    );
})

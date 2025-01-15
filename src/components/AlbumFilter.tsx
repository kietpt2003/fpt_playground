import { View, Text, Animated, FlatList, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { colors } from '../constants/colors';
import { useTranslation } from 'react-i18next';
import albumFilterStyleSheet from './styles/albumFilterStyleSheet';
import usePhoto from '../hooks/usePhoto';
import { AlbumFilterProps, AlbumHeaderFilterProps } from './types/albumFilterTypes';

export const AlbumFilter = ({
    albumFilterHeight,
    handleCloseAlbumFilter,
    setSelectedAlbum,
    translateY
}: AlbumFilterProps
) => {
    const { t } = useTranslation();

    const theme = useSelector((state: RootState) => state.theme.theme);
    const {
        albums,
        photos,
        fullPhotos,
        totalImages
    } = usePhoto();

    return (
        <Animated.View
            style={[
                albumFilterStyleSheet.container,
                {
                    transform: [{ translateY }],
                    backgroundColor: theme === "dark" ? colors.lighterBlue : colors.lighterOrange,
                }, // Thêm animation dịch chuyển
            ]}
        >
            <View style={[
                albumFilterStyleSheet.handleContainer,
                {
                    backgroundColor: theme === "dark" ? colors.lighterBlue : colors.lighterOrange
                }
            ]} />
            {(albums.length === 0 || fullPhotos.length === 0 || totalImages === 0) ? (
                <Text style={albumFilterStyleSheet.noImage}>{t("no-image")}</Text>
            ) : (
                <View style={{
                    height: albumFilterHeight, // Adjust height dynamically
                }}>
                    <FlatList
                        data={albums}
                        keyExtractor={(item) => item.id}
                        showsVerticalScrollIndicator={false}
                        renderItem={({ item }) => {
                            if (!photos[item.id]?.some((value) => {
                                return value.mediaType == "photo";
                            })) {
                                return null;
                            }

                            return (
                                <TouchableOpacity
                                    style={albumFilterStyleSheet.itemContentContainer}
                                    onPress={() => {
                                        handleCloseAlbumFilter();
                                        setSelectedAlbum(item);
                                    }}
                                >
                                    <Image source={{ uri: photos[item.id]?.length ? photos[item.id][0].uri : undefined }} style={albumFilterStyleSheet.albumFirstImage} />
                                    <View>
                                        <Text style={albumFilterStyleSheet.albumTitlteTxt}>{item.title}</Text>
                                        <Text style={albumFilterStyleSheet.assetCountTxt}>{item.assetCount}</Text>
                                    </View>
                                </TouchableOpacity>
                            )
                        }}
                        ListHeaderComponent={
                            <AlbumHeaderFilter
                                setSelectedAlbum={setSelectedAlbum}
                                handleCloseAlbumFilter={handleCloseAlbumFilter}
                            />
                        }
                    />
                </View>
            )}
        </Animated.View>
    )
}

function AlbumHeaderFilter({
    handleCloseAlbumFilter,
    setSelectedAlbum,
}: AlbumHeaderFilterProps) {
    const { t } = useTranslation();
    const {
        fullPhotos,
        totalImages
    } = usePhoto();

    return (
        <TouchableOpacity
            style={albumFilterStyleSheet.itemContentContainer}
            onPress={() => {
                handleCloseAlbumFilter();
                setSelectedAlbum(null);
            }}
        >
            <Image source={{ uri: fullPhotos.at(0)?.uri }} style={albumFilterStyleSheet.albumFirstImage} />
            <View>
                <Text style={albumFilterStyleSheet.albumTitlteTxt}>{t("all-images")}</Text>
                <Text style={albumFilterStyleSheet.assetCountTxt}>{totalImages}</Text>
            </View>
        </TouchableOpacity>
    )
}

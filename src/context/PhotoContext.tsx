import React, { createContext, useEffect, useState } from 'react';
import { Pagination, PhotoContextProps, PhotoProviderProps } from './types/photoContextType';
import * as MediaLibrary from 'expo-media-library';
import { Linking } from 'react-native';

const PhotoContext = createContext<PhotoContextProps | undefined>(undefined);

function PhotoProvider({ children }: PhotoProviderProps) {
    const [photos, setPhotos] = useState<Record<string, MediaLibrary.Asset[]>>({});
    const [requestPermission, setRequestPermission] = useState(true);
    const [albums, setAlbums] = useState<MediaLibrary.Album[]>([]);
    const [pagination, setPagination] = useState<Record<string, Pagination>>({});
    const [canAskAgain, setCanAskAgain] = useState(true);
    const [fullPhotos, setFullPhotos] = useState<MediaLibrary.Asset[]>([]);
    const [fullPhotoPagination, setFullPhotoPagination] = useState<Pagination | undefined>(undefined);
    const [totalImages, setTotalImages] = useState<number>(0);

    const [isFriendsScreen, setIsFriendsScreen] = useState(false);

    const requestPermissionAsync = async () => {
        const { status, canAskAgain: expoCanAskAgain } = await MediaLibrary.requestPermissionsAsync(false, ["photo"]); // Xin quyền truy cập
        if (status === 'granted') {
            setRequestPermission(false);
        } else {
            setRequestPermission(true);
        }
        setCanAskAgain(expoCanAskAgain);

        if (!expoCanAskAgain) {
            await Linking.openSettings();
        }
        return status;
    }

    const requestPermissionWithoutLinkingAsync = async () => {
        const { status, canAskAgain: expoCanAskAgain } = await MediaLibrary.requestPermissionsAsync(false, ["photo"]); // Xin quyền truy cập
        if (status === 'granted') {
            setRequestPermission(false);
        } else {
            setRequestPermission(true);
        }
        setCanAskAgain(expoCanAskAgain);
        return {
            status,
            canAskAgain: expoCanAskAgain
        };
    }

    const getTotalPhotos = async () => {
        try {
            // Yêu cầu quyền truy cập thư viện ảnh
            const { status } = await requestPermissionWithoutLinkingAsync(); // Xin quyền truy cập
            if (status === 'granted') {
                // Lấy thông tin ảnh với số lượng nhỏ nhất có thể
                const assets = await MediaLibrary.getAssetsAsync({
                    mediaType: 'photo',
                    first: 1, // Chỉ lấy 1 ảnh để giảm tải
                });

                // Tổng số ảnh
                const totalPhotos = assets.totalCount;
                setTotalImages(totalPhotos)
            }
        } catch (error) {
            console.error('Lỗi khi lấy tổng số ảnh:', error);
            return 0;
        }
    };

    const loadPhotosSortByCreationTime = async (numberPhotoToLoad: number, after: MediaLibrary.AssetRef | undefined = undefined): Promise<boolean> => {
        const { status } = await requestPermissionWithoutLinkingAsync(); // Xin quyền truy cập

        if (status === 'granted') {
            setRequestPermission(false);
            const assets = await MediaLibrary.getAssetsAsync({
                first: numberPhotoToLoad,
                mediaType: "photo",
                after,
                sortBy: "modificationTime"
            });

            const existingPhotos = fullPhotos;
            const newPhotos = existingPhotos.concat(assets.assets);

            setFullPhotos(newPhotos);

            setFullPhotoPagination({
                hasNextPage: assets.hasNextPage,
                endCursor: assets.endCursor,
            });

            return assets.hasNextPage;
        } else {
            setRequestPermission(true);
            setAlbums([]);
            setPhotos({});
            setPagination({});
            setFullPhotos([]);
            setFullPhotoPagination(undefined);
            return false;
        }
    }

    //Lấy danh sách albums
    const loadAlbums = async () => {
        const { status } = await requestPermissionWithoutLinkingAsync();

        if (status === 'granted') {
            setRequestPermission(false);
            const fetchedAlbums = await MediaLibrary.getAlbumsAsync({
                includeSmartAlbums: true,
            });

            setAlbums(fetchedAlbums);
        } else {
            setRequestPermission(true);
            setAlbums([]);
            setPhotos({});
            setPagination({});
            setFullPhotos([]);
            setFullPhotoPagination(undefined);
        }
    };

    // Lấy danh sách ảnh từ thư mục
    const loadPhotos = async (album: MediaLibrary.Album, numberPhotoToLoad: number, after: MediaLibrary.AssetRef | undefined = undefined): Promise<boolean> => {
        if (!photos[album.id]) photos[album.id] = [];

        const { status } = await requestPermissionWithoutLinkingAsync(); // Xin quyền truy cập

        if (status === 'granted') {
            setRequestPermission(false);
            const albumAssets = await MediaLibrary.getAssetsAsync({
                album,
                first: numberPhotoToLoad,
                mediaType: "photo",
                after
            });

            const existingPhotos = photos[album.id] || [];
            const newPhotos = existingPhotos.concat(albumAssets.assets);

            setPhotos((prevPhotos) => {
                return {
                    ...prevPhotos,
                    [album.id]: newPhotos,
                };
            });

            setPagination((prevPagination) => ({
                ...prevPagination,
                [album.id]: {
                    hasNextPage: albumAssets.hasNextPage,
                    endCursor: albumAssets.endCursor,
                },
            }));

            return albumAssets.hasNextPage;
        } else {
            setRequestPermission(true);
            setAlbums([]);
            setPhotos({});
            setPagination({});
            setFullPhotos([]);
            setFullPhotoPagination(undefined);
            return false;
        }
    };

    async function loadPhotosFromAlbum(numberPhotoToLoad: number) {
        if (albums.length > 0) {
            albums.forEach(async (album) => {
                await loadPhotos(album, numberPhotoToLoad, pagination[album.id]?.endCursor);
            });
        }
    }

    function changeStateFriendsScreen() {
        setIsFriendsScreen(!isFriendsScreen);
    }

    //Count total photos
    useEffect(() => {
        if (isFriendsScreen) {
            getTotalPhotos();
        }
    }, [photos, isFriendsScreen])

    //Load full photos
    useEffect(() => {
        if (isFriendsScreen) {
            loadPhotosSortByCreationTime(9, fullPhotoPagination?.endCursor);
        }
    }, [isFriendsScreen])

    //Load albums
    useEffect(() => {
        if (isFriendsScreen) {
            loadAlbums();
        }
    }, [isFriendsScreen])

    //Load photos from album
    useEffect(() => {
        if (albums.length > 0) {
            loadPhotosFromAlbum(3);
        }
    }, [albums, isFriendsScreen])

    return (
        <PhotoContext.Provider value={{
            photos,
            loadPhotos,
            requestPermission,
            albums,
            loadAlbums,
            pagination,
            canAskAgain,
            requestMediaLibPermissionWithoutLinking: requestPermissionWithoutLinkingAsync,
            requestMediaLibPermission: requestPermissionAsync,
            fullPhotos,
            fullPhotoPagination,
            loadPhotosSortByCreationTime,
            totalImages,
            changeStateFriendsScreen
        }}>
            {children}
        </PhotoContext.Provider>
    );
};

export { PhotoContext, PhotoProvider };

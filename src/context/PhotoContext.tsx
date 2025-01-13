import React, { createContext, useState } from 'react';
import { Pagination, PhotoContextProps, PhotoProviderProps } from './types/photoContextType';
import * as MediaLibrary from 'expo-media-library';

const PhotoContext = createContext<PhotoContextProps | undefined>(undefined);

function PhotoProvider({ children }: PhotoProviderProps) {
    const [photos, setPhotos] = useState<Record<string, MediaLibrary.Asset[]>>({});
    const [requestPermission, setRequestPermission] = useState(true);
    const [albums, setAlbums] = useState<MediaLibrary.Album[]>([]);
    const [pagination, setPagination] = useState<Record<string, Pagination>>({});

    const requestPermissionAsync = async () => {
        const { status } = await MediaLibrary.requestPermissionsAsync(false, ["photo"]); // Xin quyền truy cập
        return status;
    }

    const loadAlbums = async () => {
        try {
            const status = await requestPermissionAsync(); // Xin quyền truy cập
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
            }
        } catch (error) {
            console.error('Error fetching albums: ', error);
        }
    };

    const loadPhotos = async (album: MediaLibrary.Album, after: MediaLibrary.AssetRef | undefined = undefined): Promise<boolean> => {
        if (!photos[album.id]) photos[album.id] = [];

        const status = await requestPermissionAsync(); // Xin quyền truy cập
        if (status === 'granted') {
            setRequestPermission(false);
            const albumAssets = await MediaLibrary.getAssetsAsync({
                album,
                first: 50,
                after,
                mediaType: "photo"
            });

            setPhotos((prevPhotos) => ({
                ...prevPhotos,
                [album.id]: [...(prevPhotos[album.id] || []), ...albumAssets.assets as MediaLibrary.Asset[]],
            }));

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
            return false;
        }
    };

    // Lấy danh sách ảnh từ thư viện
    // const getPhotos = async (isInitialLoad = false) => {
    //     if (loading || (!isInitialLoad && !hasMore)) return; // Ngừng nếu đang tải hoặc không còn ảnh
    //     setLoading(true);
    //     try {
    //         const { status } = await MediaLibrary.requestPermissionsAsync(false, ["photo"]); // Xin quyền truy cập
    //         if (status === 'granted') {
    //             setRequestPermission(false);
    //             const album = await MediaLibrary.getAssetsAsync({
    //                 mediaType: 'photo',
    //                 first: 50, // Tải tối đa 50 ảnh mỗi lần
    //                 after: lastAssetId, // Chỉ định asset cuối cùng nếu có

    //             });

    //             setPhotos((prevPhotos) => isInitialLoad ? album.assets : [...prevPhotos, ...album.assets]); // Thêm ảnh mới vào danh sách
    //             setLastAssetId(album.endCursor || undefined); // Cập nhật asset cuối cùng
    //             setHasMore(album.hasNextPage); // Cập nhật trạng thái còn ảnh hay không
    //         } else {
    //             setRequestPermission(true);
    //             setPhotos([]);
    //         }
    //     } catch (error) {
    //         console.error('Error fetching photos: ', error);
    //     } finally {
    //         setLoading(false);
    //     }
    // };

    return (
        <PhotoContext.Provider value={{
            photos,
            loadPhotos,
            requestPermission,
            albums,
            loadAlbums,
            pagination,
        }}>
            {children}
        </PhotoContext.Provider>
    );
};

export { PhotoContext, PhotoProvider };

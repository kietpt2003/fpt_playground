import { View, Text, Image, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import { PictureEditorProps } from './types/pictureEditorTypes'
import pictureEditorStyleSheet from './styles/pictureEditorStyleSheet'
import { SafeAreaView } from 'react-native-safe-area-context'
import CameraIconButton from './CameraIconButton'
import { colors } from '../constants/colors'
import * as MediaLibrary from 'expo-media-library';
import ErrorModal from './ErrorModal'
import { useTranslation } from 'react-i18next'
import { useNavigation } from '@react-navigation/native'

export default function PictureEditor({ imageUri, setImage }: PictureEditorProps) {
    const [stringErr, setStringErr] = useState<string>("");
    const [isError, setIsError] = useState<boolean>(false);
    const [isSaving, setIsSaving] = useState<boolean>(false);

    const { t } = useTranslation();
    const navigation = useNavigation();

    async function savePicture() {
        try {
            setIsSaving(true);
            // Kiểm tra album có tồn tại hay không
            let album = await MediaLibrary.getAlbumAsync("FPT Playground");

            if (!album) {
                // Nếu album không tồn tại, tạo album mới cùng với ảnh
                const asset = await MediaLibrary.createAssetAsync(imageUri);
                await MediaLibrary.createAlbumAsync("FPT Playground", asset, false);
                console.log("Album created and image saved successfully.");
            } else {
                // Nếu album tồn tại, thêm ảnh vào album
                const asset = await MediaLibrary.createAssetAsync(imageUri);
                await MediaLibrary.addAssetsToAlbumAsync([asset], album.id, false);
                console.log("Image saved to existing album successfully.");
            }
            setImage(undefined);
            setIsSaving(false);
        } catch (error) {
            console.error("Error saving picture:", error);
            setStringErr(
                error ?
                    error?.toString()
                    :
                    t("save-image-err")
            );
            setIsError(true);
            setIsSaving(false);
        }
    }
    return (
        <SafeAreaView>
            <Image source={{ uri: imageUri }} style={pictureEditorStyleSheet.image} />
            <View style={pictureEditorStyleSheet.bottomControllsContainer}>
                <CameraIconButton
                    icon={"flip-camera-android"}
                    color={colors.white}
                    size={30}
                    onPress={() => {
                        setImage(undefined);
                    }}
                    disabled={isSaving}
                />
                {
                    !isSaving ?
                        <CameraIconButton
                            icon={"check"}
                            color={colors.white}
                            size={30}
                            onPress={() => {
                                // savePicture();
                                //TODO: Chụp xong thì lấy hình gửi luôn ko cần save
                                setImage(undefined); //Tạm thời là vậy
                                navigation.goBack();
                            }}
                            disabled={isSaving}
                        /> :
                        <ActivityIndicator
                            color={colors.white}
                            size={30}
                        />
                }
            </View>
            <ErrorModal
                stringErr={stringErr}
                isError={isError}
                setIsError={setIsError}
            />
        </SafeAreaView>
    )
}
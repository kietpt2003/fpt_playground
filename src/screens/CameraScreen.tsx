import { View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import cameraScreenStyleSheet from './styles/cameraScreenStyleSheet'
import { CameraView } from 'expo-camera'
import { SafeAreaView } from 'react-native-safe-area-context'
import { CameraScreenProps } from './types/cameraScreenTypes'
import CameraIconButton from '../components/CameraIconButton'
import { colors } from '../constants/colors'
import ErrorModal from '../components/ErrorModal'
import PictureEditor from '../components/PictureEditor'
import { useTranslation } from 'react-i18next'
import CameraZoom from '../components/CameraZoom'

export default function CameraScreen() {
    const [cameraProps, setCameraProps] = useState<CameraScreenProps>({
        zoom: 0,
        facing: "back",
        flash: "on",
        animateShutter: false,
        enableTorch: false,
    });

    const [image, setImage] = useState<string | undefined>(undefined);
    const cameraRef = useRef<CameraView>(null);

    const { t } = useTranslation();

    const [zoomValue, setZoomValue] = useState(cameraProps.zoom);

    const [stringErr, setStringErr] = useState<string>("");
    const [isError, setIsError] = useState<boolean>(false);

    function toggleProperty<T extends keyof CameraScreenProps>(
        prop: T,
        option1: CameraScreenProps[T],
        option2: CameraScreenProps[T]
    ) {
        setCameraProps((current) => ({
            ...current,
            [prop]: current[prop] === option1 ? option2 : option1
        }))
    }

    async function takePicture() {
        if (cameraRef.current) {
            try {
                const picture = await cameraRef.current.takePictureAsync();
                setImage(picture?.uri);
            } catch (error) {
                console.log('Capture image error:', error);
                setStringErr(
                    error ?
                        error?.toString()
                        :
                        t("capture-image-err")
                );
                setIsError(true);
            }
        }
    }

    useEffect(() => {
        if (cameraProps.zoom !== zoomValue) {
            setCameraProps((current) => ({
                ...current,
                zoom: zoomValue
            }))
        }
    }, [zoomValue])
    return (
        <>
            {
                image ?
                    <PictureEditor
                        imageUri={image}
                        setImage={setImage}
                    /> :
                    <SafeAreaView style={cameraScreenStyleSheet.container}>
                        <View style={cameraScreenStyleSheet.topControllsContainer}>
                            <CameraIconButton
                                icon={"flip-camera-android"}
                                color={colors.white}
                                size={20}
                                onPress={() => {
                                    toggleProperty("facing", "front", "back");
                                }}
                            />
                            <CameraIconButton
                                icon={cameraProps.flash === "on" ? "flash-on" : "flash-off"}
                                color={colors.white}
                                size={20}
                                onPress={() => {
                                    toggleProperty("flash", "on", "off");
                                }}
                            />
                            <CameraIconButton
                                icon={"animation"}
                                color={cameraProps.animateShutter ? colors.white : colors.disabled}
                                size={20}
                                onPress={() => {
                                    toggleProperty("animateShutter", true, false);
                                }}
                            />
                            <CameraIconButton
                                icon={cameraProps.enableTorch ? "flashlight-on" : "flashlight-off"}
                                color={colors.white}
                                size={20}
                                onPress={() => {
                                    toggleProperty("enableTorch", true, false);
                                }}
                            />
                        </View>
                        <CameraView
                            ref={cameraRef}
                            style={cameraScreenStyleSheet.camera}
                            zoom={cameraProps.zoom}
                            facing={cameraProps.facing}
                            flash={cameraProps.flash}
                            animateShutter={cameraProps.animateShutter}
                            enableTorch={cameraProps.enableTorch}
                        />

                        <CameraZoom
                            zoomValue={zoomValue}
                            setZoomValue={setZoomValue}
                        />

                        <View style={cameraScreenStyleSheet.bottomControllsContainer}>
                            <CameraIconButton
                                icon={"camera"}
                                color={colors.white}
                                size={60}
                                style={{
                                    height: 60
                                }}
                                onPress={takePicture}
                            />
                        </View>

                        <ErrorModal
                            stringErr={stringErr}
                            isError={isError}
                            setIsError={setIsError}
                        />
                    </SafeAreaView>
            }
        </>
    )
}
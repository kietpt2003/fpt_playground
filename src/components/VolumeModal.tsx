import { View, Text, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { VolumeModalProps } from './types/volumeModalTypes'
import Modal from "react-native-modal";
import { LinearGradient } from "expo-linear-gradient";
import { colors } from "../constants/colors";
import volumeStyleSheet from './styles/volumeStyleSheet';
import Slider from '@react-native-community/slider';
import { Ionicons } from '@expo/vector-icons';
import { sliderMax, sliderMin, sliderWidth } from '../constants/slider';
import getVolumeIcon from '../utils/getVolumeIcon';
import useAudio from '../hooks/useAudio';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';

export default function VolumeModal({ openChangeVolume, setOpenChangeVolume }: VolumeModalProps) {
    const { sound, volume: reduxVolumeValue, setVolume: setSystemVolumeValue } = useAudio();

    const defaultVolumeValue = reduxVolumeValue * 10;
    const [localVolumeValue, setLocalVolumeValue] = useState(reduxVolumeValue * 10);
    const [thumbPosition, setThumbPosition] = useState(sliderWidth / 2 - 18); // Vị trí thumb trên thanh trượt

    const reduxTheme = useSelector((state: RootState) => state.theme.theme);

    // Tính toán vị trí của số hiển thị theo giá trị
    const calculateThumbPosition = (value: number) => {
        const percentage = (value - sliderMin) / (sliderMax - sliderMin);
        return percentage * (sliderWidth - 38); // Trừ đi một ít để căn giữa số với thumb
    };

    // Cập nhật âm lượng khi slider thay đổi
    useEffect(() => {
        if (sound) {
            sound.setVolumeAsync(localVolumeValue / 10); // Cập nhật âm lượng
        }
    }, [localVolumeValue]);

    return (
        <Modal
            isVisible={openChangeVolume}
            onBackdropPress={() => setOpenChangeVolume(false)}
            onSwipeComplete={() => setOpenChangeVolume(false)}
            useNativeDriverForBackdrop
            swipeDirection={"down"}
            propagateSwipe={true}
            style={volumeStyleSheet.container}
        >
            <View style={volumeStyleSheet.modalContent}>
                {/* Thanh cam trên cùng */}
                <LinearGradient
                    colors={reduxTheme === "dark" ? [colors.darkBlue, colors.lightBlue] : [colors.darkOrange, colors.lightOrange]} // Hiệu ứng chuyển màu
                    style={volumeStyleSheet.header}
                />

                <View style={{
                    paddingHorizontal: 10,
                }}>
                    {/* Hiển thị số di chuyển theo thumb */}
                    <View style={{
                        alignItems: 'center',
                        height: 30,
                        marginLeft: 12,
                    }}>
                        <View
                            style={[
                                volumeStyleSheet.sliderValueContainer,
                                { left: thumbPosition },
                            ]}
                        >
                            <Text style={[
                                volumeStyleSheet.sliderValue,
                                {
                                    color: reduxTheme === "dark" ? colors.darkBlue : colors.darkOrange
                                }
                            ]}>{Math.round(localVolumeValue)}</Text>
                        </View>
                    </View>
                    <View style={{
                        flexDirection: "row",
                        alignItems: "center"
                    }}>

                        <Slider
                            style={[volumeStyleSheet.slider, { width: sliderWidth }]}
                            minimumValue={sliderMin}
                            maximumValue={sliderMax}
                            value={defaultVolumeValue} // Sử dụng giá trị từ state cục bộ
                            onValueChange={(value: number) => {
                                setLocalVolumeValue(value);
                                setThumbPosition(calculateThumbPosition(value)); // Cập nhật vị trí thumb
                            }}
                            onSlidingComplete={(value: number) => {
                                // dispatch(changeVolume(value / 10)); // Cập nhật Redux khi người dùng ngừng kéo
                                setSystemVolumeValue(value / 10);
                            }}
                            minimumTrackTintColor={reduxTheme === "dark" ? colors.lightBlue : colors.lightOrange}
                            maximumTrackTintColor="#ccc"
                            thumbTintColor={reduxTheme === "dark" ? colors.darkBlue : colors.darkOrange}
                        />
                        <TouchableOpacity
                            onPress={async () => {
                                let newVolume = 0;
                                if (localVolumeValue != 0) {
                                    newVolume = 0;
                                    await sound?.setIsMutedAsync(true);
                                } else {
                                    newVolume = 1;
                                    await sound?.setIsMutedAsync(false);
                                }
                                setLocalVolumeValue(newVolume);
                                setThumbPosition(calculateThumbPosition(newVolume));
                                // dispatch(changeVolume(newVolume));
                                setSystemVolumeValue(newVolume);
                            }}
                            touchSoundDisabled={true}
                        >
                            {
                                reduxTheme === "dark" ?
                                    <Ionicons name={getVolumeIcon(localVolumeValue)} size={24} color={localVolumeValue == 10 ? colors.darkBlue : localVolumeValue == 0 ? 'rgba(0, 0, 0, 0.3)' : colors.lightBlue} /> :
                                    <Ionicons name={getVolumeIcon(localVolumeValue)} size={24} color={localVolumeValue == 10 ? colors.darkOrange : localVolumeValue == 0 ? 'rgba(0, 0, 0, 0.3)' : colors.lightOrange} />
                            }
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    )
}
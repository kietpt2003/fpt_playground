import { TouchableOpacity } from 'react-native'
import React from 'react'
import { MaterialIcons } from '@expo/vector-icons';
import { CameraIconButtonProps } from './types/CameraIconButtonTypes';
import cameraIconButtonStyleSheet from './styles/cameraIconButtonStyleSheet';

export default function CameraIconButton({ icon, size, color, style = undefined, onPress = () => { }, disabled = false }: CameraIconButtonProps) {
    return (
        <TouchableOpacity
            style={[cameraIconButtonStyleSheet.button, style]}
            onPress={onPress}
            touchSoundDisabled={true}
            disabled={disabled}
        >
            <MaterialIcons
                name={icon}
                size={size}
                color={color}
            />
        </TouchableOpacity>
    )
}
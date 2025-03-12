import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { CameraZoomItemProps } from './types/cameraZoomItemTypes'
import cameraZoomItemStyleSheet from './styles/cameraZoomItemStyleSheet'
import { Gesture, GestureDetector } from 'react-native-gesture-handler'
import Animated from 'react-native-reanimated'

export default function CameraZoomItem({ viewStyle, gesture }: CameraZoomItemProps) {
    return (
        <GestureDetector
            gesture={gesture}
        >
            <Animated.View
                style={[
                    cameraZoomItemStyleSheet.viewContainer,
                    viewStyle,
                ]}
            />
        </GestureDetector>
    )
}
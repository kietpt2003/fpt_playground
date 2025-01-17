import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { GestureDetector, Gesture } from 'react-native-gesture-handler';
import Animated, { useSharedValue, useAnimatedStyle, withSpring, runOnJS } from 'react-native-reanimated';

interface DraggablePieceProps {
    piece: string;
    player: string;
    position: { row: number; col: number };
    onMove: (from: { row: number; col: number }, to: { x: number; y: number }) => void;
}

const DraggablePiece: React.FC<DraggablePieceProps> = ({ piece, player, position, onMove }) => {
    const translateX = useSharedValue(0);
    const translateY = useSharedValue(0);

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [
            { translateX: translateX.value },
            { translateY: translateY.value },
        ],
    }));

    const panGesture = Gesture.Pan()
        .onUpdate((event) => {
            translateX.value = event.translationX;
            translateY.value = event.translationY;
        })
        .onEnd(() => {
            const to = { x: translateX.value, y: translateY.value };
            runOnJS(onMove)(position, to);
            translateX.value = withSpring(0);
            translateY.value = withSpring(0);
        });

    return (
        <GestureDetector gesture={panGesture}>
            <Animated.View style={[styles.piece, animatedStyle]}>
                <Text style={{ color: player === 'red' ? 'red' : 'black' }}>{piece}</Text>
            </Animated.View>
        </GestureDetector>
    );
};

const styles = StyleSheet.create({
    piece: {
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: 'black',
    },
});

export default DraggablePiece;

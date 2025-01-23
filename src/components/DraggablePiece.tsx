import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { GestureDetector, Gesture } from 'react-native-gesture-handler';
import Animated, { useSharedValue, useAnimatedStyle, withSpring, runOnJS } from 'react-native-reanimated';
import { AntDesign, FontAwesome, Ionicons } from '@expo/vector-icons';

interface DraggablePieceProps {
    piece: string;
    pieceColor: string;
    position: { row: number; col: number };
    onMove: (from: { row: number; col: number }, to: { x: number; y: number }) => void;
    isValid?: boolean
}

const DraggablePiece: React.FC<DraggablePieceProps> = ({ piece, pieceColor, position, onMove, isValid }) => {
    const translateX = useSharedValue(position.col);
    const translateY = useSharedValue(position.row);
    const contextRow = useSharedValue(0);
    const contextCol = useSharedValue(0);

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [
            { translateX: translateX.value },
            { translateY: translateY.value },
        ],
    }));

    const panGesture = Gesture.Pan()
        .enabled(false)
        .onBegin((event) => {
            contextRow.value = position.row;
            contextCol.value = position.col;
        })
        .onUpdate((event) => {
            translateX.value = event.translationX;
            translateY.value = event.translationY;
            console.log("x:", event.translationX, "\ny:", event.translationY);

        })
        .onEnd(() => {
            const to = { x: translateX.value + contextCol.value * 40, y: translateY.value + contextRow.value * 40 };
            runOnJS(onMove)(position, to);
            translateX.value = withSpring(0);
            translateY.value = withSpring(0);
        });

    return (
        <GestureDetector gesture={panGesture}>
            <Animated.View style={[styles.piece, animatedStyle]}>
                {isValid && (<FontAwesome name='circle' size={8} solid color={'#4dafff'} />)}
                {piece &&
                    <Text style={{ color: pieceColor === 'red' ? 'red' : 'black' }}>{piece}</Text>
                }
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

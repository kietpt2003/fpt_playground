import React from 'react';
import { StyleSheet } from 'react-native';
import { GestureDetector, Gesture } from 'react-native-gesture-handler';
import Animated, { useSharedValue, useAnimatedStyle, withSpring, runOnJS } from 'react-native-reanimated';
import { FontAwesome } from '@expo/vector-icons';
import ChineseChessPiece from './ChineseChessPiece';
import { ChineseChessPiece as ChineseChessPieceType, chineseChessSize } from '../screens/types/chineseChessTypes';

interface DraggablePieceProps {
    piece: ChineseChessPieceType;
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
            { translateX: translateX.value * 0 },
            { translateY: translateY.value * 0 },
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
            <Animated.View style={[
                styles.piece,
                animatedStyle,
            ]}>
                {isValid && (<FontAwesome name='circle' size={8} solid color={'#4dafff'} style={styles.suggest} />)}
                {piece &&
                    <ChineseChessPiece
                        piece={piece}
                        pieceColor={pieceColor}
                        size={chineseChessSize}
                    />
                }
            </Animated.View>
        </GestureDetector>
    );
};

const styles = StyleSheet.create({
    suggest: {
        position: "absolute",
        top: 16,
        left: 16,
        zIndex: 1
    },
    piece: {
        width: chineseChessSize,
        height: chineseChessSize,
    },
});

export default DraggablePiece;

import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import DraggablePiece from './DraggablePiece';
import { isValidMove } from '../utils/checkChineseChessLogic';
import { ScreenHeight } from '@rneui/base';

export const initialState = [
    // Trạng thái bàn cờ với 10 hàng x 9 cột
    [
        { piece: 'rook', player: 'red' },
        { piece: 'knight', player: 'red' },
        { piece: 'elephant', player: 'red' },
        { piece: 'advisor', player: 'red' },
        { piece: 'king', player: 'red' },
        { piece: 'advisor', player: 'red' },
        { piece: 'elephant', player: 'red' },
        { piece: 'knight', player: 'red' },
        { piece: 'rook', player: 'red' },
    ],//row1
    [
        { piece: '', player: '' },
        { piece: '', player: '' },
        { piece: '', player: '' },
        { piece: '', player: '' },
        { piece: '', player: '' },
        { piece: '', player: '' },
        { piece: '', player: '' },
        { piece: '', player: '' },
        { piece: '', player: '' },
    ],//row2
    [
        { piece: '', player: '' },
        { piece: 'cannon', player: 'red' },
        { piece: '', player: '' },
        { piece: '', player: '' },
        { piece: '', player: '' },
        { piece: '', player: '' },
        { piece: '', player: '' },
        { piece: 'cannon', player: 'red' },
        { piece: '', player: '' },
    ],//row3
    [
        { piece: 'pawn', player: 'red' },
        { piece: '', player: '' },
        { piece: 'pawn', player: 'red' },
        { piece: '', player: '' },
        { piece: 'pawn', player: 'red' },
        { piece: '', player: '' },
        { piece: 'pawn', player: 'red' },
        { piece: '', player: '' },
        { piece: 'pawn', player: 'red' },
    ],//row4
    [
        { piece: '', player: '' },
        { piece: '', player: '' },
        { piece: '', player: '' },
        { piece: '', player: '' },
        { piece: '', player: '' },
        { piece: '', player: '' },
        { piece: '', player: '' },
        { piece: '', player: '' },
        { piece: '', player: '' },
    ],//row5
    [
        { piece: '', player: '' },
        { piece: '', player: '' },
        { piece: '', player: '' },
        { piece: '', player: '' },
        { piece: '', player: '' },
        { piece: '', player: '' },
        { piece: '', player: '' },
        { piece: '', player: '' },
        { piece: '', player: '' },
    ],//row6
    [
        { piece: 'pawn', player: 'blue' },
        { piece: '', player: '' },
        { piece: 'pawn', player: 'blue' },
        { piece: '', player: '' },
        { piece: 'pawn', player: 'blue' },
        { piece: '', player: '' },
        { piece: 'pawn', player: 'blue' },
        { piece: '', player: '' },
        { piece: 'pawn', player: 'blue' },
    ],//row7
    [
        { piece: '', player: '' },
        { piece: 'cannon', player: 'blue' },
        { piece: '', player: '' },
        { piece: '', player: '' },
        { piece: '', player: '' },
        { piece: '', player: '' },
        { piece: '', player: '' },
        { piece: 'cannon', player: 'blue' },
        { piece: '', player: '' },
    ],//row8
    [
        { piece: '', player: '' },
        { piece: '', player: '' },
        { piece: '', player: '' },
        { piece: '', player: '' },
        { piece: '', player: '' },
        { piece: '', player: '' },
        { piece: '', player: '' },
        { piece: '', player: '' },
        { piece: '', player: '' },
    ],//row9
    [
        { piece: 'rook', player: 'blue' },
        { piece: 'knight', player: 'blue' },
        { piece: 'elephant', player: 'blue' },
        { piece: 'advisor', player: 'blue' },
        { piece: 'king', player: 'blue' },
        { piece: 'advisor', player: 'blue' },
        { piece: 'elephant', player: 'blue' },
        { piece: 'knight', player: 'blue' },
        { piece: 'rook', player: 'blue' },
    ],//row10
];


const Board = () => {
    const [board, setBoard] = useState(initialState);

    const onMove = (from: { row: number; col: number }, to: { x: number; y: number }) => {
        // Tính toán vị trí đích dựa trên tọa độ `to`
        const col = Math.round(to.x / 40); // Mỗi ô cờ có kích thước 40px
        const row = Math.round(to.y / 40);

        // Kiểm tra vị trí đích có hợp lệ không
        if (row >= 0 && row < 10 && col >= 0 && col < 9) {
            const fromCell = board[from.row][from.col];
            const toCell = board[row][col];

            // Kiểm tra xem nước đi có hợp lệ không
            if (isValidMove(fromCell.piece, fromCell.player, from, { row, col }, board)) {
                // Cập nhật bàn cờ
                const newBoard = board.map((row) => row.map((cell) => ({ ...cell })));
                newBoard[row][col] = fromCell; // Đặt quân cờ vào vị trí đích
                newBoard[from.row][from.col] = { piece: '', player: '' }; // Xóa quân cờ tại vị trí ban đầu
                setBoard(newBoard);
            }
        }
    };

    const renderBoard = () => {
        return board.map((row, rowIndex) => (
            <View style={styles.row} key={`row-${rowIndex}`}>
                {row.map((cell, colIndex) => (
                    <DraggablePiece
                        key={`cell-${rowIndex}-${colIndex}`}
                        piece={cell.piece}
                        player={cell.player}
                        position={{ row: rowIndex, col: colIndex }}
                        onMove={onMove}
                    />
                ))}
            </View>
        ));
    };

    return <View style={styles.board}>{renderBoard()}</View>;
};

const styles = StyleSheet.create({
    board: {
        width: 360,
        height: 400,
        borderWidth: 2,
        borderColor: 'black',
        alignSelf: "center",
        justifyContent: "center",
        alignItems: "center",
        marginTop: ScreenHeight / 5
    },
    row: {
        flexDirection: 'row',
    },
});

export default Board;

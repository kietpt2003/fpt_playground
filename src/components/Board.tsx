import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import DraggablePiece from './DraggablePiece';
import { checkAdvisorMove, checkBishopMove, checkCannonMove, checkKingMove, checkKnightMove, checkPawnMove, checkPotentialBlockMoves, checkRookMove, checkValidMove, isInCheck, isValidMove } from '../utils/checkChineseChessLogic';
import { ScreenHeight } from '@rneui/base';
import { ChineseChessBoardPiece } from '../screens/types/chineseChessTypes';
import { Xiangqi } from 'xiangqi.js';


export const initialState: ChineseChessBoardPiece[][] = [
    // Trạng thái bàn cờ với 10 hàng x 9 cột
    [
        { piece: 'rook', pieceColor: 'red', row: 0, column: 0, isMoveValid: false },
        { piece: 'knight', pieceColor: 'red', row: 0, column: 1, isMoveValid: false },
        { piece: 'bishop', pieceColor: 'red', row: 0, column: 2, isMoveValid: false },
        { piece: 'advisor', pieceColor: 'red', row: 0, column: 3, isMoveValid: false },
        { piece: 'king', pieceColor: 'red', row: 0, column: 4, isMoveValid: false },
        { piece: 'advisor', pieceColor: 'red', row: 0, column: 5, isMoveValid: false },
        { piece: 'bishop', pieceColor: 'red', row: 0, column: 6, isMoveValid: false },
        { piece: 'knight', pieceColor: 'red', row: 0, column: 7, isMoveValid: false },
        { piece: 'rook', pieceColor: 'red', row: 0, column: 8, isMoveValid: false },
    ],//row0
    [
        { piece: '', pieceColor: '', row: 1, column: 0, isMoveValid: false },
        { piece: '', pieceColor: '', row: 1, column: 1, isMoveValid: false },
        { piece: '', pieceColor: '', row: 1, column: 2, isMoveValid: false },
        { piece: '', pieceColor: '', row: 1, column: 3, isMoveValid: false },
        { piece: '', pieceColor: '', row: 1, column: 4, isMoveValid: false },
        { piece: '', pieceColor: '', row: 1, column: 5, isMoveValid: false },
        { piece: '', pieceColor: '', row: 1, column: 6, isMoveValid: false },
        { piece: '', pieceColor: '', row: 1, column: 7, isMoveValid: false },
        { piece: '', pieceColor: '', row: 1, column: 8, isMoveValid: false },
    ],//row1
    [
        { piece: '', pieceColor: '', row: 2, column: 0, isMoveValid: false },
        { piece: 'cannon', pieceColor: 'red', row: 2, column: 1, isMoveValid: false },
        { piece: '', pieceColor: '', row: 2, column: 2, isMoveValid: false },
        { piece: '', pieceColor: '', row: 2, column: 3, isMoveValid: false },
        { piece: '', pieceColor: '', row: 2, column: 4, isMoveValid: false },
        { piece: '', pieceColor: '', row: 2, column: 5, isMoveValid: false },
        { piece: '', pieceColor: '', row: 2, column: 6, isMoveValid: false },
        { piece: 'cannon', pieceColor: 'red', row: 2, column: 7, isMoveValid: false },
        { piece: '', pieceColor: '', row: 2, column: 8, isMoveValid: false },
    ],//row2
    [
        { piece: 'pawn', pieceColor: 'red', row: 3, column: 0, isMoveValid: false },
        { piece: '', pieceColor: '', row: 3, column: 1, isMoveValid: false },
        { piece: 'pawn', pieceColor: 'red', row: 3, column: 2, isMoveValid: false },
        { piece: '', pieceColor: '', row: 3, column: 3, isMoveValid: false },
        { piece: 'pawn', pieceColor: 'red', row: 3, column: 4, isMoveValid: false },
        { piece: '', pieceColor: '', row: 3, column: 5, isMoveValid: false },
        { piece: 'pawn', pieceColor: 'red', row: 3, column: 6, isMoveValid: false },
        { piece: '', pieceColor: '', row: 3, column: 7, isMoveValid: false },
        { piece: 'pawn', pieceColor: 'red', row: 3, column: 8, isMoveValid: false },
    ],//row3
    [
        { piece: '', pieceColor: '', row: 4, column: 0, isMoveValid: false },
        { piece: '', pieceColor: '', row: 4, column: 1, isMoveValid: false },
        { piece: '', pieceColor: '', row: 4, column: 2, isMoveValid: false },
        { piece: '', pieceColor: '', row: 4, column: 3, isMoveValid: false },
        { piece: '', pieceColor: '', row: 4, column: 4, isMoveValid: false },
        { piece: '', pieceColor: '', row: 4, column: 5, isMoveValid: false },
        { piece: '', pieceColor: '', row: 4, column: 6, isMoveValid: false },
        { piece: '', pieceColor: '', row: 4, column: 7, isMoveValid: false },
        { piece: '', pieceColor: '', row: 4, column: 8, isMoveValid: false },
    ],//row4
    [
        { piece: '', pieceColor: '', row: 5, column: 0, isMoveValid: false },
        { piece: '', pieceColor: '', row: 5, column: 1, isMoveValid: false },
        { piece: '', pieceColor: '', row: 5, column: 2, isMoveValid: false },
        { piece: '', pieceColor: '', row: 5, column: 3, isMoveValid: false },
        { piece: '', pieceColor: '', row: 5, column: 4, isMoveValid: false },
        { piece: '', pieceColor: '', row: 5, column: 5, isMoveValid: false },
        { piece: '', pieceColor: '', row: 5, column: 6, isMoveValid: false },
        { piece: '', pieceColor: '', row: 5, column: 7, isMoveValid: false },
        { piece: '', pieceColor: '', row: 5, column: 8, isMoveValid: false },
    ],//row5
    [
        { piece: 'pawn', pieceColor: 'black', row: 6, column: 0, isMoveValid: false },
        { piece: '', pieceColor: '', row: 6, column: 1, isMoveValid: false },
        { piece: 'pawn', pieceColor: 'black', row: 6, column: 2, isMoveValid: false },
        { piece: '', pieceColor: '', row: 6, column: 3, isMoveValid: false },
        { piece: 'rook', pieceColor: 'red', row: 6, column: 4, isMoveValid: false },
        { piece: '', pieceColor: '', row: 6, column: 5, isMoveValid: false },
        { piece: 'pawn', pieceColor: 'black', row: 6, column: 6, isMoveValid: false },
        { piece: '', pieceColor: '', row: 6, column: 7, isMoveValid: false },
        { piece: 'pawn', pieceColor: 'black', row: 6, column: 8, isMoveValid: false },
    ],//row6
    [
        { piece: '', pieceColor: '', row: 7, column: 0, isMoveValid: false },
        { piece: 'cannon', pieceColor: 'black', row: 7, column: 1, isMoveValid: false },
        { piece: '', pieceColor: '', row: 7, column: 2, isMoveValid: false },
        { piece: '', pieceColor: '', row: 7, column: 3, isMoveValid: false },
        { piece: '', pieceColor: '', row: 7, column: 4, isMoveValid: false },
        { piece: '', pieceColor: '', row: 7, column: 5, isMoveValid: false },
        { piece: '', pieceColor: '', row: 7, column: 6, isMoveValid: false },
        { piece: 'cannon', pieceColor: 'black', row: 7, column: 7, isMoveValid: false },
        { piece: '', pieceColor: '', row: 7, column: 8, isMoveValid: false },
    ],//row7
    [
        { piece: '', pieceColor: '', row: 8, column: 0, isMoveValid: false },
        { piece: '', pieceColor: '', row: 8, column: 1, isMoveValid: false },
        { piece: '', pieceColor: '', row: 8, column: 2, isMoveValid: false },
        { piece: '', pieceColor: '', row: 8, column: 3, isMoveValid: false },
        { piece: '', pieceColor: '', row: 8, column: 4, isMoveValid: false },
        { piece: '', pieceColor: '', row: 8, column: 5, isMoveValid: false },
        { piece: '', pieceColor: '', row: 8, column: 6, isMoveValid: false },
        { piece: '', pieceColor: '', row: 8, column: 7, isMoveValid: false },
        { piece: '', pieceColor: '', row: 8, column: 8, isMoveValid: false },
    ],//row8
    [
        { piece: 'rook', pieceColor: 'black', row: 9, column: 0, isMoveValid: false },
        { piece: 'knight', pieceColor: 'black', row: 9, column: 1, isMoveValid: false },
        { piece: 'bishop', pieceColor: 'black', row: 9, column: 2, isMoveValid: false },
        { piece: 'advisor', pieceColor: 'black', row: 9, column: 3, isMoveValid: false },
        { piece: 'king', pieceColor: 'black', row: 9, column: 4, isMoveValid: false },
        { piece: 'advisor', pieceColor: 'black', row: 9, column: 5, isMoveValid: false },
        { piece: 'bishop', pieceColor: 'black', row: 9, column: 6, isMoveValid: false },
        { piece: 'knight', pieceColor: 'black', row: 9, column: 7, isMoveValid: false },
        { piece: 'rook', pieceColor: 'black', row: 9, column: 8, isMoveValid: false },
    ],//row9
];


const Board = () => {
    const [player, setPlayer] = useState('white');
    const [isWinner, setIsWinner] = useState('')
    const [gameState, setGameState] = useState(initialState);
    const [isCheck, setIsCheck] = useState(false);

    // const [game, setGame] = useState(new Xiangqi());
    const game = new Xiangqi();

    const handleSquarePress = (from: string, to: string) => {
        game.move({ from: from, to: to }); // Kiểm tra nước đi
    };

    useEffect(() => {
        // console.log("p1", game.turn());

        // handleSquarePress("e3", "e4");
        // console.log("p2", game.turn());
        // handleSquarePress("e6", "e5");
        // console.log("p3", game.turn());
        // handleSquarePress("e4", "e5");
        // console.log("p4", game.turn());
        // console.log(game.ascii());

        const handleF = async () => {
            const check = await checkPotentialBlockMoves(gameState, 'black');
            console.log("thu coi", check);

        }
        handleF();

    }, [])

    // Checks if the king is in check or not
    const checkKingState = async () => {
        setIsCheck(await isInCheck(gameState, player === 'white' ? 'red' : 'black'))
    }

    const onMove = (from: { row: number; col: number }, to: { x: number; y: number }) => {
        console.log("x.", to.x / 40, "\ny.", to.y / 40);
        // Tính toán vị trí đích dựa trên tọa độ `to`
        const col = Math.round(to.x / 40); // Mỗi ô cờ có kích thước 40px
        const row = Math.round(to.y / 40);

        // Kiểm tra vị trí đích có hợp lệ không
        if (row >= 0 && row < 10 && col >= 0 && col < 9) {
            // console.log("fromCell", gameState[from.row][from.col], "\nfromRow", from.row, "\n fromCol", from.col);
            console.log("toCell", gameState[row][col], "\n Col", col, "\nRow", row);

            const fromCell = gameState[from.row][from.col];
            const toCell = gameState[row][col];

            // Kiểm tra xem nước đi có hợp lệ không
            if (isValidMove(fromCell.piece, fromCell.pieceColor, from, { row, col }, gameState)) {
                console.log("valid");

                // Cập nhật bàn cờ
                // const newBoard = gameState.map((row) => row.map((cell) => ({ ...cell })));
                // newBoard[row][col] = fromCell; // Đặt quân cờ vào vị trí đích
                // newBoard[from.row][from.col] = { piece: '', pieceColor: '' }; // Xóa quân cờ tại vị trí ban đầu
                // setBoard(newBoard);
            }

        }
    };

    // Gives suggetion of the valid moves for the selected piece
    const onPieceSelected = async ({ piece, pieceColor, row, column, isMoveValid }: ChineseChessBoardPiece) => {
        let newGameState = [...gameState];
        if (isWinner) {
            return
        }

        await checkKingState()

        newGameState.map((innerArray) => {
            innerArray.map((obj) => {
                obj.isMoveValid = false
            })
        })


        switch (piece) {
            case 'pawn':
                newGameState = checkPawnMove(gameState, { piece, pieceColor, row, column, isMoveValid })
                break;
            case 'rook':
                newGameState = checkRookMove(gameState, { piece, pieceColor, row, column, isMoveValid })
                break;
            case 'knight':
                newGameState = checkKnightMove(gameState, { piece, pieceColor, row, column, isMoveValid })
                break;
            case 'bishop':
                newGameState = checkBishopMove(gameState, { piece, pieceColor, row, column, isMoveValid })
                break;
            case 'advisor':
                newGameState = checkAdvisorMove(gameState, { piece, pieceColor, row, column, isMoveValid })
                break;
            case 'cannon':
                newGameState = checkCannonMove(gameState, { piece, pieceColor, row, column, isMoveValid })
                break;
            case 'king':
                newGameState = checkKingMove(gameState, { piece, pieceColor, row, column, isMoveValid })
                break;
            default:
                console.log('Please select valid piece')
                break;
        }


        setGameState(newGameState)
        // checkIsWinner(pieceColor,row,column)
    }

    const renderBoard = () => {
        return gameState.map((row, rowIndex) => (
            <View style={styles.row} key={`row-${rowIndex}`}>
                {row.map((cell, colIndex) => (
                    <Pressable onPress={() => {
                        if (player == cell.pieceColor || (cell.pieceColor === "red" && player === 'white')) {

                        }
                        onPieceSelected({
                            piece: cell.piece,
                            pieceColor: cell.pieceColor,
                            row: cell.row,
                            column: cell.column,
                            isMoveValid: cell.isMoveValid
                        })

                    }}

                        key={`${cell.column}+${cell.row}+${colIndex}`}
                    >
                        <DraggablePiece
                            key={`cell-${rowIndex}-${colIndex}`}
                            piece={cell.piece}
                            pieceColor={cell.pieceColor}
                            position={{ row: rowIndex, col: colIndex }}
                            onMove={onMove}
                            isValid={cell.isMoveValid}
                        />
                    </Pressable>
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

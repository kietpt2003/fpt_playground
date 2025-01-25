import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Pressable, Text } from 'react-native';
import { checkAdvisorMove, checkBishopMove, checkCannonMove, checkKingMove, checkKnightMove, checkPawnMove, checkPotentialBlockMoves, checkRookMove, convertToChessCoordinate, isInCheck, updateNewGameState } from '../utils/checkChineseChessLogic';
import { ScreenHeight } from '@rneui/base';
import { ChineseChessBoardPiece, chineseChessRowSize, chineseChessSize, PotentialMovePiece } from '../screens/types/chineseChessTypes';
import { Xiangqi } from 'xiangqi.js';
import ChineseChessSquare from './ChineseChessSquare';
import ChineseChessPiece from './ChineseChessPiece';
import { FontAwesome } from '@expo/vector-icons';
import { colors } from '../constants/colors';
import Svg, { Line } from 'react-native-svg';


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
        { piece: 'pawn', pieceColor: 'black', row: 6, column: 4, isMoveValid: false },
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
    const convertKeysToObject = (board: any[][]) => {
        return board.map(row =>
            row.map(cell => ({
                column: cell.column,
                isMoveValid: cell.isMoveValid,
                piece: cell.piece,
                pieceColor: cell.pieceColor,
                row: cell.row,
            }))
        );
    };

    const [player, setPlayer] = useState('black');
    const [isWinner, setIsWinner] = useState("")
    const [gameState, setGameState] = useState<ChineseChessBoardPiece[][]>(initialState);
    const [redIsCheck, setRedIsCheck] = useState(false);
    const [blackIsCheck, setBlackIsCheck] = useState(false);

    const [lostWhitePiece, setLostWhitePiece] = useState<ChineseChessBoardPiece[]>([]);
    const [lostBlackPiece, setLostBlackPiece] = useState<ChineseChessBoardPiece[]>([]);
    const [selectedPiece, setSelectedPiece] = useState<ChineseChessBoardPiece>({ piece: '', pieceColor: '', row: 0, column: 0, isMoveValid: false });
    const [availableForSelected, setAvailableForSelected] = useState<PotentialMovePiece[]>([]);

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
        console.log(game.ascii());

        // const handleF = async () => {
        //     const check = await isInCheck(gameState, 'red');
        //     console.log("thu coi", check);

        // }
        // handleF();

    }, [])

    // Checks if the king is in check or not
    const checkKingState = async () => {
        setRedIsCheck(await isInCheck(gameState, "red"));
        setBlackIsCheck(await isInCheck(gameState, "black"));
    }

    // Gives suggetion of the valid moves for the selected piece
    const onPieceSelected = async ({ piece, pieceColor, row, column, isMoveValid }: ChineseChessBoardPiece) => {
        let newGameState: ChineseChessBoardPiece[][] = JSON.parse(JSON.stringify(gameState));
        if (isWinner) {
            return
        }

        // await checkKingState()

        newGameState.map((innerArray) => {
            innerArray.map((obj) => {
                obj.isMoveValid = false
            })
        })

        switch (piece) {
            case 'pawn':
                newGameState = checkPawnMove(newGameState, { piece, pieceColor, row, column, isMoveValid })
                break;
            case 'rook':
                newGameState = checkRookMove(newGameState, { piece, pieceColor, row, column, isMoveValid })
                break;
            case 'knight':
                newGameState = checkKnightMove(newGameState, { piece, pieceColor, row, column, isMoveValid })
                break;
            case 'bishop':
                newGameState = checkBishopMove(newGameState, { piece, pieceColor, row, column, isMoveValid })
                break;
            case 'advisor':
                newGameState = checkAdvisorMove(newGameState, { piece, pieceColor, row, column, isMoveValid })
                break;
            case 'cannon':
                newGameState = checkCannonMove(newGameState, { piece, pieceColor, row, column, isMoveValid })
                break;
            case 'king':
                newGameState = await checkKingMove(newGameState, { piece, pieceColor, row, column, isMoveValid })
                break;
            default:
                console.log('Please select valid piece')
                break;
        }


        let newGameState2: ChineseChessBoardPiece[][] = JSON.parse(JSON.stringify(newGameState));

        const availableMoves = await checkPotentialBlockMoves(newGameState2, player === "white" ? "red" : "black")

        //Tìm nước đi phù hợp cho quân đã chọn
        const filteredMoves = (
            await Promise.all(
                availableMoves.map(async (element, index) => {
                    newGameState2[row][column] = {
                        piece: "",
                        pieceColor: "",
                        row: row,
                        column: column,
                        isMoveValid: false
                    };

                    newGameState2[element.potentialMove.row][element.potentialMove.column] = element.potentialMove;

                    const isCheck = await isInCheck(newGameState2, player === "white" ? "red" : "black");
                    // Trả về phần tử hợp lệ, nếu không hợp lệ thì trả về undefined
                    if (!isCheck && element.potentialMove.piece === piece && element.potentialMove.pieceColor === pieceColor) {
                        return element; // Phần tử hợp lệ
                    }
                    return undefined; // Loại bỏ phần tử không hợp lệ
                })
            )
        ).filter((el) => el !== undefined); // Loại bỏ undefined ngay sau Promise.all

        setAvailableForSelected(filteredMoves);

        if (filteredMoves.length != 0) {// Nếu có nước đi phù hợp thì cập nhật lại state
            newGameState2 = await updateNewGameState(newGameState, filteredMoves, { piece, pieceColor, row, column, isMoveValid });

            setGameState(newGameState2);
        } else {// Ngược lại thì set hết thành false tạo hiệu ứng không đi được
            newGameState.map((innerArray) => {
                innerArray.map((obj) => {
                    obj.isMoveValid = false
                })
            })
            setGameState(newGameState);
        }
    }

    // Updates the game state and piece position
    const makeMove = async ({ piece, pieceColor, row, column, isMoveValid }: ChineseChessBoardPiece) => {
        let newGameState = [...gameState];

        if (piece !== '') {
            // Collects lost pieces
            const lostPiece: ChineseChessBoardPiece = {
                piece: piece,
                pieceColor: pieceColor,
                row: row,
                column: column,
                isMoveValid: false
            }

            if (pieceColor === 'red') {
                let temp = lostWhitePiece
                temp.push(lostPiece)
                setLostWhitePiece(temp)

            } else {
                let temp = lostBlackPiece
                temp.push(lostPiece)
                setLostBlackPiece(temp)
            }
        }

        newGameState[row][column] = {
            row: row,
            column: column,
            piece: selectedPiece.piece,
            pieceColor: selectedPiece.pieceColor,
            isMoveValid: false,
        };

        newGameState[selectedPiece.row][selectedPiece.column] = {
            piece: '',
            pieceColor: '',
            isMoveValid: false,
            row: selectedPiece.row,
            column: selectedPiece.column
        };

        await checkKingState();

        newGameState.map((innerArray) => {
            innerArray.map((obj) => {
                newGameState[obj.row][obj.column].isMoveValid = false
            })
        })

        setSelectedPiece(
            { piece: '', pieceColor: '', row: 0, column: 0, isMoveValid: false }
        )

        setGameState(newGameState);
        console.log(convertToChessCoordinate(row, column));

        await checkIsWinner()
        setPlayer(selectedPiece.pieceColor === 'red' ? 'black' : 'white')

    }

    // Check if the game is over or not
    const checkIsWinner = async () => {
        let newGameState: ChineseChessBoardPiece[][] = JSON.parse(JSON.stringify(gameState));

        const availableMoves = await checkPotentialBlockMoves(gameState, player === "white" ? "black" : "red")
        const filteredMoves = (
            await Promise.all(
                availableMoves.map(async (element) => {
                    newGameState[element.fromMove.row][element.fromMove.column] = {
                        piece: "",
                        pieceColor: "",
                        row: element.fromMove.row,
                        column: element.fromMove.column,
                        isMoveValid: false
                    };

                    newGameState[element.potentialMove.row][element.potentialMove.column] = element.potentialMove;

                    const isCheck = await isInCheck(newGameState, player === "white" ? "black" : "red");

                    // Trả về phần tử hợp lệ, nếu không hợp lệ thì trả về undefined
                    if (!isCheck) {
                        return element; // Phần tử hợp lệ
                    }
                    return undefined; // Loại bỏ phần tử không hợp lệ
                })
            )
        ).filter((el) => el !== undefined); // Loại bỏ undefined ngay sau Promise.all

        if (filteredMoves.length == 0) {
            setIsWinner(`Player ${player === 'white' ? 'Red' : 'Black'} has won the game`)
        }
        // else {
        //     filteredMoves.forEach((element, index) => {
        //         if (index == 0) {
        //             console.log("Start-------------------------------------------");

        //         }
        //         console.log(element);
        //         if (filteredMoves.length - 1 == index) {
        //             console.log("-------------------------------------------End");

        //         }
        //     });
        // }

        setAvailableForSelected(filteredMoves);
    }

    const renderBoard = () => {
        return gameState.map((row, rowIndex) => (
            <View style={styles.row} key={`row-${rowIndex}`}>
                {row.map((cell, colIndex) => (
                    <Pressable
                        style={styles.piece}
                        onPress={() => {
                            if (player == cell.pieceColor || (cell.pieceColor === "red" && player === 'white')) {
                                onPieceSelected({
                                    piece: cell.piece,
                                    pieceColor: cell.pieceColor,
                                    row: cell.row,
                                    column: cell.column,
                                    isMoveValid: cell.isMoveValid
                                })

                                setSelectedPiece({
                                    piece: cell.piece,
                                    pieceColor: cell.pieceColor,
                                    row: cell.row,
                                    column: cell.column,
                                    isMoveValid: false
                                })
                            }

                            if (cell.isMoveValid) {
                                makeMove(gameState[cell.row][cell.column])
                            }

                        }}

                        key={`${cell.column}+${cell.row}+${colIndex}`}
                        disabled={isWinner !== ""}
                    >
                        <ChineseChessSquare
                            bgColor={colors.white}
                            topRightBg={row.length - 1 != colIndex && 0 != rowIndex && !(colIndex >= 3 && colIndex <= 4 && ((rowIndex >= 0 && rowIndex <= 2) || (rowIndex >= 8 && rowIndex <= 9)))}
                            topLeftBg={0 != colIndex && 0 != rowIndex && !(colIndex >= 4 && colIndex <= 5 && ((rowIndex >= 0 && rowIndex <= 2) || (rowIndex >= 8 && rowIndex <= 9)))}
                            bottomRightBg={gameState.length - 1 != rowIndex && row.length - 1 != colIndex && !(colIndex >= 3 && colIndex <= 4 && ((rowIndex >= 0 && rowIndex <= 1) || (rowIndex >= 7 && rowIndex <= 8)))}
                            bottomLeftBg={gameState.length - 1 != rowIndex && 0 != colIndex && !(colIndex >= 4 && colIndex <= 5 && ((rowIndex >= 0 && rowIndex <= 1) || (rowIndex >= 7 && rowIndex <= 8)))}
                            topRightL={(rowIndex == 2 && colIndex == 1) ||
                                (rowIndex == 2 && colIndex == 7) ||
                                (rowIndex == 7 && colIndex == 1) ||
                                (rowIndex == 7 && colIndex == 7) ||
                                (rowIndex == 3 && colIndex == 0) ||
                                (rowIndex == 3 && colIndex == 2) ||
                                (rowIndex == 3 && colIndex == 4) ||
                                (rowIndex == 3 && colIndex == 6) ||
                                (rowIndex == 6 && colIndex == 0) ||
                                (rowIndex == 6 && colIndex == 2) ||
                                (rowIndex == 6 && colIndex == 4) ||
                                (rowIndex == 6 && colIndex == 6)}
                            topLeftL={(rowIndex == 2 && colIndex == 1) ||
                                (rowIndex == 2 && colIndex == 7) ||
                                (rowIndex == 7 && colIndex == 1) ||
                                (rowIndex == 7 && colIndex == 7) ||
                                (rowIndex == 3 && colIndex == 2) ||
                                (rowIndex == 3 && colIndex == 4) ||
                                (rowIndex == 3 && colIndex == 6) ||
                                (rowIndex == 3 && colIndex == 8) ||
                                (rowIndex == 6 && colIndex == 2) ||
                                (rowIndex == 6 && colIndex == 4) ||
                                (rowIndex == 6 && colIndex == 6) ||
                                (rowIndex == 6 && colIndex == 8)}
                            bottomRightL={(rowIndex == 2 && colIndex == 1) ||
                                (rowIndex == 2 && colIndex == 7) ||
                                (rowIndex == 7 && colIndex == 1) ||
                                (rowIndex == 7 && colIndex == 7) ||
                                (rowIndex == 3 && colIndex == 0) ||
                                (rowIndex == 3 && colIndex == 2) ||
                                (rowIndex == 3 && colIndex == 4) ||
                                (rowIndex == 3 && colIndex == 6) ||
                                (rowIndex == 6 && colIndex == 0) ||
                                (rowIndex == 6 && colIndex == 2) ||
                                (rowIndex == 6 && colIndex == 4) ||
                                (rowIndex == 6 && colIndex == 6)}
                            bottomLeftL={(rowIndex == 2 && colIndex == 1) ||
                                (rowIndex == 2 && colIndex == 7) ||
                                (rowIndex == 7 && colIndex == 1) ||
                                (rowIndex == 7 && colIndex == 7) ||
                                (rowIndex == 3 && colIndex == 2) ||
                                (rowIndex == 3 && colIndex == 4) ||
                                (rowIndex == 3 && colIndex == 6) ||
                                (rowIndex == 3 && colIndex == 8) ||
                                (rowIndex == 6 && colIndex == 2) ||
                                (rowIndex == 6 && colIndex == 4) ||
                                (rowIndex == 6 && colIndex == 6) ||
                                (rowIndex == 6 && colIndex == 8)}
                            diagonalLeftToRightHalfTop={(rowIndex == 1 && colIndex == 4) ||
                                (rowIndex == 2 && colIndex == 5) ||
                                (rowIndex == 8 && colIndex == 4) ||
                                (rowIndex == 9 && colIndex == 5)}
                            diagonalLeftToRightHalfBottom={(rowIndex == 0 && colIndex == 3) ||
                                (rowIndex == 1 && colIndex == 4) ||
                                (rowIndex == 7 && colIndex == 3) ||
                                (rowIndex == 8 && colIndex == 4)}
                            diagonalRightToLeftHalfTop={(rowIndex == 1 && colIndex == 4) ||
                                (rowIndex == 2 && colIndex == 3) ||
                                (rowIndex == 8 && colIndex == 4) ||
                                (rowIndex == 9 && colIndex == 3)}
                            diagonalRightToLeftHalfBottom={(rowIndex == 0 && colIndex == 5) ||
                                (rowIndex == 1 && colIndex == 4) ||
                                (rowIndex == 7 && colIndex == 5) ||
                                (rowIndex == 8 && colIndex == 4)}
                            horizontalLeft={0 != colIndex}
                            horizontalRight={row.length - 1 != colIndex}
                            verticalTop={0 != rowIndex && (colIndex == 0 || rowIndex != 5 || colIndex == row.length - 1)}
                            verticalBottom={gameState.length - 1 != rowIndex && (colIndex == 0 || rowIndex != 4 || colIndex == row.length - 1)}
                        >
                            <View>
                                {cell.isMoveValid && (<FontAwesome name='circle' size={8} solid color={'#4dafff'} style={styles.suggest} />)}
                                {cell.piece &&
                                    <ChineseChessPiece
                                        piece={cell.piece}
                                        pieceColor={cell.pieceColor}
                                        size={chineseChessSize}
                                        borderColor={colors.black}
                                        chessBg={colors.milkyWhite}
                                    />
                                }
                            </View>
                        </ChineseChessSquare>
                    </Pressable>
                ))}
            </View>
        ));
    };

    return <View style={styles.board}>
        {renderBoard()}
        <View style={styles.redPalaceContainer} >
            <Svg
                width={chineseChessRowSize * 2}
                height={chineseChessRowSize * 2}
            >
                {/* Đường chéo từ trái sang phải */}
                <Line
                    x1={0}
                    y1={0}
                    x2={chineseChessRowSize * 2}
                    y2={chineseChessRowSize * 2}
                    stroke="black"
                    strokeWidth={1.5}
                />

                {/* Đường chéo từ phải sang trái */}
                <Line
                    x1={chineseChessRowSize * 2}
                    y1={0}
                    x2={0}
                    y2={chineseChessRowSize * 2}
                    stroke="black"
                    strokeWidth={1.5}
                />
            </Svg>
        </View>
        <View style={styles.blackPalaceContainer} >
            <Svg
                width={chineseChessRowSize * 2}
                height={chineseChessRowSize * 2}
            >
                {/* Đường chéo từ trái sang phải */}
                <Line
                    x1={0}
                    y1={0}
                    x2={chineseChessRowSize * 2}
                    y2={chineseChessRowSize * 2}
                    stroke="black"
                    strokeWidth={1.5}
                />

                {/* Đường chéo từ phải sang trái */}
                <Line
                    x1={chineseChessRowSize * 2}
                    y1={0}
                    x2={0}
                    y2={chineseChessRowSize * 2}
                    stroke="black"
                    strokeWidth={1.5}
                />
            </Svg>
        </View>
        {
            (redIsCheck && isWinner === "") &&
            <Text style={{
                position: "absolute",
                bottom: -130
            }}>Red bị chiếu</Text>
        }
        {
            (blackIsCheck && isWinner === "") &&
            <Text style={{
                position: "absolute",
                bottom: -130
            }}>Black bị chiếu</Text>
        }
        <Text style={{
            position: "absolute",
            bottom: -150
        }}>Moves {availableForSelected.length}</Text>
        {
            isWinner &&
            <Text style={{
                position: "absolute",
                bottom: -160
            }}>{isWinner}</Text>
        }
    </View>;
};

const styles = StyleSheet.create({
    board: {
        width: chineseChessRowSize * 8.5,
        height: chineseChessRowSize * 9.5,
        alignSelf: "center",
        justifyContent: "center",
        alignItems: "center",
        marginTop: ScreenHeight / 5,
        backgroundColor: colors.white,
        borderWidth: 4.5,
        borderRadius: 10
    },
    redPalaceContainer: {
        position: "absolute",
        top: (chineseChessRowSize * 0.5 - 9) / 2,
        left: (chineseChessRowSize * 0.5 - 9) / 2 + chineseChessRowSize * 3,
        width: chineseChessRowSize * 2,
        height: chineseChessRowSize * 2,
        backgroundColor: colors.white,
    },
    blackPalaceContainer: {
        position: "absolute",
        bottom: (chineseChessRowSize * 0.5 - 9) / 2,
        left: (chineseChessRowSize * 0.5 - 9) / 2 + chineseChessRowSize * 3,
        width: chineseChessRowSize * 2,
        height: chineseChessRowSize * 2,
        backgroundColor: colors.white,
    },
    row: {
        flexDirection: 'row',
    },
    piece: {
        width: chineseChessSize,
        height: chineseChessSize,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1
    },
    suggest: {
        position: "absolute",
        top: 16,
        left: 16,
        zIndex: 1
    },
});

export default Board;

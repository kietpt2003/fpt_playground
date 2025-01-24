import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Pressable, Text } from 'react-native';
import DraggablePiece from './DraggablePiece';
import { checkAdvisorMove, checkBishopMove, checkCannonMove, checkKingMove, checkKnightMove, checkPawnMove, checkPotentialBlockMoves, checkRookMove, isInCheck, updateNewGameState } from '../utils/checkChineseChessLogic';
import { ScreenHeight } from '@rneui/base';
import { ChineseChessBoardPiece, PotentialMovePiece } from '../screens/types/chineseChessTypes';
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
        // console.log(game.ascii());

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



        }
    };

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

        setGameState(newGameState)
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
                    <Pressable onPress={() => {
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

    return <View style={styles.board}>
        {renderBoard()}
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

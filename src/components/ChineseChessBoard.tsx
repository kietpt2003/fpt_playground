import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Pressable, Text, Image } from 'react-native';
import { checkAdvisorMove, checkBishopMove, checkCannonMove, checkKingMove, checkKnightMove, checkPawnMove, checkPotentialBlockMoves, checkRookMove, convertToChessCoordinate, isInCheck, updateNewGameState } from '../utils/checkChineseChessLogic';
import { ScreenHeight, ScreenWidth } from '@rneui/base';
import { ChineseChessBoardPiece, chineseChessRowSize, PotentialMovePiece } from '../screens/types/chineseChessTypes';
import { Xiangqi } from 'xiangqi.js';
import ChineseChessSquare from './ChineseChessSquare';
import ChineseChessPiece from './ChineseChessPiece';
import { FontAwesome } from '@expo/vector-icons';
import { colors } from '../constants/colors';
import Svg, { Line } from 'react-native-svg';
import { FlatList } from 'react-native-gesture-handler';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { statusBarHeight } from '../constants/statusBarHeight';
import UserAvatar from './UserAvatar';
import { User } from '../constants/entities/User';
import { faker } from '@faker-js/faker/.';
import { formatNumber } from '../utils/formatNumber';
import { useTranslation } from 'react-i18next';
import PTKCoinIcon from './PTKCoinIcon';

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

const chessBoardBackground = colors.chineseChessBoard1;
const chessBoardOutline = colors.gameColorItem2;
const chessPieceColor = colors.chessPiece;
const chessPieceBorder = colors.black;

const user1: User = {
    id: "abc",
    gender: "Male",
    name: "Tuan Kiet",
    imageUrl: faker.image.urlPicsumPhotos({ width: 200, height: 200 })
}

const user2: User = {
    id: "def",
    gender: "Male",
    name: "Minh Thong",
    imageUrl: faker.image.urlPicsumPhotos({ width: 200, height: 200 })
}

const ChineseChessBoard = () => {
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

    const [timeLeft, setTimeLeft] = useState<number>(3 * 60);

    const [player, setPlayer] = useState('black');
    const [isWinner, setIsWinner] = useState("")
    const [gameState, setGameState] = useState<ChineseChessBoardPiece[][]>(initialState);
    const [redIsCheck, setRedIsCheck] = useState(false);
    const [blackIsCheck, setBlackIsCheck] = useState(false);

    const [lostWhitePiece, setLostWhitePiece] = useState<ChineseChessBoardPiece[]>([]);
    const [lostBlackPiece, setLostBlackPiece] = useState<ChineseChessBoardPiece[]>([]);
    const [selectedPiece, setSelectedPiece] = useState<ChineseChessBoardPiece>({ piece: '', pieceColor: '', row: 0, column: 0, isMoveValid: false });
    const [availableForSelected, setAvailableForSelected] = useState<PotentialMovePiece[]>([]);

    const { t } = useTranslation();

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
                    let newGameState2: ChineseChessBoardPiece[][] = JSON.parse(JSON.stringify(newGameState));
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
        resetTime();
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

    // Format thời gian thành MM:SS
    const formatTime = (time: number): string => {
        const minutes = Math.floor(time / 60); // Tính phút
        const seconds = time % 60; // Tính giây
        return `${minutes.toString().padStart(2, '0')}:${seconds
            .toString()
            .padStart(2, '0')}`; // Format MM:SS
    };

    // Reset thời gian
    const resetTime = () => {
        setTimeLeft(3 * 60);
    };

    useEffect(() => {
        // Nếu thời gian còn lại > 0, thiết lập interva4
        if (timeLeft > 0) {
            const interval = setInterval(() => {
                setTimeLeft((prev) => prev - 1);
            }, 1000); // Cập nhật mỗi giây

            return () => clearInterval(interval); // Xóa interval khi component bị unmount hoặc timeLeft thay đổi
        }
    }, [timeLeft]);

    const renderRow = (data: ChineseChessBoardPiece[], rowIndex: number) => {
        return (
            <FlatList<ChineseChessBoardPiece>
                data={data}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item: cell, index: colIndex }) => (
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
                        disabled={isWinner !== ""}
                    >
                        <ChineseChessSquare
                            size={chineseChessRowSize}
                            bgColor={chessBoardBackground}
                            // topRightBg={data.length - 1 != colIndex && 0 != rowIndex && !(colIndex >= 3 && colIndex <= 4 && ((rowIndex >= 0 && rowIndex <= 2) || (rowIndex >= 8 && rowIndex <= 9)))}
                            // topLeftBg={0 != colIndex && 0 != rowIndex && !(colIndex >= 4 && colIndex <= 5 && ((rowIndex >= 0 && rowIndex <= 2) || (rowIndex >= 8 && rowIndex <= 9)))}
                            // bottomRightBg={gameState.length - 1 != rowIndex && data.length - 1 != colIndex && !(colIndex >= 3 && colIndex <= 4 && ((rowIndex >= 0 && rowIndex <= 1) || (rowIndex >= 7 && rowIndex <= 8)))}
                            // bottomLeftBg={gameState.length - 1 != rowIndex && 0 != colIndex && !(colIndex >= 4 && colIndex <= 5 && ((rowIndex >= 0 && rowIndex <= 1) || (rowIndex >= 7 && rowIndex <= 8)))}
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
                            horizontalLeft={0 != colIndex}
                            horizontalRight={data.length - 1 != colIndex}
                            verticalTop={0 != rowIndex && (colIndex == 0 || rowIndex != 5 || colIndex == data.length - 1)}
                            verticalBottom={gameState.length - 1 != rowIndex && (colIndex == 0 || rowIndex != 4 || colIndex == data.length - 1)}
                        >
                            <View>
                                {cell.isMoveValid && (<FontAwesome name='circle' size={8} solid color={'#4dafff'} style={styles.suggest} />)}
                                {cell.piece &&
                                    <ChineseChessPiece
                                        piece={cell.piece}
                                        pieceColor={cell.pieceColor}
                                        size={chineseChessRowSize}
                                        borderColor={chessPieceBorder}
                                        chessBg={chessPieceColor}
                                    />
                                }
                            </View>
                        </ChineseChessSquare>
                    </Pressable>
                )}
                scrollEnabled={false}
                horizontal={true}
            />
        )
    }

    const renderBoard = () => {
        return (
            <FlatList<ChineseChessBoardPiece[]>
                data={gameState}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item, index: rowIndex }) => (
                    renderRow(item, rowIndex)
                )}
                style={{
                    zIndex: 1
                }}
            />
        );
    };


    return (
        <SafeAreaView>
            <View style={styles.container}>
                <LinearGradient
                    colors={[colors.chineseChessBg1, colors.chineseChessBg2, colors.chineseChessBg3]} // Hiệu ứng chuyển màu
                    style={styles.containerLiner}
                />

                <View style={styles.headerContainer}>
                    <LinearGradient
                        colors={[colors.gameColorItem1, colors.gameColorItem2]} // Hiệu ứng chuyển màu
                        style={styles.headerContainerLinear}
                    />

                    {/* Player1*/}
                    <View style={styles.playerContainer}>
                        <UserAvatar
                            imageWidth={chineseChessRowSize * 1.8}
                            imageHeight={chineseChessRowSize * 1.8}
                            avatarUrl={user1.imageUrl}
                            imageBorderRadius={chineseChessRowSize}
                            loadingIndicatorSize={chineseChessRowSize / 3}
                            imageBorderColor={player !== "white" ? colors.approve : colors.black}
                            imageBorderWidth={4.5}
                        />
                        <Text
                            style={styles.playerName}
                            numberOfLines={1}
                        >
                            {user1.name}
                        </Text>
                        <View style={styles.coinContainer}>
                            <Image
                                source={require("../../assets/images/ptk-coin.png")}
                                style={styles.coinImage}
                            />
                            <Text style={styles.playerName}>{formatNumber(12450, t)}</Text>
                        </View>
                    </View>

                    <View style={styles.timingContainer}>
                        <Image
                            source={require("../../assets/images/coinPackage.webp")}
                            style={styles.coinPackage}
                        />
                        <View style={styles.petCoinContainer}>
                            <Image
                                source={require("../../assets/images/ptk-coin.png")}
                                style={styles.coinImage}
                            />
                            <Text style={styles.playerName}>{formatNumber(450, t)}</Text>
                        </View>
                        <Text style={styles.countdownText}>{formatTime(timeLeft)}</Text>
                    </View>

                    {/* Player2 */}
                    <View style={styles.playerContainer}>
                        <UserAvatar
                            imageWidth={chineseChessRowSize * 1.8}
                            imageHeight={chineseChessRowSize * 1.8}
                            avatarUrl={user2.imageUrl}
                            imageBorderRadius={chineseChessRowSize}
                            loadingIndicatorSize={chineseChessRowSize / 3}
                            imageBorderColor={player === "white" ? colors.approve : colors.black}
                            imageBorderWidth={4.5}
                        />
                        <Text
                            style={styles.playerName}
                            numberOfLines={1}
                        >
                            {user2.name}
                        </Text>
                        <View style={styles.coinContainer}>
                            <Image
                                source={require("../../assets/images/ptk-coin.png")}
                                style={styles.coinImage}
                            />
                            <Text style={styles.playerName}>{formatNumber(13550, t)}</Text>
                        </View>
                    </View>
                </View>

                {/* Chinese Chess Board */}
                <View style={styles.board}>
                    <View style={{
                        width: chineseChessRowSize * 9,
                        height: chineseChessRowSize * 10,
                        alignItems: "center",
                        justifyContent: "center"
                    }}>
                        {renderBoard()}
                        {/* Custom Background */}
                        <LinearGradient
                            colors={[colors.chineseChessBoard1, colors.chineseChessBoard2]} // Hiệu ứng chuyển màu
                            style={{
                                position: "absolute",
                                width: chineseChessRowSize * 8,
                                height: chineseChessRowSize * 9,
                            }}
                            start={{ x: 0, y: 1 }} // Bắt đầu từ dưới trái
                            end={{ x: 1, y: 0 }} //Kết thúc ở trên phải
                        />
                    </View>
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
                </View>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        width: ScreenWidth,
        height: ScreenHeight - statusBarHeight,
    },
    containerLiner: {
        position: "absolute",
        width: "100%",
        height: "100%",
    },
    headerContainer: {
        width: ScreenWidth,
        height: ScreenHeight / 5.5,
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center"
    },
    headerContainerLinear: {
        position: "absolute",
        width: "100%",
        height: "100%",
        left: 0
    },
    playerContainer: {
        overflow: "hidden",
        width: chineseChessRowSize * 1.8
    },
    playerName: {
        fontFamily: "RobotoMedium",
        fontSize: 18,
        textAlign: "center",
        color: colors.milkyWhite
    },
    coinContainer: {
        flexDirection: "row"
    },
    coinImage: {
        width: chineseChessRowSize / 1.5,
        height: chineseChessRowSize / 1.5,
    },
    timingContainer: {
        alignItems: "center"
    },
    coinPackage: {
        width: chineseChessRowSize * 1.4,
        height: chineseChessRowSize * 1.4,
    },
    petCoinContainer: {
        flexDirection: "row",
        width: chineseChessRowSize * 2,
        height: chineseChessRowSize,
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 1,
        borderRadius: 7,
        backgroundColor: colors.darkBrown
    },
    countdownText: {
        fontSize: 24,
        fontFamily: "RobotoMedium",
        color: colors.milkyWhite
    },
    board: {
        width: chineseChessRowSize * 10,
        height: chineseChessRowSize * 11,
        alignSelf: "center",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 20,
        backgroundColor: chessBoardOutline,
        borderWidth: 4.5,
        borderRadius: 10,
    },
    redPalaceContainer: {
        position: "absolute",
        top: chineseChessRowSize - 4.5,
        width: chineseChessRowSize * 2,
        height: chineseChessRowSize * 2,
        // backgroundColor: chessBoardBackground,
        zIndex: 0,
    },
    blackPalaceContainer: {
        position: "absolute",
        bottom: chineseChessRowSize - 4.5,
        width: chineseChessRowSize * 2,
        height: chineseChessRowSize * 2,
        // backgroundColor: chessBoardBackground,
        zIndex: 0,
    },
    row: {
        flexDirection: 'row',
    },
    piece: {
        width: chineseChessRowSize,
        height: chineseChessRowSize,
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

export default ChineseChessBoard;

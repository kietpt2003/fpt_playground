import { ChineseChessBoardPiece, ChineseChessPiece } from "../screens/types/chineseChessTypes";

export interface Position {
    row: number;
    col: number;
}

export const isValidMove = (piece: ChineseChessPiece, pieceColor: string, from: Position, to: Position, board: any[][]): boolean => {
    const rowDiff = Math.abs(from.row - to.row);
    const colDiff = Math.abs(from.col - to.col);

    switch (piece) {
        case 'king': // Vua (Tướng)
            return rowDiff + colDiff === 1 && withinKingPalace(to, pieceColor);

        case 'advisor': // Sĩ
            return rowDiff === 1 && colDiff === 1 && withinKingPalace(to, pieceColor);

        case 'elephant': // Tượng
            return rowDiff === 2 && colDiff === 2 && isPathClear(from, to, board) && withinElephantZone(to, pieceColor);

        case 'knight': // Mã
            return (rowDiff === 2 && colDiff === 1 || rowDiff === 1 && colDiff === 2) && isPathClearForKnight(from, to, board);

        case 'rook': // Xe
            return (rowDiff === 0 || colDiff === 0) && isPathClear(from, to, board);

        case 'cannon': // Pháo
            return (rowDiff === 0 || colDiff === 0) && isCannonMoveValid(from, to, board);

        case 'pawn': // Tốt
            return isValidPawnMove(pieceColor, from, to);

        default:
            return false;
    }
};

// Vua/Sĩ chỉ được di chuyển trong cung
const withinKingPalace = (pos: Position, pieceColor: string): boolean => {
    if (pieceColor === 'red') return pos.row >= 7 && pos.col >= 3 && pos.col <= 5;
    if (pieceColor === 'black') return pos.row <= 2 && pos.col >= 3 && pos.col <= 5;
    return false;
};

// Tượng không được qua sông
const withinElephantZone = (pos: Position, pieceColor: string): boolean => {
    if (pieceColor === 'red') return pos.row <= 4;
    if (pieceColor === 'black') return pos.row >= 5;
    return false;
};

// Tốt chỉ được đi thẳng trước khi qua sông, sau đó được đi ngang
const isValidPawnMove = (pieceColor: string, from: Position, to: Position): boolean => {
    if (pieceColor === 'red') {
        if (from.row >= 5) return from.row - to.row === 1 && from.col === to.col;
        return (from.row - to.row === 1 && from.col === to.col) || (from.row === to.row && Math.abs(from.col - to.col) === 1);
    }
    if (pieceColor === 'black') {
        if (from.row <= 4) return to.row - from.row === 1 && from.col === to.col;
        return (to.row - from.row === 1 && from.col === to.col) || (from.row === to.row && Math.abs(from.col - to.col) === 1);
    }
    return false;
};



// Kiểm tra đường đi có bị chặn không (cho Xe, Tượng, Pháo)
const isPathClear = (from: Position, to: Position, board: any[][]): boolean => {
    const rowDiff = Math.sign(to.row - from.row);
    const colDiff = Math.sign(to.col - from.col);

    let current = { row: from.row + rowDiff, col: from.col + colDiff };
    while (current.row !== to.row || current.col !== to.col) {
        if (board[current.row][current.col].piece) return false;
        current.row += rowDiff;
        current.col += colDiff;
    }
    return true;
};

// Kiểm tra di chuyển của Mã có bị chặn không
const isPathClearForKnight = (from: Position, to: Position, board: any[][]): boolean => {
    if (Math.abs(to.row - from.row) === 2) {
        const midRow = (from.row + to.row) / 2;
        return !board[midRow][from.col].piece;
    }
    if (Math.abs(to.col - from.col) === 2) {
        const midCol = (from.col + to.col) / 2;
        return !board[from.row][midCol].piece;
    }
    return false;
};

// Kiểm tra di chuyển của Pháo (bao gồm nhảy qua quân cản để ăn)
const isCannonMoveValid = (from: Position, to: Position, board: any[][]): boolean => {
    const rowDiff = Math.sign(to.row - from.row);
    const colDiff = Math.sign(to.col - from.col);

    let current = { row: from.row + rowDiff, col: from.col + colDiff };
    let obstacles = 0;

    while (current.row !== to.row || current.col !== to.col) {
        if (board[current.row][current.col].piece) obstacles++;
        current.row += rowDiff;
        current.col += colDiff;
    }
    if (board[to.row][to.col].piece) return obstacles === 1; // Nhảy qua 1 quân để ăn
    return obstacles === 0; // Không nhảy qua quân nào để di chuyển
};

export const checkPawnMove = (gameState: ChineseChessBoardPiece[][], { pieceColor, row, column }: ChineseChessBoardPiece) => {
    let newGameState = [...gameState]

    if (pieceColor === 'red') { //TH quân đỏ (nẳm trên)
        if (row >= 3 && row < 9) {
            newGameState[row + 1][column].isMoveValid =
                (newGameState[row + 1][column].piece === "" ||
                    newGameState[row + 1][column].pieceColor !== pieceColor)
        }
        if (row >= 5) { //TH tốt qua sông
            if (column == 0) { //TH tốt qua sông mà sát mép trái thì không đi bên trái được
                newGameState[row][column + 1].isMoveValid =
                    (newGameState[row][column + 1].piece === "" ||
                        newGameState[row][column + 1].pieceColor !== pieceColor)
            } else if (column == 8) { //TH tốt qua sông mà sát mép phải thì không đi bên phải được
                newGameState[row][column - 1].isMoveValid =
                    (newGameState[row][column - 1].piece === "" ||
                        newGameState[row][column - 1].pieceColor !== pieceColor)
            } else { //TH tốt qua sông mà không sát mép thì đi trái phải được
                newGameState[row][column + 1].isMoveValid =
                    (newGameState[row][column + 1].piece === "" ||
                        newGameState[row][column + 1].pieceColor !== pieceColor)

                newGameState[row][column - 1].isMoveValid =
                    (newGameState[row][column - 1].piece === "" ||
                        newGameState[row][column - 1].pieceColor !== pieceColor)
            }
        }
    } else { //TH quân đen nằm dưới
        if (row <= 6 && row > 0) {
            newGameState[row - 1][column].isMoveValid =
                (newGameState[row - 1][column].piece === "" ||
                    newGameState[row - 1][column].pieceColor === pieceColor)
        }
        if (row <= 4) { //TH tốt qua sông
            if (column == 0) { //TH tốt qua sông mà sát mép trái thì không đi bên trái được
                newGameState[row][column + 1].isMoveValid =
                    (newGameState[row][column + 1].piece === "" ||
                        newGameState[row][column + 1].pieceColor === pieceColor)
            } else if (column == 8) { //TH tốt qua sông mà sát mép phải thì không đi bên phải được
                newGameState[row][column - 1].isMoveValid =
                    (newGameState[row][column - 1].piece === "" ||
                        newGameState[row][column - 1].pieceColor === pieceColor)
            } else { //TH tốt qua sông mà không sát mép thì đi trái phải được
                newGameState[row][column + 1].isMoveValid =
                    (newGameState[row][column + 1].piece === "" ||
                        newGameState[row][column + 1].pieceColor === pieceColor)

                newGameState[row][column - 1].isMoveValid =
                    (newGameState[row][column - 1].piece === "" ||
                        newGameState[row][column - 1].pieceColor === pieceColor)
            }
        }
    }
    return newGameState
}

export const checkRookMove = (gameState: ChineseChessBoardPiece[][], { pieceColor, row, column }: ChineseChessBoardPiece) => {
    let newGameState = [...gameState]

    let selectedPiece = pieceColor

    for (let i = row - 1; i >= 0; i--) {
        const targetSquare = gameState[i][column];
        if (targetSquare.piece === '') {
            newGameState[i][column].isMoveValid = true;
        } else if (targetSquare.pieceColor !== selectedPiece) {
            newGameState[i][column].isMoveValid = true;
            break;
        } else {
            break;
        }
    }

    // Downward
    for (let i = row + 1; i <= 7; i++) {
        const targetSquare = gameState[i][column];
        if (targetSquare.piece === '') {
            newGameState[i][column].isMoveValid = true;
        } else if (targetSquare.pieceColor !== selectedPiece) {
            newGameState[i][column].isMoveValid = true;
            break;
        } else {
            break;
        }
    }

    // Right
    for (let i = column + 1; i <= 7; i++) {
        const targetSquare = gameState[row][i];
        if (targetSquare.piece === '') {
            newGameState[row][i].isMoveValid = true;
        } else if (targetSquare.pieceColor !== selectedPiece) {
            newGameState[row][i].isMoveValid = true;
            break;
        } else {
            break;
        }
    }

    // Left
    for (let i = column - 1; i >= 0; i--) {
        const targetSquare = gameState[row][i];
        if (targetSquare.piece === '') {
            newGameState[row][i].isMoveValid = true;
        } else if (targetSquare.pieceColor !== selectedPiece) {
            newGameState[row][i].isMoveValid = true;
            break;
        } else {
            break;
        }
    }

    return newGameState
}

export const checkKnightMove = (gameState: ChineseChessBoardPiece[][], { piece, pieceColor, row, column }: ChineseChessBoardPiece) => {
    let newGameState = [...gameState]

    const targetSquare = gameState[row][column];
    if (row == 0) {
        if (column >= 0 && column <= 6) {
            const blockRightSquare = gameState[row][column + 1];
            if (blockRightSquare.pieceColor === "") {
                newGameState[row + 1][column + 2].isMoveValid =
                    (newGameState[row + 1][column + 2].piece === "" ||
                        newGameState[row + 1][column + 2].pieceColor !== pieceColor)
            }

            const blockBottomSquare = gameState[row + 1][column];
            if (blockBottomSquare.pieceColor === "") {
                newGameState[row + 2][column + 1].isMoveValid =
                    (newGameState[row + 2][column + 1].piece === "" ||
                        newGameState[row + 2][column + 1].pieceColor !== pieceColor)
                if (column != 0) {
                    newGameState[row + 2][column - 1].isMoveValid =
                        (newGameState[row + 2][column - 1].piece === "" ||
                            newGameState[row + 2][column - 1].pieceColor !== pieceColor)
                }
            }

        }
        if (column >= 2 && column <= 8) {
            const blockLeftSquare = gameState[row][column - 1];
            if (blockLeftSquare.pieceColor === "") {
                newGameState[row + 1][column - 2].isMoveValid =
                    (newGameState[row + 1][column - 2].piece === "" ||
                        newGameState[row + 1][column - 2].pieceColor !== pieceColor)
            }

            const blockBottomSquare = gameState[row + 1][column];
            if (blockBottomSquare.pieceColor === "") {
                newGameState[row + 2][column - 1].isMoveValid =
                    (newGameState[row + 2][column - 1].piece === "" ||
                        newGameState[row + 2][column - 1].pieceColor !== pieceColor)
                if (column != 8) {
                    newGameState[row + 2][column + 1].isMoveValid =
                        (newGameState[row + 2][column + 1].piece === "" ||
                            newGameState[row + 2][column + 1].pieceColor !== pieceColor)
                }
            }
        }
    }

    if (row >= 2 && row <= 7) {//TH cách đỉnh >= 2 ô và cách đáy <= 7 ô
        const blockTopSquare = gameState[row - 1][column];
        if (blockTopSquare.pieceColor === "") { //Top ko có người chặn
            if (column == 0) {// Đi được bên phải
                newGameState[row - 2][column + 1].isMoveValid =
                    (newGameState[row - 2][column + 1].piece === "" ||
                        newGameState[row - 2][column + 1].pieceColor !== pieceColor)
            } else if (column == 8) {// Đi được bên trái
                newGameState[row - 2][column - 1].isMoveValid =
                    (newGameState[row - 2][column - 1].piece === "" ||
                        newGameState[row - 2][column - 1].pieceColor !== pieceColor)
            } else { // Đi được cả hai bên
                newGameState[row - 2][column + 1].isMoveValid =
                    (newGameState[row - 2][column + 1].piece === "" ||
                        newGameState[row - 2][column + 1].pieceColor !== pieceColor)

                newGameState[row - 2][column - 1].isMoveValid =
                    (newGameState[row - 2][column - 1].piece === "" ||
                        newGameState[row - 2][column - 1].pieceColor !== pieceColor)
            }
        }

        const blockBottomSquare = gameState[row + 1][column];
        if (blockBottomSquare.pieceColor === "") { //Bottom ko có người chặn
            if (column == 0) {// Đi được bên phải
                newGameState[row + 2][column + 1].isMoveValid =
                    (newGameState[row + 2][column + 1].piece === "" ||
                        newGameState[row + 2][column + 1].pieceColor !== pieceColor)
            } else if (column == 8) {// Đi được bên trái
                newGameState[row + 2][column - 1].isMoveValid =
                    (newGameState[row + 2][column - 1].piece === "" ||
                        newGameState[row + 2][column - 1].pieceColor !== pieceColor)
            } else { // Đi được cả hai bên
                newGameState[row + 2][column + 1].isMoveValid =
                    (newGameState[row + 2][column + 1].piece === "" ||
                        newGameState[row + 2][column + 1].pieceColor !== pieceColor)

                newGameState[row + 2][column - 1].isMoveValid =
                    (newGameState[row + 2][column - 1].piece === "" ||
                        newGameState[row + 2][column - 1].pieceColor !== pieceColor)
            }
        }
    }

    const blockRightSquare = gameState[row][column + 1];
    return newGameState
}

export const checkBishopMove = (gameState: ChineseChessBoardPiece[][], { piece, pieceColor, row, column }: ChineseChessBoardPiece) => {
    let newGameState = [...gameState]
    // newGameState.map((innerArray)=>{
    //     innerArray.map((obj)=>{
    //         obj.isMoveValid=false
    //     })
    // })

    const checkValidMove = (i: number, j: number) => {
        if (i >= 0 && i < 8 && j >= 0 && j < 8) {
            const targetSquare = gameState[i][j];
            if (targetSquare.piece === '') {
                newGameState[i][j].isMoveValid = true;
            } else if (targetSquare.pieceColor !== pieceColor) {
                newGameState[i][j].isMoveValid = true;
                return false;
            } else {
                return false;
            }
        }
        return true;
    };

    for (let i = 1; i <= 7; i++) {
        let res = checkValidMove(row - i, column + i);
        if (!res) {
            break;
        }
    }

    for (let i = 1; i <= 7; i++) {
        let res = checkValidMove(row - i, column - i);
        if (!res) {
            break;
        }
    }

    for (let i = 1; i <= 7; i++) {
        let res = checkValidMove(row + i, column + i);
        if (!res) {
            break;
        }
    }

    for (let i = 1; i <= 7; i++) {
        let res = checkValidMove(row + i, column - i);
        if (!res) {
            break;
        }
    }

    return newGameState
}

export const checkQueenMove = (gameState: ChineseChessBoardPiece[][], { piece, pieceColor, row, column }: ChineseChessBoardPiece) => {
    let newGameState = [...gameState]
    // newGameState.map((innerArray)=>{
    //     innerArray.map((obj)=>{
    //         obj.isMoveValid=false
    //     })
    // })

    const checkValidMove = (i: number, j: number) => {
        if (i >= 0 && i < 8 && j >= 0 && j < 8) {
            const targetSquare = gameState[i][j];
            if (targetSquare.piece === '') {
                newGameState[i][j].isMoveValid = true;
            } else if (targetSquare.pieceColor !== pieceColor) {
                newGameState[i][j].isMoveValid = true;
                return false;
            } else {
                return false;
            }
        }
        return true;
    };

    let upMove = true, downMove = true, rightMove = true, leftMove = true, diagonalLeftUp = true, diagonalLeftDown = true,
        diagonalRightUp = true, diagonalRightDown = true

    for (let i = 1; i <= 7; i++) {

        if (upMove) {
            upMove = checkValidMove(row - i, column);
        }

        if (downMove) {
            downMove = checkValidMove(row + i, column);
        }

        if (rightMove) {
            rightMove = checkValidMove(row, column + i);
        }

        if (leftMove) {
            leftMove = checkValidMove(row, column - i);
        }

        if (diagonalLeftUp) {
            diagonalLeftUp = checkValidMove(row - i, column - i);
        }

        if (diagonalLeftDown) {
            diagonalLeftDown = checkValidMove(row + i, column - i);
        }

        if (diagonalRightUp) {
            diagonalRightUp = checkValidMove(row - i, column + i);
        }

        if (diagonalRightDown) {
            diagonalRightDown = checkValidMove(row + i, column + i);
        }
    }

    return newGameState
}

export const checkKingMove = (gameState: ChineseChessBoardPiece[][], { piece, pieceColor, row, column }: ChineseChessBoardPiece) => {
    let newGameState = [...gameState]
    // newGameState.map((innerArray)=>{
    //     innerArray.map((obj)=>{
    //         obj.isMoveValid=false
    //     })
    // })

    if (row === 0) {
        newGameState[row + 1][column].isMoveValid = newGameState[row + 1][column].piece === '' ||
            newGameState[row + 1][column].pieceColor !== pieceColor

        // Diagonal
        if (column === 0) {

            newGameState[row + 1][column + 1].isMoveValid = newGameState[row + 1][column + 1].piece === '' ||
                newGameState[row + 1][column + 1].pieceColor !== pieceColor

        } else if (column === 7) {
            newGameState[row + 1][column - 1].isMoveValid = newGameState[row + 1][column - 1].piece === '' ||
                newGameState[row + 1][column - 1].pieceColor !== pieceColor
        } else {

            newGameState[row + 1][column + 1].isMoveValid = newGameState[row + 1][column + 1].piece === '' ||
                newGameState[row + 1][column + 1].pieceColor !== pieceColor

            newGameState[row + 1][column - 1].isMoveValid = newGameState[row + 1][column - 1].piece === '' ||
                newGameState[row + 1][column - 1].pieceColor !== pieceColor

        }

    } else if (row === 7) {
        newGameState[row - 1][column].isMoveValid = newGameState[row - 1][column].piece === '' ||
            newGameState[row - 1][column].pieceColor !== pieceColor

        // Diagonal
        if (column === 0) {

            newGameState[row - 1][column + 1].isMoveValid = newGameState[row - 1][column + 1].piece === '' ||
                newGameState[row - 1][column + 1].pieceColor !== pieceColor


        } else if (column === 7) {

            newGameState[row - 1][column - 1].isMoveValid = newGameState[row - 1][column - 1].piece === '' ||
                newGameState[row - 1][column - 1].pieceColor !== pieceColor

        } else {

            newGameState[row - 1][column - 1].isMoveValid = newGameState[row - 1][column - 1].piece === '' ||
                newGameState[row - 1][column - 1].pieceColor !== pieceColor

            newGameState[row - 1][column + 1].isMoveValid = newGameState[row - 1][column + 1].piece === '' ||
                newGameState[row - 1][column + 1].pieceColor !== pieceColor

        }

    } else {
        newGameState[row + 1][column].isMoveValid = newGameState[row + 1][column].piece === '' ||
            newGameState[row + 1][column].pieceColor !== pieceColor

        newGameState[row - 1][column].isMoveValid = newGameState[row - 1][column].piece === '' ||
            newGameState[row - 1][column].pieceColor !== pieceColor

        // Diagonal
        if (column === 0) {

            newGameState[row + 1][column + 1].isMoveValid = newGameState[row + 1][column + 1].piece === '' ||
                newGameState[row + 1][column + 1].pieceColor !== pieceColor

            newGameState[row - 1][column + 1].isMoveValid = newGameState[row - 1][column + 1].piece === '' ||
                newGameState[row - 1][column + 1].pieceColor !== pieceColor


        } else if (column === 7) {


            newGameState[row + 1][column - 1].isMoveValid = newGameState[row + 1][column - 1].piece === '' ||
                newGameState[row + 1][column - 1].pieceColor !== pieceColor

            newGameState[row - 1][column - 1].isMoveValid = newGameState[row - 1][column - 1].piece === '' ||
                newGameState[row - 1][column - 1].pieceColor !== pieceColor

        } else {

            newGameState[row + 1][column + 1].isMoveValid = newGameState[row + 1][column + 1].piece === '' ||
                newGameState[row + 1][column + 1].pieceColor !== pieceColor

            newGameState[row - 1][column - 1].isMoveValid = newGameState[row - 1][column - 1].piece === '' ||
                newGameState[row - 1][column - 1].pieceColor !== pieceColor

            newGameState[row - 1][column + 1].isMoveValid = newGameState[row - 1][column + 1].piece === '' ||
                newGameState[row - 1][column + 1].pieceColor !== pieceColor

            newGameState[row + 1][column - 1].isMoveValid = newGameState[row + 1][column - 1].piece === '' ||
                newGameState[row + 1][column - 1].pieceColor !== pieceColor

        }

    }

    // Horizontal && Vertical
    if (column === 0) {

        newGameState[row][column + 1].isMoveValid = newGameState[row][column + 1].piece === '' ||
            newGameState[row][column + 1].pieceColor !== pieceColor

    } else if (column === 7) {

        newGameState[row][column - 1].isMoveValid = newGameState[row][column - 1].piece === '' ||
            newGameState[row][column - 1].pieceColor !== pieceColor

    } else {

        newGameState[row][column + 1].isMoveValid = newGameState[row][column + 1].piece === '' ||
            newGameState[row][column + 1].pieceColor !== pieceColor

        newGameState[row][column - 1].isMoveValid = newGameState[row][column - 1].piece === '' ||
            newGameState[row][column - 1].pieceColor !== pieceColor
    }

    return newGameState
}

// Checks if the king is in check or not
export const isInCheck = async (gameState: ChineseChessBoardPiece[][], pieceColor: string) => {
    let newGameState = [...gameState]
    let isCheck = false;

    newGameState.map((innerArray) => {
        innerArray.map((obj) => {


            if (obj.piece !== '' && obj.pieceColor !== pieceColor) {
                // console.log(obj.piece,obj.pieceColor)
                switch (obj.piece) {
                    case 'pawn':
                        newGameState = checkPawnMove(newGameState, obj)
                        break;
                    case 'rook':
                        newGameState = checkRookMove(newGameState, obj)
                        break;
                    case 'knight':
                        newGameState = checkKnightMove(newGameState, obj)
                        break;
                    case 'king':
                        newGameState = checkKingMove(newGameState, obj)
                        break;
                    default:
                        break;
                }
            }

            if (obj.isMoveValid === true && obj.pieceColor !== pieceColor && obj.piece === 'king') {
                console.log("Opponent King in check")
            }

            // obj.isMoveValid=false

        })
    })

    let king: ChineseChessBoardPiece[] | undefined;
    king = newGameState.find(innerArray => {
        const potentialKing = innerArray.find(obj => obj.piece === 'king' && obj.pieceColor === pieceColor);
        // console.log(potentialKing)
        return potentialKing?.pieceColor === pieceColor && potentialKing.piece === 'king' && potentialKing?.isMoveValid === true;
    });

    // console.log(king)
    if (king !== undefined) {
        isCheck = true
    }

    return isCheck
}

// Find and return potential moves to block the check
export const checkPotentialBlockMoves = async (gameState: ChineseChessBoardPiece[][], pieceColor: string) => {
    let newGameState = [...gameState]
    let potentialMoves: ChineseChessBoardPiece[] = []

    newGameState.map((innerArray) => {
        innerArray.map((obj) => {
            obj.isMoveValid = false
        })
    })

    await Promise.all(
        newGameState.map(async (innerArray) => {
            await Promise.all(
                innerArray.map(async (obj) => {

                    if (obj.piece !== '' && obj.pieceColor === pieceColor) {
                        // console.log(obj.piece,obj.pieceColor)
                        let tempState: ChineseChessBoardPiece[][] = newGameState;
                        tempState.map((innerArray1) => {
                            innerArray1.map((obj1) => {
                                obj1.isMoveValid = false
                            })
                        })

                        switch (obj.piece) {
                            case 'pawn':
                                tempState = checkPawnMove(newGameState, obj)
                                break;
                            case 'rook':
                                tempState = checkRookMove(newGameState, obj)
                                break;
                            case 'knight':
                                tempState = checkKnightMove(newGameState, obj)
                                break;
                            case 'king':
                                tempState = checkKingMove(newGameState, obj)
                                break;
                            default:
                                break;
                        }

                        // console.log(obj.piece,obj.pieceColor,obj.row,obj.column,obj.isMoveValid)


                        const res = await checkValidMove(tempState, obj.piece, obj.pieceColor)
                        if (res.length !== 0) {
                            res.forEach((move => {
                                potentialMoves.push(move)
                            }))
                        }
                    }
                }))
        }))

    return potentialMoves
}


// Checks if the move can block the check or not
export const checkValidMove = async (gameState: ChineseChessBoardPiece[][], piece: ChineseChessPiece, pieceColor: string) => {
    let newGameState = gameState.map(row =>
        row.map(square => ({ ...square }))
    );


    let potentialMoves: ChineseChessBoardPiece[] = [];

    await Promise.all(
        newGameState.map(async (rowArray) => {
            await Promise.all(
                rowArray.map(async (square) => {
                    if (square.isMoveValid === true && square.pieceColor !== pieceColor) {
                        const { row, column } = square;
                        let temp: ChineseChessBoardPiece[][] = newGameState.map(row =>
                            row.map(sq => ({ ...sq }))
                        );

                        // console.log(square);

                        temp[row][column].piece = piece;
                        temp[row][column].pieceColor = pieceColor;
                        temp[row][column].isMoveValid = false;

                        const res: boolean = await isInCheck(temp, pieceColor);

                        // console.log(res);
                        if (!res) {
                            potentialMoves.push(square);
                        }

                        temp[row][column].piece = square.piece;
                        temp[row][column].pieceColor = square.pieceColor;
                        temp[row][column].isMoveValid = square.isMoveValid;
                    }
                })
            );
        })
    );

    return potentialMoves
}

import { ChessBoardPiece } from "./PlayLocal"

export const checkPawnMove = (gameState: ChessBoardPiece[][], { piece, pieceColor, row, column }: ChessBoardPiece) => {
    let newGameState = [...gameState]

    if (pieceColor === '#cacaca') {
        if (row === 6) {

            const isEnemyPiece =
                newGameState[row - 1][column].pieceColor === 'black' ||
                newGameState[row - 1][column].pieceColor === '#cacaca'

            newGameState[row - 1][column].isMoveValid =
                (newGameState[row - 1][column].piece === '' ||
                    newGameState[row - 1][column].pieceColor === 'black')

            if (!isEnemyPiece) {
                newGameState[row - 2][column].isMoveValid =
                    (newGameState[row - 2][column].piece === '' &&
                        newGameState[row - 2][column].pieceColor !== 'black')
            }
        } else {
            newGameState[row - 1][column].isMoveValid =
                (newGameState[row - 1][column].piece === '' &&
                    newGameState[row - 1][column].pieceColor !== 'black')

        }

        if (column === 0) {
            newGameState[row - 1][column + 1].isMoveValid =
                (newGameState[row - 1][column + 1].piece !== '' &&
                    newGameState[row - 1][column + 1].pieceColor === 'black')

        } else if (column === 7) {
            newGameState[row - 1][column - 1].isMoveValid =
                (newGameState[row - 1][column - 1].piece !== '' &&
                    newGameState[row - 1][column - 1].pieceColor === 'black')

        } else {
            if (row !== 6) {
                newGameState[row - 1][column + 1].isMoveValid =
                    (newGameState[row - 1][column + 1].piece !== '' &&
                        newGameState[row - 1][column + 1].pieceColor === 'black')

                newGameState[row - 1][column - 1].isMoveValid =
                    (newGameState[row - 1][column - 1].piece !== '' &&
                        newGameState[row - 1][column - 1].pieceColor === 'black')
            }
        }


    } else {

        if (row === 1) {
            const isEnemyPiece =
                newGameState[row + 1][column].pieceColor === '#cacaca' ||
                newGameState[row + 1][column].pieceColor === 'black'

            newGameState[row + 1][column].isMoveValid =
                (newGameState[row + 1][column].piece === '' ||
                    newGameState[row + 1][column].pieceColor === '#cacaca')

            if (!isEnemyPiece) {
                newGameState[row + 2][column].isMoveValid =
                    (newGameState[row + 2][column].piece === '' &&
                        newGameState[row + 2][column].pieceColor !== '#cacaca')
            }
        } else {
            newGameState[row + 1][column].isMoveValid =
                (newGameState[row + 1][column].piece === '' &&
                    newGameState[row + 1][column].pieceColor !== '#cacaca')
        }

        if (column === 0) {
            newGameState[row + 1][column + 1].isMoveValid =
                (newGameState[row + 1][column + 1].piece !== '' &&
                    newGameState[row + 1][column + 1].pieceColor === '#cacaca')

        } else if (column === 7) {
            newGameState[row + 1][column - 1].isMoveValid =
                (newGameState[row + 1][column - 1].piece !== '' &&
                    newGameState[row + 1][column - 1].pieceColor === '#cacaca')

        } else {
            if (row !== 1) {
                newGameState[row + 1][column + 1].isMoveValid =
                    (newGameState[row + 1][column + 1].piece !== '' &&
                        newGameState[row + 1][column + 1].pieceColor === '#cacaca')

                newGameState[row + 1][column - 1].isMoveValid =
                    (newGameState[row + 1][column - 1].piece !== '' &&
                        newGameState[row + 1][column - 1].pieceColor === '#cacaca')
            }
        }

    }
    return newGameState
}

export const checkRookMove = (gameState: ChessBoardPiece[][], { piece, pieceColor, row, column }: ChessBoardPiece) => {
    let newGameState = [...gameState]
    // newGameState.map((innerArray)=>{
    //     innerArray.map((obj)=>{
    //         obj.isMoveValid=false
    //     })
    // })

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

export const checkKnightMove = (gameState: ChessBoardPiece[][], { piece, pieceColor, row, column }: ChessBoardPiece) => {
    let newGameState = [...gameState]
    // newGameState.map((innerArray)=>{
    //     innerArray.map((obj)=>{
    //         obj.isMoveValid=false
    //     })
    // })

    if (row === 0) {

        newGameState[row + 2][column + 1].isMoveValid = newGameState[row + 2][column + 1].piece === '' ||
            newGameState[row + 2][column + 1].pieceColor !== pieceColor

        newGameState[row + 2][column - 1].isMoveValid = newGameState[row + 2][column - 1].piece === '' ||
            newGameState[row + 2][column - 1].pieceColor !== pieceColor


        if (column === 0 || column === 1) {
            newGameState[row + 1][column + 2].isMoveValid = newGameState[row + 1][column + 2].piece === '' ||
                newGameState[row + 1][column + 2].pieceColor !== pieceColor

        } else if (column === 7 || column === 6) {
            newGameState[row + 1][column - 2].isMoveValid = newGameState[row + 1][column - 2].piece === '' ||
                newGameState[row + 1][column - 2].pieceColor !== pieceColor

        } else {

            newGameState[row + 1][column - 2].isMoveValid = newGameState[row + 2][column + 1].piece === '' ||
                newGameState[row + 1][column - 2].pieceColor !== pieceColor

            newGameState[row + 1][column + 2].isMoveValid = newGameState[row + 2][column + 1].piece === '' ||
                newGameState[row + 1][column + 2].pieceColor !== pieceColor
        }

    } else if (row === 7) {

        newGameState[row - 2][column + 1].isMoveValid = newGameState[row - 2][column + 1].piece === '' ||
            newGameState[row - 2][column + 1].pieceColor !== pieceColor

        newGameState[row - 2][column - 1].isMoveValid = newGameState[row - 2][column - 1].piece === '' ||
            newGameState[row - 2][column - 1].pieceColor !== pieceColor

        if (column === 0 || column === 1) {
            newGameState[row - 1][column + 2].isMoveValid = newGameState[row - 1][column + 2].piece === '' ||
                newGameState[row - 1][column + 2].pieceColor !== pieceColor

        } else if (column === 7 || column === 6) {
            newGameState[row - 1][column - 2].isMoveValid = newGameState[row - 1][column - 2].piece === '' ||
                newGameState[row - 1][column - 2].pieceColor !== pieceColor

        } else {

            newGameState[row - 1][column - 2].isMoveValid = newGameState[row - 2][column - 1].piece === '' ||
                newGameState[row - 1][column - 2].pieceColor !== pieceColor

            newGameState[row - 1][column + 2].isMoveValid = newGameState[row - 2][column + 1].piece === '' ||
                newGameState[row - 1][column + 2].pieceColor !== pieceColor
        }

    } else {






        if (column === 0 || column === 1) {
            newGameState[row - 1][column + 2].isMoveValid = newGameState[row - 1][column + 2].piece === '' ||
                newGameState[row - 1][column + 2].pieceColor !== pieceColor

            newGameState[row + 1][column + 2].isMoveValid = newGameState[row + 1][column + 2].piece === '' ||
                newGameState[row + 1][column + 2].pieceColor !== pieceColor


            newGameState[row - 2][column + 1].isMoveValid = newGameState[row - 2][column + 1].piece === '' ||
                newGameState[row - 2][column + 1].pieceColor !== pieceColor


            newGameState[row + 2][column + 1].isMoveValid = newGameState[row + 2][column + 1].piece === '' ||
                newGameState[row + 2][column + 1].pieceColor !== pieceColor


        } else if (column === 7 || column === 6) {
            newGameState[row - 1][column - 2].isMoveValid = newGameState[row - 1][column - 2].piece === '' ||
                newGameState[row - 1][column - 2].pieceColor !== pieceColor

            newGameState[row + 1][column - 2].isMoveValid = newGameState[row + 1][column - 2].piece === '' ||
                newGameState[row + 1][column - 2].pieceColor !== pieceColor

            newGameState[row + 2][column - 1].isMoveValid = newGameState[row + 2][column - 1].piece === '' ||
                newGameState[row + 2][column - 1].pieceColor !== pieceColor


            newGameState[row - 2][column - 1].isMoveValid = newGameState[row - 2][column - 1].piece === '' ||
                newGameState[row - 2][column - 1].pieceColor !== pieceColor


        } else {

            newGameState[row - 1][column - 2].isMoveValid = newGameState[row - 2][column - 1].piece === '' ||
                newGameState[row - 1][column - 2].pieceColor !== pieceColor

            newGameState[row - 1][column + 2].isMoveValid = newGameState[row - 2][column + 1].piece === '' ||
                newGameState[row - 1][column + 2].pieceColor !== pieceColor


            newGameState[row + 1][column - 2].isMoveValid = newGameState[row + 2][column + 1].piece === '' ||
                newGameState[row + 1][column - 2].pieceColor !== pieceColor

            newGameState[row + 1][column + 2].isMoveValid = newGameState[row + 2][column + 1].piece === '' ||
                newGameState[row + 1][column + 2].pieceColor !== pieceColor

            //

            newGameState[row - 2][column + 1].isMoveValid = newGameState[row - 2][column + 1].piece === '' ||
                newGameState[row - 2][column + 1].pieceColor !== pieceColor


            newGameState[row + 2][column + 1].isMoveValid = newGameState[row + 2][column + 1].piece === '' ||
                newGameState[row + 2][column + 1].pieceColor !== pieceColor

            newGameState[row + 2][column - 1].isMoveValid = newGameState[row + 2][column - 1].piece === '' ||
                newGameState[row + 2][column - 1].pieceColor !== pieceColor


            newGameState[row - 2][column - 1].isMoveValid = newGameState[row - 2][column - 1].piece === '' ||
                newGameState[row - 2][column - 1].pieceColor !== pieceColor


        }
    }




    return newGameState
}


export const checkBishopMove = (gameState: ChessBoardPiece[][], { piece, pieceColor, row, column }: ChessBoardPiece) => {
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

export const checkQueenMove = (gameState: ChessBoardPiece[][], { piece, pieceColor, row, column }: ChessBoardPiece) => {
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

export const checkKingMove = (gameState: ChessBoardPiece[][], { piece, pieceColor, row, column }: ChessBoardPiece) => {
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
export const isInCheck = async (gameState: ChessBoardPiece[][], pieceColor: string) => {
    let newGameState = [...gameState]
    let isCheck = false;

    newGameState.map((innerArray) => {
        innerArray.map((obj) => {


            if (obj.piece !== '' && obj.pieceColor !== pieceColor) {
                // console.log(obj.piece,obj.pieceColor)
                switch (obj.piece) {
                    case 'chess-pawn':
                        newGameState = checkPawnMove(newGameState, obj)
                        break;
                    case 'chess-rook':
                        newGameState = checkRookMove(newGameState, obj)
                        break;
                    case 'chess-knight':
                        newGameState = checkKnightMove(newGameState, obj)
                        break;
                    case 'chess-bishop':
                        newGameState = checkBishopMove(newGameState, obj)
                        break;
                    case 'chess-queen':
                        newGameState = checkQueenMove(newGameState, obj)
                        break;
                    case 'chess-king':
                        newGameState = checkKingMove(newGameState, obj)
                        break;
                    default:
                        break;
                }
            }

            if (obj.isMoveValid === true && obj.pieceColor !== pieceColor && obj.piece === 'chess-king') {
                console.log("Opponent King in check")
            }

            // obj.isMoveValid=false

        })
    })

    let king: ChessBoardPiece[] | undefined;
    king = newGameState.find(innerArray => {
        const potentialKing = innerArray.find(obj => obj.piece === 'chess-king' && obj.pieceColor === pieceColor);
        // console.log(potentialKing)
        return potentialKing?.pieceColor === pieceColor && potentialKing.piece === 'chess-king' && potentialKing?.isMoveValid === true;
    });

    // console.log(king)
    if (king !== undefined) {
        isCheck = true
    }

    return isCheck
}

// Checks the direction of castling
export const checkCastling = async (gameState: ChessBoardPiece[][], pieceColor: string) => {
    let newGameState: ChessBoardPiece[][] = gameState.map(row => row.map(column => ({ ...column })))

    let castleDirection = []

    if (pieceColor === 'black') {
        if (newGameState[0][2].piece === '' && newGameState[0][1].piece === '') {
            newGameState[0][1].piece = 'chess-king'
            newGameState[0][1].pieceColor = pieceColor

            newGameState[0][3].piece = ''
            newGameState[0][3].pieceColor = ''
            if (!await isInCheck(newGameState, pieceColor)) {
                castleDirection.push('left')
            }
        }

        if (newGameState[0][6].piece === '' && newGameState[0][5].piece === '' && newGameState[0][4].piece === '') {
            newGameState[0][5].piece = 'chess-king'
            newGameState[0][5].pieceColor = pieceColor

            newGameState[0][5].piece = ''
            newGameState[0][5].pieceColor = ''
            if (!await isInCheck(newGameState, pieceColor)) {
                castleDirection.push('right')
            }

        }

    } else {

        if (newGameState[7][2].piece === '' && newGameState[7][1].piece === '') {
            newGameState[7][1].piece = 'chess-king'
            newGameState[7][1].pieceColor = pieceColor

            newGameState[7][3].piece = ''
            newGameState[7][3].pieceColor = ''
            if (!await isInCheck(newGameState, pieceColor)) {
                castleDirection.push('left')
            }

        }

        if (newGameState[7][6].piece === '' && newGameState[7][5].piece === '' && newGameState[7][4].piece === '') {
            newGameState[0][5].piece = 'chess-king'
            newGameState[0][5].pieceColor = pieceColor

            newGameState[0][5].piece = ''
            newGameState[0][5].pieceColor = ''
            if (!await isInCheck(newGameState, pieceColor)) {
                castleDirection.push('right')
            }
        }
    }

    return castleDirection
}

// Find and return potential moves to block the check
export const checkPotentialBlockMoves = async (gameState: ChessBoardPiece[][], pieceColor: string) => {
    let newGameState = [...gameState]
    let potentialMoves: ChessBoardPiece[] = []

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
                        let tempState: ChessBoardPiece[][] = newGameState;
                        tempState.map((innerArray1) => {
                            innerArray1.map((obj1) => {
                                obj1.isMoveValid = false
                            })
                        })

                        switch (obj.piece) {
                            case 'chess-pawn':
                                tempState = checkPawnMove(newGameState, obj)
                                break;
                            case 'chess-rook':
                                tempState = checkRookMove(newGameState, obj)
                                break;
                            case 'chess-knight':
                                tempState = checkKnightMove(newGameState, obj)
                                break;
                            case 'chess-bishop':
                                tempState = checkBishopMove(newGameState, obj)
                                break;
                            case 'chess-queen':
                                tempState = checkQueenMove(newGameState, obj)
                                break;
                            case 'chess-king':
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
export const checkValidMove = async (gameState: ChessBoardPiece[][], piece: string, pieceColor: string) => {
    let newGameState = gameState.map(row =>
        row.map(square => ({ ...square }))
    );


    let potentialMoves: ChessBoardPiece[] = [];

    await Promise.all(
        newGameState.map(async (rowArray) => {
            await Promise.all(
                rowArray.map(async (square) => {
                    if (square.isMoveValid === true && square.pieceColor !== pieceColor) {
                        const { row, column } = square;
                        let temp: ChessBoardPiece[][] = newGameState.map(row =>
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


export const chessboard: ChessBoardPiece[][] = [
    [
        { piece: 'chess-rook', pieceColor: 'black', row: 0, column: 0, isMoveValid: false },
        { piece: 'chess-knight', pieceColor: 'black', row: 0, column: 1, isMoveValid: false },
        { piece: 'chess-bishop', pieceColor: 'black', row: 0, column: 2, isMoveValid: false },
        { piece: 'chess-king', pieceColor: 'black', row: 0, column: 3, isMoveValid: false },
        { piece: 'chess-queen', pieceColor: 'black', row: 0, column: 4, isMoveValid: false },
        { piece: 'chess-bishop', pieceColor: 'black', row: 0, column: 5, isMoveValid: false },
        { piece: 'chess-knight', pieceColor: 'black', row: 0, column: 6, isMoveValid: false },
        { piece: 'chess-rook', pieceColor: 'black', row: 0, column: 7, isMoveValid: false },
    ],
    [
        { piece: 'chess-pawn', pieceColor: 'black', row: 1, column: 0, isMoveValid: false },
        { piece: 'chess-pawn', pieceColor: 'black', row: 1, column: 1, isMoveValid: false },
        { piece: 'chess-pawn', pieceColor: 'black', row: 1, column: 2, isMoveValid: false },
        { piece: 'chess-pawn', pieceColor: 'black', row: 1, column: 3, isMoveValid: false },
        { piece: 'chess-pawn', pieceColor: 'black', row: 1, column: 4, isMoveValid: false },
        { piece: 'chess-pawn', pieceColor: 'black', row: 1, column: 5, isMoveValid: false },
        { piece: 'chess-pawn', pieceColor: 'black', row: 1, column: 6, isMoveValid: false },
        { piece: 'chess-pawn', pieceColor: 'black', row: 1, column: 7, isMoveValid: false },
    ],
    [
        { piece: '', pieceColor: '', row: 2, column: 0, isMoveValid: false },
        { piece: '', pieceColor: '', row: 2, column: 1, isMoveValid: false },
        { piece: '', pieceColor: '', row: 2, column: 2, isMoveValid: false },
        { piece: '', pieceColor: '', row: 2, column: 3, isMoveValid: false },
        { piece: '', pieceColor: '', row: 2, column: 4, isMoveValid: false },
        { piece: '', pieceColor: '', row: 2, column: 5, isMoveValid: false },
        { piece: '', pieceColor: '', row: 2, column: 6, isMoveValid: false },
        { piece: '', pieceColor: '', row: 2, column: 7, isMoveValid: false },
    ],
    [
        { piece: '', pieceColor: '', row: 3, column: 0, isMoveValid: false },
        { piece: '', pieceColor: '', row: 3, column: 1, isMoveValid: false },
        { piece: '', pieceColor: '', row: 3, column: 2, isMoveValid: false },
        { piece: '', pieceColor: '', row: 3, column: 3, isMoveValid: false },
        { piece: '', pieceColor: '', row: 3, column: 4, isMoveValid: false },
        { piece: '', pieceColor: '', row: 3, column: 5, isMoveValid: false },
        { piece: '', pieceColor: '', row: 3, column: 6, isMoveValid: false },
        { piece: '', pieceColor: '', row: 3, column: 7, isMoveValid: false },
    ],
    [
        { piece: '', pieceColor: '', row: 4, column: 0, isMoveValid: false },
        { piece: '', pieceColor: '', row: 4, column: 1, isMoveValid: false },
        { piece: '', pieceColor: '', row: 4, column: 2, isMoveValid: false },
        { piece: '', pieceColor: '', row: 4, column: 3, isMoveValid: false },
        { piece: '', pieceColor: '', row: 4, column: 4, isMoveValid: false },
        { piece: '', pieceColor: '', row: 4, column: 5, isMoveValid: false },
        { piece: '', pieceColor: '', row: 4, column: 6, isMoveValid: false },
        { piece: '', pieceColor: '', row: 4, column: 7, isMoveValid: false },
    ],
    [
        { piece: '', pieceColor: '', row: 5, column: 0, isMoveValid: false },
        { piece: '', pieceColor: '', row: 5, column: 1, isMoveValid: false },
        { piece: '', pieceColor: '', row: 5, column: 2, isMoveValid: false },
        { piece: '', pieceColor: '', row: 5, column: 3, isMoveValid: false },
        { piece: '', pieceColor: '', row: 5, column: 4, isMoveValid: false },
        { piece: '', pieceColor: '', row: 5, column: 5, isMoveValid: false },
        { piece: '', pieceColor: '', row: 5, column: 6, isMoveValid: false },
        { piece: '', pieceColor: '', row: 5, column: 7, isMoveValid: false },
    ],
    [
        { piece: 'chess-pawn', pieceColor: '#cacaca', row: 6, column: 0, isMoveValid: false },
        { piece: 'chess-pawn', pieceColor: '#cacaca', row: 6, column: 1, isMoveValid: false },
        { piece: 'chess-pawn', pieceColor: '#cacaca', row: 6, column: 2, isMoveValid: false },
        { piece: 'chess-pawn', pieceColor: '#cacaca', row: 6, column: 3, isMoveValid: false },
        { piece: 'chess-pawn', pieceColor: '#cacaca', row: 6, column: 4, isMoveValid: false },
        { piece: 'chess-pawn', pieceColor: '#cacaca', row: 6, column: 5, isMoveValid: false },
        { piece: 'chess-pawn', pieceColor: '#cacaca', row: 6, column: 6, isMoveValid: false },
        { piece: 'chess-pawn', pieceColor: '#cacaca', row: 6, column: 7, isMoveValid: false },
    ],
    [
        { piece: 'chess-rook', pieceColor: '#cacaca', row: 7, column: 0, isMoveValid: false },
        { piece: 'chess-knight', pieceColor: '#cacaca', row: 7, column: 1, isMoveValid: false },
        { piece: 'chess-bishop', pieceColor: '#cacaca', row: 7, column: 2, isMoveValid: false },
        { piece: 'chess-king', pieceColor: '#cacaca', row: 7, column: 3, isMoveValid: false },
        { piece: 'chess-queen', pieceColor: '#cacaca', row: 7, column: 4, isMoveValid: false },
        { piece: 'chess-bishop', pieceColor: '#cacaca', row: 7, column: 5, isMoveValid: false },
        { piece: 'chess-knight', pieceColor: '#cacaca', row: 7, column: 6, isMoveValid: false },
        { piece: 'chess-rook', pieceColor: '#cacaca', row: 7, column: 7, isMoveValid: false },
    ],

]

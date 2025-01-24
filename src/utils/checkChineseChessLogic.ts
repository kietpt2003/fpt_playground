import { ChineseChessBoardPiece, Position, PotentialMovePiece } from "../screens/types/chineseChessTypes";

// Vua/Sĩ chỉ được di chuyển trong cung
const withinKingPalace = (row: number, column: number, pieceColor: string): boolean => {
    if (pieceColor === "black") return row >= 7 && column >= 3 && column <= 5;
    if (pieceColor === "red") return row <= 2 && column >= 3 && column <= 5;
    return false;
};

export const checkPawnMove = (gameState: ChineseChessBoardPiece[][], { pieceColor, row, column }: ChineseChessBoardPiece) => {
    let newGameState = [...gameState]

    if (pieceColor === 'red') { //TH quân đỏ (nẳm trên)
        if (row >= 3 && row < 9) {
            newGameState[row + 1][column].isMoveValid =
                (newGameState[row + 1][column].piece === "" ||
                    newGameState[row + 1][column].pieceColor !== pieceColor)
        }

    } else { //TH quân đen nằm dưới
        if (row <= 6 && row > 0) {
            newGameState[row - 1][column].isMoveValid =
                (newGameState[row - 1][column].piece === "" ||
                    newGameState[row - 1][column].pieceColor !== pieceColor)
        }
    }

    if ((row <= 4 && pieceColor === "black") || (row >= 5 && pieceColor === "red")) { //TH tốt qua sông
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
    return newGameState
}

export const checkRookMove = (gameState: ChineseChessBoardPiece[][], { pieceColor, row, column }: ChineseChessBoardPiece) => {
    let newGameState = [...gameState]

    // Upward
    for (let i = row - 1; i >= 0; i--) {
        const targetSquare = gameState[i][column];
        if (targetSquare.piece === "") {
            newGameState[i][column].isMoveValid = true;
        } else if (targetSquare.pieceColor !== pieceColor) {
            newGameState[i][column].isMoveValid = true;
            break;
        } else {
            break;
        }
    }

    // Downward
    for (let i = row + 1; i <= 9; i++) {
        const targetSquare = gameState[i][column];
        if (targetSquare.piece === "") {
            newGameState[i][column].isMoveValid = true;
        } else if (targetSquare.pieceColor !== pieceColor) {
            newGameState[i][column].isMoveValid = true;
            break;
        } else {
            break;
        }
    }

    // Right
    for (let i = column + 1; i <= 8; i++) {
        const targetSquare = gameState[row][i];
        if (targetSquare.piece === "") {
            newGameState[row][i].isMoveValid = true;
        } else if (targetSquare.pieceColor !== pieceColor) {
            newGameState[row][i].isMoveValid = true;
            break;
        } else {
            break;
        }
    }

    // Left
    for (let i = column - 1; i >= 0; i--) {
        const targetSquare = gameState[row][i];
        if (targetSquare.piece === "") {
            newGameState[row][i].isMoveValid = true;
        } else if (targetSquare.pieceColor !== pieceColor) {
            newGameState[row][i].isMoveValid = true;
            break;
        } else {
            break;
        }
    }

    return newGameState
}

export const checkKnightMove = (gameState: ChineseChessBoardPiece[][], { pieceColor, row, column }: ChineseChessBoardPiece) => {


    let newGameState = [...gameState]

    if (row >= 0 && row <= 1) { //TH ở row 0 và 1 thì chỉ có thể đi xuống thôi
        if (column >= 0 && column <= 6) { //TH từ col 0 -> 6 thì có thể qua 2 xuống 1 (Trong TH này sẽ không xét qua bên trái)
            const blockRightSquare = gameState[row][column + 1];
            if (blockRightSquare.pieceColor === "") {//TH không bị chặn bên phải
                newGameState[row + 1][column + 2].isMoveValid =
                    (newGameState[row + 1][column + 2].piece === "" ||
                        newGameState[row + 1][column + 2].pieceColor !== pieceColor)
                if (row == 1) { //TH row = 1 thì có thể đi lên với điều kiện là qua phải 2 lên 1
                    newGameState[row - 1][column + 2].isMoveValid =
                        (newGameState[row - 1][column + 2].piece === "" ||
                            newGameState[row - 1][column + 2].pieceColor !== pieceColor)
                }
            }

            const blockBottomSquare = gameState[row + 1][column];
            if (blockBottomSquare.pieceColor === "") {//TH xuống 2 qua 1
                newGameState[row + 2][column + 1].isMoveValid =
                    (newGameState[row + 2][column + 1].piece === "" ||
                        newGameState[row + 2][column + 1].pieceColor !== pieceColor)
                if (column != 0) {//TH nếu khác col = 0 thì đều có thể qua trái
                    newGameState[row + 2][column - 1].isMoveValid =
                        (newGameState[row + 2][column - 1].piece === "" ||
                            newGameState[row + 2][column - 1].pieceColor !== pieceColor)
                }
            }

        }
        if (column >= 2 && column <= 8) { //TH từ col 2 -> 8 thì có thể qua 2 xuống 1 (Trong TH này sẽ không xét qua bên phải)
            const blockLeftSquare = gameState[row][column - 1];
            if (blockLeftSquare.pieceColor === "") {//TH không bị chặn bên trái
                newGameState[row + 1][column - 2].isMoveValid =
                    (newGameState[row + 1][column - 2].piece === "" ||
                        newGameState[row + 1][column - 2].pieceColor !== pieceColor)
                if (row == 1) {//TH row = 1 thì có thể đi lên với điều kiện là qua trái 2 lên 1
                    newGameState[row - 1][column - 2].isMoveValid =
                        (newGameState[row - 1][column - 2].piece === "" ||
                            newGameState[row - 1][column - 2].pieceColor !== pieceColor)
                }
            }

            const blockBottomSquare = gameState[row + 1][column];
            if (blockBottomSquare.pieceColor === "") {//TH xuống 2 qua 1
                newGameState[row + 2][column - 1].isMoveValid =
                    (newGameState[row + 2][column - 1].piece === "" ||
                        newGameState[row + 2][column - 1].pieceColor !== pieceColor)
                if (column != 8) {//TH nếu khác col = 8 thì đều có thể qua phải
                    newGameState[row + 2][column + 1].isMoveValid =
                        (newGameState[row + 2][column + 1].piece === "" ||
                            newGameState[row + 2][column + 1].pieceColor !== pieceColor)
                }
            }
        }
    } else if (row >= 2 && row <= 7) {//TH cách đỉnh >= 2 ô và cách đáy <= 7 ô
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
            } else { // Đi được cả hai bên (lên/xuống 2 qua trái/phải 1)
                newGameState[row + 2][column + 1].isMoveValid =
                    (newGameState[row + 2][column + 1].piece === "" ||
                        newGameState[row + 2][column + 1].pieceColor !== pieceColor)

                newGameState[row + 2][column - 1].isMoveValid =
                    (newGameState[row + 2][column - 1].piece === "" ||
                        newGameState[row + 2][column - 1].pieceColor !== pieceColor)
            }
        }

        if (column >= 0 && column <= 6) {
            const blockRightSquare = gameState[row][column + 1];
            if (blockRightSquare.pieceColor === "") {//TH không bị chặn bên phải (qua phải 2 lên/xuống 1)
                newGameState[row - 1][column + 2].isMoveValid =
                    (newGameState[row - 1][column + 2].piece === "" ||
                        newGameState[row - 1][column + 2].pieceColor !== pieceColor)

                newGameState[row + 1][column + 2].isMoveValid =
                    (newGameState[row + 1][column + 2].piece === "" ||
                        newGameState[row + 1][column + 2].pieceColor !== pieceColor)
            }
        }

        if (column >= 2 && column <= 8) {
            const blockLeftSquare = gameState[row][column - 1];
            if (blockLeftSquare.pieceColor === "") {//TH không bị chặn bên trái (qua trái 2 lên/xuống 1)
                newGameState[row - 1][column - 2].isMoveValid =
                    (newGameState[row - 1][column - 2].piece === "" ||
                        newGameState[row - 1][column - 2].pieceColor !== pieceColor)

                newGameState[row + 1][column - 2].isMoveValid =
                    (newGameState[row + 1][column - 2].piece === "" ||
                        newGameState[row + 1][column - 2].pieceColor !== pieceColor)
            }
        }
    } else if (row >= 8 && row <= 9) {
        if (column >= 0 && column <= 6) { //TH từ col 0 -> 6 thì có thể qua 2 lên 1 (Trong TH này sẽ không xét qua bên trái)
            const blockRightSquare = gameState[row][column + 1];
            if (blockRightSquare.pieceColor === "") {//TH không bị chặn bên phải
                newGameState[row - 1][column + 2].isMoveValid =
                    (newGameState[row - 1][column + 2].piece === "" ||
                        newGameState[row - 1][column + 2].pieceColor !== pieceColor)
                if (row == 8) { //TH row = 8 thì có thể đi xuống với điều kiện là qua phải 2 xuống 1
                    newGameState[row + 1][column + 2].isMoveValid =
                        (newGameState[row + 1][column + 2].piece === "" ||
                            newGameState[row + 1][column + 2].pieceColor !== pieceColor)
                }
            }

            const blockTopSquare = gameState[row - 1][column];
            if (blockTopSquare.pieceColor === "") {//TH lên 2 qua 1
                newGameState[row - 2][column + 1].isMoveValid =
                    (newGameState[row - 2][column + 1].piece === "" ||
                        newGameState[row - 2][column + 1].pieceColor !== pieceColor)
                if (column != 0) {//TH nếu khác col = 0 thì đều có thể qua trái
                    newGameState[row - 2][column - 1].isMoveValid =
                        (newGameState[row - 2][column - 1].piece === "" ||
                            newGameState[row - 2][column - 1].pieceColor !== pieceColor)
                }
            }

        }
        if (column >= 2 && column <= 8) { //TH từ col 2 -> 8 thì có thể qua 2 lên 1 (Trong TH này sẽ không xét qua bên phải)
            const blockLeftSquare = gameState[row][column - 1];
            if (blockLeftSquare.pieceColor === "") {//TH không bị chặn bên trái
                newGameState[row - 1][column - 2].isMoveValid =
                    (newGameState[row - 1][column - 2].piece === "" ||
                        newGameState[row - 1][column - 2].pieceColor !== pieceColor)
                if (row == 8) {//TH row = 8 thì có thể đi xuống với điều kiện là qua trái 2 xuống 1
                    newGameState[row + 1][column - 2].isMoveValid =
                        (newGameState[row + 1][column - 2].piece === "" ||
                            newGameState[row + 1][column - 2].pieceColor !== pieceColor)
                }
            }

            const blockTopSquare = gameState[row - 1][column];
            if (blockTopSquare.pieceColor === "") {//TH lên 2 qua 1
                newGameState[row - 2][column - 1].isMoveValid =
                    (newGameState[row - 2][column - 1].piece === "" ||
                        newGameState[row - 2][column - 1].pieceColor !== pieceColor)
                if (column != 8) {//TH nếu khác col = 8 thì đều có thể qua phải
                    newGameState[row - 2][column + 1].isMoveValid =
                        (newGameState[row - 2][column + 1].piece === "" ||
                            newGameState[row - 2][column + 1].pieceColor !== pieceColor)
                }
            }
        }
    }
    return newGameState
}

export const checkBishopMove = (gameState: ChineseChessBoardPiece[][], { pieceColor, row, column }: ChineseChessBoardPiece) => {
    let newGameState = [...gameState]

    const checkValidMove = (i: number, j: number) => {
        if (i >= 0 && i < 10 && j >= 0 && j < 9) {
            const targetSquare = gameState[i][j];
            const loopIndex = i - row;
            if (loopIndex == 1 && targetSquare.piece !== '') { //Check có vật cản phải từ đầu không
                return false;
            }
            if (targetSquare.piece === '' && ((pieceColor === "red" && i <= 4 && i % 2 == 0) || (pieceColor === "black" && i >= 5 && i % 2 == 1))) {
                newGameState[i][j].isMoveValid = true;
                return false;
            } else if (targetSquare.pieceColor !== pieceColor && ((pieceColor === "red" && i <= 4 && i % 2 == 0) || (pieceColor === "black" && i >= 5 && i % 2 == 1))) {
                newGameState[i][j].isMoveValid = true;
                return false;
            }
        }
        return true;
    };

    for (let i = 1; i <= 2; i++) { //đen chéo lên sang phải
        let res = checkValidMove(row - i, column + i);
        if (!res) {
            break;
        }
    }

    for (let i = 1; i <= 2; i++) {//đen chéo lên sang trái
        let res = checkValidMove(row - i, column - i);
        if (!res) {
            break;
        }
    }

    for (let i = 1; i <= 2; i++) {//đỏ chéo xuống sang phải
        let res = checkValidMove(row + i, column + i);
        if (!res) {
            break;
        }
    }

    for (let i = 1; i <= 2; i++) {//đỏ chéo xuống sang trái
        let res = checkValidMove(row + i, column - i);
        if (!res) {
            break;
        }
    }

    return newGameState
}

export const checkAdvisorMove = (gameState: ChineseChessBoardPiece[][], { pieceColor, row, column }: ChineseChessBoardPiece) => {
    let newGameState = [...gameState]

    const checkValidMove = (i: number, j: number) => {
        try {
            if (i >= 0 && i < 10 && j >= 0 && j < 9) {
                const targetSquare = gameState[i][j];

                if (withinKingPalace(i, j, pieceColor)) { //Check sĩ có trong cung không
                    if (targetSquare.piece === '' && ((pieceColor === "red" && i <= 2) || (pieceColor === "black" && i >= 7))) {
                        newGameState[i][j].isMoveValid = true;
                    } else if (targetSquare.pieceColor !== pieceColor && ((pieceColor === "red" && i <= 2) || (pieceColor === "black" && i >= 7))) {
                        newGameState[i][j].isMoveValid = true;
                    } else {
                        return false;
                    }
                } else {
                    return false;
                }
            }
            return true;

        } catch (error) {
            console.log("er", error);

            return false;
        }
    };

    checkValidMove(row - 1, column + 1);//đen chéo lên sang phải

    checkValidMove(row - 1, column - 1);//đen chéo lên sang trái

    checkValidMove(row + 1, column + 1);//đỏ chéo xuống sang phải

    checkValidMove(row + 1, column - 1);//đỏ chéo xuống sang trái

    return newGameState
}

export const checkCannonMove = (gameState: ChineseChessBoardPiece[][], { pieceColor, row, column }: ChineseChessBoardPiece) => {
    let newGameState = [...gameState]
    let blockIndex = -1;

    //Upward
    for (let i = row - 1; i >= 0; i--) {
        const targetSquare = gameState[i][column];
        if (targetSquare.piece === "" && blockIndex == -1) { // Xử lí các nước đi lên trước khi bị chặn
            newGameState[i][column].isMoveValid = true;
        } else if (targetSquare.pieceColor !== "" && blockIndex == -1) { //Chặn rồi thì lưu index lại để quét các bước sau đó
            blockIndex = i;
        } else if (targetSquare.pieceColor !== pieceColor && blockIndex != -1 && blockIndex > i && targetSquare.piece.length != 0) { //TH bay sang ăn quân địch
            newGameState[i][column].isMoveValid = true;
            blockIndex = -1;
            break;
        }
    }

    // Downward
    blockIndex = -1;
    for (let i = row + 1; i <= 9; i++) {
        const targetSquare = gameState[i][column];
        if (targetSquare.piece === "" && blockIndex == -1) { // Xử lí các nước đi xuống trước khi bị chặn
            newGameState[i][column].isMoveValid = true;
        } else if (targetSquare.pieceColor !== "" && blockIndex == -1) {//Chặn rồi thì lưu index lại để quét các bước sau đó
            blockIndex = i;
        } else if (targetSquare.pieceColor !== pieceColor && blockIndex != -1 && blockIndex < i && targetSquare.piece.length != 0) { //TH bay sang ăn quân địch
            newGameState[i][column].isMoveValid = true;
            blockIndex = -1;
            break;
        }
    }

    // Right
    blockIndex = -1;
    for (let i = column + 1; i <= 8; i++) { // Xử lí các nước đi được bên phải trước khi bị chặn
        const targetSquare = gameState[row][i];
        if (targetSquare.piece === "" && blockIndex == -1) {
            newGameState[row][i].isMoveValid = true;
        } else if (targetSquare.pieceColor !== "" && blockIndex == -1) {//Chặn rồi thì lưu index lại để quét các bước sau đó
            blockIndex = i;
        } else if (targetSquare.pieceColor !== pieceColor && blockIndex != -1 && blockIndex < i && targetSquare.piece.length != 0) {//TH bay sang ăn quân địch
            newGameState[row][i].isMoveValid = true;
            blockIndex = -1;
            break;
        }
    }

    // Left
    blockIndex = -1;
    for (let i = column - 1; i >= 0; i--) { // Xử lí các nước đi được bên trái trước khi bị chặn
        const targetSquare = gameState[row][i];
        if (targetSquare.piece === "" && blockIndex == -1) {
            newGameState[row][i].isMoveValid = true;
        } else if (targetSquare.pieceColor !== "" && blockIndex == -1) {//Chặn rồi thì lưu index lại để quét các bước sau đó
            blockIndex = i;
        } else if (targetSquare.pieceColor !== pieceColor && blockIndex != -1 && blockIndex > i && targetSquare.piece.length != 0) {//TH bay sang ăn quân địch
            newGameState[row][i].isMoveValid = true;
            blockIndex = -1;
            break;
        }
    }

    return newGameState
}

export const checkKingMove = async (gameState: ChineseChessBoardPiece[][], { piece, pieceColor, row, column }: ChineseChessBoardPiece) => {
    let newGameState = [...gameState];

    if (pieceColor === 'red') { //TH quân đỏ (nẳm trên)
        if (row >= 0 && row <= 2) {
            if (row == 0) {//TH row = 0 thì chỉ có xuống
                const isCheck = await checkMoveToNewPos(newGameState, {
                    piece,
                    pieceColor,
                    row,
                    column
                }, row + 1, column) //Nếu nước đi mới mà bị chiếu thì không gợi ý nó
                if (!isCheck) {
                    newGameState[row + 1][column].isMoveValid =
                        (newGameState[row + 1][column].piece === "" ||
                            newGameState[row + 1][column].pieceColor !== pieceColor)
                }
            } else if (row == 2) {//TH row = 1 thì chỉ có lên
                const isCheck = await checkMoveToNewPos(newGameState, {
                    piece,
                    pieceColor,
                    row,
                    column
                }, row - 1, column) //Nếu nước đi mới mà bị chiếu thì không gợi ý nó
                if (!isCheck) {
                    newGameState[row - 1][column].isMoveValid =
                        (newGameState[row - 1][column].piece === "" ||
                            newGameState[row - 1][column].pieceColor !== pieceColor)
                }
            }
        }
    } else { //TH quân đen nằm dưới
        if (row <= 9 && row >= 7) {
            if (row == 7) {//TH row = 7 thì chỉ có xuống
                const isCheck = await checkMoveToNewPos(newGameState, {
                    piece,
                    pieceColor,
                    row,
                    column
                }, row + 1, column) //Nếu nước đi mới mà bị chiếu thì không gợi ý nó
                if (!isCheck) {
                    newGameState[row + 1][column].isMoveValid =
                        (newGameState[row + 1][column].piece === "" ||
                            newGameState[row + 1][column].pieceColor !== pieceColor)
                }
            } else if (row == 9) {//TH row = 9 thì chỉ có lên
                const isCheck = await checkMoveToNewPos(newGameState, {
                    piece,
                    pieceColor,
                    row,
                    column
                }, row - 1, column) //Nếu nước đi mới mà bị chiếu thì không gợi ý nó
                if (!isCheck) {
                    newGameState[row - 1][column].isMoveValid =
                        (newGameState[row - 1][column].piece === "" ||
                            newGameState[row - 1][column].pieceColor !== pieceColor)
                }
            }
        }
    }

    if ((row == 1 && pieceColor === "red") || (row == 8 && pieceColor === "black")) {//TH row = 1 hoặc row = 8 thì lên hoặc xuống đều được
        let isCheck = await checkMoveToNewPos(newGameState, {
            piece,
            pieceColor,
            row,
            column
        }, row - 1, column) //Nếu nước đi mới mà bị chiếu thì không gợi ý nó
        if (!isCheck) {
            newGameState[row - 1][column].isMoveValid =
                (newGameState[row - 1][column].piece === "" ||
                    newGameState[row - 1][column].pieceColor !== pieceColor)
        }

        isCheck = await checkMoveToNewPos(newGameState, {
            piece,
            pieceColor,
            row,
            column
        }, row + 1, column) //Nếu nước đi mới mà bị chiếu thì không gợi ý nó
        if (!isCheck) {
            newGameState[row + 1][column].isMoveValid =
                (newGameState[row + 1][column].piece === "" ||
                    newGameState[row + 1][column].pieceColor !== pieceColor)
        }
    }

    if (column == 3) { //TH sát mép trái thì không đi bên trái được
        const isCheck = await checkMoveToNewPos(newGameState, {
            piece,
            pieceColor,
            row,
            column
        }, row, column + 1) //Nếu nước đi mới mà bị chiếu thì không gợi ý nó
        if (!isCheck) {
            newGameState[row][column + 1].isMoveValid =
                (newGameState[row][column + 1].piece === "" ||
                    newGameState[row][column + 1].pieceColor !== pieceColor)
        }
    } else if (column == 5) { //TH sát mép phải thì không đi bên phải được
        const isCheck = await checkMoveToNewPos(newGameState, {
            piece,
            pieceColor,
            row,
            column
        }, row, column - 1) //Nếu nước đi mới mà bị chiếu thì không gợi ý nó
        if (!isCheck) {
            newGameState[row][column - 1].isMoveValid =
                (newGameState[row][column - 1].piece === "" ||
                    newGameState[row][column - 1].pieceColor !== pieceColor)
        }
    } else if (column == 4) { //TH không sát mép thì đi trái phải được
        let isCheck = await checkMoveToNewPos(newGameState, {
            piece,
            pieceColor,
            row,
            column
        }, row, column + 1) //Nếu nước đi mới mà bị chiếu thì không gợi ý nó
        if (!isCheck) {
            newGameState[row][column + 1].isMoveValid =
                (newGameState[row][column + 1].piece === "" ||
                    newGameState[row][column + 1].pieceColor !== pieceColor)
        }

        isCheck = await checkMoveToNewPos(newGameState, {
            piece,
            pieceColor,
            row,
            column
        }, row, column - 1) //Nếu nước đi mới mà bị chiếu thì không gợi ý nó
        if (!isCheck) {
            newGameState[row][column - 1].isMoveValid =
                (newGameState[row][column - 1].piece === "" ||
                    newGameState[row][column - 1].pieceColor !== pieceColor)
        }
    }

    const kingValidMoves: ChineseChessBoardPiece[] = newGameState.flatMap((row) =>
        row.filter(
            (item) => {
                if (pieceColor === "red") {
                    return item.row >= 0 &&
                        item.row <= 2 &&
                        item.column >= 3 &&
                        item.column <= 5 &&
                        item.isMoveValid === true
                } else {
                    return item.row >= 7 &&
                        item.row <= 9 &&
                        item.column >= 3 &&
                        item.column <= 5 &&
                        item.isMoveValid === true
                }
            }
        )
    );
    if (kingValidMoves.length > 0) { //Sau khi dò xong các TH king đi hợp lệ ở trên thì dò TH coi 2 king có đối mặt nhau không
        kingValidMoves.forEach(async (element) => {
            const isFaceToFace = checkKingFaceToFace(newGameState, element.row, element.column, pieceColor) //Nếu nước đi mới mà bị chiếu thì không gợi ý nó
            if (isFaceToFace) {
                newGameState[element.row][element.column].isMoveValid = false;
            }
        });

    } //Nếu kingValidMoves == 0 => King không đi được vị trí nào hết => trả về state cũ

    return newGameState
}

//Check coi target có trong tầm bắn của cannon không. Note: Không cần biết là trong tầm của cannon enemy nào, chỉ cần biết trong tầm là khỏi đi trong row/col đó
export const checkInCannonRange = (gameState: ChineseChessBoardPiece[][], target: ChineseChessBoardPiece) => {
    let newGameState = [...gameState]
    let blockIndex = -1;
    let inCannonRowRange = false;
    let inCannonColumnRange = false;

    // Find enemy cannons in the same row
    const cannonsRow = gameState[target.row].filter((item) => item.piece === "cannon" && item.pieceColor !== target.pieceColor);

    // Find enemy cannons in the same column
    const cannonsColumn = gameState
        .map((row) => row[target.column]) // Get all pieces in the target column
        .filter((item) => item && item.piece === "cannon" && item.pieceColor !== target.pieceColor);

    const checkTargetInCannon = (cannon: ChineseChessBoardPiece) => {
        let isInRange = false;

        //Upward
        for (let i = cannon.row - 1; i >= 0; i--) {
            const targetSquare = gameState[i][cannon.column];
            if (targetSquare.pieceColor !== cannon.pieceColor && blockIndex == -1) { //Chặn rồi thì lưu index lại để quét các bước sau đó
                blockIndex = i;
            } else if (targetSquare.pieceColor !== cannon.pieceColor && blockIndex != -1 && blockIndex > i && targetSquare.piece.length != 0) { //TH bay sang ăn quân địch
                //Trong tầm bắn và ko bắn quân mình
                if (newGameState[i][cannon.column].piece === target.piece && newGameState[i][cannon.column].pieceColor != cannon.pieceColor && cannon.row == target.row && i == target.column) {
                    isInRange = true;
                    blockIndex = -1;
                    break;
                }
            }
        }

        // Downward
        for (let i = cannon.row + 1; i <= 9; i++) {
            const targetSquare = gameState[i][cannon.column];
            if (targetSquare.pieceColor !== cannon.pieceColor && blockIndex == -1) {//Chặn rồi thì lưu index lại để quét các bước sau đó
                blockIndex = i;
            } else if (targetSquare.pieceColor !== cannon.pieceColor && blockIndex != -1 && blockIndex < i && targetSquare.piece.length != 0) { //TH bay sang ăn quân địch
                //Trong tầm bắn và ko bắn quân mình
                if (newGameState[i][cannon.column].piece === target.piece && newGameState[i][cannon.column].pieceColor != cannon.pieceColor && cannon.row == target.row && i == target.column) {
                    isInRange = true;
                    blockIndex = -1;
                    break;
                }
            }
        }

        // Right
        for (let i = cannon.column + 1; i <= 8; i++) { // Xử lí các nước đi được bên phải trước khi bị chặn
            const blockSquare = gameState[cannon.row][i];
            if (blockSquare.pieceColor !== cannon.pieceColor && blockIndex == -1) {//Chặn rồi thì lưu index lại để quét các bước sau đó
                blockIndex = i;
            } else if (blockSquare.pieceColor !== cannon.pieceColor && blockIndex != -1 && blockIndex < i && blockSquare.piece.length != 0) {//TH bay sang ăn quân địch
                //Trong tầm bắn và ko bắn quân mình
                if (newGameState[cannon.row][i].piece === target.piece && newGameState[cannon.row][i].pieceColor != cannon.pieceColor && cannon.row == target.row && i == target.column) {
                    isInRange = true;
                    blockIndex = -1;
                    break;
                }
            }
        }

        // Left
        for (let i = cannon.column - 1; i >= 0; i--) { // Check xem khi nào bị chặn và có bắn trúng mục tiêu nào không
            const blockSquare = gameState[cannon.row][i];
            if (blockSquare.pieceColor !== cannon.pieceColor && blockIndex == -1) {//Chặn rồi thì lưu index lại để quét các bước sau đó
                blockIndex = i;
            } else if (blockSquare.pieceColor !== cannon.pieceColor && blockIndex != -1 && blockIndex > i && blockSquare.piece.length != 0) {//TH bay sang ăn quân địch
                //Trong tầm bắn và ko bắn quân mình
                if (newGameState[cannon.row][i].piece === target.piece && newGameState[cannon.row][i].pieceColor != cannon.pieceColor && cannon.row == target.row && i == target.column) {
                    isInRange = true;
                    blockIndex = -1;
                    break;
                }
            }
        }

        return isInRange
    }

    cannonsRow.forEach(cannon => {
        inCannonRowRange = checkTargetInCannon(cannon);
    });

    cannonsColumn.forEach(cannon => {
        inCannonColumnRange = checkTargetInCannon(cannon);
    });

    return {
        inCannonRowRange,
        inCannonColumnRange
    };
}

//Check TH 2 king đối mặt nhau (Ko check các TH bị quân khác chiếu, chỉ check TH có bị quân khác chặn)
const checkKingFaceToFace = (gameState: ChineseChessBoardPiece[][], curKingRow: number, curKingCol: number, pieceColor: string) => {
    let isFaceToFace = false;
    if (pieceColor === "red") { //Nếu là red thì quét từ dưới lên để tối ưu hiệu suất (ít vòng lặp)
        for (let i = curKingRow + 1; i <= 9; i++) {
            const blockSquare = gameState[i][curKingCol];
            if (blockSquare.pieceColor !== pieceColor && blockSquare.piece === "king") {
                isFaceToFace = true;
                break;
            } else if (blockSquare.pieceColor !== "" && blockSquare.piece !== "king") {
                isFaceToFace = false;
                break;
            }
        }
    } else { //Nếu là black thì quét từ trên xuống để tối ưu hiệu suất (ít vòng lặp)
        for (let i = 9; i >= curKingRow; i--) {
            const blockSquare = gameState[i][curKingCol];
            if (blockSquare.pieceColor !== pieceColor && blockSquare.piece === "king") {
                isFaceToFace = true;
                break;
            } else if (blockSquare.pieceColor !== "" && blockSquare.piece !== "king") {
                isFaceToFace = false;
                break;
            }
        }
    }
    return isFaceToFace;
}

//Check xem quân cờ đi đến vị trí mới có ảnh hưởng đến bị chiếu không
const checkMoveToNewPos = async (gameState: ChineseChessBoardPiece[][], currentPiece: ChineseChessBoardPiece, newRow: number, newCol: number) => {
    let tempGameState: ChineseChessBoardPiece[][] = JSON.parse(JSON.stringify(gameState));

    //Xóa quân cờ ở vị trí hiện tại
    tempGameState[currentPiece.row][currentPiece.column].isMoveValid = false;
    tempGameState[currentPiece.row][currentPiece.column].piece = "";
    tempGameState[currentPiece.row][currentPiece.column].pieceColor = "";
    tempGameState[currentPiece.row][currentPiece.column].row = currentPiece.row;
    tempGameState[currentPiece.row][currentPiece.column].column = currentPiece.column;

    //Đi quân cờ vào vị trí mới
    if (tempGameState[newRow][newCol].piece === "" ||
        tempGameState[newRow][newCol].pieceColor !== currentPiece.pieceColor) { // Nếu chỗ đó có quân mình thì nhả về false luôn

        tempGameState[newRow][newCol].isMoveValid = false; //Lưu ý là false vì kiểu bưng sang đó để chứ ko di chuyển sang đó, thì mới áp dụng isInCheck được
        tempGameState[newRow][newCol].piece = currentPiece.piece;
        tempGameState[newRow][newCol].pieceColor = currentPiece.pieceColor;
        tempGameState[newRow][newCol].row = newRow;
        tempGameState[newRow][newCol].column = newCol;

        return await isInCheck(tempGameState, currentPiece.pieceColor);;
    } else {
        return false
    }

}

// Checks if the king is in check or not
export const isInCheck = async (gameState: ChineseChessBoardPiece[][], pieceColor: string) => {
    let newGameState: ChineseChessBoardPiece[][] = JSON.parse(JSON.stringify(gameState)); //Như này để DeepCopy thay vì tham chiếu reference dẫn đến sửa cả giá trị
    let isCheck = false;

    newGameState.map(async (innerArray) => {
        innerArray.map(async (obj) => {
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
                    case 'bishop':
                        newGameState = checkBishopMove(newGameState, obj)
                        break;
                    case 'advisor':
                        newGameState = checkAdvisorMove(newGameState, obj)
                        break;
                    case 'cannon':
                        newGameState = checkCannonMove(newGameState, obj)
                        break;
                    // case 'king':
                    //     newGameState = await checkKingMove(newGameState, obj)
                    //     break;
                    default:
                        break;
                }
            }

            if (obj.isMoveValid === true && obj.pieceColor !== pieceColor && obj.piece === 'king') {
                console.log("Opponent King in check")
            }
        })
    })


    let king: ChineseChessBoardPiece[] | undefined;
    king = newGameState.find(innerArray => {
        const potentialKing = innerArray.find(obj => obj.piece === 'king' && obj.pieceColor === pieceColor);
        // console.log(potentialKing)
        return potentialKing?.pieceColor === pieceColor && potentialKing.piece === 'king' && potentialKing?.isMoveValid === true;
    });

    if (king !== undefined) {
        isCheck = true
    }

    return isCheck;
}

// Find and return potential moves to block the check
export const checkPotentialBlockMoves = async (gameState: ChineseChessBoardPiece[][], pieceColor: string) => {
    let newGameState = [...gameState]
    let potentialMoves: PotentialMovePiece[] = []

    newGameState.map((innerArray) => {
        innerArray.map((obj) => {
            obj.isMoveValid = false
        })
    })

    await Promise.all(
        newGameState.map(async (innerArray, index) => {
            await Promise.all(
                innerArray.map(async (obj, index) => {
                    if (obj.piece !== '' && obj.pieceColor === pieceColor) {
                        // console.log(obj.piece,obj.pieceColor)
                        let tempState: ChineseChessBoardPiece[][] = JSON.parse(JSON.stringify(newGameState));
                        tempState.map((innerArray1) => {
                            innerArray1.map((obj1) => {
                                obj1.isMoveValid = false
                            })
                        })
                        switch (obj.piece) {
                            case 'pawn':
                                tempState = checkPawnMove(tempState, obj)
                                break;
                            case 'rook':
                                tempState = checkRookMove(tempState, obj)
                                break;
                            case 'knight':
                                tempState = checkKnightMove(tempState, obj)
                                break;
                            case 'bishop':
                                tempState = checkBishopMove(tempState, obj)
                                break;
                            case 'advisor':
                                tempState = checkAdvisorMove(tempState, obj)
                                break;
                            case 'cannon':
                                tempState = checkCannonMove(tempState, obj)
                                break;
                            case 'king':
                                tempState = await checkKingMove(tempState, obj)
                                break;
                            default:
                                break;
                        }

                        const res = await checkValidMove(tempState, obj);
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
export const checkValidMove = async (gameState: ChineseChessBoardPiece[][], chessPiece: ChineseChessBoardPiece) => {
    let newGameState = gameState.map(row =>
        row.map(square => ({ ...square }))
    );

    let potentialMoves: PotentialMovePiece[] = [];

    await Promise.all(
        newGameState.map(async (rowArray) => {
            await Promise.all(
                rowArray.map(async (square) => {
                    if (square.isMoveValid === true && square.pieceColor !== chessPiece.pieceColor) {
                        const { row, column } = square;
                        let temp: ChineseChessBoardPiece[][] = newGameState.map(row =>
                            row.map(sq => ({ ...sq }))
                        );


                        temp[row][column].piece = chessPiece.piece;
                        temp[row][column].pieceColor = chessPiece.pieceColor;
                        temp[row][column].isMoveValid = false;

                        const res: boolean = await isInCheck(temp, chessPiece.pieceColor);
                        // console.log(res);
                        if (!res) {
                            const potentialMove: ChineseChessBoardPiece = {
                                piece: chessPiece.piece,
                                pieceColor: chessPiece.pieceColor,
                                row: square.row,
                                column: square.column,
                                isMoveValid: false
                            }
                            const fromMove: ChineseChessBoardPiece = chessPiece;
                            potentialMoves.push({
                                potentialMove,
                                fromMove
                            });
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

export const updateNewGameState = async (gameState: ChineseChessBoardPiece[][], filteredMoves: PotentialMovePiece[], selectedPiece: ChineseChessBoardPiece) => {
    let newGameState: ChineseChessBoardPiece[][] = JSON.parse(JSON.stringify(gameState));
    newGameState.map((innerArray) => {
        innerArray.map((obj) => {
            obj.isMoveValid = false
        })
    })

    await Promise.all(
        newGameState.flatMap((piece, index) => {
            piece.forEach(pieceMove => {
                filteredMoves.forEach(move => {
                    if (move.fromMove.piece === selectedPiece.piece &&
                        move.fromMove.pieceColor === selectedPiece.pieceColor &&
                        move.fromMove.row == selectedPiece.row &&
                        move.fromMove.column == selectedPiece.column
                    ) {
                        if (move.potentialMove.row == pieceMove.row && // Từ dòng này đổ xuống là tìm vị trí đi được
                            move.potentialMove.column == pieceMove.column) {
                            newGameState[pieceMove.row][pieceMove.column].isMoveValid = true;
                        }
                    }
                });
            });
        })
    )
    return newGameState
}

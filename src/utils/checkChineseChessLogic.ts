export interface Position {
    row: number;
    col: number;
}

export const isValidMove = (piece: string, player: string, from: Position, to: Position, board: any[][]): boolean => {
    const rowDiff = Math.abs(from.row - to.row);
    const colDiff = Math.abs(from.col - to.col);

    switch (piece) {
        case 'king': // Vua (Tướng)
            return rowDiff + colDiff === 1 && withinKingPalace(to, player);

        case 'advisor': // Sĩ
            return rowDiff === 1 && colDiff === 1 && withinKingPalace(to, player);

        case 'elephant': // Tượng
            return rowDiff === 2 && colDiff === 2 && isPathClear(from, to, board) && withinElephantZone(to, player);

        case 'knight': // Mã
            return (rowDiff === 2 && colDiff === 1 || rowDiff === 1 && colDiff === 2) && isPathClearForKnight(from, to, board);

        case 'rook': // Xe
            return (rowDiff === 0 || colDiff === 0) && isPathClear(from, to, board);

        case 'cannon': // Pháo
            return (rowDiff === 0 || colDiff === 0) && isCannonMoveValid(from, to, board);

        case 'pawn': // Tốt
            return isPawnMoveValid(player, from, to);

        default:
            return false;
    }
};

// Vua/Sĩ chỉ được di chuyển trong cung
const withinKingPalace = (pos: Position, player: string): boolean => {
    if (player === 'red') return pos.row >= 7 && pos.col >= 3 && pos.col <= 5;
    if (player === 'black') return pos.row <= 2 && pos.col >= 3 && pos.col <= 5;
    return false;
};

// Tượng không được qua sông
const withinElephantZone = (pos: Position, player: string): boolean => {
    if (player === 'red') return pos.row >= 5;
    if (player === 'black') return pos.row <= 4;
    return false;
};

// Tốt chỉ được đi thẳng trước khi qua sông, sau đó được đi ngang
const isPawnMoveValid = (player: string, from: Position, to: Position): boolean => {
    if (player === 'red') {
        if (from.row >= 5) return from.row - to.row === 1 && from.col === to.col;
        return (from.row - to.row === 1 && from.col === to.col) || (from.row === to.row && Math.abs(from.col - to.col) === 1);
    }
    if (player === 'black') {
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

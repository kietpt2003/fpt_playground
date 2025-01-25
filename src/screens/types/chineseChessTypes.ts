export type ChineseChessPiece = "rook" | "knight" | "bishop" | "advisor" | "king" | "cannon" | "pawn" | ""

export type Position = {
    row: number,
    column: number,
}

export type PotentialMovePiece = {
    potentialMove: ChineseChessBoardPiece,
    fromMove: ChineseChessBoardPiece,
}

export interface ChineseChessBoardPiece {
    piece: ChineseChessPiece,
    pieceColor: string,
    row: number,
    column: number,
    isMoveValid?: boolean
}

export const chineseChessRowSize = 40;

export const chineseChessSize = chineseChessRowSize;

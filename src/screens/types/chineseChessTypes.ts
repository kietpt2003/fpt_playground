type ChineseChessPiece = "rook" | "knight" | "bishop" | "advisor" | "king" | "cannon" | "pawn" | ""

export type Position = {
    row: number,
    column: number,
}

export interface ChineseChessBoardPiece {
    piece: ChineseChessPiece,
    pieceColor: string,
    row: number,
    column: number,
    isMoveValid?: boolean
}

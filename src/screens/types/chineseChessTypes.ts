export type ChineseChessPiece = "rook" | "knight" | "bishop" | "advisor" | "king" | "cannon" | "pawn" | ""

export interface ChineseChessBoardPiece {
    piece: ChineseChessPiece,
    pieceColor: string,
    row: number,
    column: number,
    isMoveValid?: boolean
}

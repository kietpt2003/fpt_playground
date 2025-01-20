export type ChineseChessPiece = "rook" | "knight" | "elephant" | "advisor" | "king" | "cannon" | "pawn" | ""

export interface ChineseChessBoardPiece {
    piece: ChineseChessPiece,
    pieceColor: string,
    row: number,
    column: number,
    isMoveValid?: boolean
}

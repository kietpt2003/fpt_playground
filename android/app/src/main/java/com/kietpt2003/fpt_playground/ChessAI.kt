package com.kietpt2003.fpt_playground

import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReadableArray
import com.facebook.react.bridge.ReadableMap
import com.facebook.react.bridge.WritableArray
import com.facebook.react.bridge.WritableMap

enum class ChineseChessPiece {
    ROOK, KNIGHT, BISHOP, ADVISOR, KING, CANNON, PAWN, EMPTY
}

data class ChineseChessBoardPiece(
    val piece: ChineseChessPiece,
    val pieceColor: String,
    val row: Int,
    val column: Int,
    var isMoveValid: Boolean? = null
)

class ChessAI(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {

    override fun getName(): String {
        return "ChessAI"
    }

    @ReactMethod
    fun getBestMove(boardState: String, depth: Int, promise: Promise) {
        try {
            // Gọi thuật toán Minimax hoặc Alpha-Beta Pruning
            val bestMove = minimaxBestMove(boardState, depth)

            // Trả về kết quả cho React Native
            promise.resolve(bestMove)
        } catch (e: Exception) {
            promise.reject("ERROR", e)
        }
    }

    private fun minimaxBestMove(boardState: String, depth: Int): String {
        // ⚡ Viết thuật toán Minimax hoặc Alpha-Beta Pruning ở đây
        return "e2e4" // Giả sử nước đi tốt nhất là e2e4
    }

    fun withinKingPalace(row: Int, column: Int, pieceColor: String): Boolean {
        return when (pieceColor) {
            "red" -> row >= 7 && column in 3..5
            "black" -> row <= 2 && column in 3..5
            else -> false
        }
    }

    @ReactMethod
    fun checkPawnMove(gameStateArray: ReadableArray, pieceMap: ReadableMap, promise: Promise) {
        try {
            // Chuyển đổi ReadableArray thành mảng hai chiều của ChineseChessBoardPiece
            val gameState = parseGameStateArray(gameStateArray)
            // Chuyển đổi ReadableMap thành ChineseChessBoardPiece
            val piece = parseBoardPieceMap(pieceMap)

            //
            val (_, pieceColor, row, column) = piece
            val newGameState = gameState.map { it.copyOf() }.toTypedArray()

            if (pieceColor.equals("black")) {//TH quân đen (nẳm trên)
                if (row in 3 until 9) {
                    newGameState[row + 1][column].isMoveValid =
                        newGameState[row + 1][column].piece == ChineseChessPiece.EMPTY ||
                                newGameState[row + 1][column].pieceColor != pieceColor
                }
            } else {//TH quân đỏ nằm dưới
                if (row in 1..6) {
                    newGameState[row - 1][column].isMoveValid =
                        newGameState[row - 1][column].piece == ChineseChessPiece.EMPTY ||
                                newGameState[row - 1][column].pieceColor != pieceColor
                }
            }

            if ((row <= 4 && pieceColor === "red") || (row >= 5 && pieceColor === "black")) { //TH tốt qua sông
                when (column) {
                    0 -> newGameState[row][column + 1].isMoveValid =
                        newGameState[row][column + 1].piece == ChineseChessPiece.EMPTY ||
                                newGameState[row][column + 1].pieceColor !== pieceColor //TH tốt qua sông mà sát mép trái thì không đi bên trái được
                    8 -> newGameState[row][column - 1].isMoveValid =
                        newGameState[row][column - 1].piece == ChineseChessPiece.EMPTY ||
                                newGameState[row][column - 1].pieceColor != pieceColor //TH tốt qua sông mà sát mép phải thì không đi bên phải được
                    else -> { //TH tốt qua sông mà không sát mép thì đi trái phải được
                        newGameState[row][column + 1].isMoveValid =
                            newGameState[row][column + 1].piece == ChineseChessPiece.EMPTY ||
                                    newGameState[row][column + 1].pieceColor !== pieceColor
                        newGameState[row][column - 1].isMoveValid =
                            newGameState[row][column - 1].piece == ChineseChessPiece.EMPTY ||
                                    newGameState[row][column - 1].pieceColor !== pieceColor
                    }
                }
            }

            // Chuyển đổi kết quả thành ReadableArray và trả về
            promise.resolve(convertGameStateToReadableArray(newGameState))
        } catch (e: Exception) {
            promise.reject("Error", e)
        }
    }
//    fun checkPawnMove(
//        gameStateArray: ReadableArray,
//        pieceMap: ReadableMap,
//    ): Array<Array<ChineseChessBoardPiece>> {
//        val gameState = parseGameStateArray(gameStateArray);
//        val piece = parseBoardPieceMap(pieceMap);
//
//        val (_, pieceColor, row, column) = piece
//        val newGameState = gameState.map { it.copyOf() }.toTypedArray()
//
//        if (pieceColor.equals("black")) {//TH quân đen (nẳm trên)
//            if (row in 3 until 9) {
//                newGameState[row + 1][column].isMoveValid =
//                    newGameState[row + 1][column].piece == ChineseChessPiece.EMPTY ||
//                            newGameState[row + 1][column].pieceColor != pieceColor
//            }
//        } else {//TH quân đỏ nằm dưới
//            if (row in 1..6) {
//                newGameState[row - 1][column].isMoveValid =
//                    newGameState[row - 1][column].piece == ChineseChessPiece.EMPTY ||
//                            newGameState[row - 1][column].pieceColor != pieceColor
//            }
//        }
//
//        if ((row <= 4 && pieceColor === "red") || (row >= 5 && pieceColor === "black")) { //TH tốt qua sông
//            when (column) {
//                0 -> newGameState[row][column + 1].isMoveValid =
//                    newGameState[row][column + 1].piece == ChineseChessPiece.EMPTY ||
//                            newGameState[row][column + 1].pieceColor !== pieceColor //TH tốt qua sông mà sát mép trái thì không đi bên trái được
//                8 -> newGameState[row][column - 1].isMoveValid =
//                    newGameState[row][column - 1].piece == ChineseChessPiece.EMPTY ||
//                            newGameState[row][column - 1].pieceColor != pieceColor //TH tốt qua sông mà sát mép phải thì không đi bên phải được
//                else -> { //TH tốt qua sông mà không sát mép thì đi trái phải được
//                    newGameState[row][column + 1].isMoveValid =
//                        newGameState[row][column + 1].piece == ChineseChessPiece.EMPTY ||
//                                newGameState[row][column + 1].pieceColor !== pieceColor
//                    newGameState[row][column - 1].isMoveValid =
//                        newGameState[row][column - 1].piece == ChineseChessPiece.EMPTY ||
//                                newGameState[row][column - 1].pieceColor !== pieceColor
//                }
//            }
//        }
//
//        return newGameState
//    }

    fun checkRookMove(
        gameState: Array<Array<ChineseChessBoardPiece>>,
        piece: ChineseChessBoardPiece
    ): Array<Array<ChineseChessBoardPiece>> {
        val (_, pieceColor, row, column) = piece
        val newGameState = gameState.map { it.copyOf() }.toTypedArray()

        // Upward
        for (i in row - 1 downTo 0) {
            val targetSquare = gameState[i][column]
            if (targetSquare.piece == ChineseChessPiece.EMPTY) {
                newGameState[i][column].isMoveValid = true
            } else if (targetSquare.pieceColor !== pieceColor) {
                newGameState[i][column].isMoveValid = true
                break
            } else {
                break
            }
        }

        // Downward
        for (i in row + 1..9) {
            val targetSquare = gameState[i][column]
            if (targetSquare.piece == ChineseChessPiece.EMPTY) {
                newGameState[i][column].isMoveValid = true
            } else if (targetSquare.pieceColor !== pieceColor) {
                newGameState[i][column].isMoveValid = true
                break
            } else {
                break
            }
        }

        // Right
        for (i in column + 1..8) {
            val targetSquare = gameState[row][i]
            if (targetSquare.piece == ChineseChessPiece.EMPTY) {
                newGameState[row][i].isMoveValid = true
            } else if (targetSquare.pieceColor !== pieceColor) {
                newGameState[row][i].isMoveValid = true
                break
            } else {
                break
            }
        }

        // Left
        for (i in column - 1 downTo 0) {
            val targetSquare = gameState[row][i]
            if (targetSquare.piece == ChineseChessPiece.EMPTY) {
                newGameState[row][i].isMoveValid = true
            } else if (targetSquare.pieceColor !== pieceColor) {
                newGameState[row][i].isMoveValid = true
                break
            } else {
                break
            }
        }

        return newGameState
    }

    @ReactMethod
    fun convertToWritableArray(array: ReadableArray): WritableArray {
        val writableArray = Arguments.createArray()
        for (i in 0 until array.size()) {
            val element = array.getMap(i)
            writableArray.pushMap(element)
        }
        return writableArray
    }

    @ReactMethod
    fun convertToWritableMap(map: ReadableMap, promise: Promise) {
        val writableMap = Arguments.createMap()
        val iterator = map.keySetIterator()
        while (iterator.hasNextKey()) {
            val key = iterator.nextKey()
            writableMap.putString(key, map.getString(key))
        }
        promise.resolve(writableMap)
    }

    fun stringToChineseChessPiece(piece: String): ChineseChessPiece {
        return when (piece.lowercase()) {
            "rook" -> ChineseChessPiece.ROOK
            "knight" -> ChineseChessPiece.KNIGHT
            "bishop" -> ChineseChessPiece.BISHOP
            "advisor" -> ChineseChessPiece.ADVISOR
            "king" -> ChineseChessPiece.KING
            "cannon" -> ChineseChessPiece.CANNON
            "pawn" -> ChineseChessPiece.PAWN
            "" -> ChineseChessPiece.EMPTY
            else -> throw IllegalArgumentException("Unknown piece: $piece")
        }
    }

    fun parseGameStateArray(gameStateArray: ReadableArray): Array<Array<ChineseChessBoardPiece>> {
        val rows = gameStateArray.size()
        val gameState = Array(rows) { arrayOf<ChineseChessBoardPiece>() }

        for (i in 0 until rows) {
            val rowArray = gameStateArray.getArray(i)
            val columns = rowArray.size()
            val row =
                Array(columns) { ChineseChessBoardPiece(ChineseChessPiece.EMPTY, "", 0, 0, false) }

            for (j in 0 until columns) {
                val pieceMap = rowArray.getMap(j)
                row[j] = ChineseChessBoardPiece(
                    piece = stringToChineseChessPiece(pieceMap.getString("piece")!!),
                    pieceColor = pieceMap.getString("pieceColor")!!,
                    row = pieceMap.getInt("row"),
                    column = pieceMap.getInt("column"),
                    isMoveValid = pieceMap.getBoolean("isMoveValid")
                )
            }
            gameState[i] = row
        }

        return gameState
    }

    fun parseBoardPieceMap(pieceMap: ReadableMap): ChineseChessBoardPiece {
        return ChineseChessBoardPiece(
            piece = stringToChineseChessPiece(pieceMap.getString("piece")!!),
            pieceColor = pieceMap.getString("pieceColor")!!,
            row = pieceMap.getInt("row"),
            column = pieceMap.getInt("column"),
            isMoveValid = pieceMap.getBoolean("isMoveValid")
        )
    }

    fun convertGameStateToReadableArray(gameState: Array<Array<ChineseChessBoardPiece>>): WritableArray {
        val array = Arguments.createArray()
        for (row in gameState) {
            val rowArray = Arguments.createArray()
            for (piece in row) {
                val pieceMap = Arguments.createMap()
                when (piece.piece) {
                    ChineseChessPiece.EMPTY -> pieceMap.putString("piece","");
                    else -> pieceMap.putString("piece",piece.piece.name.lowercase());
                }
                pieceMap.putString("pieceColor", piece.pieceColor)
                pieceMap.putInt("row", piece.row)
                pieceMap.putInt("column", piece.column)
                piece.isMoveValid?.let { pieceMap.putBoolean("isMoveValid", it) }
                rowArray.pushMap(pieceMap)
            }
            array.pushArray(rowArray)
        }
        return array
    }
}
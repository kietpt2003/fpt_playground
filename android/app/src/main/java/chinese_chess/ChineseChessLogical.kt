package chinese_chess

import android.util.Log
import chinese_chess.entities.ChineseChessBoardPiece
import chinese_chess.entities.ChineseChessPiece
import chinese_chess.entities.PotentialMovePiece
import chinese_chess.utils.ChineseChessUtils
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.ReadableArray
import com.facebook.react.bridge.ReadableMap
import com.facebook.react.bridge.WritableArray
import com.facebook.react.bridge.WritableMap
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch
import kotlin.coroutines.resume
import kotlin.coroutines.resumeWithException
import kotlin.coroutines.suspendCoroutine

class ChineseChessLogical(reactApplicationContext: ReactApplicationContext) :
    ReactContextBaseJavaModule(reactApplicationContext) {
    override fun getName(): String = "ChineseChessLogical"

    @ReactMethod
    fun checkPawnMove(gameStateArray: ReadableArray, pieceMap: ReadableMap, promise: Promise) {
        try {
            // Chuyển đổi ReadableArray thành mảng hai chiều của ChineseChessBoardPiece
            val gameState = ChineseChessUtils.parseGameStateArray(gameStateArray)
            // Chuyển đổi ReadableMap thành ChineseChessBoardPiece
            val piece = ChineseChessUtils.parseBoardPieceMap(pieceMap)
            val (_, pieceColor, row, column) = piece

            if (pieceColor == "black") {//TH quân đen (nẳm trên)
                if (row in 3 until 9) {
                    gameState[row + 1][column].isMoveValid =
                        gameState[row + 1][column].piece == ChineseChessPiece.EMPTY ||
                                gameState[row + 1][column].pieceColor != pieceColor
                }
            } else {//TH quân đỏ nằm dưới
                if (row in 1..6) {
                    gameState[row - 1][column].isMoveValid =
                        gameState[row - 1][column].piece == ChineseChessPiece.EMPTY ||
                                gameState[row - 1][column].pieceColor != pieceColor
                }
            }

            if ((row <= 4 && pieceColor == "red") || (row >= 5 && pieceColor == "black")) { //TH tốt qua sông
                when (column) {
                    0 -> gameState[row][0].isMoveValid =
                        gameState[row][0].piece == ChineseChessPiece.EMPTY ||
                                gameState[row][0].pieceColor != pieceColor //TH tốt qua sông mà sát mép trái thì không đi bên trái được
                    8 -> gameState[row][column - 1].isMoveValid =
                        gameState[row][column - 1].piece == ChineseChessPiece.EMPTY ||
                                gameState[row][column - 1].pieceColor != pieceColor //TH tốt qua sông mà sát mép phải thì không đi bên phải được
                    else -> { //TH tốt qua sông mà không sát mép thì đi trái phải được
                        gameState[row][column + 1].isMoveValid =
                            gameState[row][column + 1].piece == ChineseChessPiece.EMPTY ||
                                    gameState[row][column + 1].pieceColor != pieceColor
                        gameState[row][column - 1].isMoveValid =
                            gameState[row][column - 1].piece == ChineseChessPiece.EMPTY ||
                                    gameState[row][column - 1].pieceColor != pieceColor
                    }
                }
            }

            // Chuyển đổi kết quả thành ReadableArray và trả về
            promise.resolve(ChineseChessUtils.convertGameStateToReadableArray(gameState))
        } catch (e: Exception) {
            promise.reject("Error", e)
        }
    }

    @ReactMethod
    fun checkRookMove(gameStateArray: ReadableArray, pieceMap: ReadableMap, promise: Promise) {
        try {
            val gameState = ChineseChessUtils.parseGameStateArray(gameStateArray)
            val piece = ChineseChessUtils.parseBoardPieceMap(pieceMap)
            val (_, pieceColor, row, column) = piece

            // Danh sách 4 hướng di chuyển của xe: (deltaRow, deltaCol)
            val directions = listOf(
                -1 to 0,  // Up
                1 to 0,   // Down
                0 to 1,   // Right
                0 to -1   // Left
            )

            // Hàm xử lý di chuyển theo một hướng
            fun markValidMovesInDirection(deltaRow: Int, deltaCol: Int) {
                var r = row + deltaRow
                var c = column + deltaCol

                while (r in 0..9 && c in 0..8) {
                    val targetSquare = gameState[r][c]
                    if (targetSquare.piece == ChineseChessPiece.EMPTY) {
                        targetSquare.isMoveValid = true
                    } else {
                        if (targetSquare.pieceColor != pieceColor) {
                            targetSquare.isMoveValid = true
                        }
                        break // Nếu gặp vật cản thì dừng lại
                    }
                    r += deltaRow
                    c += deltaCol
                }
            }

            // Chạy đồng thời các hướng di chuyển của xe (không cần chờ đợi từng cái)
            directions.parallelStream().forEach { (deltaRow, deltaCol) ->
                markValidMovesInDirection(deltaRow, deltaCol)
            }

            promise.resolve(ChineseChessUtils.convertGameStateToReadableArray(gameState))
        } catch (e: Exception) {
            promise.reject("Error", e)
        }
    }

    @ReactMethod
    fun checkKnightMove(gameStateArray: ReadableArray, pieceMap: ReadableMap, promise: Promise) {
        try {
            val gameState = ChineseChessUtils.parseGameStateArray(gameStateArray)
            val piece = ChineseChessUtils.parseBoardPieceMap(pieceMap)
            val (_, pieceColor, row, column) = piece

            if (row in 0..1) { //TH ở row 0 và 1 thì chỉ có thể đi xuống thôi
                if (column in 0..6) { //TH từ col 0 -> 6 thì có thể qua 2 xuống 1 (Trong TH này sẽ không xét qua bên trái)
                    val blockRightSquare = gameState[row][column + 1]
                    if (blockRightSquare.pieceColor == "") { //TH không bị chặn bên phải
                        gameState[row + 1][column + 2].isMoveValid =
                            (gameState[row + 1][column + 2].piece == ChineseChessPiece.EMPTY ||
                                    gameState[row + 1][column + 2].pieceColor != pieceColor)

                        if (row == 1) { //TH row = 1 thì có thể đi lên với điều kiện là qua phải 2 lên 1
                            gameState[0][column + 2].isMoveValid =
                                (gameState[0][column + 2].piece == ChineseChessPiece.EMPTY ||
                                        gameState[0][column + 2].pieceColor != pieceColor)
                        }
                    }

                    val blockBottomSquare = gameState[row + 1][column]
                    if (blockBottomSquare.pieceColor == "") { //TH xuống 2 qua 1
                        gameState[row + 2][column + 1].isMoveValid =
                            (gameState[row + 2][column + 1].piece == ChineseChessPiece.EMPTY ||
                                    gameState[row + 2][column + 1].pieceColor != pieceColor)

                        if (column != 0) { //TH nếu khác col = 0 thì đều có thể qua trái
                            gameState[row + 2][column - 1].isMoveValid =
                                (gameState[row + 2][column - 1].piece == ChineseChessPiece.EMPTY ||
                                        gameState[row + 2][column - 1].pieceColor != pieceColor)
                        }
                    }
                }

                if (column in 2..8) { //TH từ col 2 -> 8 thì có thể qua 2 xuống 1 (Trong TH này sẽ không xét qua bên phải)
                    val blockLeftSquare = gameState[row][column - 1]
                    if (blockLeftSquare.pieceColor == "") { //TH không bị chặn bên trái
                        gameState[row + 1][column - 2].isMoveValid =
                            (gameState[row + 1][column - 2].piece == ChineseChessPiece.EMPTY ||
                                    gameState[row + 1][column - 2].pieceColor !== pieceColor)
                        if (row == 1) { //TH row = 1 thì có thể đi lên với điều kiện là qua trái 2 lên 1
                            gameState[0][column - 2].isMoveValid =
                                (gameState[0][column - 2].piece == ChineseChessPiece.EMPTY ||
                                        gameState[0][column - 2].pieceColor !== pieceColor)
                        }
                    }

                    val blockBottomSquare = gameState[row + 1][column]
                    if (blockBottomSquare.pieceColor == "") { //TH xuống 2 qua 1
                        gameState[row + 2][column - 1].isMoveValid =
                            (gameState[row + 2][column - 1].piece == ChineseChessPiece.EMPTY ||
                                    gameState[row + 2][column - 1].pieceColor !== pieceColor)
                        if (column != 8) {//TH nếu khác col = 8 thì đều có thể qua phải
                            gameState[row + 2][column + 1].isMoveValid =
                                (gameState[row + 2][column + 1].piece == ChineseChessPiece.EMPTY ||
                                        gameState[row + 2][column + 1].pieceColor !== pieceColor)
                        }
                    }
                }
            } else if (row in 2..7) { //TH cách đỉnh >= 2 ô và cách đáy <= 7 ô
                val blockTopSquare = gameState[row - 1][column]
                if (blockTopSquare.pieceColor == "") { //Top ko có người chặn
                    when (column) {
                        0 -> { // Đi được bên phải
                            gameState[row - 2][0].isMoveValid =
                                (gameState[row - 2][0].piece == ChineseChessPiece.EMPTY ||
                                        gameState[row - 2][0].pieceColor != pieceColor)
                        }

                        8 -> { // Đi được bên trái
                            gameState[row - 2][column - 1].isMoveValid =
                                (gameState[row - 2][column - 1].piece == ChineseChessPiece.EMPTY ||
                                        gameState[row - 2][column - 1].pieceColor != pieceColor)
                        }

                        else -> {// Đi được cả hai bên
                            gameState[row - 2][column + 1].isMoveValid =
                                (gameState[row - 2][column + 1].piece == ChineseChessPiece.EMPTY ||
                                        gameState[row - 2][column + 1].pieceColor != pieceColor)

                            gameState[row - 2][column - 1].isMoveValid =
                                (gameState[row - 2][column - 1].piece == ChineseChessPiece.EMPTY ||
                                        gameState[row - 2][column - 1].pieceColor != pieceColor)
                        }
                    }
                }

                val blockBottomSquare = gameState[row + 1][column]
                if (blockBottomSquare.pieceColor == "") { //Bottom ko có người chặn
                    when (column) {
                        0 -> { // Đi được bên phải
                            gameState[row + 2][0].isMoveValid =
                                (gameState[row + 2][0].piece == ChineseChessPiece.EMPTY ||
                                        gameState[row + 2][0].pieceColor != pieceColor)
                        }

                        8 -> { // Đi được bên trái
                            gameState[row + 2][column - 1].isMoveValid =
                                (gameState[row + 2][column - 1].piece == ChineseChessPiece.EMPTY ||
                                        gameState[row + 2][column - 1].pieceColor != pieceColor)
                        }

                        else -> { // Đi được cả hai bên (lên/xuống 2 qua trái/phải 1)
                            gameState[row + 2][column + 1].isMoveValid =
                                (gameState[row + 2][column + 1].piece == ChineseChessPiece.EMPTY ||
                                        gameState[row + 2][column + 1].pieceColor != pieceColor)

                            gameState[row + 2][column - 1].isMoveValid =
                                (gameState[row + 2][column - 1].piece == ChineseChessPiece.EMPTY ||
                                        gameState[row + 2][column - 1].pieceColor != pieceColor)
                        }
                    }
                }

                if (column in 0..6) {
                    val blockRightSquare = gameState[row][column + 1]
                    if (blockRightSquare.pieceColor == "") { //TH không bị chặn bên phải (qua phải 2 lên/xuống 1)
                        gameState[row - 1][column + 2].isMoveValid =
                            (gameState[row - 1][column + 2].piece == ChineseChessPiece.EMPTY ||
                                    gameState[row - 1][column + 2].pieceColor != pieceColor)

                        gameState[row + 1][column + 2].isMoveValid =
                            (gameState[row + 1][column + 2].piece == ChineseChessPiece.EMPTY ||
                                    gameState[row + 1][column + 2].pieceColor != pieceColor)
                    }
                }

                if (column in 2..8) {
                    val blockLeftSquare = gameState[row][column - 1]
                    if (blockLeftSquare.pieceColor == "") { //TH không bị chặn bên trái (qua trái 2 lên/xuống 1)
                        gameState[row - 1][column - 2].isMoveValid =
                            (gameState[row - 1][column - 2].piece == ChineseChessPiece.EMPTY ||
                                    gameState[row - 1][column - 2].pieceColor != pieceColor)

                        gameState[row + 1][column - 2].isMoveValid =
                            (gameState[row + 1][column - 2].piece == ChineseChessPiece.EMPTY ||
                                    gameState[row + 1][column - 2].pieceColor != pieceColor)
                    }
                }
            } else if (row in 8..9) {
                if (column in 0..6) { //TH từ col 0 -> 6 thì có thể qua 2 lên 1 (Trong TH này sẽ không xét qua bên trái)
                    val blockRightSquare = gameState[row][column + 1]
                    if (blockRightSquare.pieceColor == "") { //TH không bị chặn bên phải
                        gameState[row - 1][column + 2].isMoveValid =
                            (gameState[row - 1][column + 2].piece == ChineseChessPiece.EMPTY ||
                                    gameState[row - 1][column + 2].pieceColor != pieceColor)

                        if (row == 8) { //TH row = 8 thì có thể đi xuống với điều kiện là qua phải 2 xuống 1
                            gameState[row + 1][column + 2].isMoveValid =
                                (gameState[row + 1][column + 2].piece == ChineseChessPiece.EMPTY ||
                                        gameState[row + 1][column + 2].pieceColor != pieceColor)
                        }
                    }

                    val blockTopSquare = gameState[row - 1][column]
                    if (blockTopSquare.pieceColor == "") { //TH lên 2 qua 1
                        gameState[row - 2][column + 1].isMoveValid =
                            (gameState[row - 2][column + 1].piece == ChineseChessPiece.EMPTY ||
                                    gameState[row - 2][column + 1].pieceColor != pieceColor)

                        if (column != 0) { //TH nếu khác col = 0 thì đều có thể qua trái
                            gameState[row - 2][column - 1].isMoveValid =
                                (gameState[row - 2][column - 1].piece == ChineseChessPiece.EMPTY ||
                                        gameState[row - 2][column - 1].pieceColor != pieceColor)
                        }
                    }

                }
                if (column in 2..8) { //TH từ col 2 -> 8 thì có thể qua 2 lên 1 (Trong TH này sẽ không xét qua bên phải)
                    val blockLeftSquare = gameState[row][column - 1]
                    if (blockLeftSquare.pieceColor == "") { //TH không bị chặn bên trái
                        gameState[row - 1][column - 2].isMoveValid =
                            (gameState[row - 1][column - 2].piece == ChineseChessPiece.EMPTY ||
                                    gameState[row - 1][column - 2].pieceColor != pieceColor)

                        if (row == 8) { //TH row = 8 thì có thể đi xuống với điều kiện là qua trái 2 xuống 1
                            gameState[row + 1][column - 2].isMoveValid =
                                (gameState[row + 1][column - 2].piece == ChineseChessPiece.EMPTY ||
                                        gameState[row + 1][column - 2].pieceColor != pieceColor)
                        }
                    }

                    val blockTopSquare = gameState[row - 1][column]
                    if (blockTopSquare.pieceColor == "") { //TH lên 2 qua 1
                        gameState[row - 2][column - 1].isMoveValid =
                            (gameState[row - 2][column - 1].piece == ChineseChessPiece.EMPTY ||
                                    gameState[row - 2][column - 1].pieceColor != pieceColor)

                        if (column != 8) { //TH nếu khác col = 8 thì đều có thể qua phải
                            gameState[row - 2][column + 1].isMoveValid =
                                (gameState[row - 2][column + 1].piece == ChineseChessPiece.EMPTY ||
                                        gameState[row - 2][column + 1].pieceColor != pieceColor)
                        }
                    }
                }
            }

            promise.resolve(ChineseChessUtils.convertGameStateToReadableArray(gameState))
        } catch (e: Exception) {
            promise.reject("Error", e)
        }
    }

    @ReactMethod
    fun checkBishopMove(gameStateArray: ReadableArray, pieceMap: ReadableMap, promise: Promise) {
        try {
            // Chuyển đổi ReadableArray thành mảng hai chiều của ChineseChessBoardPiece
            val gameState = ChineseChessUtils.parseGameStateArray(gameStateArray)
            // Chuyển đổi ReadableMap thành ChineseChessBoardPiece
            val piece = ChineseChessUtils.parseBoardPieceMap(pieceMap)
            val (_, pieceColor, row, column) = piece

            val checkValidMove = { i: Int, j: Int ->
                if (i in 0..9 && j in 0..8) {
                    val targetSquare = gameState[i][j]
                    val loopIndex = i - row
                    if ((loopIndex == 1 || loopIndex == -1) && targetSquare.piece != ChineseChessPiece.EMPTY) {
                        false
                    } else if (targetSquare.piece == ChineseChessPiece.EMPTY &&
                        ((pieceColor == "black" && i <= 4 && i % 2 == 0) ||
                                (pieceColor == "red" && i >= 5 && i % 2 == 1))
                    ) {
                        gameState[i][j].isMoveValid = true
                        false
                    } else if (targetSquare.pieceColor != pieceColor &&
                        ((pieceColor == "black" && i <= 4 && i % 2 == 0) ||
                                (pieceColor == "red" && i >= 5 && i % 2 == 1))
                    ) {
                        gameState[i][j].isMoveValid = true
                        false
                    } else {
                        true
                    }
                } else {
                    true
                }
            }

            for (i in 1..2) {
                val res = checkValidMove(row - i, column + i)
                if (!res) break
            }

            for (i in 1..2) {
                val res = checkValidMove(row - i, column - i)
                if (!res) break
            }

            for (i in 1..2) {
                val res = checkValidMove(row + i, column + i)
                if (!res) break
            }

            for (i in 1..2) {
                val res = checkValidMove(row + i, column - i)
                if (!res) break
            }

            promise.resolve(ChineseChessUtils.convertGameStateToReadableArray(gameState))
        } catch (e: Exception) {
            promise.reject("Error", e)
        }
    }

    @ReactMethod
    fun checkAdvisorMove(gameStateArray: ReadableArray, pieceMap: ReadableMap, promise: Promise) {
        try {
            // Chuyển đổi ReadableArray thành mảng hai chiều của ChineseChessBoardPiece
            val gameState = ChineseChessUtils.parseGameStateArray(gameStateArray)
            // Chuyển đổi ReadableMap thành ChineseChessBoardPiece
            val piece = ChineseChessUtils.parseBoardPieceMap(pieceMap)
            val (_, pieceColor, row, column) = piece

            val checkValidMove = { i: Int, j: Int ->
                if (i in 0..9 && j in 0..8) {
                    val targetSquare = gameState[i][j]
                    if (withinKingPalace(i, j, pieceColor)) { //Check sĩ có trong cung không
                        if (targetSquare.piece == ChineseChessPiece.EMPTY && ((pieceColor == "black" && i <= 2) || (pieceColor == "red" && i >= 7))) {
                            gameState[i][j].isMoveValid = true
                        } else if (targetSquare.pieceColor != pieceColor && ((pieceColor == "black" && i <= 2) || (pieceColor == "red" && i >= 7))) {
                            gameState[i][j].isMoveValid = true
                        } else {
                            false
                        }
                    } else {
                        false
                    }
                } else {
                    true
                }
            }

            checkValidMove(row - 1, column + 1) //đen chéo lên sang phải

            checkValidMove(row - 1, column - 1) //đen chéo lên sang trái

            checkValidMove(row + 1, column + 1) //đỏ chéo xuống sang phải

            checkValidMove(row + 1, column - 1) //đỏ chéo xuống sang trái

            promise.resolve(ChineseChessUtils.convertGameStateToReadableArray(gameState))
        } catch (e: Exception) {
            promise.reject("Error", e)
        }
    }

    @ReactMethod
    fun checkCannonMove(gameStateArray: ReadableArray, pieceMap: ReadableMap, promise: Promise) {
        try {
            // Chuyển đổi ReadableArray thành mảng hai chiều của ChineseChessBoardPiece
            val gameState = ChineseChessUtils.parseGameStateArray(gameStateArray)
            // Chuyển đổi ReadableMap thành ChineseChessBoardPiece
            val piece = ChineseChessUtils.parseBoardPieceMap(pieceMap)
            val (_, pieceColor, row, column) = piece
            var blockIndex = -1

            //Upward
            for (i in row - 1 downTo 0) {
                val targetSquare = gameState[i][column]
                if (targetSquare.piece == ChineseChessPiece.EMPTY && blockIndex == -1) { //Xử lí các nước đi lên trước khi bị chặn
                    gameState[i][column].isMoveValid = true
                } else if (targetSquare.pieceColor != "" && blockIndex == -1) { //Chặn rồi thì lưu index lại để quét các bước sau đó
                    blockIndex = i
                } else if (targetSquare.pieceColor != "" && blockIndex > i && targetSquare.piece != ChineseChessPiece.EMPTY) { //TH bay sang ăn quân địch
                    if (targetSquare.pieceColor !== pieceColor) { //Nếu quân bị chặn đầu tiên là địch thì ăn không thì ngưng lại luôn
                        gameState[i][column].isMoveValid = true
                    }
                    break
                }
            }

            // Downward
            blockIndex = -1
            for (i in row + 1..9) {
                val targetSquare = gameState[i][column]
                if (targetSquare.piece == ChineseChessPiece.EMPTY && blockIndex == -1) { //Xử lí các nước đi xuống trước khi bị chặn
                    gameState[i][column].isMoveValid = true
                } else if (targetSquare.pieceColor != "" && blockIndex == -1) { //Chặn rồi thì lưu index lại để quét các bước sau đó
                    blockIndex = i
                } else if (targetSquare.pieceColor != "" && blockIndex < i && targetSquare.piece != ChineseChessPiece.EMPTY) { //TH bay sang ăn quân địch
                    if (targetSquare.pieceColor !== pieceColor) { //Nếu quân bị chặn đầu tiên là địch thì ăn không thì ngưng lại luôn
                        gameState[i][column].isMoveValid = true
                    }
                    break
                }
            }

            // Right
            blockIndex = -1
            for (i in column + 1..8) { //Xử lí các nước đi được bên phải trước khi bị chặn
                val targetSquare = gameState[row][i]
                if (targetSquare.piece == ChineseChessPiece.EMPTY && blockIndex == -1) {
                    gameState[row][i].isMoveValid = true
                } else if (targetSquare.pieceColor != "" && blockIndex == -1) { //Chặn rồi thì lưu index lại để quét các bước sau đó
                    blockIndex = i
                } else if (targetSquare.pieceColor != "" && blockIndex < i && targetSquare.piece != ChineseChessPiece.EMPTY) { //TH bay sang ăn quân địch
                    if (targetSquare.pieceColor !== pieceColor) { //Nếu quân bị chặn đầu tiên là địch thì ăn không thì ngưng lại luôn
                        gameState[row][i].isMoveValid = true
                    }
                    break
                }
            }

            // Left
            blockIndex = -1
            for (i in column - 1 downTo 0) { // Xử lí các nước đi được bên trái trước khi bị chặn
                val targetSquare = gameState[row][i]
                if (targetSquare.piece == ChineseChessPiece.EMPTY && blockIndex == -1) {
                    gameState[row][i].isMoveValid = true
                } else if (targetSquare.pieceColor != "" && blockIndex == -1) {//Chặn rồi thì lưu index lại để quét các bước sau đó
                    blockIndex = i
                } else if (targetSquare.pieceColor != "" && blockIndex > i && targetSquare.piece != ChineseChessPiece.EMPTY) {//TH bay sang ăn quân địch
                    if (targetSquare.pieceColor !== pieceColor) { //Nếu quân bị chặn đầu tiên là địch thì ăn không thì ngưng lại luôn
                        gameState[row][i].isMoveValid = true
                    }
                    break
                }
            }

            promise.resolve(ChineseChessUtils.convertGameStateToReadableArray(gameState))
        } catch (e: Exception) {
            promise.reject("Error", e)
        }
    }

    @ReactMethod
    fun checkKingMove(gameStateArray: ReadableArray, pieceMap: ReadableMap, promise: Promise) {
        CoroutineScope(Dispatchers.Default).launch {
            try {
                // Chuyển đổi ReadableArray thành mảng hai chiều của ChineseChessBoardPiece
                val gameState = ChineseChessUtils.parseGameStateArray(gameStateArray)
                // Chuyển đổi ReadableMap thành ChineseChessBoardPiece
                val piece = ChineseChessUtils.parseBoardPieceMap(pieceMap)
                val (_, pieceColor, row, column) = piece
                val newGameState = gameState.map { it.copyOf() }.toTypedArray()

                if (pieceColor == "black") { //TH quân đen (nẳm trên)
                    if (row in 0..2) {
                        if (row == 0) {//TH row = 0 thì chỉ có xuống
                            val isCheck = checkMoveToNewPos(
                                ChineseChessUtils.convertGameStateToReadableArray(newGameState),
                                piece,
                                1,
                                column
                            ) //Nếu nước đi mới mà bị chiếu thì không gợi ý nó
                            if (!isCheck) {
                                newGameState[1][column].isMoveValid =
                                    (newGameState[1][column].piece == ChineseChessPiece.EMPTY ||
                                            newGameState[1][column].pieceColor != pieceColor)
                            }
                        } else if (row == 2) {//TH row = 1 thì chỉ có lên
                            val isCheck = checkMoveToNewPos(
                                ChineseChessUtils.convertGameStateToReadableArray(newGameState),
                                piece,
                                row - 1,
                                column
                            ) //Nếu nước đi mới mà bị chiếu thì không gợi ý nó
                            if (!isCheck) {
                                newGameState[row - 1][column].isMoveValid =
                                    (newGameState[row - 1][column].piece == ChineseChessPiece.EMPTY ||
                                            newGameState[row - 1][column].pieceColor != pieceColor)
                            }
                        }
                    }
                } else { //TH quân đen nằm dưới
                    if (row in 7..9) {
                        if (row == 7) {//TH row = 7 thì chỉ có xuống
                            val isCheck = checkMoveToNewPos(
                                ChineseChessUtils.convertGameStateToReadableArray(newGameState),
                                piece,
                                row + 1,
                                column
                            ) //Nếu nước đi mới mà bị chiếu thì không gợi ý nó
                            if (!isCheck) {
                                newGameState[row + 1][column].isMoveValid =
                                    (newGameState[row + 1][column].piece == ChineseChessPiece.EMPTY ||
                                            newGameState[row + 1][column].pieceColor != pieceColor)
                            }
                        } else if (row == 9) {//TH row = 9 thì chỉ có lên
                            val isCheck = checkMoveToNewPos(
                                ChineseChessUtils.convertGameStateToReadableArray(newGameState),
                                piece,
                                row - 1,
                                column
                            ) //Nếu nước đi mới mà bị chiếu thì không gợi ý nó
                            if (!isCheck) {
                                newGameState[row - 1][column].isMoveValid =
                                    (newGameState[row - 1][column].piece == ChineseChessPiece.EMPTY ||
                                            newGameState[row - 1][column].pieceColor != pieceColor)
                            }
                        }
                    }
                }

                if ((row == 1 && pieceColor == "black") || (row == 8 && pieceColor == "red")) {//TH row = 1 hoặc row = 8 thì lên hoặc xuống đều được
                    var isCheck = checkMoveToNewPos(
                        ChineseChessUtils.convertGameStateToReadableArray(newGameState),
                        piece,
                        row - 1,
                        column
                    ) //Nếu nước đi mới mà bị chiếu thì không gợi ý nó
                    if (!isCheck) {
                        newGameState[row - 1][column].isMoveValid =
                            (newGameState[row - 1][column].piece == ChineseChessPiece.EMPTY ||
                                    newGameState[row - 1][column].pieceColor != pieceColor)
                    }

                    isCheck = checkMoveToNewPos(
                        ChineseChessUtils.convertGameStateToReadableArray(newGameState),
                        piece,
                        row + 1,
                        column
                    ) //Nếu nước đi mới mà bị chiếu thì không gợi ý nó
                    if (!isCheck) {
                        newGameState[row + 1][column].isMoveValid =
                            (newGameState[row + 1][column].piece == ChineseChessPiece.EMPTY ||
                                    newGameState[row + 1][column].pieceColor != pieceColor)
                    }
                }

                if (column == 3) { //TH sát mép trái thì không đi bên trái được
                    val isCheck = checkMoveToNewPos(
                        ChineseChessUtils.convertGameStateToReadableArray(newGameState),
                        piece,
                        row,
                        column + 1
                    ) //Nếu nước đi mới mà bị chiếu thì không gợi ý nó
                    if (!isCheck) {
                        newGameState[row][column + 1].isMoveValid =
                            (newGameState[row][column + 1].piece == ChineseChessPiece.EMPTY ||
                                    newGameState[row][column + 1].pieceColor != pieceColor)
                    }
                } else if (column == 5) { //TH sát mép phải thì không đi bên phải được
                    val isCheck = checkMoveToNewPos(
                        ChineseChessUtils.convertGameStateToReadableArray(newGameState),
                        piece,
                        row,
                        column - 1
                    ) //Nếu nước đi mới mà bị chiếu thì không gợi ý nó
                    if (!isCheck) {
                        newGameState[row][column - 1].isMoveValid =
                            (newGameState[row][column - 1].piece == ChineseChessPiece.EMPTY ||
                                    newGameState[row][column - 1].pieceColor != pieceColor)
                    }
                } else if (column == 4) { //TH không sát mép thì đi trái phải được
                    var isCheck = checkMoveToNewPos(
                        ChineseChessUtils.convertGameStateToReadableArray(newGameState),
                        piece,
                        row,
                        column + 1
                    ) //Nếu nước đi mới mà bị chiếu thì không gợi ý nó
                    if (!isCheck) {
                        newGameState[row][column + 1].isMoveValid =
                            (newGameState[row][column + 1].piece == ChineseChessPiece.EMPTY ||
                                    newGameState[row][column + 1].pieceColor != pieceColor)
                    }

                    isCheck = checkMoveToNewPos(
                        ChineseChessUtils.convertGameStateToReadableArray(newGameState),
                        piece,
                        row,
                        column - 1
                    ) //Nếu nước đi mới mà bị chiếu thì không gợi ý nó
                    if (!isCheck) {
                        newGameState[row][column - 1].isMoveValid =
                            (newGameState[row][column - 1].piece == ChineseChessPiece.EMPTY ||
                                    newGameState[row][column - 1].pieceColor != pieceColor)
                    }
                }

                val kingValidMoves: List<ChineseChessBoardPiece> = newGameState.flatMap { r ->
                    r.filter { item ->
                        if (pieceColor == "black") {
                            item.row in 0..2 && item.column in 3..5 && item.isMoveValid
                        } else {
                            item.row in 7..9 && item.column in 3..5 && item.isMoveValid
                        }
                    }
                }

                if (kingValidMoves.isNotEmpty()) { //Sau khi dò xong các TH king đi hợp lệ ở trên thì dò TH coi 2 king có đối mặt nhau không
                    kingValidMoves.forEach { element ->
                        val isFaceToFace = checkKingFaceToFace(
                            newGameState,
                            element.row,
                            element.column,
                            pieceColor
                        )
                        if (isFaceToFace) {
                            newGameState[element.row][element.column].isMoveValid = false
                        }
                    }
                } //Nếu kingValidMoves == 0 => King không đi được vị trí nào hết => trả về state cũ


                promise.resolve(ChineseChessUtils.convertGameStateToReadableArray(newGameState))
            } catch (e: Exception) {
                promise.reject("Error", e)
            }
        }
    }

    // Checks if the king is in check or not
    @ReactMethod
    fun isInCheck(gameStateArray: ReadableArray, pieceColor: String, promise: Promise) {
        CoroutineScope(Dispatchers.Default).launch {
            try {
                val gameState = ChineseChessUtils.parseGameStateArray(gameStateArray)
                var newGameState = gameState.map { it.copyOf() }.toTypedArray()
                var isCheck = false

                // Xử lý tất cả quân cờ đối phương
                newGameState.forEach { row ->
                    row.forEach { obj ->
                        if (obj.piece != ChineseChessPiece.EMPTY && obj.pieceColor != pieceColor && obj.piece != ChineseChessPiece.KING) {
                            newGameState = ChineseChessUtils.parseGameStateArray(
                                callBackCheckMove(
                                    ChineseChessUtils.convertGameStateToReadableArray(newGameState),
                                    ChineseChessUtils.convertChineseChessBoardPieceToReadableMap(obj),
                                    obj.piece
                                )
                            )
                        }
                    }
                }

                // Kiểm tra xem vua có bị chiếu không
                val king = newGameState.find { innerArray ->
                    innerArray.find { obj ->
                        obj.piece == ChineseChessPiece.KING && obj.pieceColor == pieceColor && obj.isMoveValid
                    } != null
                }

                if (king != null) {
                    isCheck = true
                }

                promise.resolve(isCheck)
            } catch (e: Exception) {
                promise.resolve(false)
            }
        }
    }

    //Check if current player win by provide opponent pieceColor. Ý tưởng là nếu chỉ cần đối phương còn đi đuược ÍT NHẤT 1 NƯỚC thì chúng ta chưa Win
    @ReactMethod
    fun checkPlayerWinner(
        gameStateArray: ReadableArray,
        pieceColor: String,
        promise: Promise
    ) {
        CoroutineScope(Dispatchers.Default).launch {
            try {
                val gameState = ChineseChessUtils.parseGameStateArray(gameStateArray)

                // Chuyển đổi trạng thái game state một lần để tái sử dụng
                val readableGameState = ChineseChessUtils.convertGameStateToReadableArray(gameState)

                for (row in gameState) {
                    for (piece in row) {
                        if (piece.piece != ChineseChessPiece.EMPTY && piece.pieceColor == pieceColor) {
                            val pieceMap =
                                ChineseChessUtils.convertChineseChessBoardPieceToReadableMap(piece)

                            // Dùng map để gọi callBackCheckMove tránh lặp code
                            val newState = when (val pieceType = piece.piece) {
                                in setOf(
                                    ChineseChessPiece.PAWN,
                                    ChineseChessPiece.ROOK,
                                    ChineseChessPiece.KNIGHT,
                                    ChineseChessPiece.BISHOP,
                                    ChineseChessPiece.ADVISOR,
                                    ChineseChessPiece.CANNON,
                                    ChineseChessPiece.KING
                                ) -> ChineseChessUtils.parseGameStateArray(
                                    callBackCheckMove(readableGameState, pieceMap, pieceType)
                                )

                                else -> gameState
                            }

                            // Kiểm tra nước đi hợp lệ và thêm vào danh sách
                            val potentialMoves = checkValidMove(newState, piece)
                            if (potentialMoves.isNotEmpty()) {
                                promise.resolve(false)  // Đối thủ có nước đi => chưa thắng
                                return@launch  // Thoát khỏi coroutine luôn
                            }
                        }
                    }
                }

                promise.resolve(true)
            } catch (e: Exception) {
                promise.resolve(false)
            }
        }
    }

    // Find and return potential moves to block the check
    @ReactMethod
    fun checkPotentialBlockMoves(
        gameStateArray: ReadableArray,
        pieceColor: String,
        promise: Promise
    ) {
        CoroutineScope(Dispatchers.Default).launch {
            try {
                val gameState = ChineseChessUtils.parseGameStateArray(gameStateArray)

                // Sử dụng một danh sách để chứa các nước đi hợp lệ
                val potentialMoves = mutableListOf<PotentialMovePiece>()

                // Duyệt tất cả các quân cờ của người chơi
                gameState.forEach { row -> row.forEach { it.isMoveValid = false } }

                // Chuyển đổi trạng thái game state một lần để tái sử dụng
                val readableGameState = ChineseChessUtils.convertGameStateToReadableArray(gameState)

                gameState.forEach { row ->
                    row.forEach { piece ->
                        if (piece.piece != ChineseChessPiece.EMPTY && piece.pieceColor == pieceColor) {
                            val pieceMap =
                                ChineseChessUtils.convertChineseChessBoardPieceToReadableMap(piece)

                            // Dùng map để gọi callBackCheckMove tránh lặp code
                            val newState = when (val pieceType = piece.piece) {
                                in setOf(
                                    ChineseChessPiece.PAWN,
                                    ChineseChessPiece.ROOK,
                                    ChineseChessPiece.KNIGHT,
                                    ChineseChessPiece.BISHOP,
                                    ChineseChessPiece.ADVISOR,
                                    ChineseChessPiece.CANNON,
                                    ChineseChessPiece.KING
                                ) -> ChineseChessUtils.parseGameStateArray(
                                    callBackCheckMove(readableGameState, pieceMap, pieceType)
                                )

                                else -> gameState
                            }

                            // Kiểm tra nước đi hợp lệ và thêm vào danh sách
                            potentialMoves += checkValidMove(newState, piece)
                        }
                    }
                }

                promise.resolve(
                    ChineseChessUtils.convertPotentialMovesToReadableArray(
                        potentialMoves
                    )
                )
            } catch (e: Exception) {
                promise.resolve(arrayListOf<WritableArray>())
            }
        }
    }

    // Find and return potential moves for current piece
    @ReactMethod
    fun checkPotentialMovesForCurrPiece(
        gameStateArray: ReadableArray,
        pieceMap: ReadableMap,
        promise: Promise
    ) {
        CoroutineScope(Dispatchers.Default).launch {
            try {
                val gameState = ChineseChessUtils.parseGameStateArray(gameStateArray)
                val piece = ChineseChessUtils.parseBoardPieceMap(pieceMap)

                // Sử dụng một danh sách để chứa các nước đi hợp lệ
                val potentialMoves = mutableListOf<PotentialMovePiece>()

                // Duyệt tất cả các quân cờ của người chơi
                gameState.forEach { row -> row.forEach { it.isMoveValid = false } }

                // Chuyển đổi trạng thái game state một lần để tái sử dụng
                val readableGameState = ChineseChessUtils.convertGameStateToReadableArray(gameState)

                // Dùng map để gọi callBackCheckMove tránh lặp code
                val newState = when (val pieceType = piece.piece) {
                    in setOf(
                        ChineseChessPiece.PAWN,
                        ChineseChessPiece.ROOK,
                        ChineseChessPiece.KNIGHT,
                        ChineseChessPiece.BISHOP,
                        ChineseChessPiece.ADVISOR,
                        ChineseChessPiece.CANNON,
                        ChineseChessPiece.KING
                    ) -> ChineseChessUtils.parseGameStateArray(
                        callBackCheckMove(readableGameState, pieceMap, pieceType)
                    )

                    else -> gameState
                }

                // Kiểm tra nước đi hợp lệ và thêm vào danh sách
                potentialMoves += checkValidMove(newState, piece)

                promise.resolve(
                    ChineseChessUtils.convertPotentialMovesToReadableArray(
                        potentialMoves
                    )
                )
            } catch (e: Exception) {
                promise.resolve(arrayListOf<WritableArray>())
            }
        }
    }

    @ReactMethod
    fun getBestChineseChessMove2(boardArray: ReadableArray, depth: Int, promise: Promise) {
        CoroutineScope(Dispatchers.Default).launch {
            try {
                val board = ChineseChessUtils.parseGameStateArray(boardArray)

                // Lấy danh sách các nước đi hợp lệ (có thể sắp xếp các nước đi theo ưu tiên)
                val availableMovesWritableArray =
                    callBackCheckPotentialBlockMoves(board, "black")
                val availableMoves = ChineseChessUtils.parsePotentialMovesArray(availableMovesWritableArray)

                val opponentMovesWritableArray =
                    callBackCheckPotentialBlockMoves(board, "red")
                val opponentMoves = ChineseChessUtils.parsePotentialMovesArray(opponentMovesWritableArray)

                if (availableMoves.size == 0) {
                    promise.resolve(null)
                } else {
                    val randomNumber = getRandomNumber()
                    val filteredMoves: MutableList<PotentialMovePiece> = when(randomNumber) {
                        1 -> filterAttackMoves(board, availableMoves, opponentMoves)
                        2 -> filterMiddleMoves(board, availableMoves, opponentMoves)
                        3 -> filterDefendMoves(availableMoves, opponentMoves)
                        else -> filterDefendMoves(availableMoves, opponentMoves)
                    }
                    if (filteredMoves.isEmpty()) {
                        promise.resolve(ChineseChessUtils.convertPotentialMoveToWritableMap(
                            availableMoves[getRandomWithRange(0, availableMoves.lastIndex)]
                        ))
                    } else {
                        val opponentPiece = filteredMoves.find{m -> m.potentialMove.pieceColor == "red"}
                        if (opponentPiece != null) {
                            promise.resolve(ChineseChessUtils.convertPotentialMoveToWritableMap(
                                opponentPiece
                            ))
                        }
                        promise.resolve(ChineseChessUtils.convertPotentialMoveToWritableMap(
                            availableMoves[getRandomWithRange(0, filteredMoves.lastIndex)]
                        ))
                    }
                }
            } catch (e: Exception) {
                promise.reject("ERROR_GETTING_MOVE", "Failed to get best move", e)
            }
        }
    }

    @ReactMethod
    fun getBestChineseChessMove(boardArray: ReadableArray, depth: Int, promise: Promise) {
        CoroutineScope(Dispatchers.Default).launch {
            try {
                val board = ChineseChessUtils.parseGameStateArray(boardArray)
                var bestMove: PotentialMovePiece? = null
                var bestScore = Int.MIN_VALUE
                Log.e("Kiet", "check potential")

                bestMove = iterativeDeepeningMinimax(board, depth, 10000)

                if (bestMove != null) {
                    Log.e("Kiet", "co bestMove")
                    promise.resolve(ChineseChessUtils.convertPotentialMoveToWritableMap(bestMove))
                } else {
                    Log.e("Kiet", "ko co bestMove")
                    promise.resolve(null)
                }

            } catch (e: Exception) {
                promise.reject("ERROR_GETTING_MOVE", "Failed to get best move", e)
            }
        }
    }

    private fun filterDefendMoves(
        availableMoves: MutableList<PotentialMovePiece>,
        opponentMoves: MutableList<PotentialMovePiece>,
    ): MutableList<PotentialMovePiece> {
        // Sử dụng một danh sách để chứa các nước đi hợp lệ
        val filteredMoves = mutableListOf<PotentialMovePiece>()

        for (move in availableMoves) {
            val opponentMove = opponentMoves.find { m -> m.potentialMove.row == move.potentialMove.row && m.potentialMove.column == move.potentialMove.column}

            if (move.potentialMove.row in 0..4 && opponentMove != null && move.potentialMove.piece == ChineseChessPiece.EMPTY) { //Tập trung vào những nước đi bên bản đồ mình và không bị quân địch ăn
                filteredMoves.add(move)
            } else if ((move.potentialMove.piece == ChineseChessPiece.ADVISOR || move.potentialMove.piece == ChineseChessPiece.BISHOP) && move.potentialMove.pieceColor == "black") { //Thêm vào những nước đi là sĩ hoặc tượng
                filteredMoves.add(move)
            } else if (move.potentialMove.pieceColor == "red") { //Lấy những nước đi nào ăn được đối thủ
                filteredMoves.add(move)
            }
        }

        return filteredMoves
    }

    private suspend fun filterMiddleMoves(
        board: Array<Array<ChineseChessBoardPiece>>,
        availableMoves: MutableList<PotentialMovePiece>,
        opponentMoves: MutableList<PotentialMovePiece>,
    ): MutableList<PotentialMovePiece> {
        // Sử dụng một danh sách để chứa các nước đi hợp lệ
        val filteredMoves = mutableListOf<PotentialMovePiece>()

        for (move in availableMoves) {
            val opponentMove = opponentMoves.find { m -> m.potentialMove.row == move.potentialMove.row && m.potentialMove.column == move.potentialMove.column}
            val newBoard = simulateMove(board, move)
            val isOppentCheck = callBackIsInCheck(newBoard, "red")

            if ((move.fromMove.piece == ChineseChessPiece.ROOK || move.fromMove.piece == ChineseChessPiece.CANNON) && move.potentialMove.row in 2..5 && move.potentialMove.column in 2..6 && opponentMove != null) { //Lấy những nước đi ở giữa và là xe hoặc pháo và không bị ăn
                filteredMoves.add(move)
            } else if (isOppentCheck) { //Lấy những nước đi có thể chiếu tướng đối thủ
                filteredMoves.add(move)
            } else if (move.potentialMove.pieceColor == "red") { //Lấy những nước đi nào ăn được đối thủ
                filteredMoves.add(move)
            }
        }

        return filteredMoves
    }

    private suspend fun filterAttackMoves(
        board: Array<Array<ChineseChessBoardPiece>>,
        availableMoves: MutableList<PotentialMovePiece>,
        opponentMoves: MutableList<PotentialMovePiece>,
    ): MutableList<PotentialMovePiece> {
        // Sử dụng một danh sách để chứa các nước đi hợp lệ
        val filteredMoves = mutableListOf<PotentialMovePiece>()

        for (move in availableMoves) {
            val opponentMove = opponentMoves.find { m -> m.potentialMove.row == move.potentialMove.row && m.potentialMove.column == move.potentialMove.column}
            val newBoard = simulateMove(board, move)
            val isOppentCheck = callBackIsInCheck(newBoard, "red")

            if ((move.potentialMove.pieceColor != "black" && move.potentialMove.piece != ChineseChessPiece.EMPTY) ||
                (move.potentialMove.row in 5..9 && opponentMove != null)) { //Lấy những nước đi sang bên bạn nhưng không bị ăn
                filteredMoves.add(move)
            } else if (isOppentCheck) { //Lấy những nước đi có thể chiếu tướng đối thủ
                filteredMoves.add(move)
            } else if (move.potentialMove.pieceColor == "red") { //Lấy những nước đi nào ăn được đối thủ
                filteredMoves.add(move)
            }
        }

        return filteredMoves
    }

    private suspend fun iterativeDeepeningMinimax(
        board: Array<Array<ChineseChessBoardPiece>>,
        maxDepth: Int,
        maxTime: Long // Giới hạn thời gian tối đa (ms)
    ): PotentialMovePiece? {
        var bestMove: PotentialMovePiece? = null
        val startTime = System.currentTimeMillis() // Thời gian bắt đầu

        // Lặp qua các độ sâu từ 1 đến maxDepth
        for (depth in 1..maxDepth) {
            val currentMove = iterativeDeepeningSearch(board, depth)

            // Nếu thời gian đã quá lâu, dừng sớm
            if (System.currentTimeMillis() - startTime > maxTime) {
                if (currentMove == null) { //Nếu đã quá 10 giây mà còn chưa tìm được nước đi thì break
                    break //TH này đã bao gồm chiếu bí rồi
                } else {
                    return currentMove.move
                }
            }

            if (currentMove != null) {
                bestMove = currentMove.move
            }
        }

        return bestMove
    }

    private suspend fun iterativeDeepeningSearch(
        board: Array<Array<ChineseChessBoardPiece>>,
        depth: Int
    ): MoveWithScore? {
        var bestMove: PotentialMovePiece? = null
        var bestScore = Int.MIN_VALUE
        val startTime = System.currentTimeMillis() // Thời gian bắt đầu

        // Lấy danh sách các nước đi hợp lệ (có thể sắp xếp các nước đi theo ưu tiên)
        val availableMovesWritableArray =
            callBackCheckPotentialBlockMoves(board, "black") // Đoạn này bạn có thể tùy chỉnh
        val availableMoves = ChineseChessUtils.parsePotentialMovesArray(availableMovesWritableArray)

        // Duyệt qua từng nước đi hợp lệ
        for (move in availableMoves) {
            // Tạo bảng cờ mới sau khi di chuyển
            val newBoard = simulateMove(board, move)

            // Tính điểm cho nước đi này
            val evalScore = minimax(newBoard, depth - 1, false, Int.MIN_VALUE, Int.MAX_VALUE)

            // Cập nhật nước đi tốt nhất
            if (evalScore > bestScore) {
                bestScore = evalScore
                bestMove = move
            }

            // Nếu thời gian đã quá lâu, dừng sớm
            if (System.currentTimeMillis() - startTime > 10000) {
                return bestMove?.let { MoveWithScore(it, bestScore) }
            }

            // Nếu đã có một nước đi tốt nhất, có thể dừng sớm tại đây nếu cần
            if (bestScore >= MAX_SCORE_THRESHOLD) {
                break
            }
        }

        return bestMove?.let { MoveWithScore(it, bestScore) }
    }

    private fun getRandomWithRange(min: Int, max: Int): Int {
        return (min..max).random()
    }

    private fun getRandomNumber(): Int {
        val numbers = listOf(1, 2, 3) // Danh sách các số cần random
        return numbers.random()
    }

    // Cấu trúc chứa nước đi và điểm đánh giá
    data class MoveWithScore(val move: PotentialMovePiece, val score: Int)

    private val transpositionTable = mutableMapOf<String, Int>()

    private fun boardToString(board: Array<Array<ChineseChessBoardPiece>>): String {
        return board.joinToString { row -> row.joinToString { it.piece.name } }
    }

    private suspend fun minimax(
        board: Array<Array<ChineseChessBoardPiece>>,
        depth: Int,
        isMaximizing: Boolean,
        alpha: Int,
        beta: Int
    ): Int {
        val boardKey = boardToString(board)

        // Nếu đã tính toán vị trí này trước đó, trả về kết quả ngay
        transpositionTable[boardKey]?.let { return it }

        if (depth == 0) return evaluateChineseBoard(board)

        val availableMovesWritableArray = callBackCheckPotentialBlockMoves(board, if (isMaximizing) "black" else "red")
        val availableMoves = ChineseChessUtils.parsePotentialMovesArray(availableMovesWritableArray)

        if (availableMoves.isEmpty()) return evaluateChineseBoard(board)

        val sortedMoves = availableMoves.sortedByDescending { evaluateMoveImpact(board, it) }
        val limitedMoves = sortedMoves.take(8) // Chỉ xét top 8 nước đi tốt nhất

        var alphaVar = alpha
        var betaVar = beta
        var bestEval = if (isMaximizing) Int.MIN_VALUE else Int.MAX_VALUE

        for (move in limitedMoves) {
            val newBoard = simulateMove(board, move)
            val evalScore = minimax(newBoard, depth - 1, !isMaximizing, alphaVar, betaVar)

            bestEval = if (isMaximizing) maxOf(bestEval, evalScore) else minOf(bestEval, evalScore)
            if (isMaximizing) alphaVar = maxOf(alphaVar, evalScore) else betaVar = minOf(betaVar, evalScore)
            if (betaVar <= alphaVar) break // Alpha-Beta Pruning

        }

        transpositionTable[boardKey] = bestEval // Lưu kết quả vào HashMap
        return bestEval
    }

    private fun evaluateMoveImpact(board: Array<Array<ChineseChessBoardPiece>>, move: PotentialMovePiece): Int {
        val movingPiece = move.fromMove.piece
        val targetPiece = board[move.potentialMove.row][move.potentialMove.column].piece

        val movingPieceValue = chinesePieceValues[movingPiece] ?: 0
        val targetPieceValue = chinesePieceValues[targetPiece] ?: 0

        var score = 0

        // 1️⃣ Nếu ăn quân => Cộng điểm
        if (targetPiece != ChineseChessPiece.EMPTY) {
            score += targetPieceValue - (movingPieceValue / 10) // Ăn quân quan trọng hơn di chuyển
        }

        // 2️⃣ Nếu di chuyển đến vị trí quan trọng (giữa bàn cờ) => Cộng điểm
        val centralPositions = listOf(Pair(4, 4), Pair(5, 4), Pair(4, 5), Pair(5, 5)) // Trung tâm bàn cờ
        if (Pair(move.potentialMove.row, move.potentialMove.column) in centralPositions) {
            score += 30
        }

        // 3️⃣ Nếu di chuyển quân yếu để mở đường cho quân mạnh => Cộng điểm
        if (movingPiece == ChineseChessPiece.PAWN || movingPiece == ChineseChessPiece.ADVISOR) {
            score += 10
        }

        // 4️⃣ Nếu di chuyển tạo cơ hội bắt vua => Cộng điểm lớn
        if (targetPiece == ChineseChessPiece.KING) {
            score += 10000
        }

        return score
    }

    private val MAX_SCORE_THRESHOLD = 600
    private val chinesePieceValues = mapOf(
        ChineseChessPiece.KING to 10000,  // Vua có giá trị cao nhất
        ChineseChessPiece.ROOK to 500,    // Xe mạnh hơn Mã/Tượng
        ChineseChessPiece.CANNON to 350,  // Pháo mạnh, có thể bắt quân từ xa
        ChineseChessPiece.KNIGHT to 300,  // Mã linh hoạt
        ChineseChessPiece.BISHOP to 250,  // Tượng
        ChineseChessPiece.ADVISOR to 200, // Sĩ
        ChineseChessPiece.PAWN to 100     // Tốt có giá trị thấp nhất
    )

    private fun evaluateChineseBoard(board: Array<Array<ChineseChessBoardPiece>>): Int {
        var score = 0
        for (y in board.indices) {
            for (x in board[y].indices) {
                val piece = board[y][x]
                val value = chinesePieceValues[piece.piece] ?: 0
                score += if (piece.pieceColor == "black") value else -value //AI (quân đen) cố gắng làm tăng điểm, Người chơi (quân đỏ) cố gắng làm giảm điểm
            }
        }
        return score
    }

    private fun simulateMove(
        board: Array<Array<ChineseChessBoardPiece>>,
        move: PotentialMovePiece
    ): Array<Array<ChineseChessBoardPiece>> {
        // Clone bảng cờ
        val newBoard = board.map { row -> row.map { it.copy() }.toTypedArray() }.toTypedArray()

        // Xóa quân cờ ở vị trí cũ
        newBoard[move.fromMove.row][move.fromMove.column].apply {
            piece = ChineseChessUtils.stringToChineseChessPiece("")
            pieceColor = ""
            isMoveValid = false
        }

        // Đặt quân cờ vào vị trí mới
        newBoard[move.potentialMove.row][move.potentialMove.column].apply {
            piece = move.potentialMove.piece
            pieceColor = move.potentialMove.pieceColor
            isMoveValid = false
        }

        return newBoard
    }

    // Checks if the move can block the check or not
    private suspend fun checkValidMove(
        gameState: Array<Array<ChineseChessBoardPiece>>,
        chessPiece: ChineseChessBoardPiece
    ): List<PotentialMovePiece> {
        val potentialMoves = mutableListOf<PotentialMovePiece>()

        for (row in gameState) {
            for (square in row) {
                if (square.isMoveValid && square.pieceColor != chessPiece.pieceColor) {
                    val targetRow = square.row
                    val targetColumn = square.column

                    // Thay đổi trực tiếp trên bản sao duy nhất
                    val tempState = gameState.map { it.copyOf() }.toTypedArray()
                    val pieceCopy = chessPiece.copy()

                    // Xóa quân cờ khỏi vị trí cũ
                    tempState[chessPiece.row][chessPiece.column] = chessPiece.copy(
                        piece = ChineseChessPiece.EMPTY,
                        pieceColor = "",
                        isMoveValid = false
                    )

                    // Đặt quân cờ vào vị trí mới
                    tempState[targetRow][targetColumn] = pieceCopy.copy(
                        row = targetRow,
                        column = targetColumn,
                        isMoveValid = false
                    )

                    // Kiểm tra nước đi có chặn chiếu không
                    if (!callBackIsInCheck(tempState, chessPiece.pieceColor)) {
                        potentialMoves.add(
                            PotentialMovePiece(
                                tempState[targetRow][targetColumn],
                                pieceCopy
                            )
                        )
                    }
                }
            }
        }

        return potentialMoves
    }


    //Check TH 2 king đối mặt nhau (Ko check các TH bị quân khác chiếu, chỉ check TH có bị quân khác chặn)
    private fun checkKingFaceToFace(
        gameState: Array<Array<ChineseChessBoardPiece>>,
        curKingRow: Int,
        curKingCol: Int,
        pieceColor: String
    ): Boolean {
        try {
            var isFaceToFace = false

            if (pieceColor == "black") { //Nếu là black thì quét từ dưới lên để tối ưu hiệu suất (ít vòng lặp)
                for (i in curKingRow + 1..9) {
                    val blockSquare = gameState[i][curKingCol]
                    if (blockSquare.pieceColor != pieceColor && blockSquare.piece == ChineseChessPiece.KING) {
                        isFaceToFace = true
                        break
                    } else if (blockSquare.pieceColor != "" && blockSquare.piece != ChineseChessPiece.KING) {
                        isFaceToFace = false
                        break
                    }
                }
            } else { //Nếu là red thì quét từ trên xuống để tối ưu hiệu suất (ít vòng lặp)
                for (i in 9 downTo curKingRow) {
                    val blockSquare = gameState[i][curKingCol]
                    if (blockSquare.pieceColor != pieceColor && blockSquare.piece == ChineseChessPiece.KING) {
                        isFaceToFace = true
                        break
                    } else if (blockSquare.pieceColor != "" && blockSquare.piece != ChineseChessPiece.KING) {
                        isFaceToFace = false
                        break
                    }
                }
            }

            return isFaceToFace
        } catch (e: Exception) {
            return false
        }
    }

    //Check xem quân cờ đi đến vị trí mới có ảnh hưởng đến bị chiếu không
    private suspend fun checkMoveToNewPos(
        gameStateArray: ReadableArray,
        currentPiece: ChineseChessBoardPiece,
        newRow: Int,
        newCol: Int,
    ): Boolean {
        try {
            // Chuyển đổi ReadableArray thành mảng hai chiều của ChineseChessBoardPiece
            val gameState = ChineseChessUtils.parseGameStateArray(gameStateArray)
            // Chuyển đổi ReadableMap thành ChineseChessBoardPiece
            val tempGameState = gameState.map { it.copyOf() }.toTypedArray()

            //Xóa quân cờ ở vị trí hiện tại
            tempGameState[currentPiece.row][currentPiece.column].isMoveValid = false
            tempGameState[currentPiece.row][currentPiece.column].piece = ChineseChessPiece.EMPTY
            tempGameState[currentPiece.row][currentPiece.column].pieceColor = ""
            tempGameState[currentPiece.row][currentPiece.column].row = currentPiece.row
            tempGameState[currentPiece.row][currentPiece.column].column = currentPiece.column

            //Đi quân cờ vào vị trí mới
            if (tempGameState[newRow][newCol].piece == ChineseChessPiece.EMPTY ||
                tempGameState[newRow][newCol].pieceColor != currentPiece.pieceColor
            ) { // Nếu chỗ đó có quân mình thì nhả về false luôn

                tempGameState[newRow][newCol].isMoveValid =
                    false //Lưu ý là false vì kiểu bưng sang đó để chứ ko di chuyển sang đó, thì mới áp dụng isInCheck được
                tempGameState[newRow][newCol].piece = currentPiece.piece
                tempGameState[newRow][newCol].pieceColor = currentPiece.pieceColor
                tempGameState[newRow][newCol].row = newRow
                tempGameState[newRow][newCol].column = newCol

                return callBackIsInCheck(tempGameState, currentPiece.pieceColor)
            } else {
                return false
            }
        } catch (e: Exception) {
            return false
        }
    }

    private suspend fun callBackIsInCheck(
        gameState: Array<Array<ChineseChessBoardPiece>>,
        pieceColor: String
    ): Boolean {
        val convertTempGameState =
            ChineseChessUtils.convertGameStateToReadableArray(gameState)
        return awaitPromise { promise: Promise ->
            isInCheck(
                convertTempGameState,
                pieceColor,
                promise
            )
        }
    }

    private suspend fun callBackCheckPotentialBlockMoves(
        board: Array<Array<ChineseChessBoardPiece>>,
        pieceColor: String,
    ): WritableArray {
        val convertTempGameState =
            ChineseChessUtils.convertGameStateToReadableArray(board)
        return awaitPromise { promise: Promise ->
            checkPotentialBlockMoves(
                convertTempGameState,
                pieceColor,
                promise
            )
        }
    }

    private suspend fun callBackCheckMove(
        gameStateArray: ReadableArray,
        pieceMap: ReadableMap,
        chessPiece: ChineseChessPiece
    ): ReadableArray {
        return awaitPromise { promise: Promise ->
            (
                    when (chessPiece) {
                        ChineseChessPiece.PAWN -> checkPawnMove(gameStateArray, pieceMap, promise)
                        ChineseChessPiece.ROOK -> checkRookMove(gameStateArray, pieceMap, promise)
                        ChineseChessPiece.KNIGHT -> checkKnightMove(
                            gameStateArray,
                            pieceMap,
                            promise
                        )

                        ChineseChessPiece.BISHOP -> checkBishopMove(
                            gameStateArray,
                            pieceMap,
                            promise
                        )

                        ChineseChessPiece.ADVISOR -> checkAdvisorMove(
                            gameStateArray,
                            pieceMap,
                            promise
                        )

                        ChineseChessPiece.CANNON -> checkCannonMove(
                            gameStateArray,
                            pieceMap,
                            promise
                        )

                        ChineseChessPiece.KING -> checkKingMove(
                            gameStateArray,
                            pieceMap,
                            promise
                        )

                        else -> throw Error("Lỗi callback")
                    }
                    )
        }
    }

    // Hàm chuyển đổi Promise thành coroutine
    suspend fun <T> awaitPromise(block: (Promise) -> Unit): T {
        return suspendCoroutine { cont ->
            val callback = object : Promise {
                override fun resolve(value: Any?) {
                    cont.resume(value as T)
                }

                override fun reject(code: String, message: String?) {
                    cont.resumeWithException(Exception("$code: $message"))
                }

                @Deprecated(
                    "Prefer passing a module-specific error code to JS. Using this method will pass the\n        error code EUNSPECIFIED",
                    replaceWith = ReplaceWith("reject(code, message)")
                )
                override fun reject(message: String) {
                    TODO("Not yet implemented")
                }

                override fun reject(code: String, userInfo: WritableMap) {
                    TODO("Not yet implemented")
                }

                override fun reject(code: String, message: String?, userInfo: WritableMap) {
                    TODO("Not yet implemented")
                }

                override fun reject(code: String, message: String?, throwable: Throwable?) {
                    TODO("Not yet implemented")
                }

                override fun reject(code: String, throwable: Throwable?) {
                    TODO("Not yet implemented")
                }

                override fun reject(code: String, throwable: Throwable?, userInfo: WritableMap) {
                    TODO("Not yet implemented")
                }

                override fun reject(
                    code: String?,
                    message: String?,
                    throwable: Throwable?,
                    userInfo: WritableMap?
                ) {
                    TODO("Not yet implemented")
                }

                override fun reject(throwable: Throwable) {
                    TODO("Not yet implemented")
                }

                override fun reject(throwable: Throwable, userInfo: WritableMap) {
                    TODO("Not yet implemented")
                }
                // Implement các phương thức khác của Promise nếu cần thiết
            }
            block(callback)
        }
    }

    private fun withinKingPalace(row: Int, column: Int, pieceColor: String): Boolean {
        return when (pieceColor) {
            "red" -> row >= 7 && column in 3..5
            "black" -> row <= 2 && column in 3..5
            else -> false
        }
    }
}

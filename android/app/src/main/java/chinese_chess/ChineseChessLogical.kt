package chinese_chess

import chinese_chess.entities.ChineseChessBoardPiece
import chinese_chess.entities.ChineseChessPiece
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
    override fun getName(): String {
        return "ChineseChessLogical";
    }

    @ReactMethod
    fun checkPawnMove(gameStateArray: ReadableArray, pieceMap: ReadableMap, promise: Promise) {
        try {
            // Chuyển đổi ReadableArray thành mảng hai chiều của ChineseChessBoardPiece
            val gameState = ChineseChessUtils.parseGameStateArray(gameStateArray)
            // Chuyển đổi ReadableMap thành ChineseChessBoardPiece
            val piece = ChineseChessUtils.parseBoardPieceMap(pieceMap)
            val (_, pieceColor, row, column) = piece
            val newGameState = gameState.map { it.copyOf() }.toTypedArray()

            if (pieceColor == "black") {//TH quân đen (nẳm trên)
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
                    0 -> newGameState[row][0].isMoveValid =
                        newGameState[row][0].piece == ChineseChessPiece.EMPTY ||
                                newGameState[row][0].pieceColor !== pieceColor //TH tốt qua sông mà sát mép trái thì không đi bên trái được
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
            promise.resolve(ChineseChessUtils.convertGameStateToReadableArray(newGameState))
        } catch (e: Exception) {
            promise.reject("Error", e)
        }
    }

    @ReactMethod
    fun checkRookMove(gameStateArray: ReadableArray, pieceMap: ReadableMap, promise: Promise) {
        try {
            // Chuyển đổi ReadableArray thành mảng hai chiều của ChineseChessBoardPiece
            val gameState = ChineseChessUtils.parseGameStateArray(gameStateArray)
            // Chuyển đổi ReadableMap thành ChineseChessBoardPiece
            val piece = ChineseChessUtils.parseBoardPieceMap(pieceMap)
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

            promise.resolve(ChineseChessUtils.convertGameStateToReadableArray(newGameState))
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
            val newGameState = gameState.map { it.copyOf() }.toTypedArray()

            if (row in 0..1) { //TH ở row 0 và 1 thì chỉ có thể đi xuống thôi
                if (column in 0..6) { //TH từ col 0 -> 6 thì có thể qua 2 xuống 1 (Trong TH này sẽ không xét qua bên trái)
                    val blockRightSquare = gameState[row][column + 1];
                    if (blockRightSquare.pieceColor === "") { //TH không bị chặn bên phải
                        newGameState[row + 1][column + 2].isMoveValid =
                            (newGameState[row + 1][column + 2].piece == ChineseChessPiece.EMPTY ||
                                    newGameState[row + 1][column + 2].pieceColor !== pieceColor)

                        if (row == 1) { //TH row = 1 thì có thể đi lên với điều kiện là qua phải 2 lên 1
                            newGameState[0][column + 2].isMoveValid =
                                (newGameState[0][column + 2].piece == ChineseChessPiece.EMPTY ||
                                        newGameState[0][column + 2].pieceColor !== pieceColor)
                        }
                    }

                    val blockBottomSquare = gameState[row + 1][column];
                    if (blockBottomSquare.pieceColor === "") { //TH xuống 2 qua 1
                        newGameState[row + 2][column + 1].isMoveValid =
                            (newGameState[row + 2][column + 1].piece == ChineseChessPiece.EMPTY ||
                                    newGameState[row + 2][column + 1].pieceColor !== pieceColor)

                        if (column != 0) { //TH nếu khác col = 0 thì đều có thể qua trái
                            newGameState[row + 2][column - 1].isMoveValid =
                                (newGameState[row + 2][column - 1].piece == ChineseChessPiece.EMPTY ||
                                        newGameState[row + 2][column - 1].pieceColor !== pieceColor)
                        }
                    }
                }
            } else if (row in 2..7) { //TH cách đỉnh >= 2 ô và cách đáy <= 7 ô
                val blockTopSquare = gameState[row - 1][column];
                if (blockTopSquare.pieceColor === "") { //Top ko có người chặn
                    when (column) {
                        0 -> { // Đi được bên phải
                            newGameState[row - 2][0].isMoveValid =
                                (newGameState[row - 2][0].piece == ChineseChessPiece.EMPTY ||
                                        newGameState[row - 2][0].pieceColor !== pieceColor)
                        }

                        8 -> { // Đi được bên trái
                            newGameState[row - 2][column - 1].isMoveValid =
                                (newGameState[row - 2][column - 1].piece == ChineseChessPiece.EMPTY ||
                                        newGameState[row - 2][column - 1].pieceColor !== pieceColor);
                        }

                        else -> {// Đi được cả hai bên
                            newGameState[row - 2][column + 1].isMoveValid =
                                (newGameState[row - 2][column + 1].piece == ChineseChessPiece.EMPTY ||
                                        newGameState[row - 2][column + 1].pieceColor !== pieceColor)

                            newGameState[row - 2][column - 1].isMoveValid =
                                (newGameState[row - 2][column - 1].piece == ChineseChessPiece.EMPTY ||
                                        newGameState[row - 2][column - 1].pieceColor !== pieceColor)
                        }
                    }
                }

                val blockBottomSquare = gameState[row + 1][column];
                if (blockBottomSquare.pieceColor === "") { //Bottom ko có người chặn
                    when (column) {
                        0 -> { // Đi được bên phải
                            newGameState[row + 2][0].isMoveValid =
                                (newGameState[row + 2][0].piece == ChineseChessPiece.EMPTY ||
                                        newGameState[row + 2][0].pieceColor !== pieceColor)
                        }

                        8 -> { // Đi được bên trái
                            newGameState[row + 2][column - 1].isMoveValid =
                                (newGameState[row + 2][column - 1].piece == ChineseChessPiece.EMPTY ||
                                        newGameState[row + 2][column - 1].pieceColor !== pieceColor)
                        }

                        else -> { // Đi được cả hai bên (lên/xuống 2 qua trái/phải 1)
                            newGameState[row + 2][column + 1].isMoveValid =
                                (newGameState[row + 2][column + 1].piece == ChineseChessPiece.EMPTY ||
                                        newGameState[row + 2][column + 1].pieceColor !== pieceColor)

                            newGameState[row + 2][column - 1].isMoveValid =
                                (newGameState[row + 2][column - 1].piece == ChineseChessPiece.EMPTY ||
                                        newGameState[row + 2][column - 1].pieceColor !== pieceColor)
                        }
                    }
                }

                if (column in 0..6) {
                    val blockRightSquare = gameState[row][column + 1];
                    if (blockRightSquare.pieceColor === "") { //TH không bị chặn bên phải (qua phải 2 lên/xuống 1)
                        newGameState[row - 1][column + 2].isMoveValid =
                            (newGameState[row - 1][column + 2].piece == ChineseChessPiece.EMPTY ||
                                    newGameState[row - 1][column + 2].pieceColor !== pieceColor)

                        newGameState[row + 1][column + 2].isMoveValid =
                            (newGameState[row + 1][column + 2].piece == ChineseChessPiece.EMPTY ||
                                    newGameState[row + 1][column + 2].pieceColor !== pieceColor)
                    }
                }

                if (column in 2..8) {
                    val blockLeftSquare = gameState[row][column - 1];
                    if (blockLeftSquare.pieceColor === "") { //TH không bị chặn bên trái (qua trái 2 lên/xuống 1)
                        newGameState[row - 1][column - 2].isMoveValid =
                            (newGameState[row - 1][column - 2].piece == ChineseChessPiece.EMPTY ||
                                    newGameState[row - 1][column - 2].pieceColor !== pieceColor)

                        newGameState[row + 1][column - 2].isMoveValid =
                            (newGameState[row + 1][column - 2].piece == ChineseChessPiece.EMPTY ||
                                    newGameState[row + 1][column - 2].pieceColor !== pieceColor)
                    }
                }
            } else if (row in 8..9) {
                if (column in 0..6) { //TH từ col 0 -> 6 thì có thể qua 2 lên 1 (Trong TH này sẽ không xét qua bên trái)
                    val blockRightSquare = gameState[row][column + 1];
                    if (blockRightSquare.pieceColor === "") { //TH không bị chặn bên phải
                        newGameState[row - 1][column + 2].isMoveValid =
                            (newGameState[row - 1][column + 2].piece == ChineseChessPiece.EMPTY ||
                                    newGameState[row - 1][column + 2].pieceColor !== pieceColor)

                        if (row == 8) { //TH row = 8 thì có thể đi xuống với điều kiện là qua phải 2 xuống 1
                            newGameState[row + 1][column + 2].isMoveValid =
                                (newGameState[row + 1][column + 2].piece == ChineseChessPiece.EMPTY ||
                                        newGameState[row + 1][column + 2].pieceColor !== pieceColor)
                        }
                    }

                    val blockTopSquare = gameState[row - 1][column];
                    if (blockTopSquare.pieceColor === "") { //TH lên 2 qua 1
                        newGameState[row - 2][column + 1].isMoveValid =
                            (newGameState[row - 2][column + 1].piece == ChineseChessPiece.EMPTY ||
                                    newGameState[row - 2][column + 1].pieceColor !== pieceColor)

                        if (column != 0) { //TH nếu khác col = 0 thì đều có thể qua trái
                            newGameState[row - 2][column - 1].isMoveValid =
                                (newGameState[row - 2][column - 1].piece == ChineseChessPiece.EMPTY ||
                                        newGameState[row - 2][column - 1].pieceColor !== pieceColor)
                        }
                    }

                }
                if (column in 2..8) { //TH từ col 2 -> 8 thì có thể qua 2 lên 1 (Trong TH này sẽ không xét qua bên phải)
                    val blockLeftSquare = gameState[row][column - 1];
                    if (blockLeftSquare.pieceColor === "") { //TH không bị chặn bên trái
                        newGameState[row - 1][column - 2].isMoveValid =
                            (newGameState[row - 1][column - 2].piece == ChineseChessPiece.EMPTY ||
                                    newGameState[row - 1][column - 2].pieceColor !== pieceColor)

                        if (row == 8) { //TH row = 8 thì có thể đi xuống với điều kiện là qua trái 2 xuống 1
                            newGameState[row + 1][column - 2].isMoveValid =
                                (newGameState[row + 1][column - 2].piece == ChineseChessPiece.EMPTY ||
                                        newGameState[row + 1][column - 2].pieceColor !== pieceColor)
                        }
                    }

                    val blockTopSquare = gameState[row - 1][column];
                    if (blockTopSquare.pieceColor === "") { //TH lên 2 qua 1
                        newGameState[row - 2][column - 1].isMoveValid =
                            (newGameState[row - 2][column - 1].piece == ChineseChessPiece.EMPTY ||
                                    newGameState[row - 2][column - 1].pieceColor !== pieceColor)

                        if (column != 8) { //TH nếu khác col = 8 thì đều có thể qua phải
                            newGameState[row - 2][column + 1].isMoveValid =
                                (newGameState[row - 2][column + 1].piece == ChineseChessPiece.EMPTY ||
                                        newGameState[row - 2][column + 1].pieceColor !== pieceColor)
                        }
                    }
                }
            }

            promise.resolve(ChineseChessUtils.convertGameStateToReadableArray(newGameState))
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
            val newGameState = gameState.map { it.copyOf() }.toTypedArray()

            val checkValidMove = { i: Int, j: Int ->
                if (i in 0..9 && j in 0..8) {
                    val targetSquare = gameState[i][j]
                    val loopIndex = i - row
                    if (loopIndex == 1 && targetSquare.piece != ChineseChessPiece.EMPTY) {
                        false
                    } else if (targetSquare.piece == ChineseChessPiece.EMPTY &&
                        ((pieceColor == "black" && i <= 4 && i % 2 == 0) ||
                                (pieceColor == "red" && i >= 5 && i % 2 == 1))
                    ) {
                        newGameState[i][j].isMoveValid = true
                        false
                    } else if (targetSquare.pieceColor != pieceColor &&
                        ((pieceColor == "black" && i <= 4 && i % 2 == 0) ||
                                (pieceColor == "red" && i >= 5 && i % 2 == 1))
                    ) {
                        newGameState[i][j].isMoveValid = true
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

            promise.resolve(ChineseChessUtils.convertGameStateToReadableArray(newGameState))
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
            val newGameState = gameState.map { it.copyOf() }.toTypedArray()

            val checkValidMove = { i: Int, j: Int ->
                if (i in 0..9 && j in 0..8) {
                    val targetSquare = gameState[i][j]
                    if (withinKingPalace(i, j, pieceColor)) { //Check sĩ có trong cung không
                        if (targetSquare.piece == ChineseChessPiece.EMPTY && ((pieceColor === "black" && i <= 2) || (pieceColor === "red" && i >= 7))) {
                            newGameState[i][j].isMoveValid = true;
                        } else if (targetSquare.pieceColor !== pieceColor && ((pieceColor === "black" && i <= 2) || (pieceColor === "red" && i >= 7))) {
                            newGameState[i][j].isMoveValid = true;
                        } else {
                            false;
                        }
                    } else {
                        false;
                    }
                } else {
                    true
                }
            }

            checkValidMove(row - 1, column + 1); //đen chéo lên sang phải

            checkValidMove(row - 1, column - 1); //đen chéo lên sang trái

            checkValidMove(row + 1, column + 1); //đỏ chéo xuống sang phải

            checkValidMove(row + 1, column - 1); //đỏ chéo xuống sang trái

            promise.resolve(ChineseChessUtils.convertGameStateToReadableArray(newGameState))
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
            val newGameState = gameState.map { it.copyOf() }.toTypedArray()
            var blockIndex = -1;

            //Upward
            for (i in 0..<row) {
                val targetSquare = gameState[i][column];
                if (targetSquare.piece == ChineseChessPiece.EMPTY && blockIndex == -1) { //Xử lí các nước đi lên trước khi bị chặn
                    newGameState[i][column].isMoveValid = true;
                } else if (targetSquare.pieceColor !== "" && blockIndex == -1) { //Chặn rồi thì lưu index lại để quét các bước sau đó
                    blockIndex = i;
                } else if (targetSquare.pieceColor !== pieceColor && blockIndex != -1 && blockIndex > i && targetSquare.piece !== ChineseChessPiece.EMPTY) { //TH bay sang ăn quân địch
                    newGameState[i][column].isMoveValid = true;
                    break;
                }
            }

            // Downward
            blockIndex = -1;
            for (i in row + 1..9) {
                val targetSquare = gameState[i][column];
                if (targetSquare.piece == ChineseChessPiece.EMPTY && blockIndex == -1) { //Xử lí các nước đi xuống trước khi bị chặn
                    newGameState[i][column].isMoveValid = true;
                } else if (targetSquare.pieceColor !== "" && blockIndex == -1) { //Chặn rồi thì lưu index lại để quét các bước sau đó
                    blockIndex = i;
                } else if (targetSquare.pieceColor !== pieceColor && blockIndex != -1 && blockIndex < i && targetSquare.piece != ChineseChessPiece.EMPTY) { //TH bay sang ăn quân địch
                    newGameState[i][column].isMoveValid = true;
                    break;
                }
            }

            // Right
            blockIndex = -1;
            for (i in column + 1..8) { //Xử lí các nước đi được bên phải trước khi bị chặn
                val targetSquare = gameState[row][i];
                if (targetSquare.piece == ChineseChessPiece.EMPTY && blockIndex == -1) {
                    newGameState[row][i].isMoveValid = true;
                } else if (targetSquare.pieceColor !== "" && blockIndex == -1) { //Chặn rồi thì lưu index lại để quét các bước sau đó
                    blockIndex = i;
                } else if (targetSquare.pieceColor !== pieceColor && blockIndex != -1 && blockIndex < i && targetSquare.piece != ChineseChessPiece.EMPTY) { //TH bay sang ăn quân địch
                    newGameState[row][i].isMoveValid = true;
                    break;
                }
            }

            // Left
            blockIndex = -1;
            for (i in 0..<column) { // Xử lí các nước đi được bên trái trước khi bị chặn
                val targetSquare = gameState[row][i];
                if (targetSquare.piece == ChineseChessPiece.EMPTY && blockIndex == -1) {
                    newGameState[row][i].isMoveValid = true;
                } else if (targetSquare.pieceColor !== "" && blockIndex == -1) {//Chặn rồi thì lưu index lại để quét các bước sau đó
                    blockIndex = i;
                } else if (targetSquare.pieceColor !== pieceColor && blockIndex != -1 && blockIndex > i && targetSquare.piece != ChineseChessPiece.EMPTY) {//TH bay sang ăn quân địch
                    newGameState[row][i].isMoveValid = true;
                    break;
                }
            }

            promise.resolve(ChineseChessUtils.convertGameStateToReadableArray(newGameState))
        } catch (e: Exception) {
            promise.reject("Error", e)
        }
    }

    @ReactMethod
    fun checkKingMove(gameStateArray: ReadableArray, pieceMap: ReadableMap, promise: Promise) {
        CoroutineScope(Dispatchers.Main).launch {
            try {
                // Chuyển đổi ReadableArray thành mảng hai chiều của ChineseChessBoardPiece
                val gameState = ChineseChessUtils.parseGameStateArray(gameStateArray)
                // Chuyển đổi ReadableMap thành ChineseChessBoardPiece
                val piece = ChineseChessUtils.parseBoardPieceMap(pieceMap)
                val (_, pieceColor, row, column) = piece
                val newGameState = gameState.map { it.copyOf() }.toTypedArray()

                if (pieceColor === "black") { //TH quân đen (nẳm trên)
                    if (row in 0..2) {
                        if (row == 0) {//TH row = 0 thì chỉ có xuống
                            val isCheck = checkMoveToNewPos(ChineseChessUtils.convertGameStateToReadableArray(newGameState), piece, row + 1, column) //Nếu nước đi mới mà bị chiếu thì không gợi ý nó
                            if (!isCheck) {
                                newGameState[row + 1][column].isMoveValid =
                                    (newGameState[row + 1][column].piece == ChineseChessPiece.EMPTY ||
                                            newGameState[row + 1][column].pieceColor !== pieceColor)
                            }
                        } else if (row == 2) {//TH row = 1 thì chỉ có lên
                            val isCheck = checkMoveToNewPos(ChineseChessUtils.convertGameStateToReadableArray(newGameState), piece, row - 1, column) //Nếu nước đi mới mà bị chiếu thì không gợi ý nó
                            if (!isCheck) {
                                newGameState[row - 1][column].isMoveValid =
                                    (newGameState[row - 1][column].piece == ChineseChessPiece.EMPTY ||
                                            newGameState[row - 1][column].pieceColor !== pieceColor)
                            }
                        }
                    }
                } else { //TH quân đen nằm dưới
                    if (row in 7..9) {
                        if (row == 7) {//TH row = 7 thì chỉ có xuống
                            val isCheck = checkMoveToNewPos(ChineseChessUtils.convertGameStateToReadableArray(newGameState), piece, row + 1, column) //Nếu nước đi mới mà bị chiếu thì không gợi ý nó
                            if (!isCheck) {
                                newGameState[row + 1][column].isMoveValid =
                                    (newGameState[row + 1][column].piece == ChineseChessPiece.EMPTY ||
                                            newGameState[row + 1][column].pieceColor !== pieceColor)
                            }
                        } else if (row == 9) {//TH row = 9 thì chỉ có lên
                            val isCheck = checkMoveToNewPos(ChineseChessUtils.convertGameStateToReadableArray(newGameState), piece, row - 1, column) //Nếu nước đi mới mà bị chiếu thì không gợi ý nó
                            if (!isCheck) {
                                newGameState[row - 1][column].isMoveValid =
                                    (newGameState[row - 1][column].piece == ChineseChessPiece.EMPTY ||
                                            newGameState[row - 1][column].pieceColor !== pieceColor)
                            }
                        }
                    }
                }

                if ((row == 1 && pieceColor === "black") || (row == 8 && pieceColor === "red")) {//TH row = 1 hoặc row = 8 thì lên hoặc xuống đều được
                    var isCheck = checkMoveToNewPos(ChineseChessUtils.convertGameStateToReadableArray(newGameState), piece, row - 1, column) //Nếu nước đi mới mà bị chiếu thì không gợi ý nó
                    if (!isCheck) {
                        newGameState[row - 1][column].isMoveValid =
                            (newGameState[row - 1][column].piece == ChineseChessPiece.EMPTY ||
                                    newGameState[row - 1][column].pieceColor !== pieceColor)
                    }

                    isCheck = checkMoveToNewPos(ChineseChessUtils.convertGameStateToReadableArray(newGameState), piece, row + 1, column) //Nếu nước đi mới mà bị chiếu thì không gợi ý nó
                    if (!isCheck) {
                        newGameState[row + 1][column].isMoveValid =
                            (newGameState[row + 1][column].piece == ChineseChessPiece.EMPTY ||
                                    newGameState[row + 1][column].pieceColor !== pieceColor)
                    }
                }

                if (column == 3) { //TH sát mép trái thì không đi bên trái được
                    val isCheck = checkMoveToNewPos(ChineseChessUtils.convertGameStateToReadableArray(newGameState), piece, row, column + 1) //Nếu nước đi mới mà bị chiếu thì không gợi ý nó
                    if (!isCheck) {
                        newGameState[row][column + 1].isMoveValid =
                            (newGameState[row][column + 1].piece == ChineseChessPiece.EMPTY ||
                                    newGameState[row][column + 1].pieceColor !== pieceColor)
                    }
                } else if (column == 5) { //TH sát mép phải thì không đi bên phải được
                    val isCheck = checkMoveToNewPos(ChineseChessUtils.convertGameStateToReadableArray(newGameState), piece, row, column - 1) //Nếu nước đi mới mà bị chiếu thì không gợi ý nó
                    if (!isCheck) {
                        newGameState[row][column - 1].isMoveValid =
                            (newGameState[row][column - 1].piece == ChineseChessPiece.EMPTY ||
                                    newGameState[row][column - 1].pieceColor !== pieceColor)
                    }
                } else if (column == 4) { //TH không sát mép thì đi trái phải được
                    var isCheck = checkMoveToNewPos(ChineseChessUtils.convertGameStateToReadableArray(newGameState), piece, row, column + 1) //Nếu nước đi mới mà bị chiếu thì không gợi ý nó
                    if (!isCheck) {
                        newGameState[row][column + 1].isMoveValid =
                            (newGameState[row][column + 1].piece == ChineseChessPiece.EMPTY ||
                                    newGameState[row][column + 1].pieceColor !== pieceColor)
                    }

                    isCheck = checkMoveToNewPos(ChineseChessUtils.convertGameStateToReadableArray(newGameState), piece, row, column - 1) //Nếu nước đi mới mà bị chiếu thì không gợi ý nó
                    if (!isCheck) {
                        newGameState[row][column - 1].isMoveValid =
                            (newGameState[row][column - 1].piece == ChineseChessPiece.EMPTY ||
                                    newGameState[row][column - 1].pieceColor !== pieceColor)
                    }
                }



                promise.resolve(ChineseChessUtils.convertGameStateToReadableArray(newGameState))
            } catch (e: Exception) {
                promise.reject("Error", e)
            }
        }
    }

    // Checks if the king is in check or not
    @ReactMethod
    fun isInCheck(gameStateArray: ReadableArray, pieceColor: String, promise: Promise) {
        CoroutineScope(Dispatchers.Main).launch {

            try {
                val gameState = ChineseChessUtils.parseGameStateArray(gameStateArray);
                var newGameState = gameState.map { it.copyOf() }.toTypedArray()
                var isCheck = false

                newGameState.forEach { innerArray ->
                    innerArray.forEach { obj ->
                        if (obj.piece == ChineseChessPiece.EMPTY && obj.pieceColor != pieceColor) {
                            newGameState = when (obj.piece) {
                                ChineseChessPiece.PAWN -> ChineseChessUtils.parseGameStateArray(
                                    callBackCheckMove(
                                        ChineseChessUtils.convertGameStateToReadableArray(
                                            newGameState
                                        ),
                                        ChineseChessUtils.convertChineseChessBoardPieceToReadableMap(
                                            obj
                                        ),
                                        ChineseChessPiece.PAWN
                                    )
                                )

                                ChineseChessPiece.ROOK -> ChineseChessUtils.parseGameStateArray(
                                    callBackCheckMove(
                                        ChineseChessUtils.convertGameStateToReadableArray(
                                            newGameState
                                        ),
                                        ChineseChessUtils.convertChineseChessBoardPieceToReadableMap(
                                            obj
                                        ),
                                        ChineseChessPiece.ROOK
                                    )
                                )

                                ChineseChessPiece.KNIGHT -> ChineseChessUtils.parseGameStateArray(
                                    callBackCheckMove(
                                        ChineseChessUtils.convertGameStateToReadableArray(
                                            newGameState
                                        ),
                                        ChineseChessUtils.convertChineseChessBoardPieceToReadableMap(
                                            obj
                                        ),
                                        ChineseChessPiece.KNIGHT
                                    )
                                )

                                ChineseChessPiece.BISHOP -> ChineseChessUtils.parseGameStateArray(
                                    callBackCheckMove(
                                        ChineseChessUtils.convertGameStateToReadableArray(
                                            newGameState
                                        ),
                                        ChineseChessUtils.convertChineseChessBoardPieceToReadableMap(
                                            obj
                                        ),
                                        ChineseChessPiece.BISHOP
                                    )
                                )

                                ChineseChessPiece.ADVISOR -> ChineseChessUtils.parseGameStateArray(
                                    callBackCheckMove(
                                        ChineseChessUtils.convertGameStateToReadableArray(
                                            newGameState
                                        ),
                                        ChineseChessUtils.convertChineseChessBoardPieceToReadableMap(
                                            obj
                                        ),
                                        ChineseChessPiece.ADVISOR
                                    )
                                )

                                ChineseChessPiece.CANNON -> ChineseChessUtils.parseGameStateArray(
                                    callBackCheckMove(
                                        ChineseChessUtils.convertGameStateToReadableArray(
                                            newGameState
                                        ),
                                        ChineseChessUtils.convertChineseChessBoardPieceToReadableMap(
                                            obj
                                        ),
                                        ChineseChessPiece.CANNON
                                    )
                                )
                                // "king" -> checkKingMove(newGameState, obj)
                                else -> newGameState
                            }
                        }

                        if (obj.isMoveValid && obj.pieceColor != pieceColor && obj.piece == ChineseChessPiece.KING) {
                            println("Opponent King in check")
                        }
                    }
                }

                val king = newGameState.find { innerArray ->
                    innerArray.find { obj ->
                        obj.piece == ChineseChessPiece.KING && obj.pieceColor == pieceColor && obj.isMoveValid
                    } != null
                }

                if (king != null) {
                    isCheck = true
                }

                promise.resolve(isCheck);
            } catch (e: Exception) {
                promise.resolve(false);
            }
        }
    }

    //Check TH 2 king đối mặt nhau (Ko check các TH bị quân khác chiếu, chỉ check TH có bị quân khác chặn)
    fun checkKingFaceToFace(
        gameStateArray: ReadableArray,
        curKingRow: Int,
        curKingCol: Int,
        pieceColor: String
    ): Boolean {
        try {
            val gameState = ChineseChessUtils.parseGameStateArray(gameStateArray);
            var isFaceToFace = false;

            if (pieceColor === "black") { //Nếu là black thì quét từ dưới lên để tối ưu hiệu suất (ít vòng lặp)
                for (i in curKingRow + 1..9) {
                    val blockSquare = gameState[i][curKingCol];
                    if (blockSquare.pieceColor !== pieceColor && blockSquare.piece == ChineseChessPiece.KING) {
                        isFaceToFace = true;
                        break;
                    } else if (blockSquare.pieceColor !== "" && blockSquare.piece != ChineseChessPiece.KING) {
                        isFaceToFace = false;
                        break;
                    }
                }
            } else { //Nếu là red thì quét từ trên xuống để tối ưu hiệu suất (ít vòng lặp)
                for (i in curKingRow..9) {
                    val blockSquare = gameState[i][curKingCol];
                    if (blockSquare.pieceColor !== pieceColor && blockSquare.piece == ChineseChessPiece.KING) {
                        isFaceToFace = true;
                        break;
                    } else if (blockSquare.pieceColor !== "" && blockSquare.piece != ChineseChessPiece.KING) {
                        isFaceToFace = false;
                        break;
                    }
                }
            }

            return isFaceToFace;
        } catch (e: Exception) {
            return false;
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
            tempGameState[currentPiece.row][currentPiece.column].isMoveValid = false;
            tempGameState[currentPiece.row][currentPiece.column].piece = ChineseChessPiece.EMPTY;
            tempGameState[currentPiece.row][currentPiece.column].pieceColor = "";
            tempGameState[currentPiece.row][currentPiece.column].row = currentPiece.row;
            tempGameState[currentPiece.row][currentPiece.column].column = currentPiece.column;

            //Đi quân cờ vào vị trí mới
            if (tempGameState[newRow][newCol].piece == ChineseChessPiece.EMPTY ||
                tempGameState[newRow][newCol].pieceColor !== currentPiece.pieceColor
            ) { // Nếu chỗ đó có quân mình thì nhả về false luôn

                tempGameState[newRow][newCol].isMoveValid =
                    false; //Lưu ý là false vì kiểu bưng sang đó để chứ ko di chuyển sang đó, thì mới áp dụng isInCheck được
                tempGameState[newRow][newCol].piece = currentPiece.piece;
                tempGameState[newRow][newCol].pieceColor = currentPiece.pieceColor;
                tempGameState[newRow][newCol].row = newRow;
                tempGameState[newRow][newCol].column = newCol;

                val convertTempGameState =
                    ChineseChessUtils.convertGameStateToReadableArray(tempGameState);
                return callBackIsInCheck(convertTempGameState, currentPiece.pieceColor);
            } else {
                return false
            }
        } catch (e: Exception) {
            return false;
        }
    }

    private suspend fun  callBackIsInCheck(
        convertTempGameState: WritableArray,
        pieceColor: String
    ): Boolean {
        return awaitPromise { promise: Promise -> isInCheck(convertTempGameState, pieceColor, promise); }
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

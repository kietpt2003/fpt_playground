type Move = {
    color: 'r' | 'b'; // 'r' cho đỏ (red), 'b' cho đen (black)
    from: string; // Vị trí bắt đầu (ví dụ: 'e3')
    to: string; // Vị trí kết thúc (ví dụ: 'e4')
    flags: string; // Cờ trạng thái (ví dụ: 'n' hoặc 'c' cho capture)
    piece: string; // Loại quân cờ (ví dụ: 'p' cho pawn)
    captured?: string; // Quân cờ bị bắt (chỉ tồn tại nếu có capture)
    iccs?: string; // Nước đi ở dạng chuỗi ICCS (ví dụ: 'e3e4')
    san?: string;// Nước đi ở dạng chuỗi SAN (ví dụ: 'exf4')
};

type HistoryOptions = {
    verbose?: boolean; // Có trả về chi tiết hay không
};

type MovesOptions = {
    square?: string; //"e3"
    verbose?: boolean;
    opponent?: boolean;
}

type PutOptions = {
    type: string; //Ex: p: Pawn, k: King
    color: "r" | "b";
}

declare module 'xiangqi.js' {
    export class Xiangqi {
        constructor(fen?: string);
        move(move: { from: string; to: string }): Move | null;
        fen: () => string;
        ascii: () => string;
        game_over: () => boolean;
        clear: () => void;
        get: (square: string) => { type: string, color: string }; //square là ô đó. Ví dụ:"e3"
        history(options?: HistoryOptions): string[] | Move[];
        in_check: () => boolean;
        in_checkmate: () => boolean;
        in_draw: () => boolean;
        in_stalemate: () => boolean;
        moves: (options?: MovesOptions) => Move[];
        put: (options: PutOptions, square: string) => boolean;
        turn: () => string;
        // Thêm các phương thức khác của Xiangqi nếu cần
    }
}

export type ErrorResponse = {
    code: ErrorCode;
    title: string;
    reasons: ErrorReason[];
}

export type ErrorCode = "FPB_00" | "FPB_01" | "FPB_02" | "FPB_03" | "FPV_00" | "FPS_00" | "FPA_00" | "FPA_01" | "FPA_02"

export type ErrorReason = {
    title: string;
    message: string;
}
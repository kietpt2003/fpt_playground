import { PaginatedResponse } from "../constants/Paginations/PaginationResponse";

export function isPaginationResponse<T>(data: any): data is PaginatedResponse<T> {
    return data && Array.isArray(data.items);
}
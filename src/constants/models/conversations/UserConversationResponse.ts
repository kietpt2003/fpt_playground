import { FriendResponse } from "../friendships/FriendResponse"
import { FirstMessageResponse } from "./FirstMessageResponse"
import { UserMaskedResponse } from "./UserMaskedResponse"

export interface UserConversationResponse {
    id: string
    friend?: FriendResponse
    usermasked?: UserMaskedResponse
    type: "Personal" | "Dating" | "Friendship"
    isBlocked: boolean
    isBlockedBy: string
    firstMessage?: FirstMessageResponse
    status: "Active" | "Inactive" | "Closed"
    createdAt: string
    updatedAt: string
}
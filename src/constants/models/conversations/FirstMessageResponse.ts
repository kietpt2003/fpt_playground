import { FriendResponse } from "../friendships/FriendResponse"
import { UserMaskedResponse } from "./UserMaskedResponse"

export interface FirstMessageResponse {
    id: string
    conversationId: string
    sender?: FriendResponse
    userMasked?: UserMaskedResponse
    content: string
    type: "Text" | "Image" | "System"
    isRead: boolean
    createdAt: string
}
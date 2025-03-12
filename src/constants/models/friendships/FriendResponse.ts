export interface FriendResponse {
    id: string
    userName: string
    name: string
    avatarUrl?: string
    status: "Active" | "Inactive"
}
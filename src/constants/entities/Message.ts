export type Message = {
    id: string;
    content: string;
    senderId: string;
    receiverId: string;
    createdAt: Date;
    status: "Inactive" | "Unsend" | "Sent" | "Received" | "Read";
}
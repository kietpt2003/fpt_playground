export type FindUserResponse = {
    id: string;
    userName: string;
    name: string;
    avatarUrl?: string;
    gender: "Male" | "Female" | "Bisexual" | "Other"
    grade?: number;
    status: "Active" | "Inactive";
    friendshipStatus?: "Pending" | "Accepted" | "Blocked" | "Cancelled" | "Unblocked"
    conversationId?: string;
    conversationType?: "StudyGroup" | "DatingGroup" | "CuriousGroup" | "Personal" | "Dating" | "Friendship"
    specialize?: SpecializeResponse;
}

export type SpecializeResponse = {
    id: string;
    parent?: SpecializeResponse;
    name: string;
    code: string;
}
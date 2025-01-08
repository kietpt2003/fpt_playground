export type Reward = {
    id: string;
    userId: string;
    value: number;
    type: "coin" | "diamond";
    status: "claimed" | "unclaimed" | "expired";
    createdAt: Date;
}

export type DateReward = {
    id: string;
    userId: string;
    rewards: Reward[];
    status: "claimed" | "unclaimed" | "expired";
    createdAt: Date;
}

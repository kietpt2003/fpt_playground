import { AccountResponse } from "./AccountResponse";
import { CoinWalletResponse } from "./CoinWalletResponse";
import { DiamondWalletResponse } from "./DiamondWalletResponse";
import { ServerResponse } from "./ServerResponse";
import { UserLevelPassResponse } from "./UserLevelPassResponse";

export type UserResponse = {
    id: string;
    userName: string;
    name: string;
    avatarUrl?: string;
    gender: Gender;
    grade?: 0;
    status: UserStatus;
    lastSeenAt: string;
    createdAt: string;
    account?: AccountResponse;
    coinWallet?: CoinWalletResponse;
    diamondWallet?: DiamondWalletResponse;
    server?: ServerResponse;
    userLevelPass: UserLevelPassResponse;
}

export type Gender = "Male" | "Female"
export type UserStatus = "Active" | "Inactive"
export type UserRole = "Admin" | "User"

export type AccountResponse = {
    id: string;
    email: string;
    role: AccountRole;
    loginMethod: LoginMethod;
    status: AccountStatus;
    createdAt: string;
}

export type AccountRole = "Admin" | "User"
export type LoginMethod = "Google" | "Default"
export type AccountStatus = "Active" | "Inactive"
export interface User {
    id: string;
    name: string;
    gender: UserGender;
    imageUrl?: string;
}

export type UserGender = "Male" | "Female"
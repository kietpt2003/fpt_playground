export type ServerName = "Xavalo" | "Hola" | "Hovilo" | "Quy Nhơn" | "Fuda" | "LinkingServer"
export type ServerNameAll = ServerName | "All"
export type ServerState = "Solitary" | "Medium" | "Full"
export type ServerStatus = "Active" | "Inactive"

export type ServerResponse = {
    id: string;
    name: ServerName;
    state: ServerState;
    status: ServerStatus;
}

import type { User } from "../../types/interfaces";
import { apiClient } from "../client";

export function getUsers(): Promise<User[]>{
    return apiClient.get<User[]>('/users')
}

export function getUserById(id: number): Promise<User>{
    return apiClient.get<User>(`/users/${id}`)
}


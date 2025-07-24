import axios from 'axios';
import type {User, UserFormData} from '../../features/user/types/user';

const API_BASE_URL = 'http://localhost:3001';

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export interface ApiResponse<T> {
    data: T;
    message?: string;
}

export class UserApiService {
    static async getUsers(): Promise<User[]> {
        try {
            const response = await api.get<ApiResponse<User[]>>('/users');
            return response.data.data;
        } catch (error) {
            console.error('Error fetching users:', error);
            if (axios.isAxiosError(error)) {
                throw new Error(
                    error.response?.data?.message || 'Failed to fetch users',
                );
            }
            throw error;
        }
    }

    static async getUserById(id: string): Promise<User> {
        try {
            const response = await api.get<ApiResponse<User>>(`/users/${id}`);
            return response.data.data;
        } catch (error) {
            console.error(`Error fetching user ${id}:`, error);
            if (axios.isAxiosError(error)) {
                throw new Error(
                    error.response?.data?.message ||
                        `Failed to fetch user ${id}`,
                );
            }
            throw error;
        }
    }

    static async createUser(userData: UserFormData): Promise<User> {
        try {
            const cleanedUserData: Partial<UserFormData> = {
                ...userData,
                cpf: userData.cpf.replace(/\D/g, ''),
            };

            if (userData.email && userData.email.trim() !== '') {
                cleanedUserData.email = userData.email.trim();
            } else {
                delete cleanedUserData.email;
            }

            if (!userData.placeOfBirth || userData.placeOfBirth.trim() === '') {
                delete cleanedUserData.placeOfBirth;
            }
            if (!userData.nationality || userData.nationality.trim() === '') {
                delete cleanedUserData.nationality;
            }

            const response = await api.post<ApiResponse<User>>(
                '/users',
                cleanedUserData,
            );
            return response.data.data;
        } catch (error) {
            console.error('Error creating user:', error);
            if (axios.isAxiosError(error)) {
                const errorData = error.response?.data;
                let errorMessage = 'Failed to create user';

                if (errorData?.message && Array.isArray(errorData.message)) {
                    errorMessage = errorData.message.join(', ');
                } else if (errorData?.message) {
                    errorMessage = errorData.message;
                }

                throw new Error(errorMessage);
            }
            throw error;
        }
    }

    static async updateUser(
        id: string,
        userData: Partial<UserFormData>,
    ): Promise<User> {
        try {
            const cleanedUserData: Partial<UserFormData> = {
                ...userData,
            };

            if (userData.cpf) {
                cleanedUserData.cpf = userData.cpf.replace(/\D/g, '');
            }

            if (userData.email !== undefined) {
                cleanedUserData.email = userData.email.trim();
            }

            if (userData.placeOfBirth !== undefined) {
                cleanedUserData.placeOfBirth = userData.placeOfBirth.trim();
            }
            if (userData.nationality !== undefined) {
                cleanedUserData.nationality = userData.nationality.trim();
            }

            const response = await api.patch<ApiResponse<User>>(
                `/users/${id}`,
                cleanedUserData,
            );
            return response.data.data;
        } catch (error) {
            console.error(`Error updating user ${id}:`, error);
            if (axios.isAxiosError(error)) {
                const errorData = error.response?.data;
                let errorMessage = `Failed to update user ${id}`;

                if (errorData?.message && Array.isArray(errorData.message)) {
                    errorMessage = errorData.message.join(', ');
                } else if (errorData?.message) {
                    errorMessage = errorData.message;
                }

                throw new Error(errorMessage);
            }
            throw error;
        }
    }

    static async deleteUser(id: string): Promise<void> {
        try {
            await api.delete(`/users/${id}`);
        } catch (error) {
            console.error(`Error deleting user ${id}:`, error);
            if (axios.isAxiosError(error)) {
                const errorMessage =
                    error.response?.data?.message ||
                    `Failed to delete user ${id}`;
                throw new Error(errorMessage);
            }
            throw error;
        }
    }
}

export default api;

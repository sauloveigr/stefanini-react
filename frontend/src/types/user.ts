export type Gender = 'male' | 'female' | 'other';

export interface User {
    id: string;
    name: string;
    gender?: Gender;
    email?: string;
    birthDate: string;
    placeOfBirth?: string;
    nationality?: string;
    cpf: string;
    createdAt: string;
}

export type UserFormData = Omit<User, 'id'>;

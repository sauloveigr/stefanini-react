import {useState, useEffect, useCallback} from 'react';
import {UserApiService} from '../../../utils/api/client';
import type {User, UserFormData} from '../types/user';

interface UseUsersReturn {
    users: User[];
    loading: boolean;
    error: string | null;
    createUser: (userData: UserFormData) => Promise<void>;
    updateUser: (id: string, userData: Partial<UserFormData>) => Promise<void>;
    deleteUser: (id: string) => Promise<void>;
    refreshUsers: () => Promise<void>;
}

export const useUsers = (): UseUsersReturn => {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchUsers = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            const fetchedUsers = await UserApiService.getUsers();
            setUsers(fetchedUsers);
        } catch (err) {
            setError(
                err instanceof Error ? err.message : 'Failed to fetch users',
            );
            console.error('Error fetching users:', err);
        } finally {
            setLoading(false);
        }
    }, []);

    const createUser = useCallback(async (userData: UserFormData) => {
        try {
            setError(null);
            const newUser = await UserApiService.createUser(userData);
            setUsers((prev) => [...prev, newUser]);
        } catch (err) {
            setError(
                err instanceof Error ? err.message : 'Failed to create user',
            );
            throw err;
        }
    }, []);

    const updateUser = useCallback(
        async (id: string, userData: Partial<UserFormData>) => {
            try {
                setError(null);
                const updatedUser = await UserApiService.updateUser(
                    id,
                    userData,
                );
                setUsers((prev) =>
                    prev.map((user) => (user.id === id ? updatedUser : user)),
                );
            } catch (err) {
                setError(
                    err instanceof Error
                        ? err.message
                        : 'Failed to update user',
                );
                throw err;
            }
        },
        [],
    );

    const deleteUser = useCallback(async (id: string) => {
        try {
            setError(null);
            await UserApiService.deleteUser(id);
            setUsers((prev) => prev.filter((user) => user.id !== id));
        } catch (err) {
            setError(
                err instanceof Error ? err.message : 'Failed to delete user',
            );
            throw err;
        }
    }, []);

    const refreshUsers = useCallback(async () => {
        await fetchUsers();
    }, [fetchUsers]);

    useEffect(() => {
        fetchUsers();
    }, [fetchUsers]);

    return {
        users,
        loading,
        error,
        createUser,
        updateUser,
        deleteUser,
        refreshUsers,
    };
};

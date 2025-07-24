import { useState } from "react";

import { Stats } from "../../../../components/common/Stats";
import { SearchFilter } from "../../../../components/common/SearchFilter";

import { DeleteConfirmDialog } from "../../../../components/common/DeleteConfirmDialog";
import type { User, UserFormData } from "../../types/user";
import { Users } from "lucide-react";
import { UserCard } from "../UserCard/UserCard";
import { UserForm } from "./UserForm";
import { PageHeader } from "../../../../components/common/PageHeader";
import { useUsers } from "../../hooks/useUsers";
import { useFormOperations } from "../../hooks/useFormOperations";
import { Toast } from "../../../../components/ui/Toast";
import type { ToastType } from "../../../../components/ui/Toast";

export const UserList = () => {
  const { users, loading, createUser, updateUser, deleteUser } = useUsers();
  const { backendErrors, clearFormErrors, handleFormOperation } = useFormOperations();
  const [searchTerm, setSearchTerm] = useState("");
  const [genderFilter, setGenderFilter] = useState("all");
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [userToDelete, setUserToDelete] = useState<User | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [toast, setToast] = useState<{ type: ToastType; message: string; isVisible: boolean }>({
    type: 'success',
    message: '',
    isVisible: false
  });

  const showToast = (type: ToastType, message: string) => {
    setToast({ type, message, isVisible: true });
  };

  const hideToast = () => {
    setToast(prev => ({ ...prev, isVisible: false }));
  };

  const handleCloseCreateForm = () => {
    setShowForm(false);
    clearFormErrors();
  };

  const handleCloseEditForm = () => {
    setEditingUser(null);
    clearFormErrors();
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ?? false);
    const matchesGender = genderFilter === "all" || user.gender === genderFilter;
    return matchesSearch && matchesGender;
  });

  const stats = {
    total: users.length,
    male: users.filter(u => u.gender === "male").length,
    female: users.filter(u => u.gender === "female").length,
    withEmail: users.filter(u => u.email).length,
  };

  const handleCreate = async (userData: UserFormData) => {
    await handleFormOperation(
      () => createUser(userData),
      () => setShowForm(false),
      showToast,
      'Usuário criado com sucesso!'
    );
  };

  const handleUpdate = async (userData: UserFormData) => {
    if (!editingUser) return;

    await handleFormOperation(
      () => updateUser(editingUser.id, userData),
      () => setEditingUser(null),
      showToast,
      'Usuário atualizado com sucesso!'
    );
  };

  const handleDelete = async () => {
    if (!userToDelete) return;

    try {
      await deleteUser(userToDelete.id);
      setUserToDelete(null);
      showToast('success', 'Usuário excluído com sucesso!');
    } catch (error) {
      console.error('Failed to delete user:', error);
      const errorMessage = error instanceof Error ? error.message : 'Erro ao excluir usuário';
      if (!errorMessage.includes('CPF must have') && !errorMessage.includes('validation')) {
        showToast('error', errorMessage);
      }
    }
  };

  if (loading) {
    return (
      <section className="grid gap-8 container mx-auto p-4">
        <PageHeader
          title="Cadastro de Pessoas"
          description="Gerencie o cadastro de pessoas de forma simples e intuitiva"
          onAdd={() => setShowForm(true)}
        />
        <div className="flex justify-center items-center py-12">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#8A2BE2] mx-auto mb-4"></div>
            <p className="text-gray-600">Carregando usuários...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      <section className="grid gap-8 container mx-auto p-4">
        <PageHeader
          title="Cadastro de Pessoas"
          description="Gerencie o cadastro de pessoas de forma simples e intuitiva"
          onAdd={() => {
            setShowForm(true);
            clearFormErrors();
          }}
        />

        <Stats {...stats} />
        <SearchFilter
          searchTerm={searchTerm}
          genderFilter={genderFilter}
          onSearchChange={setSearchTerm}
          onGenderFilterChange={setGenderFilter}
        />

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredUsers.length === 0 ? (
            <div className="col-span-full">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="text-center py-12">
                  <Users className="mx-auto h-16 w-16 text-[#8A2BE2] mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Nenhuma pessoa encontrada</h3>
                </div>
              </div>
            </div>
          ) : (
            filteredUsers.map(user => (
              <UserCard
                key={user.id}
                user={user}
                onEdit={() => {
                  setEditingUser(user);
                  clearFormErrors();
                }}
                onDelete={() => setUserToDelete(user)}
              />
            ))
          )}
        </div>

        {showForm && (
          <UserForm
            onSubmit={handleCreate}
            onCancel={handleCloseCreateForm}
            title="Criar pessoa"
            backendErrors={backendErrors}
          />
        )}

        {editingUser && (
          <UserForm
            user={editingUser}
            onSubmit={handleUpdate}
            onCancel={handleCloseEditForm}
            title="Editar pessoa"
            backendErrors={backendErrors}
          />
        )}

        {userToDelete && (
          <DeleteConfirmDialog
            user={userToDelete}
            onConfirm={handleDelete}
            onCancel={() => setUserToDelete(null)}
          />
        )}
      </section>

      <Toast
        type={toast.type}
        message={toast.message}
        isVisible={toast.isVisible}
        onClose={hideToast}
      />
    </>
  );
};
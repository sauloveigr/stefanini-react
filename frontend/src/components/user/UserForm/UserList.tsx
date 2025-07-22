import { useState } from "react";

import { Stats } from "../../Stats";
import { SearchFilter } from "../../SearchFilter";

import { DeleteConfirmDialog } from "../../DeleteConfirmDialog";
import type { User, UserFormData } from "../../../types/user";
import { Users } from "lucide-react";
import { UserCard } from "../UserCard/UserCard";
import { UserForm } from "./UserForm";
import { PageHeader } from "@/components/PageHeader";

const initialUsers: User[] = [
  {
    id: "1",
    name: "John Doe",
    gender: "male",
    email: "john@example.com",
    birthDate: "1990-01-01",
    placeOfBirth: "New York",
    nationality: "USA",
    cpf: "12345678901",
    createdAt: "2021-01-01",
  },
  {
    id: "2",
    name: "Jane Smith",
    gender: "female",
    email: "jane@example.com",
    birthDate: "1985-05-15",
    placeOfBirth: "London",
    nationality: "UK",
    cpf: "98765432101",
    createdAt: "2021-01-01",
  },
];

export const UserList = () => {
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [searchTerm, setSearchTerm] = useState("");
  const [genderFilter, setGenderFilter] = useState("all");
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [userToDelete, setUserToDelete] = useState<User | null>(null);
  const [showForm, setShowForm] = useState(false);

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

  const handleCreate = (userData: UserFormData) => {
    const newUser: User = {
      ...userData,
      id: Date.now().toString(),
    };
    setUsers([...users, newUser]);
    setShowForm(false);
  };

  const handleUpdate = (userData: UserFormData) => {
    if (!editingUser) return;

    const updatedUsers = users.map(user =>
      user.id === editingUser.id ? { ...userData, id: user.id } : user
    );

    setUsers(updatedUsers);
    setEditingUser(null);
  };

  const handleDelete = () => {
    if (!userToDelete) return;
    setUsers(users.filter(user => user.id !== userToDelete.id));
    setUserToDelete(null);
  };

  return (
    <section className=" grid gap-8 container mx-auto p-4">
      <PageHeader
        title="Cadastro de Pessoas"
        description="Gerencie o cadastro de pessoas de forma simples e intuitiva"
        onAdd={() => setShowForm(true)}
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
                <p className="text-gray-600">
                  {searchTerm ? "Tente ajustar os termos de busca." : "Comece adicionando sua primeira pessoa."}
                </p>
              </div>
            </div>
          </div>
        ) : (
          filteredUsers.map(user => (
            <UserCard
              key={user.id}
              user={user}
              onEdit={() => setEditingUser(user)}
              onDelete={() => setUserToDelete(user)}
            />
          ))
        )}
      </div>

      {showForm && (
        <UserForm
          onSubmit={handleCreate}
          onCancel={() => setShowForm(false)}
          title="Novo usuário"
        />
      )}

      {editingUser && (
        <UserForm
          user={editingUser}
          onSubmit={handleUpdate}
          onCancel={() => setEditingUser(null)}
          title="Editar usuário"
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
  );
};
import { UserAvatar } from "./UserAvatar";
import { UserActions } from "./UserActions";
import type { UserCardProps } from "./UserCard";
import { calculateAge } from "@/utils/calculateAge";


export const UserHeader = ({ user, onEdit, onDelete }: UserCardProps) => {
  const getAvatarColor = (name: string) => {
    const colors = [
      'bg-purple-600',
      'bg-blue-600',
      'bg-green-600',
      'bg-yellow-600',
      'bg-red-600',
      'bg-pink-600'
    ];
    const index = name.length % colors.length;
    return colors[index];
  };

  return (
    <div className="flex items-start justify-between mb-4">
      <div className="flex items-center gap-3">
        <UserAvatar name={user.name ?? ""} color={getAvatarColor(user.name ?? "")} />
        <div>
          <h3 className="font-semibold text-gray-900 text-lg">{user.name}</h3>
          <p className="text-sm text-gray-500">{calculateAge(user.birthDate)} anos</p>
        </div>
      </div>
      <UserActions onEdit={onEdit} onDelete={onDelete} />
    </div>
  );
};

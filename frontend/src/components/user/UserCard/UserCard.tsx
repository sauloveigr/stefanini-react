import type { User } from "@/types/user";
import { Mail, Calendar, MapPin, Flag } from "lucide-react";
import { UserInfo } from "./UserInfo";
import { GenderBadge } from "./GenderBadge";
import { UserHeader } from "./UserHeader";

export interface UserCardProps {
  user: User;
  onEdit: () => void;
  onDelete: () => void;
}

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString();
};

export const UserCard = ({ user, onEdit, onDelete }: UserCardProps) => {
  const userInfo = [
    { Icon: Mail, text: user.email },
    { Icon: Calendar, text: formatDate(user.birthDate) },
    { Icon: MapPin, text: user.placeOfBirth },
    { Icon: Flag, text: user.nationality }
  ];

  return (
    <div className="rounded-lg shadow-sm hover:shadow-lg transition-all duration-200 p-6 group border border-gray-200">
      <UserHeader user={user} onEdit={onEdit} onDelete={onDelete} />

      <div className="space-y-3">
        <GenderBadge gender={user.gender} />

        <div className="space-y-2 text-sm">
          {userInfo.map(({ Icon, text }) => (
            <UserInfo
              key={text}
              icon={<Icon className="h-4 w-4" />}
              text={text ?? ""}
            />
          ))}
        </div>
        <div className="pt-3 border-t border-gray-100">
          <p className="text-xs text-gray-500">Cadastrado em {formatDate(user.createdAt)}</p>
        </div>
      </div>
    </div>
  );
};
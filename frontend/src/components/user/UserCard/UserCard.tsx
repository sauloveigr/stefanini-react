import type { User } from "@/types/user";
import { Mail, Calendar, MapPin, Flag, CreditCard } from "lucide-react";
import { UserInfo } from "./UserInfo";
import { GenderBadge } from "./GenderBadge";
import { UserHeader } from "./UserHeader";

export interface UserCardProps {
  user: User;
  onEdit: () => void;
  onDelete: () => void;
}

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('pt-BR', {
    timeZone: 'UTC',
  }).format(date);
};

const formatCPF = (cpf: string) => {
  const cleanCpf = cpf.replace(/\D/g, '');
  return cleanCpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
};

export const UserCard = ({ user, onEdit, onDelete }: UserCardProps) => {
  const userInfo = [
    { Icon: Mail, label: "E-mail", text: user.email || "-" },
    { Icon: Calendar, label: "Data de Nascimento", text: formatDate(user.birthDate) },
    { Icon: MapPin, label: "Naturalidade", text: user.placeOfBirth || "-" },
    { Icon: Flag, label: "Nacionalidade", text: user.nationality || "-" },
    { Icon: CreditCard, label: "CPF", text: formatCPF(user.cpf) }
  ];

  return (
    <div className="rounded-lg shadow-sm hover:shadow-lg transition-all duration-200 p-4 group border border-gray-200 flex flex-col h-full">
      <div className="flex-1">
        <UserHeader user={user} onEdit={onEdit} onDelete={onDelete} />

        <div className="space-y-3 mt-4">
          <div className="min-h-7">
            <GenderBadge gender={user.gender} />
          </div>

          <div className="space-y-2 text-sm">
            {userInfo.map(({ Icon, label, text }) => (
              <UserInfo
                key={label}
                icon={<Icon className="h-4 w-4" />}
                label={label}
                text={text}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="pt-3 border-t border-gray-200 mt-4">
        <p className="text-xs text-gray-500">Cadastrado em {formatDate(user.createdAt)}</p>
      </div>
    </div>
  );
};
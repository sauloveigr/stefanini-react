import { Users, Mail } from "lucide-react";

interface StatsProps {
  total: number;
  male: number;
  female: number;
  withEmail: number;
}

export const Stats = ({ total, male, female, withEmail }: StatsProps) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <StatCard icon={<Users className="h-6 w-6 text-purple-500" />} label="Total" value={total} bgColor="bg-purple-500/10" />
      <StatCard icon={<Users className="h-6 w-6 text-blue-500" />} label="Masculino" value={male} bgColor="bg-blue-500/10" />
      <StatCard icon={<Users className="h-6 w-6 text-pink-500" />} label="Feminino" value={female} bgColor="bg-pink-500/10" />
      <StatCard icon={<Mail className="h-6 w-6 text-green-500" />} label="Com Email" value={withEmail} bgColor="bg-green-500/10" />
    </div>
  );
};

const StatCard = ({ icon, label, value, bgColor }: { icon: React.ReactNode; label: string; value: number; bgColor: string }) => {
  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md hover:border-purple-200 transition-all duration-300 p-6">
      <div className="flex items-center gap-3">
        <div className={`p-3 ${bgColor} rounded-full`}>
          {icon}
        </div>
        <div>
          <p className="text-sm text-gray-600 font-medium">{label}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
        </div>
      </div>
    </div>
  );
};
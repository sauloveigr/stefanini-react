export const UserAvatar = ({ name, color = '' }: { name: string; color?: string }) => {
  const getInitials = (name: string) => {
    return name.split(' ').map(part => part[0]).join('').toUpperCase();
  };

  return (
    <div
      className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg ${color}`}
    >
      {getInitials(name)}
    </div>
  );
};
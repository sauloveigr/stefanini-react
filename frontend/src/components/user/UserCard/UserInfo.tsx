import type { ReactNode } from 'react';

interface UserInfoProps {
  icon: ReactNode;
  text: string;
  className?: string;
  textClassName?: string;
}

export function UserInfo({
  icon,
  text,
  className = '',
  textClassName = '',
}: UserInfoProps) {
  return (
    <div className={`flex items-center gap-2 text-gray-600 ${className}`}>
      {icon}
      <span className={textClassName}>{text}</span>
    </div>
  );
}
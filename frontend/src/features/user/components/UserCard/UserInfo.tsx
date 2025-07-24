import type { ReactNode } from 'react';

interface UserInfoProps {
  icon: ReactNode;
  label: string;
  text: string;
  className?: string;
  textClassName?: string;
}

export function UserInfo({
  icon,
  label,
  text,
  className = '',
  textClassName = '',
}: UserInfoProps) {
  return (
    <div className={`flex items-center gap-2 text-gray-600 ${className}`}>
      {icon}
      <div className="flex-1 min-w-0">
        <span className={`block truncate ${textClassName}`} title={text}>
          <span className="font-medium text-gray-700">{label}:</span> {text}
        </span>
      </div>
    </div>
  );
}
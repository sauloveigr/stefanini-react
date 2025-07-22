import { X } from "lucide-react";
import { DialogTitle } from "@headlessui/react";

interface DialogHeaderProps {
  title: string;
  onCancel: () => void;
}

export const DialogHeader = ({ title, onCancel }: DialogHeaderProps) => {
  return (
    <div className="p-4 border-b flex justify-between items-center">
      <DialogTitle className="text-2xl font-bold bg-gradient-primary bg-clip-text text-[#8A2BE2]">
        {title}
      </DialogTitle>
      <button onClick={onCancel} className="text-gray-400 hover:text-gray-600">
        <X size={20} />
      </button>
    </div>
  );
};

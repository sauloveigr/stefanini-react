import { Edit } from "lucide-react";
import { Trash2 } from "lucide-react";

export const UserActions = ({ onEdit, onDelete }: { onEdit: () => void; onDelete: () => void }) => (
  <div className="flex gap-1">
    <button
      onClick={onEdit}
      className="h-8 w-8 flex items-center justify-center rounded-md hover:bg-blue-50 hover:text-blue-600 transition-colors"
    >
      <Edit className="h-4 w-4" />
    </button>
    <button
      onClick={onDelete}
      className="h-8 w-8 flex items-center justify-center rounded-md hover:bg-red-50 hover:text-red-600 transition-colors"
    >
      <Trash2 className="h-4 w-4" />
    </button>
  </div>
);
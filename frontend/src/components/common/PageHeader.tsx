import { Plus } from "lucide-react";
import { Button } from "../ui/Button";

interface PageHeaderProps {
  title: string;
  description: string;
  onAdd: () => void;
  addButtonLabel?: string;
}

export const PageHeader = ({
  title,
  description,
  onAdd,
  addButtonLabel = "Nova Pessoa",
}: PageHeaderProps) => {
  return (
    <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <div>
        <h1 className="text-4xl font-bold text-[#8A2BE2] mb-2 font-sans">{title}</h1>
        <p className="text-[#666666] text-lg font-light">{description}</p>
      </div>
      <Button
        onClick={onAdd}
        variant="primary"
        className="bg-[#8A2BE2] text-white px-6 py-3 font-medium shadow-lg"
      >
        <Plus className="h-5 w-5 mr-2" />
        {addButtonLabel}
      </Button>
    </header>
  );
};

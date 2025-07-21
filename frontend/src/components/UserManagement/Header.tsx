import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"

interface HeaderProps {
  onAdd: () => void
}

export const Header = ({ onAdd }: HeaderProps) => (
  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
    <div>
      <h1 className="text-4xl font-bold text-gray-900 mb-2">Cadastro de Pessoas</h1>
      <p className="text-gray-600 text-lg">Gerencie o cadastro de pessoas de forma simples e intuitiva</p>
    </div>
    <Button onClick={onAdd} className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-medium shadow-lg hover:shadow-xl transition-all duration-200">
      <Plus className="h-5 w-5 mr-2" />
      Nova Pessoa
    </Button>
  </div>
)

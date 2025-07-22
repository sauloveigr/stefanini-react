import { Select } from "@headlessui/react";
import { Search } from "lucide-react";

interface SearchFilterProps {
  searchTerm: string;
  genderFilter: string;
  onSearchChange: (term: string) => void;
  onGenderFilterChange: (gender: string) => void;
}

export const SearchFilter = ({
  searchTerm,
  genderFilter,
  onSearchChange,
  onGenderFilterChange,
}: SearchFilterProps) => {
  return (
    <article className="bg-white rounded-lg shadow-sm py-6 border border-gray-200 p-6">
      <div className="flex items-center gap-2 mb-4">
        <Search className="h-5 w-5 text-purple-600" />
        <h3 className="text-lg font-semibold text-gray-900">Buscar e Filtrar</h3>
      </div>
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <input
            type="text"
            placeholder="Buscar registros de pessoas..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-200 focus:outline-none transition-colors"
          />
        </div>
        <div className="relative w-full md:w-48">
          <Select
            value={genderFilter}
            onChange={(e) => onGenderFilterChange(e.target.value)}
            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-200 focus:outline-none transition-colors appearance-none bg-white"
          >
            <option value="all">Filtrar por sexo</option>
            <option value="male">Masculino</option>
            <option value="female">Feminino</option>
            <option value="other">Outro</option>
          </Select>
          <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </div>
    </article>
  );
};
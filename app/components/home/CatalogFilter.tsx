import {  ChangeEvent, FC } from 'react';
import { Search, X } from 'lucide-react';
import { StudyPlanFilterState } from "./utils";

interface FilterPanelProps {
  filters: StudyPlanFilterState;
  setFilters: React.Dispatch<React.SetStateAction<StudyPlanFilterState>>;
  resultCount: number;
}

export const CatalogFilterPanel: FC<FilterPanelProps> = ({ filters, setFilters, resultCount }) => {
  const handleReset = () => {
    setFilters({
      searchTerm: '',
      category: 'All',
      faculty: 'All',
      level: 'All',
      country: 'All'
    });
  };

  return (
    <div className="p-6 rounded-2xl bg-zinc-950 border border-zinc-800 space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Search Bar */}
        <div className="relative sm:col-span-2 lg:col-span-1">
          <Search className="w-4 h-4 text-zinc-500 absolute left-3.5 top-3.5" />
          <input
            type="text"
            placeholder="Search keywords, topics..."
            value={filters.searchTerm}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setFilters((prev) => ({ ...prev, searchTerm: e.target.value }))
            }
            className="w-full bg-zinc-900 border border-zinc-800 rounded-xl pl-10 pr-4 py-2.5 text-xs text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-amber-500/50"
          />
        </div>

        {/* Category */}
        <div>
          <select
            value={filters.category}
            onChange={(e: ChangeEvent<HTMLSelectElement>) =>
              setFilters((prev) => ({ ...prev, category: e.target.value }))
            }
            className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2.5 text-xs text-zinc-200 focus:outline-none focus:border-amber-500/50"
          >
            <option value="All">All Categories (K-12, University, Executive)</option>
            <option value="K-12 Advanced">K-12 Advanced STEM</option>
            <option value="University">University Degrees</option>
            <option value="Professional">Professional & Executive</option>
          </select>
        </div>

        {/* Faculty */}
        <div>
          <select
            value={filters.faculty}
            onChange={(e: ChangeEvent<HTMLSelectElement>) =>
              setFilters((prev) => ({ ...prev, faculty: e.target.value }))
            }
            className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2.5 text-xs text-zinc-200 focus:outline-none focus:border-amber-500/50"
          >
            <option value="All">All Academic Faculties</option>
            <option value="Computer Science & AI">Computer Science & AI</option>
            <option value="Physics & Mathematics">Physics & Mathematics</option>
            <option value="Cybersecurity">Cybersecurity</option>
            <option value="Bioengineering">Bioengineering</option>
            <option value="Quantitative Finance">Quantitative Finance</option>
          </select>
        </div>

        {/* Level */}
        <div>
          <select
            value={filters.level}
            onChange={(e: ChangeEvent<HTMLSelectElement>) =>
              setFilters((prev) => ({ ...prev, level: e.target.value }))
            }
            className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2.5 text-xs text-zinc-200 focus:outline-none focus:border-amber-500/50"
          >
            <option value="All">All Education Levels</option>
            <option value="High School Honors">High School Honors</option>
            <option value="Undergraduate Honors">Undergraduate Honors</option>
            <option value="Master's Degree Path">Master's Degree Path</option>
            <option value="PhD Foundation">PhD Foundation</option>
            <option value="Executive Specialist">Executive Specialist</option>
          </select>
        </div>
      </div>

      <div className="flex items-center justify-between text-xs text-zinc-400 pt-2 border-t border-zinc-900">
        <span>
          Showing <strong className="text-amber-400">{resultCount}</strong> accredited study plans
        </span>
        {(filters.searchTerm ||
          filters.category !== 'All' ||
          filters.faculty !== 'All' ||
          filters.level !== 'All') && (
          <button
            onClick={handleReset}
            className="text-amber-400 hover:underline flex items-center space-x-1"
          >
            <X className="w-3.5 h-3.5" />
            <span>Reset All Filters</span>
          </button>
        )}
      </div>
    </div>
  );
};
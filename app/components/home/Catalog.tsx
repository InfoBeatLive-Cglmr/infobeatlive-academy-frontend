import { useState, FC, useMemo } from 'react';
import { HelpCircle } from 'lucide-react';
import { STUDY_PLANS_DATA, StudyPlan, StudyPlanFilterState } from './utils';
import { CatalogFilterPanel } from './CatalogFilter';
import { StudyPlanCard } from './StudyPlanCard';

export const CatalogPageView: FC<{ onSelectPlan: (plan: StudyPlan) => void }> = ({ onSelectPlan }) => {
  const [filters, setFilters] = useState<StudyPlanFilterState>({
    searchTerm: '',
    category: 'All',
    faculty: 'All',
    level: 'All',
    country: 'All'
  });

  const filteredPlans = useMemo(() => {
    return STUDY_PLANS_DATA.filter((plan) => {
      const matchesSearch =
        plan.title.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
        plan.description.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
        plan.department.toLowerCase().includes(filters.searchTerm.toLowerCase());
      const matchesCat = filters.category === 'All' || plan.category === filters.category;
      const matchesFac = filters.faculty === 'All' || plan.faculty === filters.faculty;
      const matchesLvl = filters.level === 'All' || plan.level === filters.level;

      return matchesSearch && matchesCat && matchesFac && matchesLvl;
    });
  }, [filters]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      <div className="space-y-4 text-left border-b border-zinc-800 pb-8">
        <span className="text-xs font-mono uppercase tracking-widest text-amber-400">
          Institutional Academic Catalog
        </span>
        <h1 className="text-4xl font-serif font-bold text-white">
          Structured Academic & Professional Study Plans
        </h1>
        <p className="text-zinc-400 text-sm max-w-3xl leading-relaxed">
          Filter accredited curricula by educational tier, academic faculty, and domain level. Every study plan contains DAG-verified prerequisite dependencies and proctored assessment milestones.
        </p>
      </div>

      <CatalogFilterPanel filters={filters} setFilters={setFilters} resultCount={filteredPlans.length} />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredPlans.map((plan) => (
          <StudyPlanCard key={plan.id} plan={plan} onSelect={onSelectPlan} />
        ))}
      </div>

      {filteredPlans.length === 0 && (
        <div className="text-center py-16 bg-zinc-950 rounded-2xl border border-zinc-800 space-y-3">
          <HelpCircle className="w-8 h-8 text-zinc-600 mx-auto" />
          <p className="text-zinc-300 font-medium">No study plans match your specified filter criteria.</p>
          <p className="text-xs text-zinc-500">Try broadening your search term or resetting the dropdown filters.</p>
        </div>
      )}
    </div>
  );
};
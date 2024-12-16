import MoodBadge from './MoodBadge';

const FilterForm = ({ moods, filters, onFilterChange }) => {
    return (
        <div className="mb-6 flex space-x-4 items-end">
            <div>
                <span className="block text-gray-700">Filtrer par humeur</span>
                <div className="flex space-x-2 mt-2">
                    <div
                        className={`cursor-pointer ${!filters.mood ? 'font-bold' : ''}`}
                        onClick={() => onFilterChange(null)}
                    >
                        <MoodBadge mood="all" />
                    </div>
                    {moods.map((mood) => (
                        <div
                            key={mood.id}
                            className={`cursor-pointer ${filters.mood === mood.id ? 'font-bold' : ''}`}
                            onClick={() => onFilterChange(mood.id)}
                        >
                            <MoodBadge mood={mood.name} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default FilterForm;

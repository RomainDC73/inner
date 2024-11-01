import { useForm, Link } from '@inertiajs/react';
import { useEffect } from 'react';

const FilterForm = ({ moods, filters }) => {
    const { data, setData, get } = useForm({
        mood: filters.mood || '',
        date: filters.date || ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        get(route('posts.index')); // Soumet les filtres en tant que requête GET
    };

    return (
        <form onSubmit={handleSubmit} className="mb-6 flex space-x-4 items-end">
            <div>
                <label className="block text-gray-700">Mood</label>
                <select
                    value={data.mood}
                    onChange={(e) => setData('mood', e.target.value)}
                    className="border border-gray-300 rounded px-4 py-2"
                >
                    <option value="">Tous</option>
                    {moods.map((mood) => (
                        <option key={mood.id} value={mood.id}>
                            {mood.name}
                        </option>
                    ))}
                </select>
            </div>
            <div>
                <label className="block text-gray-700">Date</label>
                <input
                    type="date"
                    value={data.date}
                    onChange={(e) => setData('date', e.target.value)}
                    className="border border-gray-300 rounded px-4 py-2"
                />
            </div>
            <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
            >
                Filtrer
            </button>
            <Link
                href={route('posts.index')}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded hover:bg-gray-100 transition"
                as="button"
                preserveScroll
            >
                Réinitialiser
            </Link>
        </form>
    );
};

export default FilterForm;



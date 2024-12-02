import { useForm } from '@inertiajs/react';
import MoodBadge from './MoodBadge';
import { useEffect } from 'react';

const FilterForm = ({ moods, filters }) => {
    const { data, setData, get } = useForm({
        mood: filters.mood || ''
    });

    // Utiliser un useEffect pour écouter les changements de mood
    useEffect(() => {
        // Effectuer une requête GET lorsque le mood change
        get(route('posts.index', { mood: data.mood }), {
            preserveState: true,
            replace: true
        });
    }, [data.mood]); // Déclencheur basé sur data.mood

    const handleMoodClick = (moodId) => {
        setData('mood', moodId); // Met à jour le filtre de mood
        // Si moodId est vide, cela signifie "Tous"
        if (moodId === '') {
            get(route('posts.index'), {
                preserveState: true,
                replace: true
            });
        }
    };

    return (
        <div className="mb-6 flex space-x-4 items-end">
            <div>
                <span className="block text-gray-700">Filtrer par humeur</span>
                <div className="flex space-x-2 mt-2">
                    <div
                        className={`cursor-pointer ${!data.mood ? 'font-bold' : ''}`}
                        onClick={() => handleMoodClick('')} // Réinitialiser le filtre à "Tous"
                    >
                        <MoodBadge mood="all" />
                        {/* <span>Tous</span> */}
                    </div>
                    {moods.map((mood) => (
                        <div
                            key={mood.id}
                            className="cursor-pointer"
                            onClick={() => handleMoodClick(mood.id)} // Utiliser l'ID du mood ici
                        >
                            <MoodBadge mood={mood.name} />
                            {/* <span>{mood.name}</span> */}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default FilterForm;

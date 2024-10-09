import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import MoodCard from '@/Components/MoodCard';

export default function ChooseMood({ moods, moodTranslations }) {
    const { data, setData, post } = useForm({
        mood_id: '',
    });

    // Fonction pour gérer la sélection du mood
    const handleMoodSelect = (id) => {
        setData('mood_id', id); // Met à jour le form data avec le mood sélectionné
    };

    // Soumission du formulaire
    const submitMood = (e) => {
        e.preventDefault();
        post('/create/choose-action'); // Redirige vers la page suivante
    };

    return (
        <AuthenticatedLayout
            header={
                <>
                    <h1 className="text-xl text-center font-semibold leading-tight text-gray-800">
                        Avant tout, comment te sens-tu ?
                    </h1>
                </>
            }
        >
            <Head title="Choisis ton mood" />

            <div>
                <form onSubmit={submitMood}>
                    <div className="moods grid grid-cols-3 gap-4">
                        {moods.map((mood) => (
                            <div key={mood.id} onClick={() => handleMoodSelect(mood.id)}>
                                {/* Utilisation du composant MoodCard pour chaque humeur */}
                                <MoodCard mood={mood} translations={moodTranslations} />
                            </div>
                        ))}
                    </div>

                    <div className="mt-6 text-center">
                        {/* Bouton désactivé si aucun mood n'est sélectionné */}
                        <button
                            type="submit"
                            className={`px-4 py-2 bg-blue-500 text-white rounded-lg ${!data.mood_id ? 'opacity-50 cursor-not-allowed' : ''}`}
                            disabled={!data.mood_id}
                        >
                            Suivant
                        </button>
                    </div>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}

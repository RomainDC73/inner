import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import MoodCard from '@/Components/MoodCard';
import PrimaryButton from '@/Components/PrimaryButton';

export default function EditMood({ post, moods, moodTranslations }) {
    // Vérifie si post.mood existe avant d'accéder à ses propriétés
    const initialMoodId = post.mood ? post.mood.id : null;

    // Utilisation du formulaire d'Inertia pour gérer les données
    const { data, setData, patch, processing } = useForm({
        mood_id: initialMoodId, // Utilise le mood du post si disponible
    });

    const handleMoodSelect = (id) => {
        setData('mood_id', id); // Met à jour le mood_id sélectionné
    };

    const saveMood = (e) => {
        e.preventDefault();
        patch(`/post/${post.id}/edit/mood`, {
            onSuccess: () => {
                //alert('Mood mis à jour avec succès!');
            },
        });
    };

    return (
        <AuthenticatedLayout
            header={
                <h1 className="text-xl text-center font-semibold leading-tight text-gray-800 mt-4 mb-4">
                    Modifier votre humeur
                </h1>
            }
        >
            <Head title="Modifier Mood" />
            <div className="flex flex-col items-center">
                {/* Grille de sélection des moods */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {moods.map(mood => (
                        <div
                            key={mood.id}
                            onClick={() => handleMoodSelect(mood.id)}
                            className={`cursor-pointer ${data.mood_id === mood.id ? 'ring-2 rounded-lg ring-slate-300' : ''}`}
                        >
                            {/* MoodCard avec moodTranslations */}
                            <MoodCard mood={mood} moodTranslations={moodTranslations} />
                        </div>
                    ))}
                </div>

                {/* Bouton pour enregistrer */}
                <div className="mt-6">
                    <PrimaryButton
                        onClick={saveMood}
                        disabled={processing} // Désactive le bouton pendant le traitement
                    >
                        {processing ? 'Enregistrement...' : 'Enregistrer'}
                    </PrimaryButton>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

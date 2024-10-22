import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import MoodCard from '@/Components/MoodCard';
import PrimaryButton from '@/Components/PrimaryButton';

export default function EditMood({ post, moods, moodTranslations }) {
    const { setData, post: submit } = useForm({
        mood_id: post.mood_id, // Mood actuel du post
    });

    // Fonction appelée lorsque l'utilisateur sélectionne une humeur
    const handleMoodSelect = (id) => {
        setData('mood_id', id);
    };

    // Fonction pour soumettre la mise à jour de l'humeur
    const handleSubmit = (e) => {
        e.preventDefault();
        submit(`/post/${post.id}/update/mood`);
    };

    return (
        <AuthenticatedLayout
            header={
                <h1 className="text-xl text-center font-semibold leading-tight text-gray-800 mt-4 mb-4">
                    Modifier l'humeur du post
                </h1>
            }
        >
            <Head title="Modifier Mood" />

            <form onSubmit={handleSubmit} className="flex flex-col items-center space-y-4">
                {/* Grille des humeurs */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {moods.map(mood => (
                        <div key={mood.id} onClick={() => handleMoodSelect(mood.id)}>
                            <MoodCard
                                mood={mood}
                                moodTranslations={moodTranslations}
                                selected={mood.id === post.mood_id} // Indique si c'est l'humeur actuelle
                            />
                        </div>
                    ))}
                </div>

                {/* Bouton d'enregistrement */}
                <PrimaryButton type="submit">
                    Enregistrer
                </PrimaryButton>
            </form>
        </AuthenticatedLayout>
    );
}

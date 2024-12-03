import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import MoodCard from '@/Components/MoodCard';
import BackButton from '@/Components/BackButton';

export default function ChooseMood({ moods, moodTranslations }) {
    const { data, setData, post } = useForm({
        mood_id: '',
    });

    const handleMoodSelect = (id, event) => {
        event.preventDefault();
        console.log('Mood selected:', id);
        setData('mood_id', id);
        post(route('create.save-mood'), {
            preserveState: true,
            onSuccess: () => {
                console.log('Requête réussie, redirection en cours');
            },
            onError: (errors) => {
                console.error("Erreur lors de la requête", errors);
            },
        });
    };

    return (
        <AuthenticatedLayout
            header={
                <div>
                    <BackButton />
                    <h1 className="text-xl text-center font-semibold leading-tight text-gray-800 mt-4 mb-4">
                    Avant tout, comment te sens-tu ?
                    </h1>
                </div>
            }
        >
            <Head title="Choisis ton mood" />
            <div className="flex flex-col items-center">
                {/* Formulaire */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {moods.map((mood) => (
                        <div key={mood.id} onClick={(event) => handleMoodSelect(mood.id, event)}>
                            {/* Passe moodTranslations ici */}
                            <MoodCard
                                mood={mood}
                                moodTranslations={moodTranslations}
                                selected={data.mood_id === mood.id}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

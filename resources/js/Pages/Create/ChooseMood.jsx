import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import MoodCard from '@/Components/MoodCard';

export default function ChooseMood({ moods, moodTranslations }) {
    const { setData, post } = useForm({
        mood_id: '',
    });

    const handleMoodSelect = (id) => {
        setData('mood_id', id);
        post('/create/choose-action');
    };

    return (
        <AuthenticatedLayout
            header={
                <h1 className="text-xl text-center font-semibold leading-tight text-gray-800 mt-4 mb-4">
                    Avant tout, comment te sens-tu ?
                </h1>
            }
        >
            <Head title="Choisis ton mood" />
            <div className="flex flex-col items-center">
                {/* Formulaire */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {moods.map(mood => (
                        <div key={mood.id} onClick={() => handleMoodSelect(mood.id)}>
                            {/* Passe moodTranslations ici */}
                            <MoodCard mood={mood} moodTranslations={moodTranslations} />
                        </div>
                    ))}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

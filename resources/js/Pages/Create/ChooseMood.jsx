import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import MoodCard from '@/Components/MoodCard';

export default function ChooseMood({ moods, moodTranslations }) {
    const { data, setData, post } = useForm({
        mood_id: '',
    });

    const handleMoodSelect = (id) => {
        setData('mood_id', id);
    };

    const submitMood = (e) => {
        e.preventDefault();
        post('/create/choose-action');
    };

    return (
        <AuthenticatedLayout
            header={
                <h1 className="text-xl text-center font-semibold leading-tight text-gray-800">
                    Avant tout, comment te sens-tu ?
                </h1>
            }
        >
            <Head title="Choisis ton mood" />
            <div className="flex flex-col items-center">
                <form onSubmit={submitMood}>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4"> {/* Affichage en grille avec 3 colonnes sur grand écran */}
                        {moods.map(mood => (
                            <div key={mood.id} onClick={() => handleMoodSelect(mood.id)}>
                                <MoodCard mood={mood} moodTranslations={moodTranslations} />
                            </div>
                        ))}
                    </div>
                    <div className="mt-6 text-center">
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
                            disabled={!data.mood_id}
                        >
                            Next
                        </button>
                    </div>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}

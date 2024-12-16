import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import MoodCard from '@/Components/MoodCard';
import PrimaryButton from '@/Components/PrimaryButton';
import BackButton from '@/Components/BackButton';

export default function EditMood({ post, moods, moodTranslations }) {
    const initialMoodId = post.mood ? post.mood.id : null;

    const { data, setData, patch, processing } = useForm({
        mood_id: initialMoodId,
    });

    const handleMoodSelect = (id) => {
        setData('mood_id', id);
    };

    const saveMood = (e) => {
        e.preventDefault();
        patch(`/post/${post.id}/edit/mood`, {
            onSuccess: () => {
            },
        });
    };

    return (
        <AuthenticatedLayout
            header={
                <div>
                    <BackButton />
                    <h1 className="text-xl text-center font-semibold leading-tight text-gray-800 mt-4 mb-4">
                    Modifier votre humeur
                    </h1>
                </div>
            }
        >
            <Head title="Modifier Mood" />
            <div className="flex flex-col items-center">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {moods.map(mood => (
                        <div
                            key={mood.id}
                            onClick={() => handleMoodSelect(mood.id)}
                            className={`cursor-pointer ${data.mood_id === mood.id ? 'ring-2 rounded-lg ring-slate-300' : ''}`}
                        >
                            <MoodCard mood={mood} moodTranslations={moodTranslations} />
                        </div>
                    ))}
                </div>

                <div className="mt-6">
                    <PrimaryButton
                        onClick={saveMood}
                        disabled={processing}
                    >
                        {processing ? 'Enregistrement...' : 'Enregistrer'}
                    </PrimaryButton>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

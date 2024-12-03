import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router } from '@inertiajs/react';
import { useState } from 'react';
import MoodCard from '@/Components/MoodCard';
import BackButton from '@/Components/BackButton';

export default function ChooseMood({ moods, moodTranslations }) {
    const [selectedMood, setSelectedMood] = useState(null);

    const handleMoodSelect = (id) => {
        setSelectedMood(id);
        router.post(route('create.save-mood'), { mood_id: id }, {
            onSuccess: () => console.log('Mood enregistré avec succès'),
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
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {moods.map((mood) => (
                        <div
                            key={mood.id}
                            onClick={(event) => handleMoodSelect(mood.id, event)}
                        >
                            <MoodCard
                                mood={mood}
                                moodTranslations={moodTranslations}
                                selected={selectedMood === mood.id}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

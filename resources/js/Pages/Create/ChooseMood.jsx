import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import axios from 'axios';
import { useState } from 'react';
import MoodCard from '@/Components/MoodCard';
import BackButton from '@/Components/BackButton';

export default function ChooseMood({ moods, moodTranslations }) {

    const [selectedMood, setSelectedMood] = useState(null);

    const handleMoodSelect = async (id, event) => {
        event.preventDefault();
        console.log('Mood selected:', id);
        setSelectedMood(id);

        try {
            const response = await axios.post(route('create.save-mood'), { mood_id: id });
            console.log('Requête réussie, redirection en cours', response.data);
            // Redirection ou confirmation
            window.location.href = route('create.choose-action'); // Remplacez 'next.step' par la route suivante
        } catch (error) {
            console.error("Erreur lors de la requête", error.response?.data || error.message);
        }
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

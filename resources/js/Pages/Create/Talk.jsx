import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { useState } from 'react';
import { Head } from '@inertiajs/react';
import VoiceRecorder from '@/Components/VoiceRecorder';
import PrimaryButton from '@/Components/PrimaryButton'; // Assurez-vous que ce bouton est importé

export default function Talk() {
    const [audioBlob, setAudioBlob] = useState(null);

    const handleRecordingComplete = (audio) => {
        setAudioBlob(audio);
    };

    const handleNextStep = () => {
        // Rediriger vers la page suivante (ajout de média, par exemple)
        // Utilise `Inertia.visit` ou un autre mécanisme de redirection
        window.location.href = '/create/add-media';  // Exemple de redirection
    };

    return (
        <AuthenticatedLayout>
            <Head title="Parler" />
            <div className="flex flex-col items-center mt-10 min-h-screen mx-auto max-w-7xl sm:px-6 lg:px-8">
                <div className="text-center">
                    <h1 className="text-xl font-semibold leading-tight text-gray-800 mt-4 mb-4">
                        Parlons un peu...
                    </h1>
                    <div className="overflow-hidden shadow-sm rounded-lg">
                        <div className="p-6 text-gray-900 space-y-3">
                            <VoiceRecorder onRecordingComplete={handleRecordingComplete} />
                        </div>
                    </div>

                    {/* Afficher le bouton uniquement si un enregistrement a été fait */}
                    {audioBlob && (
                        <div className="mt-6">
                            <PrimaryButton onClick={handleNextStep}>suivant</PrimaryButton>
                        </div>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

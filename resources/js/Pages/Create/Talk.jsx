import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { useState } from 'react';
import { Head, useForm } from '@inertiajs/react';
import VoiceRecorder from '@/Components/VoiceRecorder';
import PrimaryButton from '@/Components/PrimaryButton';


export default function Talk() {
    const [audioBlob, setAudioBlob] = useState(null);

    const { post, processing } = useForm();

    const handleRecordingComplete = (audio) => {
        setAudioBlob(audio);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!audioBlob) {
            alert('Veuillez enregistrer un message avant de continuer.');
            return;
        }

        // Créer un FormData pour inclure l'audio
        const formData = new FormData();
        formData.append('audio', audioBlob, 'recording.webm');

        // Vérification que le fichier est bien attaché
        console.log("FormData entries:");
        for (let pair of formData.entries()) {
            console.log(pair[0] + ': ' + pair[1]);
        }

        post('/create/save-talk', {
            data: formData,
            onSuccess: () => {
                console.log('Audio enregistré avec succès');
            },
            onError: (errors) => {
                console.error('Erreur lors de l\'enregistrement de l\'audio', errors);
            },
        });
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
                            <PrimaryButton onClick={handleSubmit} disabled={processing}>
                                {processing ? 'Enregistrement...' : 'Suivant'}
                            </PrimaryButton>
                        </div>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

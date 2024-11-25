import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { useState } from 'react';
import { Head, useForm } from '@inertiajs/react';
import VoiceRecorder from '@/Components/VoiceRecorder';
import PrimaryButton from '@/Components/PrimaryButton';

export default function Talk() {

    const { data, setData, post, processing } = useForm({
        audio: null,
    });

    const [error, setError] = useState('');

    const handleRecordingComplete = (audio) => {
        if (audio && audio instanceof Blob) {
            setData('audio', audio);
        } else {
            setError('Le fichier audio est invalide.');
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!data.audio) {
            setError('Veuillez enregistrer un message avant de continuer.');
            return;
        }

        // Envoie du formulaire
        post('/create/save-talk', {
            onSuccess: () => {
                console.log('Audio enregistré avec succès');
                setError(''); // Réinitialiser l'erreur après succès
            },
            onError: (errors) => {
                console.error('Erreur lors de l\'enregistrement de l\'audio', errors);
                setError('Une erreur est survenue lors de l\'enregistrement. Veuillez réessayer.');
            },
        });
    };

    return (
        <AuthenticatedLayout>
            <Head>
                <title>Enregistrer un message vocal</title>
            </Head>
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

                    {error && <p className="text-red-500 mt-4">{error}</p>}

                    {data.audio && (
                        <div className="mt-6">
                            <PrimaryButton onClick={handleSubmit} disabled={processing}>
                                {processing ? (
                                    <span className="flex items-center">
                                        <span className="loader mr-2"></span> Enregistrement...
                                    </span>
                                ) : (
                                    'Suivant'
                                )}
                            </PrimaryButton>
                        </div>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

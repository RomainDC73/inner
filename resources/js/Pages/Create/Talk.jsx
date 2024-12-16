import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { useState } from 'react';
import { Head, useForm } from '@inertiajs/react';
import VoiceRecorder from '@/Components/VoiceRecorder';
import PrimaryButton from '@/Components/PrimaryButton';
import BackButton from '@/Components/BackButton';

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

        post('/create/save-talk', {
            onSuccess: () => {
                setError('');
            },
            onError: (errors) => {
                setError('Une erreur est survenue lors de l\'enregistrement. Veuillez réessayer.');
            },
        });
    };

    return (
        <AuthenticatedLayout
            header={
                <div>
                    <BackButton />
                    <h1 className="text-xl text-center font-semibold leading-tight text-gray-800 mt-4 mb-4">
                    Parlons un peu...
                    </h1>
                </div>
            }>
            <Head>
                <title>Enregistrer un message vocal</title>
            </Head>
            <div className="flex flex-col">
                <div className="text-center">
                    <div className="overflow-hidden rounded-lg mx-auto w-4/5">
                        <div className="text-gray-900 space-y-4">
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

import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import { useState, useRef } from 'react';
import VoiceRecorder from '@/Components/VoiceRecorder';
import DangerButton from '@/Components/DangerButton';
import PrimaryButton from '@/Components/PrimaryButton';
import BackButton from '@/Components/BackButton';

export default function EditAudio({ post }) {
    const { data, setData, processing } = useForm({
        audio: null,
    });

    const fileInputRef = useRef(null);

    const [error, setError] = useState('');

    const handleRecordingComplete = (audioBlob) => {
        if (audioBlob) {
            setData('audio', audioBlob);
        } else {
            setError('Le fichier audio est invalide.');
        }
    };

    const handleSave = async (e) => {
        e.preventDefault();

        const formData = new FormData();

        if (data.audio instanceof Blob) {
            const file = new File([data.audio], 'audio.webm', { type: data.audio.type || 'audio/webm' });
            formData.append('audio', file);
        } else {
            setError('Veuillez enregistrer un audio valide avant de sauvegarder.');
            return;
        }

        try {
            const response = await axios.post(`/post/${post.id}/edit/audio`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            window.location.href = response.data.redirect;
        } catch (error) {
            setError('Une erreur est survenue lors de l\'enregistrement.');
        }
    };

    return (
        <AuthenticatedLayout
            header={
                <div>
                    <BackButton />
                    <h1 className="text-xl text-center font-semibold leading-tight text-gray-800 mt-4 mb-4">
                    Modifier le fichier audio
                </h1>
                </div>
            }
        >
            <Head title="Modifier votre vocal" />

            <div className="max-w-4xl mx-auto p-6 space-y-6">
                <div className="text-center space-y-4">
                    <h2 className="text-lg font-semibold">Enregistrer</h2>
                    <VoiceRecorder onRecordingComplete={handleRecordingComplete} />
                </div>

                {error && <p className="text-red-500 mt-4 text-center">{error}</p>}

                <div className="flex justify-center space-x-4">
                    <DangerButton onClick={() => Inertia.get(route('posts.show', post.id))}>
                        Annuler
                    </DangerButton>
                    <PrimaryButton onClick={handleSave} disabled={!data.audio || processing}>
                        {processing ? (
                            <span className="flex items-center">
                                <span className="loader mr-2"></span> Enregistrement...
                            </span>
                        ) : (
                            'Sauvegarder'
                        )}
                    </PrimaryButton>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

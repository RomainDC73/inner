import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import { useState, useRef } from 'react';
import VoiceRecorder from '@/Components/VoiceRecorder';
import DangerButton from '@/Components/DangerButton';
import PrimaryButton from '@/Components/PrimaryButton';

export default function EditAudio({ post }) {
    // Utilisation de useForm pour gérer les données du formulaire
    const { data, setData, processing } = useForm({
        audio: null, // L'audio initial (null au départ)
    });

    const fileInputRef = useRef(null);

    const [error, setError] = useState('');

    // Gère l'enregistrement du nouvel audio
    const handleRecordingComplete = (audioBlob) => {
        if (audioBlob) {
            setData('audio', audioBlob);  // Stocke l'audio dans les données du formulaire
        } else {
            setError('Le fichier audio est invalide.');  // Erreur si audio invalide
        }
    };

    // Gère la soumission du formulaire
    const handleSave = async (e) => {
        e.preventDefault();

        const formData = new FormData();

        // Ajout direct de l'audio depuis data.audio
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
            console.log('Réponse du serveur :', response.data);
            // Redirection après la mise à jour
            window.location.href = response.data.redirect;
        } catch (error) {
            console.error('Erreur lors de l\'envoi:', error.response?.data || error.message);
            setError('Une erreur est survenue lors de l\'enregistrement.');
        }
    };

    return (
        <AuthenticatedLayout
            header={
                <h1 className="text-xl text-center font-semibold leading-tight text-gray-800 mt-4 mb-4">
                    Modifier le fichier audio
                </h1>
            }
        >
            <Head title="Modifier votre vocal" />

            <div className="max-w-4xl mx-auto p-6 space-y-6">
                {/* Enregistrement d'un nouvel audio */}
                <div className="text-center space-y-4">
                    <h2 className="text-lg font-semibold">Enregistrer</h2>
                    <VoiceRecorder onRecordingComplete={handleRecordingComplete} />
                </div>

                {/* Affichage des erreurs */}
                {error && <p className="text-red-500 mt-4 text-center">{error}</p>}

                {/* Boutons d'action */}
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

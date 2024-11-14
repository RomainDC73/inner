import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import { useState } from 'react';
import MoodCard from '@/Components/MoodCard';
import ImagePreview from '@/Components/ImagePreview';
import CreateButton from '@/Components/CreateButton';
import PrimaryButton from '@/Components/PrimaryButton';
import { Inertia } from '@inertiajs/inertia';
import { MdEdit } from 'react-icons/md';

export default function ShowRecap({ mood, moodTranslations, description, mediaPath }) {
    const [editMode, setEditMode] = useState(false);

    const { post, processing } = useForm({
        mood_id: mood ? mood.id : null,
        description: description || '',
        media_path: mediaPath || '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        Inertia.post(route('posts.store'), {
            mood_id: mood ? mood.id : null,
            description: description || '',
            media_path: mediaPath || '',
        }, {
            onFinish: () => {
                localStorage.removeItem('mood_id');
                localStorage.removeItem('description');
                localStorage.removeItem('media');
            }
        });

    };

    return (
        <AuthenticatedLayout
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Récapitulatif</h2>}
        >
            <Head title="Récapitulatif" />

            <div>
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6 w-full">
                    {/* MoodCard */}
                    <div className="overflow-hidden shadow-sm sm:rounded-lg p-4 text-center">
                        <h3 className="text-lg font-semibold mb-2">Comment tu te sens</h3>
                        <div className="flex items-center gap-2">
                            {mood ? (
                                <MoodCard mood={mood} moodTranslations={moodTranslations} />
                            ) : (
                                <p>Chargement de l'humeur...</p>
                            )}
                            {editMode && (
                                <MdEdit
                                    className="text-gray-500 cursor-pointer"
                                    onClick={() => Inertia.get(`/create/choose-mood`)}
                                />
                            )}
                        </div>
                    </div>

                    {/* Description */}
                    <div className="overflow-hidden shadow-sm sm:rounded-lg p-4 text-center">
                        <h3 className="text-lg font-semibold mb-2">Ta description</h3>
                        <div className="flex items-center justify-center gap-2">
                            <p>{description || 'Aucune description fournie.'}</p>
                            {editMode && (
                                <MdEdit
                                    className="text-gray-500 cursor-pointer"
                                    onClick={() => Inertia.get(`/create/write`)} // Rediriger si nécessaire
                                />
                            )}
                        </div>
                    </div>

                    {/* Image */}
                    {mediaPath && (
                        <div className="overflow-hidden shadow-sm sm:rounded-lg p-4 text-center">
                            <h3 className="text-lg font-semibold mb-2">Ton image</h3>
                            <div className="flex items-center justify-center gap-2">
                                <ImagePreview src={`/storage/${mediaPath}`} />
                                {editMode && (
                                    <MdEdit
                                        className="text-gray-500 cursor-pointer"
                                        onClick={() => Inertia.get(`/create/add-media`)} // Rediriger si nécessaire
                                    />
                                )}
                            </div>
                        </div>
                    )}

                    {/* Boutons */}
                    <div className="flex justify-center p-6 space-x-4">
                        <PrimaryButton onClick={() => setEditMode(!editMode)}>
                            {editMode ? 'Terminer' : 'Modifier'}
                        </PrimaryButton>
                        <CreateButton disabled={processing} onClick={handleSubmit}>
                            Sauvegarder
                        </CreateButton>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, router } from '@inertiajs/react';
import { useState } from 'react';
import MoodCard from '@/Components/MoodCard';
import CustomPlayer from '@/Components/Player';
import ImagePreview from '@/Components/ImagePreview';
import CreateButton from '@/Components/CreateButton';
import PrimaryButton from '@/Components/PrimaryButton';
import BackButton from '@/Components/BackButton';
import { MdEdit } from 'react-icons/md';


export default function ShowRecap({ mood, moodTranslations, description, audioPath, mediaPath }) {
    const [editMode, setEditMode] = useState(false);

    const { post, processing } = useForm({
        mood_id: mood ? mood.id : null,
        description: description || '',
        audio_path: audioPath || '',
        media_path: mediaPath || '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        router.post(route('posts.store'), {
            mood_id: mood ? mood.id : null,
            description: description || '',
            audio_path: audioPath || '',
            media_path: mediaPath || '',
        }, {
            onFinish: () => {
                localStorage.clear();
            }
        });
    };

    const handleEdit = (url) => {
        router.visit(url, {
            preserveState: true,
            replace: true,
        });
    };

    return (
        <AuthenticatedLayout
            header={
                <div>
                <BackButton />
                <h1 className="font-semibold text-xl text-gray-800 leading-tight">
                Récapitulatif
                </h1>
                </div>
            }>
            <Head>
            <title>Récapitulatif</title>
            </Head>

            <div>
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6 w-full">
                    <div className="overflow-hidden shadow-sm sm:rounded-lg p-4 text-center">
                        <h3 className="text-lg font-semibold mb-2">Comment tu te sens</h3>
                        <div className="flex items-center justify-center gap-2">
                            {mood ? (
                                <MoodCard mood={mood} moodTranslations={moodTranslations} />
                            ) : (
                                <p>Chargement de l'humeur...</p>
                            )}
                            {editMode && (
                                <MdEdit
                                    className="text-gray-500 cursor-pointer"
                                    onClick={() => handleEdit(`/create/choose-mood`)}
                                />
                            )}
                        </div>
                    </div>

                    <div className="overflow-hidden shadow-sm sm:rounded-lg p-4 text-center">
                        <h3 className="text-lg font-semibold mb-2">🖋</h3>
                        <div className="flex items-center justify-center gap-2">
                            <p>{description || 'Aucune description fournie.'}</p>
                            {editMode && (
                                <MdEdit
                                    className="text-gray-500 cursor-pointer"
                                    onClick={() => handleEdit(`/create/write`)}
                                />
                            )}
                        </div>
                    </div>

                    <div className="overflow-hidden shadow-sm sm:rounded-lg p-4 text-center">
                        <h3 className="text-lg font-semibold mb-2">🎤</h3>
                        <div className="flex items-center justify-center gap-2">
                            {audioPath ? (
                                <CustomPlayer src={`${audioPath}`} />
                            ) : (
                                <p className="text-gray-400 italic">Aucun fichier vocal enregistré.</p>
                            )}
                            {editMode && (
                                <MdEdit
                                    className="text-gray-500 cursor-pointer"
                                    onClick={() => handleEdit(`/create/talk`)}
                                />
                            )}
                        </div>
                    </div>

                    <div className="overflow-hidden shadow-sm sm:rounded-lg p-4 text-center">
                        <h3 className="text-lg font-semibold mb-2">📷</h3>
                        <div className="flex items-center justify-center gap-2">
                            {mediaPath ? (
                                <ImagePreview src={`${mediaPath}`} />
                                
                                ) : (
                                <p className="text-gray-400 italic">Aucune image sélectionnée.</p>
                            )}
                            {editMode && (
                                <MdEdit
                                    className="text-gray-500 cursor-pointer"
                                    onClick={() => handleEdit(`/create/add-media`)}
                                />
                            )}
                        </div>
                    </div>

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

import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import MoodCard from '@/Components/MoodCard';
import ImagePreview from '@/Components/ImagePreview';
import CreateButton from '@/Components/CreateButton';
import { Inertia } from '@inertiajs/inertia';

export default function ShowRecap({ mood, moodTranslations, description, mediaPath }) {
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
        }).then(() => {
            // Vider la session et le localStorage après la soumission réussie
            sessionStorage.removeItem('mood_id');
            sessionStorage.removeItem('description');
            sessionStorage.removeItem('media_path');

            localStorage.removeItem('mood_id');
            localStorage.removeItem('description');
            localStorage.removeItem('media_path');
        });
    };

    return (
        <AuthenticatedLayout
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Récapitulatif</h2>}
        >
            <Head title="Récapitulatif" />

            <div className="flex items-center justify-center min-h-screen py-12"> {/* Ajout de classes pour centrer */}
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6 w-full"> {/* Ajuste la largeur si besoin */}

                    {/* MoodCard */}
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6 text-center"> {/* Centrer le texte */}
                        <h3 className="text-lg font-semibold mb-4">Comment tu te sens</h3>
                        {mood ? (
                            <MoodCard mood={mood} moodTranslations={moodTranslations} />
                        ) : (
                            <p>Chargement de l'humeur...</p>
                        )}
                    </div>

                    {/* Description */}
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6 text-center"> {/* Centrer le texte */}
                        <h3 className="text-lg font-semibold mb-4">Ta description</h3>
                        <p>{description || 'Aucune description fournie.'}</p>
                    </div>

                    {/* Image */}
                    {mediaPath && (
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6 text-center"> {/* Centrer le texte */}
                            <h3 className="text-lg font-semibold mb-4">Ton image</h3>
                            <div className="flex justify-center">
                                <ImagePreview src={`/storage/${mediaPath}`} />  {/* Affichage de l'image */}
                            </div>
                        </div>
                    )}
                    {/* Bouton pour sauvegarder */}
                    <div className="text-center"> {/* Centrer le bouton */}
                        <CreateButton disabled={processing} onClick={handleSubmit}>
                            Sauvegarder
                        </CreateButton>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

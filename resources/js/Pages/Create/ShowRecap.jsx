import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import MoodCard from '@/Components/MoodCard';
import ImagePreview from '@/Components/ImagePreview';

export default function ShowRecap({ mood, moodTranslations, description, mediaPath }) {
    return (
        <AuthenticatedLayout
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Récapitulatif</h2>}
        >
            <Head title="Récapitulatif" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">

                    {/* MoodCard */}
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                        <h3 className="text-lg font-semibold mb-4">Comment tu te sens</h3>
                        {mood ? (
                            <MoodCard mood={mood} moodTranslations={moodTranslations} />
                        ) : (
                            <p>Chargement de l'humeur...</p>
                        )}
                    </div>

                    {/* Description */}
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                        <h3 className="text-lg font-semibold mb-4">Ta description</h3>
                        <p>{description || 'Aucune description fournie.'}</p>
                    </div>

                    {/* Image */}
                    {mediaPath && (
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                            <h3 className="text-lg font-semibold mb-4">Ton image</h3>
                            <ImagePreview src={`/storage/${mediaPath}`} />  {/* Affichage de l'image */}
                        </div>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

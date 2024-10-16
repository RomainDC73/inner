import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import ChooseCard from '@/Components/ChooseCard';
import { useState } from 'react';

export default function AddMedia({ mood_id }) {
    const { data, setData, post } = useForm({
        media: null,  // Pour stocker l'image uploadée
    });

    const [mediaPreview, setMediaPreview] = useState(null);

    // Gérer l'upload de la photo
    const handleMediaChange = (e) => {
        const file = e.target.files[0];
        setData('media', file);

        // Créer un aperçu de l'image
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setMediaPreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post('/posts/submit-media'); // Route vers l'étape suivante (à créer dans ton contrôleur)
    };

    return (
        <AuthenticatedLayout
            header={
                <h1 className="text-xl text-center font-semibold leading-tight text-gray-800 mt-4 mb-4">
                    On ajoute une photo ?
                </h1>
            }
        >
            <Head title="Partager une photo" />

            <div className="flex flex-col items-center">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Choix entre importer ou prendre une photo */}
                    <ChooseCard title="📁 Importer une photo" link="#import" />
                    <ChooseCard title="📷 Prendre une photo" link="#capture" />
                </div>

                {/* Section pour importer une photo */}
                <div className="mt-6">
                    <label htmlFor="media-upload" className="block text-sm font-medium text-gray-700">
                        Choisissez une photo
                    </label>
                    <input
                        type="file"
                        id="media-upload"
                        accept="image/*"
                        onChange={handleMediaChange}
                        className="mt-2"
                    />
                </div>

                {/* Affichage de la miniature si une photo est sélectionnée */}
                {mediaPreview && (
                    <div className="mt-4">
                        <img src={mediaPreview} alt="Prévisualisation" className="w-32 h-32 object-cover rounded-md" />
                    </div>
                )}

                {/* Boutons pour soumettre ou skipper */}
                <div className="mt-8 flex space-x-4">
                    <button
                        onClick={handleSubmit}
                        className="px-4 py-2 bg-blue-500 text-white rounded-lg"
                    >
                        Continuer
                    </button>
                    <Link href="/create/save" className="px-4 py-2 bg-gray-500 text-white rounded-lg">
                        Skipper
                    </Link>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import ChooseMedia from '@/Components/ChooseMedia';
import { useRef, useState } from 'react';

export default function AddMedia({ mood_id }) {
    const { data, setData, post } = useForm({
        media: null,  // Pour stocker l'image uploadée
    });

    const [mediaPreview, setMediaPreview] = useState(null);
    const fileInputRef = useRef(null); // Référence à l'input file

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

    // Simuler le clic sur l'input file quand on clique sur la carte
    const handleImportClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click(); // Ouvre le sélecteur de fichiers
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post('/posts/submit-media'); // Route vers l'étape suivante
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
                    <ChooseMedia title="📁 Importer une photo" onClick={handleImportClick} />
                    <ChooseMedia title="📷 Prendre une photo" link="#capture" />
                </div>

                {/* Input file pour importer la photo */}
                <input
                    type="file"
                    ref={fileInputRef}
                    style={{ display: 'none' }}  // Cache l'input file
                    accept="image/*"
                    onChange={handleMediaChange}
                />

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
                    <Link href="/posts/review" className="px-4 py-2 bg-gray-500 text-white rounded-lg">
                        Skipper
                    </Link>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

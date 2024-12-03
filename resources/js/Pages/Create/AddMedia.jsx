import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import ChooseMedia from '@/Components/ChooseMedia';
import ImagePreview from '@/Components/ImagePreview';
import PrimaryButton from '@/Components/PrimaryButton';
import BackButton from '@/Components/BackButton';
import { Inertia } from '@inertiajs/inertia';
import { useRef, useState, useEffect } from 'react';

export default function AddMedia({ mood_id }) {
    const { data, setData, post, processing } = useForm({
        media: null,  // Pour stocker l'image uploadée
    });

    const [mediaPreview, setMediaPreview] = useState(null);
    const fileInputRef = useRef(null); // Référence à l'input file

    // Utilisation de useEffect pour charger l'image depuis le local storage
    useEffect(() => {
        const savedMedia = localStorage.getItem('media');
        if (savedMedia) {
            setMediaPreview(savedMedia);
        }
    }, []);

    // Gérer l'upload de la photo
    const handleMediaChange = (e) => {
        const file = e.target.files[0];
        setData('media', file);

        // Créer un aperçu de l'image
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const imageUrl = reader.result;
                setMediaPreview(imageUrl);
                localStorage.setItem('media', imageUrl); // Stocker l'image dans le local storage
            };
            reader.readAsDataURL(file);
        }
    };

    const handleImportClick = () => fileInputRef.current && fileInputRef.current.click();
    const handleTakePhotoClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.setAttribute('capture', 'environment');
            fileInputRef.current.click();
        }
    };

    // Supprimer l'image sélectionnée
    const handleRemoveMedia = () => {
        setData('media', null);
        setMediaPreview(null); // Réinitialise l'aperçu de l'image
        fileInputRef.current.value = ''; // Réinitialise l'input file
        localStorage.removeItem('media'); // Supprimer l'image du local storage
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('create.submit-media'), {
            onSuccess: () => {
                Inertia.visit('/create/recap'); // Utilise directement la route nommée pour la redirection
            },
        });
    };


    return (
        <AuthenticatedLayout
            header={
                <div>
                    <BackButton />
                    <h1 className="text-xl text-center font-semibold leading-tight text-gray-800 mt-4 mb-4">
                    On ajoute une photo ?
                    </h1>
                </div>
            }
        >
            <Head title="Partager une photo" />

            <div className="flex flex-col items-center">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Choix entre importer ou prendre une photo */}
                    <ChooseMedia title="📁 Importer une photo" onClick={handleImportClick} />
                    <ChooseMedia title="📷 Prendre une photo" onClick={handleTakePhotoClick} />
                </div>

                {/* Input file pour importer ou prendre la photo */}
                <input
                    type="file"
                    ref={fileInputRef}
                    style={{ display: 'none' }}  // Cache l'input file
                    accept="image/*"
                    onChange={handleMediaChange}
                />

                {/* Affichage de la miniature si une photo est sélectionnée */}
                {mediaPreview && (
                    <ImagePreview
                        src={mediaPreview}
                        onRemove={handleRemoveMedia}
                    />
                )}

                {/* Boutons pour soumettre ou skipper */}
                <div className="mt-8 flex space-x-4">
                    <PrimaryButton
                        onClick={handleSubmit}
                        className={`px-4 py-2 bg-blue-500 text-white rounded-lg ${processing ? 'opacity-50 cursor-not-allowed' : ''}`}
                        disabled={processing} // Désactiver le bouton si traitement en cours
                    >
                        Continuer
                    </PrimaryButton>
                    {/* <Link href="/posts/review" className="px-4 py-2 bg-gray-500 text-white rounded-lg">
                        Suivant
                    </Link> */}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import ChooseMedia from '@/Components/ChooseMedia';
import ImagePreview from '@/Components/ImagePreview';
import PrimaryButton from '@/Components/PrimaryButton';
import { useRef, useState, useEffect } from 'react';
import axios from 'axios';

export default function EditMedia({ post }) {
    const { data, setData, processing } = useForm({
        media: null,  // Pour stocker l'image uploadée
    });

    const [mediaPreview, setMediaPreview] = useState(null);
    const fileInputRef = useRef(null); // Référence à l'input file

    // Utilisation de useEffect pour charger l'image existante si elle est présente
    useEffect(() => {
        if (post.media_url) {
            setMediaPreview(post.media_url);
        }
    }, [post]);

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
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('media', fileInputRef.current.files[0]);

        try {
            const response = await axios.post(`/post/${post.id}/edit/media`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log('Réponse du serveur :', response.data);
            // Redirection après la mise à jour
        window.location.href = response.data.redirect;
        } catch (error) {
            console.error('Erreur lors de l\'envoi:', error.response.data);
        }
    };



    return (
        <AuthenticatedLayout
            header={
                <h1 className="text-xl text-center font-semibold leading-tight text-gray-800 mt-4 mb-4">
                    Modifier la photo
                </h1>
            }
        >
            <Head title="Modifier la photo" />

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
                        Enregistrer
                    </PrimaryButton>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

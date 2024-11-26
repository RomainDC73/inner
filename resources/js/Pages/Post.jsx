import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage } from '@inertiajs/react';
import { useState } from 'react';
import Modal from '@/Components/Modal';
import { Inertia } from '@inertiajs/inertia';
import MoodBadge from '@/Components/MoodBadge';
import CustomPlayer from '@/Components/Player';
import DangerButton from '@/Components/DangerButton';
import PrimaryButton from '@/Components/PrimaryButton';
import { MdEdit } from 'react-icons/md';

export default function PostShow() {
    // Récupère les données du post passées par Inertia depuis le contrôleur
    const { post, moodTranslations } = usePage().props;

    const formattedDate = new Date(post.created_at).toLocaleDateString('fr-FR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    }) + ' à ' + new Date(post.created_at).toLocaleTimeString('fr-FR', {
        hour: '2-digit',
        minute: '2-digit',
    }).replace(':', 'h');

    const postTitle = 'Votre humeur du ' + formattedDate + '';

    const [showModal, setShowModal] = useState(false);
    const [editMode, setEditMode] = useState(false);

    const handleDelete = () => {
        Inertia.delete(route('posts.destroy', post.id), {
            onSuccess: () => {
                setShowModal(false); // Ferme la modal après suppression
                alert('Post supprimé avec succès!');
            },
        });
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    {postTitle}
                </h2>
            }
        >
            <Head title={postTitle} />

            <div>
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 space-y-3">
                            {/* Humeur */}
                            <div className="flex items-center space-x-2">
                                <h3 className="text-lg font-bold">Humeur </h3>
                                <MoodBadge mood={post.mood.name} />
                                {/* Affiche l'icône MdEdit si le mode édition est activé */}
                                {editMode && (
                                    <MdEdit
                                        className="text-gray-500 cursor-pointer"
                                        onClick={() => Inertia.get(`/post/${post.id}/edit/mood`)} // Action de modification de l'humeur
                                    />
                                )}
                            </div>

                            {/* Date */}
                            <p className="text-sm text-gray-500">Publié le {formattedDate}</p>

                            {/* Description */}
                            <p>
                            {post.description ? (
                                post.description.split('\n').map((paragraph, index) => (
                                    <span key={index}>
                                        {paragraph}
                                        <br />
                                    </span>
                                ))
                            ) : (
                                <span className="italic text-gray-500">Aucune description écrite</span>
                            )}
                            </p>

                            {/* Affiche l'icône MdEdit si le mode édition est activé */}
                            {editMode && (
                            <MdEdit
                                className="text-gray-500 cursor-pointer"
                                onClick={() => Inertia.get(`/post/${post.id}/edit/description`)} // Action de modification de la description
                            />
                        )}

                            {/* Image */}
                            {post.media_path && (
                                <div className="relative">
                                    <img
                                        className="w-1/2 mx-auto mt-4 rounded-lg"
                                        src={post.media_path.startsWith('http') ? post.media_path : `/storage/${post.media_path}`}
                                        alt="Media"
                                    />
                                    {/* Affiche l'icône MdEdit si le mode édition est activé */}
                                    {editMode && (
                                        <MdEdit
                                            className="absolute top-2 right-2 text-gray-500 cursor-pointer"
                                            onClick={() => Inertia.get(`/post/${post.id}/edit/media`)} // Action de modification du média
                                        />
                                    )}
                                </div>
                            )}

                            {/* Audio */}
                            {post.audio_path ? (
                                <CustomPlayer
                                    src={post.audio_path.startsWith('http') ? post.audio_path : `/storage/${post.audio_path}`}
                                />
                            ) : null}
                        </div>

                        {/* Boutons */}
                        <div className="flex justify-between p-6">
                            <PrimaryButton onClick={() => setEditMode(!editMode)}>
                                {editMode ? 'Terminer' : 'Modifier'} {/* Change le texte du bouton en fonction du mode */}
                            </PrimaryButton>
                            <DangerButton
                                onClick={() => setShowModal(true)} // Ouvre le modal au clic
                            >
                                Supprimer
                            </DangerButton>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal de confirmation */}
            <Modal show={showModal} onClose={() => setShowModal(false)}>
                <div className="p-6">
                    <h2 className="text-lg font-semibold">Confirmation de suppression</h2>
                    <p className="mt-4">Êtes-vous sûr de vouloir supprimer ce post ? Cette action est irréversible.</p>

                    <div className="mt-6 flex justify-end space-x-3">
                        <PrimaryButton onClick={() => setShowModal(false)}>
                            Annuler
                        </PrimaryButton>
                        <DangerButton onClick={handleDelete}>
                            Supprimer
                        </DangerButton>
                    </div>
                </div>
            </Modal>
        </AuthenticatedLayout>
    );
}

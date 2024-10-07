import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage } from '@inertiajs/react';
import MoodBadge from '@/Components/MoodBadge';

export default function PostShow() {
    // Récupère les données du post passées par Inertia depuis le contrôleur
    const { post, moodTranslations } = usePage().props;

    const formattedDate = new Date(post.created_at).toLocaleDateString('fr-FR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
    });

    const postTitle = 'Votre humeur du ' + formattedDate + '';

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    {postTitle}
                </h2>
            }
        >
            <Head title={postTitle} />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 space-y-3"> {/* Ajoute un espacement vertical */}
                            {/* Humeur */}
                            <h3 className="text-lg font-bold">Humeur : {moodTranslations[post.mood.name] || post.mood.name}</h3>
                            <MoodBadge mood={post.mood.name} />

                            {/* Date */}
                            <p className="text-sm text-gray-500">Posté le {formattedDate}</p>

                            {/* Description */}
                            <p>{post.description.split('\n').map((paragraph, index) => (
                                <span key={index}>
                                    {paragraph}
                                     <br />
                                 </span>
                                ))}</p>

                            {/* Image */}
                            {post.media_path && (
                                <img
                                    className="mt-4 rounded-lg" // Marge supérieure et coins arrondis pour l'image
                                    src={post.media_path.startsWith('http') ? post.media_path : `/storage/${post.media_path}`}
                                    alt="Media"
                                />
                            )}

                            {/* Audio */}
                            {post.audio_path && (
                                <audio className="mt-4" controls>
                                    <source src={`/storage/audio_tests/audio_test_01.mp3`} type="audio/mpeg" />
                                    Your browser does not support the audio element.
                                </audio>
                            )}
                        </div>
                    </div>
                </div>
            </div>

        </AuthenticatedLayout>
    );
}

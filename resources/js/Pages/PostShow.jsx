import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage } from '@inertiajs/react';

export default function PostShow() {
    // Récupère les données du post passées par Inertia depuis le contrôleur
    const { post } = usePage().props;

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Détail du Post
                </h2>
            }
        >
            <Head title={`Post ${post.id}`} />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <h3 className="text-lg font-bold">Humeur: {post.mood.translated_name}</h3>
                            <p>{post.description}</p>

                            {/* Affichage des médias si présents */}
                            {post.media_path && <img src={`/storage/${post.media_path}`} alt="Media" />}
                            {post.audio_path && <audio controls src={`/storage/${post.audio_path}`}></audio>}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

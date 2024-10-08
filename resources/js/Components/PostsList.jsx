import React, { useEffect, useState } from 'react';
import MoodBadge from '@/Components/MoodBadge';
import { Link } from '@inertiajs/react';

const PostsList = ({ posts = [] }) => {  // Ajoute une valeur par défaut pour 'posts'

    const formattedDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('fr-FR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
        });
    };

    const getExcerpt = (description, length = 100) => {
        return description.length > length
            ? description.substring(0, length) + '...'
            : description;
    };

    return (
        <div>
            <h1 className='mb-4'>Mes Posts</h1>
            <ul>
                {posts.length > 0 ? (
                    posts.map(post => (
                        <li className="mb-4" key={post.id}>
                            <div className="flex items-center mb-2 space-x-2">
                                <MoodBadge mood={post.mood.name} />
                                <p className="text-sm text-gray-500">{formattedDate(post.created_at)}</p>
                            </div>
                            <p className="mb-2">{getExcerpt(post.description)}</p> {/* Affiche la description */}
                           {/* Lien vers la page de détail du post */}
                           <Link href={`/post/${post.id}`} className="text-blue-500 underline">
                                Voir plus
                            </Link>
                        </li>
                    ))
                ) : (
                    <p>Vous n'avez publié aucun post.</p>  // Message quand il n'y a pas de posts
                )}
            </ul>
        </div>
    );
};

export default PostsList;

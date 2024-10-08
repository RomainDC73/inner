import React, { useEffect, useState } from 'react';
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
    return (
        <div>
            <h1>Mes Posts</h1>
            <ul>
                {posts.length > 0 ? (
                    posts.map(post => (
                        <li key={post.id}>
                            <h3>{post.mood.translated_name}</h3> {/* Affiche le nom de l'humeur */}
                            <p className="text-sm text-gray-500">{formattedDate(post.created_at)}</p>
                            <p>{post.description}</p> {/* Affiche la description */}
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

import React, { useEffect, useState } from 'react';
import { Link } from '@inertiajs/react';
import { usePage } from '@inertiajs/react';

const PostsList = ({ posts = [] }) => {  // Ajoute une valeur par défaut pour 'posts'
    return (
        <div>
            <h1>Mes Posts</h1>
            <ul>
                {posts.length > 0 ? (
                    posts.map(post => (
                        <li key={post.id}>
                            <h3>{post.mood.translated_name}</h3> {/* Affiche le nom de l'humeur */}
                            <p>{post.description}</p> {/* Affiche la description */}
                           {/* Lien vers la page de détail du post */}
                           <Link href={`/post/${post.id}`} className="text-blue-500 underline">
                                Voir plus
                            </Link>
                        </li>
                    ))
                ) : (
                    <p>Aucun post trouvé.</p>  // Message quand il n'y a pas de posts
                )}
            </ul>
        </div>
    );
};

export default PostsList;

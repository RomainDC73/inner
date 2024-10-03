import React from 'react';
import { usePage } from '@inertiajs/react';

const PostsList = () => {
    // On récupère les posts depuis les props passées par Inertia
    const { posts } = usePage().props;

    return (
        <div>
            <h1>Mes Moods</h1>
            {posts.length === 0 ? (
                <p>Aucun post trouvé.</p> // Si l'utilisateur n'a pas de posts
            ) : (
                <ul>
                    {posts.map(post => (
                        <li key={post.id}>
                            <h3>Mood: {post.mood.translated_name}</h3> {/* Affiche le nom de l'humeur */}
                            <p>Description: {post.description}</p> {/* Affiche la description du post */}
                            {post.media_path && <img src={`/storage/${post.media_path}`} alt="Media" />} {/* Affiche l'image si elle existe */}
                            {post.audio_path && <audio controls src={`/storage/${post.audio_path}`}></audio>} {/* Affiche le fichier audio s'il existe */}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default PostsList;

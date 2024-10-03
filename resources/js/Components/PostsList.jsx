import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PostsList = () => {
    const [posts, setPosts] = useState([]); // Stock posts
    const [isLoading, setIsLoading] = useState(true); // Handle loading state
    const [error, setError] = useState(null); // Handle error state

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await axios.get('/api/posts', {
                    headers: {
                        Authorization: `Bearer ${window.Laravel.csrfToken}`,
                    },
                });
                setPosts(response.data);
            } catch (error) {
                setError(error);
                console.error(error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchPosts(); // Call the function to fetch posts
    }, []);
    if (isLoading) {
        return <p>Chargement des humeurs...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

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

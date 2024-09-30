import React, { useEffect, useState } from 'react';
import axios from 'axios';

const PostsList = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        // Récupérer les posts lors du chargement du composant
        const fetchPosts = async () => {
            const response = await axios.get('/api/posts', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`, // Assurez-vous que vous passez le token d'authentification
                },
            });
            setPosts(response.data);
        };

        fetchPosts();
    }, []);

    return (
        <div>
            <h1>Mes Posts</h1>
            <ul>
                {posts.map(post => (
                    <li key={post.id}>
                        <h3>{post.mood.translated_name}</h3> {/* Affiche le nom de l'humeur */}
                        <p>{post.description}</p> {/* Affiche la description */}
                        {post.media_path && <img src={`storage/${post.media_path}`} alt="Media" />} {/* Affiche l'image si elle existe */}
                        {post.audio_path && <audio controls src={`storage/${post.audio_path}`}></audio>} {/* Affiche le fichier audio si disponible */}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default PostsList;

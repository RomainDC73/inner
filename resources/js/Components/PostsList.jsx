import PostCard from './PostCard';

const PostsList = ({ posts = [] }) => {  // Ajoute une valeur par défaut pour 'posts'
    return (
        <div className="bg-grey">
        <h1 className="mb-6">Mes derniers posts</h1>
        <ul>
            {posts.length > 0 ? (
                posts.map(post => (
                    // Utiliser PostCard pour chaque post
                    <PostCard key={post.id} post={post} />
                ))
            ) : (
                <p>Aucun post trouvé. N'hésitez pas à publier votre humeur !</p>  // Message quand il n'y a pas de posts
            )}
        </ul>
    </div>
    );
};
export default PostsList;

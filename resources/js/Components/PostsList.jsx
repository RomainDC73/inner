import PostCard from './PostCard';

const PostsList = ({ posts = [] }) => {
    return (
        <div>
        {posts.length > 0 && <h1 className="mb-6">Mes derniers posts</h1>}
        <ul>
            {posts.length > 0 ? (
                posts.map(post => (
                    <PostCard key={post.id} post={post} />
                ))
            ) : (
                <p className="mb-6 text-center">Tes derniers posts apparaîtront juste dessous. ⬇️
                <br></br>
                Mais pour l'instant c'est calme par ici... 😴
                <br></br>
                <b>Et si on publiait une première humeur ?</b> 🤗</p>
            )}
        </ul>
    </div>
    );
};
export default PostsList;

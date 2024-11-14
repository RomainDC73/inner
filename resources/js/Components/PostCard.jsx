import {Link} from '@inertiajs/react';
import MoodBadge from './MoodBadge';

const moodColors = {
    good: 'bg-gradient-to-br from-white from-30% to-innergreenfade',
    meh: 'bg-gradient-to-br from-white from-30% to-innerpurplefade',
    bad: 'bg-gradient-to-br from-white from-30% to-innerredfade',
};

const PostCard = ({ post }) => {
    // Formater la date
    const formattedDate = new Date(post.created_at).toLocaleDateString('fr-FR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    }) + ' à ' + new Date(post.created_at).toLocaleTimeString('fr-FR', {
        hour: '2-digit',
        minute: '2-digit',
    }).replace(':', 'h');

    // Extrait de description
    const getExcerpt = (text, length = 40) => {
        return text.length > length ? text.substring(0, length) + '...' : text;
    };

    return (
        <li className="mb-4">
            <Link href={`/posts/${post.id}`}>
                {/* Appliquer les couleurs dynamiques basées sur le mood */}
                <div className={`${moodColors[post.mood.name] || 'bg-gradient-to-br from-white to-gray-200'} rounded-lg p-4 shadow-md`}>
                    <div className="flex items-center mb-2 space-x-2">
                        {/* Afficher le badge d'humeur */}
                        <MoodBadge mood={post.mood.name} />
                        <p className="text-sm text-gray-500">{formattedDate}</p>
                    </div>
                    {/* Afficher un extrait de la description */}
                    <p className="mb-2">{getExcerpt(post.description)}</p>
                </div>
            </Link>
        </li>
    );
};

export default PostCard;


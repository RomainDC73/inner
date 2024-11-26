import {Link} from '@inertiajs/react';
import MoodBadge from './MoodBadge';
import { GiSoundWaves } from "react-icons/gi";

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
                    {/* Afficher un extrait de la description uniquement si elle existe */}
                    <div className="flex items-center mb-2 space-x-2">
                    {post.description ? (
                        <p className="text-gray-700">{getExcerpt(post.description)}</p>
                    ) : null}
                    {/* Afficher une icône s'il y a un fichier audio */}
                    {post.audio_path ? (
                            <GiSoundWaves size={24} className="text-gray-700" />
                    ) : null}
                    </div>
                </div>
            </Link>
        </li>
    );
};

export default PostCard;


import {Link} from '@inertiajs/react';
import MoodBadge from './MoodBadge';
import { GiSoundWaves } from "react-icons/gi";
import { CiImageOn } from "react-icons/ci";

const moodColors = {
    good: 'bg-gradient-to-br from-white from-30% to-innergreenfade',
    meh: 'bg-gradient-to-br from-white from-30% to-innerpurplefade',
    bad: 'bg-gradient-to-br from-white from-30% to-innerredfade',
};

const PostCard = ({ post }) => {
    const formattedDate = new Date(post.created_at).toLocaleDateString('fr-FR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    }) + ' à ' + new Date(post.created_at).toLocaleTimeString('fr-FR', {
        hour: '2-digit',
        minute: '2-digit',
    }).replace(':', 'h');

    const getExcerpt = (text, length = 40) => {
        return text.length > length ? text.substring(0, length) + '...' : text;
    };

    return (
        <li className="mb-4">
            <Link href={`/posts/${post.id}`}>
                <div className={`${moodColors[post.mood.name] || 'bg-gradient-to-br from-white to-gray-200'} rounded-lg p-4 shadow-md`}>
                    <div className="flex items-center mb-2 space-x-2">
                        <MoodBadge mood={post.mood.name} />
                        <p className="text-sm text-gray-500">{formattedDate}</p>
                    </div>
                    <div className="flex items-center mb-2 space-x-2">
                    {post.description ? (
                        <p className="text-gray-700">{getExcerpt(post.description)}</p>
                    ) : null}
                    {post.audio_path ? (
                            <GiSoundWaves size={24} className="text-gray-700" />
                    ) : null}
                    {post.media_path ? (
                            <CiImageOn size={24} className="text-gray-700" />
                    ) : null}
                    </div>
                </div>
            </Link>
        </li>
    );
};

export default PostCard;


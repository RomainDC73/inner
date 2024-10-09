import { Link } from '@inertiajs/react';
import MoodBadge from './MoodBadge';

const moodColors = {
    good: 'bg-gradient-to-br from-white from-30% to-innergreenfade',
    meh: 'bg-gradient-to-br from-white from-30% to-innerpurplefade',
    bad: 'bg-gradient-to-br from-white from-30% to-innerredfade',
};

const MoodCard = ({ mood, translations }) => {
    // Utilise les traductions passées via props
    const moodName = translations[mood.name] || mood.name; // Si pas de traduction, afficher le nom par défaut.

    return (
        <Link href={`/mood/${mood.id}`}>
            <div className={`${moodColors[mood.name] || 'bg-gradient-to-br from-white to-gray-200'} rounded-lg p-4 shadow-md`}>
                <div className="flex items-center mb-2 space-x-2">
                    <MoodBadge mood={mood.name} />
                    <p className="text-sm text-gray-500">{moodName}</p>
                </div>
            </div>
        </Link>
    );
};

export default MoodCard;

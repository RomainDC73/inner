import { Link } from '@inertiajs/react';
import MoodBadge from './MoodBadge';

const moodColors = {
    good: 'bg-gradient-to-br from-white from-30% to-innergreenfade',
    meh: 'bg-gradient-to-br from-white from-30% to-innerpurplefade',
    bad: 'bg-gradient-to-br from-white from-30% to-innerredfade',
};

const MoodCard = ({ mood, moodTranslations }) => {
    // Utilise les traductions passées via props
    const moodName = moodTranslations[mood.name] || mood.name; // Si pas de traduction, afficher le nom par défaut.

    return (
        <div className="max-w-xs w-full mx-auto mb-4"> {/* Limite la largeur du badge et ajoute un espacement entre chaque badge */}
            <Link href={`/mood/${mood.id}`}>
                <div className={`${moodColors[mood.name] || 'bg-gradient-to-br from-white to-gray-200'} rounded-lg p-6 shadow-md flex flex-col items-center justify-center space-y-2`}>
                    {/* Centre le contenu verticalement avec flex-col */}
                    <MoodBadge mood={mood.name} />
                    <p className="text-sm text-gray-500">{moodName}</p>
                </div>
            </Link>
        </div>
    );
};

export default MoodCard;

import MoodBadge from './MoodBadge';

const moodColors = {
    good: 'bg-gradient-to-br from-white from-30% to-innergreenfade',
    meh: 'bg-gradient-to-br from-white from-30% to-innerpurplefade',
    bad: 'bg-gradient-to-br from-white from-30% to-innerredfade',
};

const MoodCard = ({ mood, moodTranslations }) => {
    const moodName = moodTranslations[mood.name] || mood.name;

    return (
        <div
            >
            <div className={`${moodColors[mood.name] || 'bg-gradient-to-br from-white to-gray-200'} rounded-lg p-6 shadow-md flex flex-col items-center justify-center space-y-2`}>
                <MoodBadge mood={mood.name} />
                <p className="text-sm text-gray-700">{moodName}</p>
            </div>
        </div>
    );
};

export default MoodCard;

import React from 'react';

const MoodBadge = ({ mood }) => {
    const moodColors = {
        good: 'bg-innergreen',
        meh: 'bg-innerpurple',
        bad: 'bg-innerred',
    };

    const moodColorClass = moodColors[mood] || 'bg-gray-300';

    return (
        <div className={`w-6 h-6 rounded-full ${moodColorClass}`}>
        </div>
    );
}

export default MoodBadge;

import { useState, useEffect } from 'react';
import MoodBadge from './MoodBadge';

const MoodBadgeCycler = () => {
    const moods = ['good', 'meh', 'bad'];
    const [currentMoodIndex, setCurrentMoodIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentMoodIndex((prevIndex) => (prevIndex + 1) % moods.length);
        }, 1500);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="flex justify-center items-center h-screen">
            <MoodBadge mood={moods[currentMoodIndex]} />
        </div>
    );
};

export default MoodBadgeCycler;

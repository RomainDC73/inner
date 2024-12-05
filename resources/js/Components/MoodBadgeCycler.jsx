import { useState, useEffect } from 'react';
import MoodBadge from './MoodBadge'; // Assurez-vous que le chemin est correct

const MoodBadgeCycler = () => {
    const moods = ['good', 'meh', 'bad'];
    const [currentMoodIndex, setCurrentMoodIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentMoodIndex((prevIndex) => (prevIndex + 1) % moods.length);
        }, 1500); // Change toutes les 2 secondes

        return () => clearInterval(interval); // Nettoyage lorsque le composant est démonté
    }, []);

    return (
        <div className="flex justify-center items-center h-screen">
            <MoodBadge mood={moods[currentMoodIndex]} />
        </div>
    );
};

export default MoodBadgeCycler;

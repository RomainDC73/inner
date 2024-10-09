import { Link, useForm } from '@inertiajs/inertia-react';

export default function ChooseMood({ moods }) {
    const { data, setData, post } = useForm({
        mood_id: '',
    });

    const
 handleMoodSelect = (id) => {
    setData('mood_id', id);
};

const submitMood = (e) => {
    e.preventDefault();
    post('/create/choose-action');
};

return (
    <div>
            <h1>Choose your mood</h1>
            <form onSubmit={submitMood}>
                <div className="moods">
                    {moods.map(mood => (
                        <div key={mood.id}>
                            <input
                                type="radio"
                                id={`mood-${mood.id}`}
                                name="mood"
                                value={mood.id}
                                onChange={() => handleMoodSelect(mood.id)}
                            />
                            <label htmlFor={`mood-${mood.id}`}>{mood.name}</label>
                        </div>
                    ))}
                </div>
                <button type="submit" disabled={!data.mood_id}>Next</button>
            </form>
        </div>
);
}


import { useForm } from '@inertiajs/react';

export default function ChooseAction({ mood_id }) {
    const { data, setData, post } = useForm({
        mood_id: mood_id,
        action: ''  // écriture ou audio
    });

    const submitAction = (e) => {
        e.preventDefault();
        post('/posts/add-media'); // Passer à l'étape suivante (ajout d'une image)
    };

    return (
        <div>
            <h1>What would you like to do?</h1>
            <form onSubmit={submitAction}>
                <div>
                    <button type="button" onClick={() => setData('action', 'write')}>
                        Write a Post
                    </button>
                    <button type="button" onClick={() => setData('action', 'audio')}>
                        Record a Voice Message
                    </button>
                </div>
                <button type="submit" disabled={!data.action}>Next</button>
            </form>
        </div>
    );
}

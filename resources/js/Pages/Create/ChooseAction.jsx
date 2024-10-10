import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';

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
        <AuthenticatedLayout
            header={
                <h1 className="text-xl text-center font-semibold leading-tight text-gray-800">
                    Et si tu en disais un peu plus ?
                </h1>
            }
        >
        <Head title="Écrire ou parler ?" />
        <div>
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
        </AuthenticatedLayout>
    );
}

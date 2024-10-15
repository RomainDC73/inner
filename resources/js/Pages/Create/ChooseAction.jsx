import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import ChooseCard from '@/Components/ChooseCard';

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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <ChooseCard
                title="Écrire un message"
                link="/create/write"
            />
            <ChooseCard
                title="Enregistrer un audio"
                link="/create/record"
            />
            </div>
        </div>
        </AuthenticatedLayout>
    );
}

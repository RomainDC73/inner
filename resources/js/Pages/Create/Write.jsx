import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import LongTextInput from '@/Components/LongTextInput';
import PrimaryButton from '@/Components/PrimaryButton';
import { useEffect } from 'react';

export default function Write({ mood_id, initial_description }) {
    const { data, setData, post } = useForm({
        mood_id: mood_id,
        description: initial_description || '' // Le texte écrit par l'utilisateur
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post('/create/write'); // Soumettre le texte au serveur
    };

    return (
        <AuthenticatedLayout
            header={
                <h1 className="text-xl text-center font-semibold leading-tight text-gray-800 mt-4 mb-4">
                    C'est parti pour écrire un peu...
                </h1>
            }
        >
            <Head title="Écrire" />
            <form onSubmit={handleSubmit} className="flex flex-col items-center">
                <LongTextInput
                    value={data.description}
                    onChange={(e) => setData('description', e.target.value)} // Met à jour le texte
                />
                <PrimaryButton
                    type="submit"
                    className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-lg"
                    disabled={!data.description} // Désactiver le bouton si le champ est vide
                >
                    Enregistrer
                </PrimaryButton>
            </form>
        </AuthenticatedLayout>
    );
}

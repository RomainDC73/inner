import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import LongTextInput from '@/Components/LongTextInput';
import PrimaryButton from '@/Components/PrimaryButton';
import { useEffect } from 'react';

export default function Write({ mood_id, initial_description }) {
    // Récupérer la description depuis le localStorage si elle existe
    const savedDescription = localStorage.getItem('description') || initial_description;

    // Initialiser le formulaire avec useForm
    const { data, setData, post } = useForm({
        mood_id: mood_id,
        description: savedDescription || '', // Pré-remplir avec la description en session ou localStorage
    });

    // Chaque fois que la description change, la sauvegarder dans le localStorage
    useEffect(() => {
        localStorage.setItem('description', data.description);
    }, [data.description]);

    // Soumettre le formulaire au backend lorsque l'utilisateur clique sur "Enregistrer"
    const handleSubmit = (e) => {
        e.preventDefault();
        post('/create/write', {
            onSuccess: () => {
                // Si la soumission réussit, on nettoie le localStorage
                //localStorage.removeItem('description');
            },
        });
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
                {/* LongTextInput pour écrire la description */}
                <LongTextInput
                    value={data.description}
                    onChange={(e) => setData('description', e.target.value)} // Met à jour la description localement
                />
                {/* Bouton pour soumettre */}
                <PrimaryButton
                    type="submit"
                    className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-lg"
                    disabled={!data.description} // Désactiver si le champ est vide
                >
                    Enregistrer
                </PrimaryButton>
            </form>
        </AuthenticatedLayout>
    );
}

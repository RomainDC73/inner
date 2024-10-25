import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import LongTextInput from '@/Components/LongTextInput';
import PrimaryButton from '@/Components/PrimaryButton';
import { useEffect } from 'react';


export default function Write({ mood_id, initial_description }) {
    useEffect(() => {
        // Nettoie le localStorage au montage pour éviter la récupération d'une ancienne description
        localStorage.removeItem('description');
    }, []);
    // Initialisez la description à partir du localStorage ou de la prop initial_description
    const savedDescription = localStorage.getItem('description') || '';

    // Initialisez le formulaire avec useForm
    const { data, setData, post } = useForm({
        mood_id: mood_id,
        description: savedDescription, // Remplit initialement la description depuis le localStorage si elle existe
    });

    // Soumet le formulaire et sauvegarde la description dans le localStorage
    const handleSubmit = (e) => {
        e.preventDefault();
        post('/create/write', {
            onSuccess: () => {
                // Sauvegarde la description dans le localStorage
                localStorage.setItem('description', data.description);
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

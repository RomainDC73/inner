import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import ChooseCard from '@/Components/ChooseCard';
import LongTextInput from '@/Components/LongTextInput'; // Import du composant

import { useState } from 'react'; // Import de useState

export default function ChooseAction({ mood_id }) {
    const { data, setData, post } = useForm({
        mood_id: mood_id,
        action: ''  // écriture ou audio
    });

    const [isWriting, setIsWriting] = useState(false); // État pour suivre si on a cliqué sur "Écrire"

    // Fonction appelée lorsqu'on clique sur "Écrire"
    const handleWriteClick = () => {
        setData('action', 'write'); // Définit l'action comme "écrire"
        setIsWriting(true); // Affiche le champ texte
    };

    // Fonction appelée lorsqu'on clique sur "Parler"
    const handleRecordClick = () => {
        setData('action', 'record'); // Définit l'action comme "parler"
        post('/create/choose-action'); // Effectue la requête POST avec l'action "parler"
    };

    // Envoi du formulaire lors de la soumission de l'écriture
    const submitAction = (e) => {
        e.preventDefault();
        post('/create/choose-action'); // Envoie la requête POST avec l'action "écrire" ou "parler"
    };

    return (
        <AuthenticatedLayout
            header={
                <h1 className="text-xl text-center font-semibold leading-tight text-gray-800 mt-4 mb-4">
                    Et si tu en disais un peu plus ?
                </h1>
            }
        >
            <Head title="Écrire ou parler ?" />
            <div className="flex flex-col items-center">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div onClick={handleWriteClick}>
                        <ChooseCard
                            title="🖋 Écrire"
                            link="#"
                        />
                    </div>
                    <div onClick={handleRecordClick}>
                        <ChooseCard
                            title="🎤 Parler"
                            link="#"
                        />
                    </div>
                </div>

                {/* Si l'utilisateur a choisi "Écrire", afficher le champ texte */}
                {isWriting && (
                    <form onSubmit={submitAction} className="mt-6 w-full max-w-lg">
                        <LongTextInput
                            className="w-full p-4 border rounded-lg shadow-sm"
                            placeholder="Rédige ton message ici..."
                            rows="5"
                            value={data.description}
                            onChange={e => setData('description', e.target.value)}
                        />
                        <button
                            type="submit"
                            className="mt-4 px-6 py-2 bg-indigo-600 text-white rounded-lg"
                        >
                            Soumettre
                        </button>
                    </form>
                )}
            </div>
        </AuthenticatedLayout>
    );
}

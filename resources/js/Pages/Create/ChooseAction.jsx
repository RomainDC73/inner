import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import ChooseCard from '@/Components/ChooseCard';
import { useState } from 'react';

export default function ChooseAction({ mood_id }) {
    const { data, setData, post } = useForm({
        mood_id: mood_id,
        action: '',  // écriture ou audio
        description: ''
    });

    // État pour gérer l'affichage du champ de texte
    const [isWriting, setIsWriting] = useState(false);

    const handleWriteClick = () => {
        setData('action', 'write');
            setIsWriting(true); // Affiche le champ de texte
        };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (data.action === 'write') {
            post('/create/write');
        }
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
                    <div onClick={handleWriteClick}> {/* Gestion du clic pour écrire */}
                        <ChooseCard
                            title="🖋 Écrire"
                            link="#"
                        />
                    </div>
                    <div onClick={handleRecordClick}> {/* Gestion du clic pour parler */}
                        <ChooseCard
                            title="🎤 Parler"
                            link="#"
                        />
                    </div>
                </div>

                {/* Afficher le champ texte uniquement si "Écrire" est sélectionné */}
                {isWriting && (
                    <form onSubmit={handleSubmit} className="mt-6 w-full max-w-lg">
                        <textarea
                            className="w-full p-4 border rounded-lg shadow-sm"
                            placeholder="Rédige ton message ici..."
                            rows="5"
                            value={data.description}
                            onChange={e => setData('description', e.target.value)} // Mettre à jour la description
                        ></textarea>
                        <button
                            type="submit"
                            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md"
                            disabled={!data.description} // Désactiver le bouton si la description est vide
                        >
                            Continuer
                        </button>
                    </form>
                )}
            </div>
        </AuthenticatedLayout>
    );
}

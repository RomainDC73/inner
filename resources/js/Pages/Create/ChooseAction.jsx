import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import ChooseCard from '@/Components/ChooseCard';
import LongTextInput from '@/Components/LongTextInput';
import { useState } from 'react';

export default function ChooseAction({ mood_id }) {
    const { data, setData, post } = useForm({
        mood_id: mood_id,
        action: ''  // écriture ou audio
    });

    const [isWriting, setIsWriting] = useState(false);

    // Fonction appelée lorsqu'on clique sur le bouton "Écrire"
    const handleWriting = () => {
        setIsWriting(true);
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
                <div onClick={handleWriting}>
                    <ChooseCard
                        title="🖋 Écrire"
                        link="#"
                    />
                </div>
                <ChooseCard
                    title="🎤 Parler"
                    link="/create/record"
                />
            </div>
            {isWriting && (
                <div className="mt-6 w-full max-w-lg">
                    <LongTextInput
                        className="w-full p-4 border rounded-lg shadow-sm"
                        placeholder="Écris ce que tu ressens"
                        rows="5"
                        value={data.description}
                        onChange={e => setData('description', e.target.value)}
                    />
                </div>
                )}
        </div>
        </AuthenticatedLayout>
    );
}

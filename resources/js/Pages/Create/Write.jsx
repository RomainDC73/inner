import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import LongTextInput from '@/Components/LongTextInput';
import PrimaryButton from '@/Components/PrimaryButton';
import BackButton from '@/Components/BackButton';
import { useEffect } from 'react';


export default function Write({ mood_id }) {
    useEffect(() => {
        localStorage.removeItem('description');
    }, []);

    const savedDescription = localStorage.getItem('description') || '';

    const { data, setData, post } = useForm({
        mood_id: mood_id,
        description: savedDescription,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post('/create/write', {
            onSuccess: () => {
                localStorage.setItem('description', data.description);
            },
        });
    };

    return (
        <AuthenticatedLayout
            header={
                <div>
                    <BackButton />
                    <h1 className="text-xl text-center font-semibold leading-tight text-gray-800 mt-4 mb-4">
                    C'est parti pour écrire un peu...
                    </h1>
                </div>
            }
        >
            <Head title="Écrire" />
            <form onSubmit={handleSubmit} className="flex flex-col items-center">
                <LongTextInput
                    className="w-96 text-gray-700 border-slate-400 rounded-lg focus:border-innerlightblue focus:ring-innerlightblue focus:outline-none"
                    value={data.description}
                    onChange={(e) => setData('description', e.target.value)}
                />
                <PrimaryButton
                    type="submit"
                    className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-lg"
                    disabled={!data.description}
                >
                    Enregistrer
                </PrimaryButton>
            </form>
        </AuthenticatedLayout>
    );
}

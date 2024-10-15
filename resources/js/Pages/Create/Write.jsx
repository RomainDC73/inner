import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import LongTextInput from '@/Components/LongTextInput';

export default function ChooseAction({ mood_id }) {
    return (
        <AuthenticatedLayout
            header={
                <h1 className="text-xl text-center font-semibold leading-tight text-gray-800 mt-4 mb-4">
                    C'est parti pour écrire un peu...
                </h1>
            }
        >
            <Head title="Écrire" />
            <div className="flex flex-col items-center">
                <LongTextInput />
            </div>
        </AuthenticatedLayout>
    );
}

import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';

export default function ShowRecap({ mood_id }) {

    return (
        <AuthenticatedLayout
            header={
                <h1 className="text-xl text-center font-semibold leading-tight text-gray-800 mt-4 mb-4">
                    Yoyo
                </h1>
            }
        >
            <Head title="Écrire" />

        </AuthenticatedLayout>
    );
}

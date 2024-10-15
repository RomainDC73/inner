import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';


export default function AddMedia({ mood_id }) {
    return (
        <AuthenticatedLayout
            header={
                <h1 className="text-xl text-center font-semibold leading-tight text-gray-800 mt-4 mb-4">
                    Photoooo, photooooo
                </h1>
            }
        >
            <Head title="Prendre une photo" />

        </AuthenticatedLayout>
    );
}

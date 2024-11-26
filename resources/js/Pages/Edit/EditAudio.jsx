import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';

export default function EditAudio({ post }) {
    const { data, setData, patch, processing } = useForm({
        description: post.description || '', // Valeur par défaut : la description actuelle du post
    });

    return (
        <AuthenticatedLayout
            header={
                <h1 className="text-xl text-center font-semibold leading-tight text-gray-800 mt-4 mb-4">
                    Modifier le fichier audio
                </h1>
            }
        >

        </AuthenticatedLayout>

    );
}

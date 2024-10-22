import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';

export default function EditDescription({ post }) {
    // Initialisation du formulaire avec la description actuelle du post
    const { data, setData, patch, processing } = useForm({
        description: post.description || '', // Valeur par défaut : la description actuelle du post
    });

    // Gestion de la soumission du formulaire
    const saveDescription = (e) => {
        e.preventDefault();
        patch(`/post/${post.id}/edit/description`, {
            onSuccess: () => {
               // alert('Description mise à jour avec succès!');
            },
        });
    };

    return (
        <AuthenticatedLayout
            header={
                <h1 className="text-xl text-center font-semibold leading-tight text-gray-800 mt-4 mb-4">
                    Modifier la description
                </h1>
            }
        >
            <Head title="Modifier Description" />
            <div className="max-w-2xl mx-auto p-4 bg-white shadow-md rounded-lg">
                <form onSubmit={saveDescription}>
                    <div className="mb-4">
                        <label htmlFor="description" className="block text-gray-700 font-bold mb-2">
                            Description
                        </label>
                        <textarea
                            id="description"
                            className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none"
                            rows="5"
                            value={data.description}
                            onChange={(e) => setData('description', e.target.value)}
                        />
                    </div>

                    <div className="flex justify-end">
                        <button
                            type="submit"
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                            disabled={processing} // Désactive le bouton pendant le traitement
                        >
                            {processing ? 'Enregistrement...' : 'Enregistrer'}
                        </button>
                    </div>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}

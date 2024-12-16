import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import PrimaryButton from '@/Components/PrimaryButton';
import BackButton from '@/Components/BackButton';

export default function EditDescription({ post }) {
    const { data, setData, patch, processing } = useForm({
        description: post.description || '',
    });

    const saveDescription = (e) => {
        e.preventDefault();
        patch(`/post/${post.id}/edit/description`, {
            onSuccess: () => {
            },
        });
    };

    return (
        <AuthenticatedLayout
            header={
                <div>
                    <BackButton  />
                    <h1 className="text-xl text-center font-semibold leading-tight text-gray-800 mt-4 mb-4">
                    Modifier la description
                    </h1>
                </div>
            }
        >
            <Head title="Modifier votre description" />
            <div className="max-w-2xl mx-auto p-4 rounded-lg">
                <form onSubmit={saveDescription}>
                    <div className="mb-4">
                        <label htmlFor="description" className="block text-gray-700 font-bold mb-2">
                            Description
                        </label>
                        <textarea
                            id="description"
                            className="w-96 px-3 py-2 text-gray-700 border-slate-400 rounded-lg focus:border-innerlightblue focus:ring-innerlightblue focus:outline-none"
                            rows="5"
                            value={data.description}
                            onChange={(e) => setData('description', e.target.value)}
                        />
                    </div>

                    <div className="flex justify-center">
                        <PrimaryButton
                            type="submit"
                            disabled={processing}
                        >
                            {processing ? 'Enregistrement...' : 'Enregistrer'}
                        </PrimaryButton>
                    </div>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}

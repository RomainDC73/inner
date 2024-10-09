import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import PostsList from '@/Components/PostsList';
import { Head, usePage } from '@inertiajs/react';


export default function Posts() {
    // Récupère l'utilisateur, les salutations, et les posts passés depuis le contrôleur
    const { auth, posts } = usePage().props;


    return (
        <AuthenticatedLayout>
            <Head title="Posts" />
            <div>
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    {/* Ajout du composant PostsList pour afficher les posts de l'utilisateur */}
                    <div className="mt-2 overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <PostsList posts={posts} /> {/* Passe les posts récupérés */}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

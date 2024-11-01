import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import PostsList from '@/Components/PostsList';
import { Head, usePage, Link } from '@inertiajs/react';

export default function Posts() {
    // Récupère l'utilisateur et les posts paginés passés depuis le contrôleur
    const { auth, posts } = usePage().props;

    return (
        <AuthenticatedLayout>
            <Head title="Posts" />
            <div>
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    {/* Ajout du composant PostsList pour afficher les posts de l'utilisateur */}
                    <div className="mt-2 overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <PostsList posts={posts.data} /> {/* Passe les données des posts */}

                            {/* Pagination */}
                            <div className="flex justify-center mt-4 space-x-2">
                                {posts.links.map((link, index) => (
                                    <Link
                                        key={index}
                                        href={link.url || '#'}
                                        className={`px-4 py-2 rounded ${link.active ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-800'}`}
                                        dangerouslySetInnerHTML={{ __html: link.label }}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

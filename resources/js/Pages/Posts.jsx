import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import PostsList from '@/Components/PostsList';
import FilterForm from '@/Components/FilterForm';
import { Head, usePage, Link } from '@inertiajs/react';

export default function Posts() {
    // Récupère l'utilisateur et les posts paginés passés depuis le contrôleur
    const { auth, posts, moods, filters } = usePage().props;

    return (
        <AuthenticatedLayout>
            <Head title="Posts" />
            <div>
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    {/* Ajout du composant PostsList pour afficher les posts de l'utilisateur */}
                    <div className="mt-2 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            {/* <FilterForm moods={moods} filters={filters}/> */}

                            <PostsList posts={posts.data} /> {/* Passe les données des posts */}

                            <div className="flex justify-center mt-4 space-x-2">
                                {posts.links.map((link, index) => {
                                    // Masquer "Précédent" si on est sur la première page
                                    if (link.label.includes('Précédent') && link.url === null) return null;

                                    // Masquer "Suivant" si on est sur la dernière page
                                    if (link.label.includes('Suivant') && link.url === null) return null;

                                    return (
                                        <Link
                                            key={index}
                                            href={link.url || '#'}
                                            className={`
                                                px-4 py-2 mx-1
                                                ${link.active ? 'border border-innerdarkblue rounded-lg text-innerdarkblue font-semibold' : 'text-innerlightblue'}
                                                hover:bg-innerdarkblue rounded-lg hover:text-white
                                                transition duration-200
                                            `}
                                            dangerouslySetInnerHTML={{ __html: link.label }}
                                        />
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

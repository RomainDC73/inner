import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import PostsList from '@/Components/PostsList';
import FilterForm from '@/Components/FilterForm';
import BackButton from '@/Components/BackButton';
import { Head, usePage, router, Link } from '@inertiajs/react';

export default function Posts() {
    const { posts, moods, filters } = usePage().props;

    const handleFilterChange = (moodId) => {
        router.get(route('posts.index', { mood: moodId, page: 1 }, { preserveState: true }));
    }

    return (
        <AuthenticatedLayout>

            <Head title="Posts" />
            <div>
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="mt-2 overflow-hidden sm:rounded-lg">

                        <div className="p-6">
                        <BackButton />
                            <FilterForm moods={moods} filters={filters} onFilterChange={handleFilterChange} />

                            <PostsList posts={posts.data} />

                            <div className="flex justify-center mt-4 space-x-2">
                                {posts.links.map((link, index) => {
                                    if (link.label.includes('&laquo') && link.url === null) return null;
                                    if (link.label.includes('&raquo;') && link.url === null) return null;
                                    const url = new URL(link.url);
                                    const searchParams = new URLSearchParams(url.search);
                                    if (filters.mood) {
                                        searchParams.set('mood', filters.mood);
                                    }

                                    return (
                                        <Link
                                            key={index}
                                            href={`${url.pathname}?${searchParams.toString()}`}
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


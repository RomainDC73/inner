import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import PostsList from '@/Components/PostsList';
import PrimaryButton from '@/Components/PrimaryButton';
import CreateButton from '@/Components/CreateButton';
import { Head, usePage } from '@inertiajs/react';
import { useState, useEffect } from 'react';

export default function Dashboard() {
    const { auth, greetings, posts } = usePage().props;
    const user = auth.user;

    const getRandomGreeting = () => {
        const greetingKeys = Object.keys(greetings);
        const randomKey = greetingKeys[Math.floor(Math.random() * greetingKeys.length)];
        return greetings[randomKey];
    };

    const [randomGreeting, setRandomGreeting] = useState('');

    useEffect(() => {
        setRandomGreeting(getRandomGreeting());
    }, [greetings]);

    return (
        <AuthenticatedLayout
            header={
                <>
                    <h2 className="text-xl font-semibold leading-tight text-gray-800">
                        Hello {user.name} !
                    </h2>
                    <p>{randomGreeting}</p>
                </>
            }
        >
            <Head title="Dashboard" />
            <div className="flex justify-center py-6">
                <CreateButton href="/create/choose-mood">Publier</CreateButton>
            </div>
            <div>
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="mt-2 overflow-hidden sm:rounded-lg">
                        <div className="p-6">
                            <PostsList posts={posts} />
                            {posts.length > 0 && <PrimaryButton href="/posts">Voir tous</PrimaryButton>}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

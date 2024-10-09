import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import PostsList from '@/Components/PostsList';
import PrimaryButton from '@/Components/PrimaryButton';
import { Head, usePage } from '@inertiajs/react';
import { useState, useEffect } from 'react';

export default function Dashboard() {
    // Récupère l'utilisateur, les salutations, et les posts passés depuis le contrôleur
    const { auth, greetings, posts } = usePage().props;
    const user = auth.user;

    const getRandomGreeting = () => {
        const greetingKeys = Object.keys(greetings); // Récupère les clés du fichier de traduction
        const randomKey = greetingKeys[Math.floor(Math.random() * greetingKeys.length)]; // Choisit une clé aléatoire
        return greetings[randomKey]; // Retourne la salutation correspondante
    };

    const [randomGreeting, setRandomGreeting] = useState('');

    useEffect(() => {
        setRandomGreeting(getRandomGreeting());
    }, [greetings]);

    return (
        <AuthenticatedLayout
            header={
                <><h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Hello {user.name} !
                </h2><p>{randomGreeting}</p></>
            }
        >
            <Head title="Dashboard" />

            <div>
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    {/* Ajout du composant PostsList pour afficher les posts de l'utilisateur */}
                    <div className="mt-2 overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <PostsList posts={posts} /> {/* Passe les posts récupérés */}
                            <PrimaryButton href="/posts">Voir tous</PrimaryButton>
                        </div>


                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

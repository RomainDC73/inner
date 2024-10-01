import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage } from '@inertiajs/react';
import { useState, useEffect } from 'react';

export default function Dashboard() {
    const { auth, greetings = [] } = usePage().props;
    const user = auth.user;

    const getRandomGreetingPhrase = () => {
        return greetings.length > 0
            ? greetings[Math.floor(Math.random() * greetings.length)]
            : "Bienvenue !"; // Message par défaut si greetings est vide
    };

    const [randomGreeting, setRandomGreeting] = useState('');

    useEffect(() => {
        setRandomGreeting(getRandomGreetingPhrase());
    }, []);

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <p className="font-bold">Hello {user.name} !</p>
                            <p>{randomGreeting}</p>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

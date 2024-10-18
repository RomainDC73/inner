import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import ChooseCard from '@/Components/ChooseCard';

export default function ChooseAction({ mood_id }) {
    return (
        <AuthenticatedLayout
            header={
                <h1 className="text-xl text-center font-semibold leading-tight text-gray-800 mt-4 mb-4">
                    Et si tu en disais un peu plus ?
                </h1>
            }
        >
            <Head title="Écrire ou parler ?" />
            <div className="flex flex-col items-center">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <ChooseCard
                            title="🖋 Écrire"
                            link="/create/write"
                        />
                    </div>
                    <div>
                        <ChooseCard
                            title="🎤 Parler"
                            link="/create/talk"
                        />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

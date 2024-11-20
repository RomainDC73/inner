import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import VoiceRecorder from '@/Components/VoiceRecorder';

export default function Talk() {
    return (
        <AuthenticatedLayout
            header={
                <h1 className="text-xl text-center font-semibold leading-tight text-gray-800 mt-4 mb-4">
                    Parlons un peu...
                </h1>
            }
        >
            <Head title="Parler" />
            <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                <div className="overflow-hidden shadow-sm sm:rounded-lg">
                    <div className="p-6 text-gray-900 space-y-3">
                        <h2 className="text-lg font-medium">Enregistrez votre voix :</h2>
                        <VoiceRecorder />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

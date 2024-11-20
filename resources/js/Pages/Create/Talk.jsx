import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import VoiceRecorder from '@/Components/VoiceRecorder';

export default function Talk() {
    return (
        <AuthenticatedLayout>
            <Head title="Parler" />
            <div className="flex flex-col items-center mt-10 min-h-screen mx-auto max-w-7xl sm:px-6 lg:px-8">
                <div className="text-center">
                    <h1 className="text-xl font-semibold leading-tight text-gray-800 mt-4 mb-4">
                        Parlons un peu...
                    </h1>
                    <div className="overflow-hidden shadow-sm rounded-lg">
                        <div className="p-6 text-gray-900 space-y-3">
                            <h2 className="text-lg font-medium">Enregistrez votre voix :</h2>
                            <VoiceRecorder />
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
